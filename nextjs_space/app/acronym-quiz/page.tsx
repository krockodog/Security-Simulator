'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, XCircle, Home, RotateCcw, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getRandomAcronyms, AcronymQuestion } from '@/lib/exam-data';

export default function AcronymQuizPage() {
  const [questions, setQuestions] = useState<AcronymQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showFinalResults, setShowFinalResults] = useState(false);

  useEffect(() => {
    // Initialize quiz with random acronyms
    const randomAcronyms = getRandomAcronyms(40);
    setQuestions(randomAcronyms);
  }, []);

  const handleAnswerSelect = (optionIndex: number) => {
    // Only allow selection if feedback is not yet shown
    if (!showFeedback) {
      setSelectedOption(optionIndex);
      setShowFeedback(true);
      if (optionIndex === questions[currentQuestion].correctAnswer) {
        setCorrectCount(correctCount + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      setShowFinalResults(true);
    }
  };

  const handleRestart = () => {
    const randomAcronyms = getRandomAcronyms(40);
    setQuestions(randomAcronyms);
    setCurrentQuestion(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setCorrectCount(0);
    setShowFinalResults(false);
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-black cyber-grid">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Loading Quiz...</CardTitle>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (showFinalResults) {
    const percentage = (correctCount / questions.length) * 100;
    // Calculate scaled score (100-900)
    const scaledScore = Math.round((percentage / 100) * 800 + 100);
    const passed = scaledScore >= 765;

    return (
      <div className="min-h-screen bg-black cyber-grid">
        <Card className={`w-full max-w-2xl ${passed ? 'border-green-500' : 'border-red-500'}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-3xl">
              {passed ? (
                <>
                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                  Bestanden!
                </>
              ) : (
                <>
                  <XCircle className="h-8 w-8 text-red-500" />
                  Nicht bestanden
                </>
              )}
            </CardTitle>
            <CardDescription>
              Punktzahl: {scaledScore} / 900 (Mindestens 765 erforderlich)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {correctCount}
                </div>
                <div className="text-sm text-muted-foreground">Richtig</div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold text-red-600 dark:text-red-400">
                  {questions.length - correctCount}
                </div>
                <div className="text-sm text-muted-foreground">Falsch</div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {percentage.toFixed(0)}%
                </div>
                <div className="text-sm text-muted-foreground">Erfolgsquote</div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <div className="text-sm text-blue-900 dark:text-blue-100">
                {passed
                  ? 'Glückwunsch! Du hast das Akronym-Quiz bestanden. Du kennst die wichtigsten Security+ Begriffe!'
                  : 'Weiter üben! Lerne die Akronyme noch einmal durch und versuche es erneut.'}
              </div>
            </div>

            <div className="flex gap-4">
              <Button onClick={handleRestart} size="lg" className="flex-1">
                <RotateCcw className="mr-2 h-4 w-4" />
                Neues Quiz starten
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Zur Startseite
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isCorrect = selectedOption === questions[currentQuestion].correctAnswer;

  return (
    <div className="min-h-screen bg-black cyber-grid">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Progress */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm text-muted-foreground">Fortschritt</div>
                <div className="text-lg font-semibold">
                  Frage {currentQuestion + 1} von {questions.length}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Richtig beantwortet</div>
                <div className="text-lg font-semibold text-green-600 dark:text-green-400">
                  {correctCount}
                </div>
              </div>
            </div>
            <Progress value={((currentQuestion + 1) / questions.length) * 100} />
          </CardContent>
        </Card>

        {/* Question Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-center text-primary">
              {questions[currentQuestion].acronym}
            </CardTitle>
            <CardDescription className="text-center text-lg">
              Was bedeutet dieses Akronym?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup
              value={selectedOption?.toString() ?? ""}
              onValueChange={(value) => handleAnswerSelect(parseInt(value))}
            >
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => {
                  const isThisCorrect = index === questions[currentQuestion].correctAnswer;
                  const isSelected = selectedOption === index;

                  return (
                    <div
                      key={index}
                      className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${
                        showFeedback
                          ? isThisCorrect
                            ? 'bg-green-50 dark:bg-green-950 border-green-500'
                            : isSelected
                            ? 'bg-red-50 dark:bg-red-950 border-red-500'
                            : 'border-muted opacity-50'
                          : 'hover:border-primary cursor-pointer'
                      }`}
                    >
                      <RadioGroupItem
                        value={index.toString()}
                        id={`option-${index}`}
                      />
                      <Label
                        htmlFor={`option-${index}`}
                        className="flex-1 cursor-pointer flex items-center justify-between"
                      >
                        <span>{option}</span>
                        {showFeedback && isThisCorrect && (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        )}
                        {showFeedback && isSelected && !isThisCorrect && (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </RadioGroup>

            {showFeedback && (
              <div
                className={`p-4 rounded-lg ${
                  isCorrect
                    ? 'bg-green-50 dark:bg-green-950 border-2 border-green-500'
                    : 'bg-red-50 dark:bg-red-950 border-2 border-red-500'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {isCorrect ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                  <span className="font-semibold">
                    {isCorrect ? 'Richtig!' : 'Falsch!'}
                  </span>
                </div>
                <div className="text-sm mb-2">
                  <strong>{questions[currentQuestion].acronym}</strong> steht für:{' '}
                  <strong>{questions[currentQuestion].fullForm}</strong>
                </div>
                <div className="text-sm text-muted-foreground">
                  {questions[currentQuestion].explanation}
                </div>
              </div>
            )}

            <Button
              onClick={handleNextQuestion}
              disabled={!showFeedback}
              className="w-full"
              size="lg"
            >
              {currentQuestion < questions.length - 1 ? (
                <>
                  Nächste Frage
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                'Ergebnisse anzeigen'
              )}
            </Button>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Zur Startseite
            </Link>
          </Button>
          <Button variant="outline" onClick={handleRestart}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Quiz neu starten
          </Button>
        </div>
      </div>
    </div>
  );
}
