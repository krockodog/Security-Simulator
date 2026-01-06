'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Shield, CheckCircle2, XCircle, AlertTriangle, Info, Clock, FileKey } from 'lucide-react'
import Link from 'next/link'
import {
  certificateManagementScenario,
  certificates,
  certificateIssues,
  certificateActions,
  certificateExplanation,
  type Certificate,
  type CertificateIssue
} from '@/lib/pbq-data'

export default function CertificateManagementPBQ() {
  const [userActions, setUserActions] = useState<{ [key: string]: string }>({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  const handleActionChange = (issueId: string, action: string) => {
    setUserActions(prev => ({ ...prev, [issueId]: action }))
  }

  const handleSubmit = () => {
    let correctCount = 0
    certificateIssues.forEach(issue => {
      if (userActions[issue.id] === issue.correctAction) {
        correctCount++
      }
    })
    const scorePercentage = Math.round((correctCount / certificateIssues.length) * 100)
    setScore(scorePercentage)
    setShowResults(true)
  }

  const handleReset = () => {
    setUserActions({})
    setShowResults(false)
    setScore(0)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Valid': return 'bg-green-100 text-green-700 border-green-300'
      case 'Expired': return 'bg-red-100 text-red-700 border-red-300'
      case 'Revoked': return 'bg-orange-100 text-orange-700 border-orange-300'
      case 'Self-Signed': return 'bg-yellow-100 text-yellow-700 border-yellow-300'
      default: return 'bg-gray-100 text-gray-700 border-gray-300'
    }
  }

  const isExpiringSoon = (validTo: string) => {
    const expiryDate = new Date(validTo)
    const today = new Date()
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    return daysUntilExpiry < 90 && daysUntilExpiry > 0
  }

  const getDaysUntilExpiry = (validTo: string) => {
    const expiryDate = new Date(validTo)
    const today = new Date()
    return Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  }

  return (
    <div className="min-h-screen bg-black cyber-grid">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="mb-4">
              ← Back to Home
            </Button>
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">{certificateManagementScenario.title}</h1>
              <p className="text-slate-600">PBQ 6: PKI & Certificate Troubleshooting</p>
            </div>
          </div>
        </div>

        {/* Scenario Card */}
        <Card className="mb-8 border-2">
          <CardHeader className="bg-gradient-to-br from-blue-50 to-white">
            <CardTitle className="flex items-center gap-2">
              <FileKey className="h-5 w-5 text-blue-600" />
              Scenario
            </CardTitle>
            <CardDescription>PKI Infrastructure Management</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="prose prose-slate max-w-none">
              <p className="whitespace-pre-line text-slate-700 leading-relaxed">
                {certificateManagementScenario.scenario}
              </p>
              <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
                <p className="text-sm text-slate-700 font-medium">
                  <strong>Instructions:</strong> {certificateManagementScenario.instructions}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Certificate Issues */}
        <div className="space-y-6">
          {certificateIssues.map((issue, index) => {
            const cert = issue.certificate
            const isCorrect = showResults && userActions[issue.id] === issue.correctAction
            const isIncorrect = showResults && userActions[issue.id] && userActions[issue.id] !== issue.correctAction
            const issueKey = `issue${index + 1}` as keyof typeof certificateExplanation

            return (
              <Card
                key={issue.id}
                className={`border-2 transition-all ${
                  isCorrect
                    ? 'border-green-300 bg-green-50'
                    : isIncorrect
                    ? 'border-red-300 bg-red-50'
                    : 'border-slate-200'
                }`}
              >
                <CardHeader className="bg-gradient-to-br from-slate-50 to-white">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          Issue {index + 1}
                        </Badge>
                        {cert.commonName}
                      </CardTitle>
                      <CardDescription className="mt-2 text-base font-medium text-red-600">
                        {issue.issue}
                      </CardDescription>
                    </div>
                    {showResults && (
                      <div>
                        {isCorrect ? (
                          <CheckCircle2 className="h-8 w-8 text-green-600" />
                        ) : isIncorrect ? (
                          <XCircle className="h-8 w-8 text-red-600" />
                        ) : null}
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Certificate Details */}
                    <div className="space-y-4">
                      <div>
                        <Label className="text-xs text-slate-500">Certificate Status</Label>
                        <div className="mt-1">
                          <Badge className={`${getStatusColor(cert.status)} border`}>
                            {cert.status}
                          </Badge>
                        </div>
                      </div>

                      <div>
                        <Label className="text-xs text-slate-500">Common Name (CN)</Label>
                        <p className="text-sm font-medium text-slate-900">{cert.commonName}</p>
                      </div>

                      <div>
                        <Label className="text-xs text-slate-500">Issuer</Label>
                        <p className="text-sm text-slate-700">{cert.issuer}</p>
                      </div>

                      <div>
                        <Label className="text-xs text-slate-500">Purpose</Label>
                        <p className="text-sm text-slate-700">{cert.purpose}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-xs text-slate-500">Valid From</Label>
                          <p className="text-sm text-slate-700">{cert.validFrom}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-slate-500">Valid To</Label>
                          <div className="flex items-center gap-2">
                            <p className="text-sm text-slate-700">{cert.validTo}</p>
                            {isExpiringSoon(cert.validTo) && (
                              <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700 border-yellow-300">
                                <Clock className="h-3 w-3 mr-1" />
                                {getDaysUntilExpiry(cert.validTo)} days
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label className="text-xs text-slate-500">Key Usage</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {cert.keyUsage.map((usage, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {usage}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {cert.extendedKeyUsage && cert.extendedKeyUsage.length > 0 && (
                        <div>
                          <Label className="text-xs text-slate-500">Extended Key Usage</Label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {cert.extendedKeyUsage.map((usage, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs bg-blue-50">
                                {usage}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {cert.subjectAltNames && cert.subjectAltNames.length > 0 && (
                        <div>
                          <Label className="text-xs text-slate-500">Subject Alternative Names</Label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {cert.subjectAltNames.map((san, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {san}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Remediation Action Selection */}
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-semibold text-slate-900 mb-3 block">
                          Select Remediation Action:
                        </Label>
                        <Select
                          value={userActions[issue.id]}
                          onValueChange={(value) => handleActionChange(issue.id, value)}
                          disabled={showResults}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Choose the correct action..." />
                          </SelectTrigger>
                          <SelectContent>
                            {certificateActions.map((action, idx) => (
                              <SelectItem key={idx} value={action}>
                                {action}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Show explanation after submission */}
                      {showResults && certificateExplanation[issueKey] && typeof certificateExplanation[issueKey] === 'object' && 'problem' in certificateExplanation[issueKey] && (
                        <div className="space-y-3">
                          <Alert className={isCorrect ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'}>
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription className="text-sm">
                              <strong>Your Answer:</strong> {userActions[issue.id] || 'Not answered'}
                              <br />
                              <strong className="text-green-700">Correct Answer:</strong> {issue.correctAction}
                            </AlertDescription>
                          </Alert>

                          <Alert className="border-blue-300 bg-blue-50">
                            <Info className="h-4 w-4 text-blue-600" />
                            <AlertDescription className="text-sm space-y-2">
                              <div>
                                <strong>Problem:</strong>
                                <p className="mt-1 text-slate-700">
                                  {(certificateExplanation[issueKey] as any).problem}
                                </p>
                              </div>
                              <div>
                                <strong>Solution:</strong>
                                <p className="mt-1 text-slate-700">
                                  {(certificateExplanation[issueKey] as any).solution}
                                </p>
                              </div>
                              <div>
                                <strong>Best Practice:</strong>
                                <p className="mt-1 text-slate-700">
                                  {(certificateExplanation[issueKey] as any).bestPractice}
                                </p>
                              </div>
                            </AlertDescription>
                          </Alert>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          {!showResults ? (
            <Button
              onClick={handleSubmit}
              disabled={Object.keys(userActions).length !== certificateIssues.length}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-lg py-6"
              size="lg"
            >
              Submit Configuration
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
                Configuration Results
              </CardTitle>
              <CardDescription>
                Score: {score}% ({Object.keys(userActions).filter(key => userActions[key] === certificateIssues.find(i => i.id === key)?.correctAction).length}/{certificateIssues.length} correct)
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* PKI Concepts */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    Essential PKI Concepts
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {certificateExplanation.pkiConcepts.map((concept, index) => (
                      <div key={index} className="flex gap-3 items-start p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <CheckCircle2 className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-slate-700">{concept}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance Feedback */}
                <div className="p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
                  <h3 className="font-semibold text-slate-900 mb-2">Performance Feedback</h3>
                  <p className="text-sm text-slate-700">
                    {score >= 80
                      ? '🎉 Excellent work! You have a strong understanding of PKI certificate management and troubleshooting. You correctly identified the issues and selected appropriate remediation actions.'
                      : score >= 60
                      ? '👍 Good effort! You understand the basics of certificate management, but review the explanations for the questions you missed to strengthen your knowledge of PKI best practices.'
                      : '📚 Keep studying! Certificate management is a critical skill for security administrators. Review the explanations carefully and practice identifying common certificate issues and their solutions.'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
