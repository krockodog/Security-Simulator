'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Shield, AlertTriangle, ArrowLeft, Send, CheckCircle2, XCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DragDropArea } from '@/components/pbq/drag-drop-area'
import {
  incidentResponseScenario,
  incidentResponseSteps,
  correctIncidentResponseOrder,
  incidentResponseExplanation,
  type IncidentResponseStep
} from '@/lib/pbq-data'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function IncidentResponsePBQPage() {
  const router = useRouter()
  const [userOrder, setUserOrder] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [isCorrect, setIsCorrect] = useState(false)

  const handleSubmit = async () => {
    if (userOrder?.length !== incidentResponseSteps?.length) {
      alert('Please place all incident response steps before submitting.')
      return
    }

    // Calculate score
    let correctCount = 0
    for (let i = 0; i < userOrder?.length; i++) {
      if (userOrder?.[i] === correctIncidentResponseOrder?.[i]) {
        correctCount++
      }
    }
    const calculatedScore = Math.round((correctCount / (correctIncidentResponseOrder?.length ?? 1)) * 100)
    setScore(calculatedScore)
    setIsCorrect(calculatedScore === 100)
    setSubmitted(true)

    // Save to database
    try {
      await fetch('/api/pbq/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pbqNumber: 2,
          pbqType: 'incident_response',
          userAnswer: JSON.stringify(userOrder),
          score: calculatedScore,
          isCorrect: calculatedScore === 100
        })
      })
    } catch (error) {
      console.error('Error saving attempt:', error)
    }

    // Scroll to results
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const handleReset = () => {
    setUserOrder([])
    setSubmitted(false)
    setScore(0)
    setIsCorrect(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getPhaseColor = (phase: string) => {
    const colors: Record<string, string> = {
      'Preparation': 'bg-blue-100 text-blue-800',
      'Detection & Analysis': 'bg-purple-100 text-purple-800',
      'Containment': 'bg-amber-100 text-amber-800',
      'Eradication': 'bg-red-100 text-red-800',
      'Recovery': 'bg-green-100 text-green-800',
      'Post-Incident Activity': 'bg-slate-100 text-slate-800'
    }
    return colors?.[phase] ?? 'bg-gray-100 text-gray-800'
  }

  const renderIncidentStep = (step: IncidentResponseStep) => (
    <div className="text-sm">
      <div className="mb-2">
        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getPhaseColor(step?.phase ?? '')}`}>
          {step?.phase}
        </span>
      </div>
      <div className="font-medium text-slate-900 mb-1">{step?.step}</div>
      <div className="text-xs text-slate-600">{step?.description}</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-slate-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-red-600" />
              <div>
                <h1 className="text-xl font-bold text-slate-900">PBQ 2 of 2: Incident Response Workflow</h1>
                <p className="text-sm text-slate-600">Security Operations</p>
              </div>
            </div>
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Exit
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Scenario Card */}
        <Card className="mb-6 border-2 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-red-50 to-white">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <CardTitle>Scenario</CardTitle>
            </div>
            <CardDescription>Ransomware incident - respond according to NIST guidelines</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="prose prose-sm max-w-none">
              <p className="whitespace-pre-line text-slate-700">{incidentResponseScenario?.scenario}</p>
            </div>
            <Alert className="mt-4 border-red-200 bg-red-50">
              <AlertDescription className="text-sm">
                <strong>Instructions:</strong> {incidentResponseScenario?.instructions}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* NIST Phases Reference */}
        <Card className="mb-6 border-2 shadow-sm">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-3 text-slate-900">NIST Incident Response Lifecycle (Reference):</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm font-medium">1. Preparation</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded text-sm font-medium">2. Detection & Analysis</span>
              <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded text-sm font-medium">3. Containment</span>
              <span className="px-3 py-1 bg-red-100 text-red-800 rounded text-sm font-medium">4. Eradication</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm font-medium">5. Recovery</span>
              <span className="px-3 py-1 bg-slate-100 text-slate-800 rounded text-sm font-medium">6. Post-Incident Activity</span>
            </div>
          </CardContent>
        </Card>

        {/* Drag and Drop Area */}
        <Card className="mb-6 shadow-lg">
          <CardHeader>
            <CardTitle>Arrange Incident Response Steps</CardTitle>
            <CardDescription>Drag steps to the answer area and arrange them in the correct sequence</CardDescription>
          </CardHeader>
          <CardContent>
            <DragDropArea
              availableItems={incidentResponseSteps ?? []}
              onOrderChange={setUserOrder}
              renderItem={renderIncidentStep}
              disabled={submitted}
            />
          </CardContent>
        </Card>

        {/* Submit Button */}
        {!submitted && (
          <div className="flex justify-center mb-6">
            <Button
              onClick={handleSubmit}
              size="lg"
              className="bg-red-600 hover:bg-red-700 px-8"
              disabled={userOrder?.length !== incidentResponseSteps?.length}
            >
              <Send className="h-5 w-5 mr-2" />
              Submit Answer
            </Button>
          </div>
        )}

        {/* Results Section */}
        {submitted && (
          <div id="results" className="space-y-6">
            {/* Score Card */}
            <Card className={`border-2 shadow-lg ${
              isCorrect ? 'border-green-500 bg-green-50' : 'border-amber-500 bg-amber-50'
            }`}>
              <CardContent className="pt-6">
                <div className="text-center">
                  {isCorrect ? (
                    <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  ) : (
                    <XCircle className="h-16 w-16 text-amber-600 mx-auto mb-4" />
                  )}
                  <h2 className="text-3xl font-bold mb-2">
                    Score: {score}%
                  </h2>
                  <p className="text-lg text-slate-700">
                    {isCorrect
                      ? 'Excellent! All incident response steps are in the correct order.'
                      : 'Some steps are out of order. Review the explanation below.'}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Correct Answer */}
            <Card className="border-2 shadow-lg">
              <CardHeader className="bg-slate-50">
                <CardTitle>Correct Answer</CardTitle>
                <CardDescription>The proper incident response sequence</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {correctIncidentResponseOrder?.map((stepId, index) => {
                    const step = incidentResponseSteps?.find(s => s?.id === stepId)
                    const userPosition = userOrder?.indexOf(stepId ?? '') ?? -1
                    const isCorrectPosition = userPosition === index
                    
                    return (
                      <div
                        key={stepId}
                        className={`border-2 rounded-lg p-3 ${
                          isCorrectPosition
                            ? 'border-green-500 bg-green-50'
                            : 'border-red-300 bg-red-50'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="w-8 h-8 flex items-center justify-center bg-slate-800 text-white font-bold rounded flex-shrink-0">
                            {index + 1}
                          </span>
                          <div className="flex-1">
                            {step && renderIncidentStep(step)}
                            {!isCorrectPosition && userPosition >= 0 && (
                              <div className="mt-2 text-xs text-red-700">
                                You placed this at position {userPosition + 1}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Explanation */}
            <Card className="border-2 shadow-lg">
              <CardHeader className="bg-red-50">
                <CardTitle>Detailed Explanation</CardTitle>
                <CardDescription>Understanding the NIST incident response process</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-slate-900">Step-by-Step Rationale:</h3>
                  <ul className="space-y-2">
                    {incidentResponseExplanation?.reasoning?.map((reason, index) => (
                      <li key={index} className="flex items-start gap-2 text-slate-700">
                        <span className="text-red-600 font-bold flex-shrink-0">{index + 1}.</span>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-slate-900">NIST SP 800-61 Phases:</h3>
                  <ul className="space-y-2">
                    {incidentResponseExplanation?.nistPhases?.map((phase, index) => (
                      <li key={index} className="flex items-start gap-2 text-slate-700">
                        <span className="text-red-600">•</span>
                        <span>{phase}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleReset} variant="outline" size="lg" className="px-8">
                Try Again
              </Button>
              <Link href="/">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 w-full sm:w-auto">
                  Return to Home
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
