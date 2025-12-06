'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Shield, Network, ArrowLeft, Send, CheckCircle2, XCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DragDropArea } from '@/components/pbq/drag-drop-area'
import { firewallScenario, firewallRules, correctFirewallOrder, firewallExplanation, type FirewallRule } from '@/lib/pbq-data'
import { Alert, AlertDescription } from '@/components/ui/alert'

// Shuffle function to randomize array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function FirewallPBQPage() {
  const router = useRouter()
  const [shuffledRules, setShuffledRules] = useState<FirewallRule[]>([])
  const [userOrder, setUserOrder] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [isCorrect, setIsCorrect] = useState(false)

  // Shuffle rules on component mount
  useEffect(() => {
    setShuffledRules(shuffleArray(firewallRules))
  }, [])

  const handleSubmit = async () => {
    if (userOrder?.length !== firewallRules?.length) {
      alert('Please place all firewall rules before submitting.')
      return
    }

    // Calculate score
    let correctCount = 0
    for (let i = 0; i < userOrder?.length; i++) {
      if (userOrder?.[i] === correctFirewallOrder?.[i]) {
        correctCount++
      }
    }
    const calculatedScore = Math.round((correctCount / (correctFirewallOrder?.length ?? 1)) * 100)
    setScore(calculatedScore)
    setIsCorrect(calculatedScore === 100)
    setSubmitted(true)

    // Save to database
    try {
      await fetch('/api/pbq/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pbqNumber: 1,
          pbqType: 'firewall',
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
    setShuffledRules(shuffleArray(firewallRules)) // Re-shuffle on reset
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderFirewallRule = (rule: FirewallRule) => (
    <div className="text-sm">
      <div className="font-medium text-slate-900 mb-1">{rule?.description}</div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-600">
        <div><span className="font-medium">Source:</span> {rule?.sourceIp}</div>
        <div><span className="font-medium">Dest:</span> {rule?.destinationIp}</div>
        <div><span className="font-medium">Port:</span> {rule?.port}</div>
        <div><span className="font-medium">Protocol:</span> {rule?.protocol}</div>
      </div>
      <div className="mt-1">
        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
          rule?.action === 'Allow' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {rule?.action}
        </span>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-slate-900">PBQ 1 of 2: Firewall Rules Configuration</h1>
                <p className="text-sm text-slate-600">Network Security</p>
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
          <CardHeader className="bg-gradient-to-r from-blue-50 to-white">
            <div className="flex items-center gap-2">
              <Network className="h-5 w-5 text-blue-600" />
              <CardTitle>Scenario</CardTitle>
            </div>
            <CardDescription>Read carefully and configure the firewall rules</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="prose prose-sm max-w-none">
              <p className="whitespace-pre-line text-slate-700">{firewallScenario?.scenario}</p>
            </div>
            <Alert className="mt-4 border-blue-200 bg-blue-50">
              <AlertDescription className="text-sm">
                <strong>Instructions:</strong> {firewallScenario?.instructions}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Drag and Drop Area */}
        <Card className="mb-6 shadow-lg">
          <CardHeader>
            <CardTitle>Configure Firewall Rules</CardTitle>
            <CardDescription>Drag rules to the answer area and arrange them in the correct order</CardDescription>
          </CardHeader>
          <CardContent>
            <DragDropArea
              availableItems={shuffledRules}
              onOrderChange={setUserOrder}
              renderItem={renderFirewallRule}
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
              className="bg-blue-600 hover:bg-blue-700 px-8"
              disabled={userOrder?.length !== firewallRules?.length}
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
                      ? 'Perfect! All firewall rules are in the correct order.'
                      : 'Some rules are out of order. Review the explanation below.'}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Correct Answer */}
            <Card className="border-2 shadow-lg">
              <CardHeader className="bg-slate-50">
                <CardTitle>Correct Answer</CardTitle>
                <CardDescription>The proper firewall rule ordering</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {correctFirewallOrder?.map((ruleId, index) => {
                    const rule = firewallRules?.find(r => r?.id === ruleId)
                    const userPosition = userOrder?.indexOf(ruleId ?? '') ?? -1
                    const isCorrectPosition = userPosition === index
                    
                    return (
                      <div
                        key={ruleId}
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
                            {rule && renderFirewallRule(rule)}
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
              <CardHeader className="bg-blue-50">
                <CardTitle>Detailed Explanation</CardTitle>
                <CardDescription>Understanding firewall rule ordering</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-slate-900">Rule Ordering Rationale:</h3>
                  <ul className="space-y-2">
                    {firewallExplanation?.reasoning?.map((reason, index) => (
                      <li key={index} className="flex items-start gap-2 text-slate-700">
                        <span className="text-blue-600 font-bold flex-shrink-0">{index + 1}.</span>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-slate-900">Key Principles:</h3>
                  <ul className="space-y-2">
                    {firewallExplanation?.keyPrinciples?.map((principle, index) => (
                      <li key={index} className="flex items-start gap-2 text-slate-700">
                        <span className="text-blue-600">•</span>
                        <span>{principle}</span>
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
              <Link href="/pbq/incident-response">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 w-full sm:w-auto">
                  Next: PBQ 2
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
