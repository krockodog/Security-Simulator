'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { FileText, CheckCircle2, XCircle, AlertTriangle, Info, Server } from 'lucide-react'
import Link from 'next/link'
import {
  systemLogAnalysisScenario,
  systemLogEntries,
  systemLogQuestions,
  systemLogExplanation,
  type SystemLogEntry,
  type LogQuestion
} from '@/lib/pbq-data'

export default function LogAnalysisPBQ() {
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [selectedLog, setSelectedLog] = useState<SystemLogEntry | null>(null)

  const handleAnswerChange = (questionId: string, answer: string) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: answer }))
  }

  const handleSubmit = () => {
    let correctCount = 0
    systemLogQuestions.forEach(question => {
      if (userAnswers[question.id] === question.correctAnswer) {
        correctCount++
      }
    })
    const scorePercentage = Math.round((correctCount / systemLogQuestions.length) * 100)
    setScore(scorePercentage)
    setShowResults(true)
  }

  const handleReset = () => {
    setUserAnswers({})
    setShowResults(false)
    setScore(0)
    setSelectedLog(null)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'text-red-600 bg-red-50'
      case 'Error': return 'text-orange-600 bg-orange-50'
      case 'Warning': return 'text-yellow-600 bg-yellow-50'
      case 'Info': return 'text-blue-600 bg-blue-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getLogTypeColor = (logType: string) => {
    switch (logType) {
      case 'Security': return 'bg-purple-100 text-purple-700'
      case 'System': return 'bg-blue-100 text-blue-700'
      case 'Application': return 'bg-green-100 text-green-700'
      case 'Firewall': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="mb-4">
              ← Back to Home
            </Button>
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-indigo-600 rounded-lg">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">{systemLogAnalysisScenario.title}</h1>
              <p className="text-slate-600">PBQ 5: Digital Forensics & Log Analysis</p>
            </div>
          </div>
        </div>

        {/* Scenario Card */}
        <Card className="mb-8 border-2">
          <CardHeader className="bg-gradient-to-br from-indigo-50 to-white">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-indigo-600" />
              Scenario
            </CardTitle>
            <CardDescription>Forensic Investigation</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="prose prose-slate max-w-none">
              <p className="whitespace-pre-line text-slate-700 leading-relaxed">
                {systemLogAnalysisScenario.scenario}
              </p>
              <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
                <p className="text-sm text-slate-700 font-medium">
                  <strong>Instructions:</strong> {systemLogAnalysisScenario.instructions}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Log Entries */}
          <div>
            <Card className="border-2">
              <CardHeader className="bg-gradient-to-br from-slate-50 to-white">
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5 text-slate-600" />
                  System Logs ({systemLogEntries.length} entries)
                </CardTitle>
                <CardDescription>Click on a log entry to view details</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-2">
                    {systemLogEntries.map((log) => (
                      <div
                        key={log.id}
                        onClick={() => setSelectedLog(log)}
                        className={`p-3 border rounded-lg cursor-pointer transition-all ${
                          selectedLog?.id === log.id
                            ? 'border-indigo-600 bg-indigo-50 shadow-md'
                            : 'border-slate-200 hover:border-indigo-400 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <Badge className={getLogTypeColor(log.logType)}>
                            {log.logType}
                          </Badge>
                          <Badge className={`${getSeverityColor(log.severity)} border-0`}>
                            {log.severity}
                          </Badge>
                        </div>
                        <div className="text-xs text-slate-500 mb-1">
                          {log.timestamp} | {log.host}
                        </div>
                        <div className="text-sm text-slate-700 line-clamp-2">
                          {log.message}
                        </div>
                        {log.user && (
                          <div className="text-xs text-slate-500 mt-1">
                            User: {log.user}
                          </div>
                        )}
                        {log.sourceIp && (
                          <div className="text-xs text-slate-500 mt-1">
                            Source IP: {log.sourceIp}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Selected Log Details */}
            {selectedLog && (
              <Card className="mt-4 border-2 border-indigo-300">
                <CardHeader className="bg-gradient-to-br from-indigo-100 to-white">
                  <CardTitle className="text-lg">Selected Log Entry Details</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs text-slate-500">Host</Label>
                      <p className="text-sm font-medium text-slate-900">{selectedLog.host}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-slate-500">Timestamp</Label>
                      <p className="text-sm font-medium text-slate-900">{selectedLog.timestamp}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-slate-500">Type / Severity</Label>
                      <div className="flex gap-2 mt-1">
                        <Badge className={getLogTypeColor(selectedLog.logType)}>
                          {selectedLog.logType}
                        </Badge>
                        <Badge className={`${getSeverityColor(selectedLog.severity)} border-0`}>
                          {selectedLog.severity}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs text-slate-500">Message</Label>
                      <p className="text-sm text-slate-700 mt-1">{selectedLog.message}</p>
                    </div>
                    {selectedLog.user && (
                      <div>
                        <Label className="text-xs text-slate-500">User</Label>
                        <p className="text-sm font-medium text-slate-900">{selectedLog.user}</p>
                      </div>
                    )}
                    {selectedLog.sourceIp && (
                      <div>
                        <Label className="text-xs text-slate-500">Source IP</Label>
                        <p className="text-sm font-medium text-slate-900">{selectedLog.sourceIp}</p>
                      </div>
                    )}
                    {selectedLog.pid && (
                      <div>
                        <Label className="text-xs text-slate-500">Process ID</Label>
                        <p className="text-sm font-medium text-slate-900">{selectedLog.pid}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Questions */}
          <div>
            <Card className="border-2">
              <CardHeader className="bg-gradient-to-br from-indigo-50 to-white">
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-indigo-600" />
                  Forensic Analysis Questions
                </CardTitle>
                <CardDescription>Answer based on your log analysis</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-6">
                    {systemLogQuestions.map((question, index) => (
                      <div key={question.id} className="pb-6 border-b border-slate-200 last:border-0">
                        <div className="mb-4">
                          <Label className="text-base font-semibold text-slate-900">
                            Question {index + 1}: {question.question}
                          </Label>
                        </div>
                        <RadioGroup
                          value={userAnswers[question.id] || ''}
                          onValueChange={(value) => handleAnswerChange(question.id, value)}
                          disabled={showResults}
                        >
                          {question.options.map((option, optIndex) => {
                            const isCorrect = option === question.correctAnswer
                            const isSelected = userAnswers[question.id] === option
                            const showCorrect = showResults && isCorrect
                            const showIncorrect = showResults && isSelected && !isCorrect

                            return (
                              <div
                                key={optIndex}
                                className={`flex items-center space-x-3 p-3 rounded-lg border transition-all ${
                                  showCorrect
                                    ? 'bg-green-50 border-green-300'
                                    : showIncorrect
                                    ? 'bg-red-50 border-red-300'
                                    : isSelected
                                    ? 'bg-indigo-50 border-indigo-300'
                                    : 'border-slate-200 hover:border-indigo-200'
                                }`}
                              >
                                <RadioGroupItem value={option} id={`${question.id}-${optIndex}`} />
                                <Label
                                  htmlFor={`${question.id}-${optIndex}`}
                                  className="flex-1 cursor-pointer text-sm"
                                >
                                  {option}
                                </Label>
                                {showCorrect && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                                {showIncorrect && <XCircle className="h-5 w-5 text-red-600" />}
                              </div>
                            )
                          })}
                        </RadioGroup>

                        {/* Show explanation after submission */}
                        {showResults && (
                          <Alert className="mt-4 border-blue-300 bg-blue-50">
                            <Info className="h-4 w-4 text-blue-600" />
                            <AlertDescription className="text-sm text-slate-700">
                              <strong>Explanation:</strong> {question.explanation}
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          {!showResults ? (
            <Button
              onClick={handleSubmit}
              disabled={Object.keys(userAnswers).length !== systemLogQuestions.length}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-lg py-6"
              size="lg"
            >
              Submit Analysis
            </Button>
          ) : (
            <Button
              onClick={handleReset}
              className="w-full sm:w-auto bg-slate-600 hover:bg-slate-700 text-lg py-6"
              size="lg"
            >
              Reset & Try Again
            </Button>
          )}
        </div>

        {/* Results */}
        {showResults && (
          <Card className="mt-8 border-2">
            <CardHeader className={`${
              score >= 80 ? 'bg-green-50' : score >= 60 ? 'bg-yellow-50' : 'bg-red-50'
            }`}>
              <CardTitle className="flex items-center gap-2">
                {score >= 80 ? (
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                ) : (
                  <AlertTriangle className="h-6 w-6 text-yellow-600" />
                )}
                Analysis Results
              </CardTitle>
              <CardDescription>
                Score: {score}% ({Object.keys(userAnswers).filter(key => userAnswers[key] === systemLogQuestions.find(q => q.id === key)?.correctAnswer).length}/{systemLogQuestions.length} correct)
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* Attack Timeline */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <Info className="h-5 w-5 text-indigo-600" />
                    Complete Attack Timeline
                  </h3>
                  <div className="space-y-2">
                    {systemLogExplanation.attackTimeline.map((event, index) => (
                      <div key={index} className="flex gap-3 items-start">
                        <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-semibold text-indigo-600">{index + 1}</span>
                        </div>
                        <p className="text-sm text-slate-700">{event}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Kill Chain */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Cyber Kill Chain Analysis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {systemLogExplanation.killChain.map((phase, index) => (
                      <Badge key={index} variant="outline" className="p-2 justify-start text-xs">
                        {phase}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Remediation */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Recommended Remediation Steps</h3>
                  <div className="space-y-2">
                    {systemLogExplanation.remediationSteps.map((step, index) => (
                      <div key={index} className="flex gap-3 items-start p-3 bg-slate-50 rounded-lg">
                        <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-slate-700">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
