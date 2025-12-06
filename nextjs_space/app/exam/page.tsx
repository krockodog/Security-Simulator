'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, XCircle, Home, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { getRandomQuestions, ExamQuestion } from '@/lib/exam-data';

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
  };

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
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
          selectedOption,
        });
      }
      setUserAnswers(newAnswers);

      // Move to next question
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        // Load previous answer if exists
        const nextAnswer = newAnswers.find(
          (a) => a.questionId === questions[currentQuestion + 1].id
        );
        setSelectedOption(nextAnswer?.selectedOption ?? null);
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      // Load previous answer
      const prevAnswer = userAnswers.find(
        (a) => a.questionId === questions[currentQuestion - 1].id
      );
      setSelectedOption(prevAnswer?.selectedOption ?? null);
    }
  };

  const handleSubmitExam = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    userAnswers.forEach((answer) => {
      const question = questions.find((q) => q.id === answer.questionId);
      if (question && question.correctAnswer === answer.selectedOption) {
        correct++;
      }
    });
    // CompTIA uses scaled scoring: 100-900, passing is 750
    // Simulate: (correct / total) * 800 + 100
    const percentage = userAnswers.length > 0 ? correct / questions.length : 0;
    return Math.round(percentage * 800 + 100);
  };

  const getAnsweredCount = () => {
    return userAnswers.length;
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
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Loading Exam...</CardTitle>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (!examStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-3xl">CompTIA Security+ SY0-701 Exam</CardTitle>
            <CardDescription>60 Fragen - 90 Minuten - 765 Punkte zum Bestehen</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="prose dark:prose-invert max-w-none">
              <h3>Prüfungshinweise:</h3>
              <ul>
                <li>Du hast <strong>90 Minuten</strong> Zeit für 60 Fragen</li>
                <li>Du kannst zwischen den Fragen vor und zurück navigieren</li>
                <li>Die Antworten werden gespeichert, wenn du zur nächsten Frage gehst</li>
                <li>Am Ende werden alle Antworten ausgewertet</li>
                <li>Du brauchst <strong>765 von 900 Punkten</strong> zum Bestehen</li>
                <li>Keine direkte Rückmeldung während der Prüfung - nur am Ende!</li>
              </ul>
            </div>
            <div className="flex gap-4">
              <Button onClick={handleStartExam} size="lg" className="flex-1">
                Prüfung starten
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Zurück
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const passed = score >= 765;
    const correctCount = userAnswers.filter((answer) => {
      const question = questions.find((q) => q.id === answer.questionId);
      return question && question.correctAnswer === answer.selectedOption;
    }).length;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
        <div className="max-w-6xl mx-auto space-y-6">
          <Card className={passed ? 'border-green-500' : 'border-red-500'}>
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
                Deine Punktzahl: {score} / 900 (Mindestens 765 erforderlich)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-3xl font-bold">{correctCount}</div>
                  <div className="text-sm text-muted-foreground">Richtig beantwortet</div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-3xl font-bold">{userAnswers.length - correctCount}</div>
                  <div className="text-sm text-muted-foreground">Falsch beantwortet</div>
                </div>
              </div>
              <div className="flex gap-4">
                <Button onClick={handleRestart} size="lg" className="flex-1">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Neue Prüfung starten
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

          <Card>
            <CardHeader>
              <CardTitle>Detaillierte Antworten</CardTitle>
              <CardDescription>Hier siehst du alle Fragen mit Erklärungen</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {questions.map((question, index) => {
                const userAnswer = userAnswers.find((a) => a.questionId === question.id);
                const isCorrect = userAnswer?.selectedOption === question.correctAnswer;
                const wasAnswered = userAnswer !== undefined;

                return (
                  <div key={question.id} className="border-b pb-6 last:border-b-0">
                    <div className="flex items-start gap-2 mb-4">
                      {wasAnswered ? (
                        isCorrect ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-1" />
                        )
                      ) : (
                        <div className="h-5 w-5 flex-shrink-0 mt-1" />
                      )}
                      <div className="flex-1">
                        <div className="font-semibold mb-2">
                          Frage {index + 1}: {question.question}
                        </div>
                        <div className="text-sm text-muted-foreground mb-3">
                          Domain: {question.domain}
                        </div>
                        <div className="space-y-2">
                          {question.options.map((option, optionIndex) => {
                            const isUserAnswer = userAnswer?.selectedOption === optionIndex;
                            const isCorrectAnswer = question.correctAnswer === optionIndex;

                            return (
                              <div
                                key={optionIndex}
                                className={`p-3 rounded-lg border-2 ${
                                  isCorrectAnswer
                                    ? 'bg-green-50 dark:bg-green-950 border-green-500'
                                    : isUserAnswer
                                    ? 'bg-red-50 dark:bg-red-950 border-red-500'
                                    : 'border-transparent bg-muted'
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">
                                    {String.fromCharCode(65 + optionIndex)}.
                                  </span>
                                  <span>{option}</span>
                                  {isCorrectAnswer && (
                                    <CheckCircle2 className="h-4 w-4 text-green-500 ml-auto" />
                                  )}
                                  {isUserAnswer && !isCorrectAnswer && (
                                    <XCircle className="h-4 w-4 text-red-500 ml-auto" />
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                          <div className="font-semibold mb-1 text-blue-900 dark:text-blue-100">
                            Erklärung:
                          </div>
                          <div className="text-sm text-blue-800 dark:text-blue-200">
                            {question.explanation}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Timer and Progress */}
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
                <div className="text-sm text-muted-foreground">Verbleibende Zeit</div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {formatTime(timeRemaining)}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Beantwortet</div>
                <div className="text-lg font-semibold">
                  {getAnsweredCount()} / {questions.length}
                </div>
              </div>
            </div>
            <Progress value={((currentQuestion + 1) / questions.length) * 100} />
          </CardContent>
        </Card>

        {/* Question Card */}
        <Card>
          <CardHeader>
            <CardTitle>Frage {currentQuestion + 1}</CardTitle>
            <CardDescription>{questions[currentQuestion].domain}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg">{questions[currentQuestion].question}</p>
            </div>

            <RadioGroup
              value={selectedOption?.toString()}
              onValueChange={(value) => handleAnswerSelect(parseInt(value))}
            >
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-primary transition-colors cursor-pointer"
                  >
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      <span className="font-medium mr-2">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>

            <div className="flex gap-4">
              <Button
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0}
                variant="outline"
              >
                Zurück
              </Button>
              {currentQuestion < questions.length - 1 ? (
                <Button
                  onClick={handleNextQuestion}
                  disabled={selectedOption === null}
                  className="flex-1"
                >
                  Nächste Frage
                </Button>
              ) : (
                <Button
                  onClick={handleSubmitExam}
                  disabled={getAnsweredCount() < questions.length}
                  className="flex-1"
                >
                  Prüfung abgeben
                </Button>
              )}
            </div>

            {getAnsweredCount() < questions.length && currentQuestion === questions.length - 1 && (
              <div className="text-sm text-amber-600 dark:text-amber-400 text-center">
                Bitte beantworte alle Fragen, bevor du die Prüfung abgibst
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
