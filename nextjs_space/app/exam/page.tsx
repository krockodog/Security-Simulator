'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, XCircle, Home, RotateCcw, List, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { getRandomQuestions, ExamQuestion } from '@/lib/exam-data';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface UserAnswer {
  questionId: string;
  selectedOption: number;
}

export default function ExamPage() {
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(90 * 60); // 90 minutes in seconds
  const [examStarted, setExamStarted] = useState(false);
  const [showOverview, setShowOverview] = useState(false);

  useEffect(() => {
    // Initialize exam with random questions
    const randomQuestions = getRandomQuestions(60);
    setQuestions(randomQuestions);
  }, []);

  useEffect(() => {
    // Timer countdown
    if (examStarted && !showResults && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
    if (timeRemaining === 0 && examStarted) {
      handleSubmitExam();
    }
  }, [examStarted, showResults, timeRemaining]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartExam = () => {
    setExamStarted(true);
    setSelectedOption(null);
  };

  const handleAnswerSelect = (optionIndex: string) => {
    setSelectedOption(parseInt(optionIndex));
  };

  const handleNextQuestion = () => {
    if (selectedOption !== null) {
      // Save answer
      const newAnswers = [...userAnswers];
      const existingAnswerIndex = newAnswers.findIndex(
        (a) => a.questionId === questions[currentQuestion].id
      );
      
      if (existingAnswerIndex !== -1) {
        newAnswers[existingAnswerIndex].selectedOption = selectedOption;
      } else {
        newAnswers.push({
          questionId: questions[currentQuestion].id,
          selectedOption: selectedOption,
        });
      }
      setUserAnswers(newAnswers);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      // Load previously selected answer if exists
      const previousAnswer = userAnswers.find(
        (a) => a.questionId === questions[currentQuestion + 1].id
      );
      setSelectedOption(previousAnswer?.selectedOption ?? null);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      // Save current answer if any
      if (selectedOption !== null) {
        const newAnswers = [...userAnswers];
        const existingAnswerIndex = newAnswers.findIndex(
          (a) => a.questionId === questions[currentQuestion].id
        );
        
        if (existingAnswerIndex !== -1) {
          newAnswers[existingAnswerIndex].selectedOption = selectedOption;
        } else {
          newAnswers.push({
            questionId: questions[currentQuestion].id,
            selectedOption: selectedOption,
          });
        }
        setUserAnswers(newAnswers);
      }

      setCurrentQuestion(currentQuestion - 1);
      // Load previous answer
      const previousAnswer = userAnswers.find(
        (a) => a.questionId === questions[currentQuestion - 1].id
      );
      setSelectedOption(previousAnswer?.selectedOption ?? null);
    }
  };

  const jumpToQuestion = (index: number) => {
    // Save current answer if any
    if (selectedOption !== null) {
      const newAnswers = [...userAnswers];
      const existingAnswerIndex = newAnswers.findIndex(
        (a) => a.questionId === questions[currentQuestion].id
      );
      
      if (existingAnswerIndex !== -1) {
        newAnswers[existingAnswerIndex].selectedOption = selectedOption;
      } else {
        newAnswers.push({
          questionId: questions[currentQuestion].id,
          selectedOption: selectedOption,
        });
      }
      setUserAnswers(newAnswers);
    }

    setCurrentQuestion(index);
    // Load selected answer if exists
    const answer = userAnswers.find(
      (a) => a.questionId === questions[index].id
    );
    setSelectedOption(answer?.selectedOption ?? null);
    setShowOverview(false);
  };

  const isQuestionAnswered = (questionId: string) => {
    return userAnswers.some(a => a.questionId === questionId);
  };

  const handleSubmitExam = () => {
    // Save current answer before submit
    if (selectedOption !== null) {
      const newAnswers = [...userAnswers];
      const existingAnswerIndex = newAnswers.findIndex(
        (a) => a.questionId === questions[currentQuestion].id
      );
      
      if (existingAnswerIndex !== -1) {
        newAnswers[existingAnswerIndex].selectedOption = selectedOption;
      } else {
        newAnswers.push({
          questionId: questions[currentQuestion].id,
          selectedOption: selectedOption,
        });
      }
      setUserAnswers(newAnswers);
    }
    setShowResults(true);
  };

  const calculateScore = () => {
    let correctCount = 0;
    userAnswers.forEach((answer) => {
      const question = questions.find((q) => q.id === answer.questionId);
      if (question && answer.selectedOption === question.correctAnswer) {
        correctCount++;
      }
    });
    return correctCount;
  };

  const getScaledScore = () => {
    const correctCount = calculateScore();
    const totalQuestions = questions.length;
    const percentage = (correctCount / totalQuestions) * 100;
    // Scale from 100-900 based on percentage
    const scaledScore = Math.round(100 + (percentage / 100) * 800);
    return scaledScore;
  };

  const handleRestart = () => {
    const randomQuestions = getRandomQuestions(60);
    setQuestions(randomQuestions);
    setCurrentQuestion(0);
    setUserAnswers([]);
    setShowResults(false);
    setSelectedOption(null);
    setTimeRemaining(90 * 60);
    setExamStarted(false);
    setShowOverview(false);
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Laden der Prüfungsfragen...</p>
        </div>
      </div>
    );
  }

  if (!examStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-2xl">
            <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
              <CardTitle className="text-3xl mb-2">CompTIA Security+ SY0-701</CardTitle>
              <CardDescription className="text-blue-100">Prüfungssimulator</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">60 Fragen</h3>
                    <p className="text-muted-foreground">Zufällig ausgewählte Fragen aus dem Fragenpool</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">90 Minuten Prüfungszeit</h3>
                    <p className="text-muted-foreground">Timer läuft nach Start der Prüfung</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Punktebereich 100-900</h3>
                    <p className="text-muted-foreground">Bestanden: 765 oder höher</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Keine sofortige Auswertung</h3>
                    <p className="text-muted-foreground">Ergebnisse erst nach Abgabe der Prüfung</p>
                  </div>
                </div>
              </div>
              <div className="border-t pt-6">
                <Button 
                  onClick={handleStartExam} 
                  className="w-full py-6 text-lg shadow-lg hover:shadow-xl transition-all"
                  size="lg"
                >
                  Prüfung starten
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (showResults) {
    const correctCount = calculateScore();
    const scaledScore = getScaledScore();
    const passed = scaledScore >= 765;
    const percentage = (correctCount / questions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-2xl mb-6">
            <CardHeader className={`text-center rounded-t-lg ${
              passed 
                ? 'bg-gradient-to-r from-green-600 to-emerald-600' 
                : 'bg-gradient-to-r from-red-600 to-rose-600'
            } text-white`}>
              <div className="flex justify-center mb-4">
                {passed ? (
                  <CheckCircle2 className="h-20 w-20" />
                ) : (
                  <XCircle className="h-20 w-20" />
                )}
              </div>
              <CardTitle className="text-3xl mb-2">
                {passed ? 'Bestanden!' : 'Nicht Bestanden'}
              </CardTitle>
              <CardDescription className="text-white/90 text-xl">
                Ihre Punktzahl: {scaledScore}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-blue-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{correctCount}/{questions.length}</div>
                  <div className="text-sm text-muted-foreground mt-1">Richtige Antworten</div>
                </div>
                <div className="text-center p-4 bg-blue-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{percentage.toFixed(1)}%</div>
                  <div className="text-sm text-muted-foreground mt-1">Prozent korrekt</div>
                </div>
                <div className="text-center p-4 bg-blue-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{scaledScore}</div>
                  <div className="text-sm text-muted-foreground mt-1">Punkte (765 erforderlich)</div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <h3 className="text-xl font-semibold mb-4">Detaillierte Ergebnisse</h3>
                {questions.map((question, index) => {
                  const userAnswer = userAnswers.find((a) => a.questionId === question.id);
                  const isCorrect = userAnswer?.selectedOption === question.correctAnswer;
                  
                  return (
                    <Card key={question.id} className={`border-l-4 ${
                      isCorrect ? 'border-l-green-500' : 'border-l-red-500'
                    }`}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-base mb-2">
                              Frage {index + 1}
                            </CardTitle>
                            <p className="text-sm">{question.question}</p>
                          </div>
                          {isCorrect ? (
                            <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 ml-4" />
                          ) : (
                            <XCircle className="h-6 w-6 text-red-600 flex-shrink-0 ml-4" />
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {question.options.map((option, optionIndex) => {
                            const isUserAnswer = userAnswer?.selectedOption === optionIndex;
                            const isCorrectAnswer = question.correctAnswer === optionIndex;
                            
                            return (
                              <div
                                key={optionIndex}
                                className={`p-3 rounded-lg ${
                                  isCorrectAnswer
                                    ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                                    : isUserAnswer
                                    ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                                    : 'bg-gray-50 dark:bg-gray-800'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-sm">{option}</span>
                                  {isCorrectAnswer && (
                                    <span className="text-xs font-semibold text-green-700 dark:text-green-400">
                                      Richtig
                                    </span>
                                  )}
                                  {isUserAnswer && !isCorrectAnswer && (
                                    <span className="text-xs font-semibold text-red-700 dark:text-red-400">
                                      Ihre Antwort
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">
                            Erklärung:
                          </p>
                          <p className="text-sm text-blue-800 dark:text-blue-200">
                            {question.explanation}
                          </p>
                          <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                            Domain: {question.domain}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="flex gap-4">
                <Button onClick={handleRestart} className="flex-1" size="lg">
                  <RotateCcw className="mr-2 h-5 w-5" />
                  Neue Prüfung starten
                </Button>
                <Link href="/" className="flex-1">
                  <Button variant="outline" className="w-full" size="lg">
                    <Home className="mr-2 h-5 w-5" />
                    Zurück zur Startseite
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with Timer and Progress */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Security+ SY0-701 Prüfung</h1>
            <p className="text-sm text-muted-foreground">
              Frage {currentQuestion + 1} von {questions.length}
            </p>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${
              timeRemaining < 300 ? 'text-red-600' : 'text-primary'
            }`}>
              {formatTime(timeRemaining)}
            </div>
            <p className="text-sm text-muted-foreground">Verbleibende Zeit</p>
          </div>
        </div>

        <Progress value={progress} className="mb-6" />

        {/* Question Card */}
        <Card className="shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="text-xl">
              Frage {currentQuestion + 1}
            </CardTitle>
            <CardDescription className="text-base mt-3">
              {questions[currentQuestion].question}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedOption !== null ? selectedOption.toString() : undefined}
              onValueChange={handleAnswerSelect}
            >
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent transition-colors"
                  >
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label
                      htmlFor={`option-${index}`}
                      className="flex-1 cursor-pointer text-base"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Warning message on last question */}
        {currentQuestion === questions.length - 1 && selectedOption !== null && (
          <Card className="mb-6 border-orange-200 dark:border-orange-800">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-orange-900 dark:text-orange-100">
                    Dies ist die letzte Frage. Überprüfen Sie Ihre Antworten in der Übersicht, bevor Sie die Prüfung abgeben.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center gap-4">
          <Button
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
            variant="outline"
          >
            Zurück
          </Button>

          <Sheet open={showOverview} onOpenChange={setShowOverview}>
            <SheetTrigger asChild>
              <Button variant="outline">
                <List className="mr-2 h-4 w-4" />
                Übersicht
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Fragenübersicht</SheetTitle>
                <SheetDescription>
                  Klicken Sie auf eine Frage, um direkt dorthin zu springen
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6">
                <div className="grid grid-cols-5 gap-2">
                  {questions.map((q, index) => {
                    const isAnswered = isQuestionAnswered(q.id);
                    const isCurrent = index === currentQuestion;
                    
                    return (
                      <Button
                        key={q.id}
                        variant={isCurrent ? "default" : isAnswered ? "secondary" : "outline"}
                        className={`h-12 ${
                          !isAnswered && !isCurrent ? 'border-orange-500 border-2' : ''
                        }`}
                        onClick={() => jumpToQuestion(index)}
                      >
                        {!isAnswered && !isCurrent && (
                          <AlertCircle className="h-4 w-4 text-orange-500 mr-1" />
                        )}
                        {index + 1}
                      </Button>
                    );
                  })}
                </div>
                <div className="mt-6 space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-primary rounded"></div>
                    <span>Aktuelle Frage</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-secondary rounded"></div>
                    <span>Beantwortet</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-orange-500 rounded"></div>
                    <span>Unbeantwortet</span>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {currentQuestion < questions.length - 1 ? (
            <Button onClick={handleNextQuestion}>
              Weiter
            </Button>
          ) : (
            <Button 
              onClick={handleSubmitExam}
              className="bg-green-600 hover:bg-green-700"
            >
              Prüfung abgeben
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
