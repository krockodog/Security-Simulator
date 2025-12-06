'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, Server, Shield, CheckCircle2, XCircle, AlertCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  threatAnalysisScenario,
  attackScenarios,
  attackOptions,
  remediationOptions,
  attackRemediationMap,
  serverLogs,
  threatAnalysisExplanation
} from '@/lib/pbq-data';

interface AttackAnswer {
  attackType: string;
  remediation: string;
}

interface ServerStatus {
  [key: string]: string;
}

export default function ThreatAnalysisPBQ() {
  const [attackAnswers, setAttackAnswers] = useState<{ [key: string]: Partial<AttackAnswer> }>({
    attack1: {},
    attack2: {},
    attack3: {},
    attack4: {},
    attack5: {}
  });
  const [serverStatus, setServerStatus] = useState<Partial<ServerStatus>>({});
  const [selectedServer, setSelectedServer] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAttackTypeChange = (attackId: string, attackType: string) => {
    setAttackAnswers(prev => ({
      ...prev,
      [attackId]: { ...prev[attackId], attackType }
    }));
  };

  const handleRemediationChange = (attackId: string, remediation: string) => {
    setAttackAnswers(prev => ({
      ...prev,
      [attackId]: { ...prev[attackId], remediation }
    }));
  };

  const handleServerStatusChange = (serverId: string, status: string) => {
    setServerStatus(prev => ({ ...prev, [serverId]: status }));
  };

  const handleSubmit = () => {
    // Calculate score for attack matching
    let attackScore = 0;
    attackScenarios.forEach((attack) => {
      const userAnswer = attackAnswers[attack.id];
      if (userAnswer.attackType === attack.correctAnswer) {
        attackScore += 0.5; // 0.5 points for correct attack type
      }
      if (userAnswer.remediation === attackRemediationMap[attack.correctAnswer]) {
        attackScore += 0.5; // 0.5 points for correct remediation
      }
    });

    // Calculate score for server status
    let serverScore = 0;
    serverLogs.forEach((server) => {
      if (serverStatus[server.serverId] === server.correctStatus) {
        serverScore += 1;
      }
    });

    const totalScore = ((attackScore + serverScore) / 8) * 100;
    setScore(totalScore);
    setSubmitted(true);
    setShowExplanation(true);

    // Save to database
    fetch('/api/pbq/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pbqType: 'threat-analysis',
        userAnswer: { attackAnswers, serverStatus },
        score: totalScore
      })
    }).catch(err => console.error('Failed to save attempt:', err));
  };

  const handleReset = () => {
    setAttackAnswers({
      attack1: {},
      attack2: {},
      attack3: {},
      attack4: {},
      attack5: {}
    });
    setServerStatus({});
    setSubmitted(false);
    setScore(null);
    setShowExplanation(false);
  };

  const isComplete = 
    Object.values(attackAnswers).every(a => a.attackType && a.remediation) &&
    Object.values(serverStatus).every(s => s);

  const getServerLog = (serverId: string) => {
    return serverLogs.find(s => s.serverId === serverId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-red-600 rounded-lg">
              <Search className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {threatAnalysisScenario.title}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">PBQ #4 - Attack Identification & Forensic Analysis</p>
            </div>
          </div>
        </div>

        {/* Scenario Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-red-600" />
              Scenario
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-line text-gray-700 dark:text-gray-300">
              {threatAnalysisScenario.scenario}
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {threatAnalysisScenario.instructions}
          </AlertDescription>
        </Alert>

        {/* Part 1: Attack Identification */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Part 1: Attack Identification & Remediation</CardTitle>
            <CardDescription>
              Match each attack scenario to the correct attack type and recommended remediation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {attackScenarios.map((attack, index) => {
              const userAnswer = attackAnswers[attack.id];
              const isAttackCorrect = submitted && userAnswer.attackType === attack.correctAnswer;
              const isRemediationCorrect = submitted && userAnswer.remediation === attackRemediationMap[attack.correctAnswer];
              
              return (
                <div key={attack.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-4">
                  <div className="flex items-start gap-3">
                    <Badge className="mt-1">{index + 1}</Badge>
                    <p className="flex-1 text-sm text-gray-700 dark:text-gray-300">{attack.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-9">
                    {/* Attack Type */}
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        Attack Type *
                      </label>
                      <Select
                        value={userAnswer.attackType}
                        onValueChange={(value) => handleAttackTypeChange(attack.id, value)}
                        disabled={submitted}
                      >
                        <SelectTrigger className={submitted && !isAttackCorrect ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Select attack type..." />
                        </SelectTrigger>
                        <SelectContent>
                          {attackOptions.map((option) => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {submitted && (
                        isAttackCorrect ? (
                          <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" /> Correct
                          </p>
                        ) : (
                          <p className="text-xs text-red-600 dark:text-red-400">Incorrect</p>
                        )
                      )}
                    </div>

                    {/* Remediation */}
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        Best Remediation *
                      </label>
                      <Select
                        value={userAnswer.remediation}
                        onValueChange={(value) => handleRemediationChange(attack.id, value)}
                        disabled={submitted}
                      >
                        <SelectTrigger className={submitted && !isRemediationCorrect ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Select remediation..." />
                        </SelectTrigger>
                        <SelectContent>
                          {remediationOptions.map((option) => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {submitted && (
                        isRemediationCorrect ? (
                          <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" /> Correct
                          </p>
                        ) : (
                          <p className="text-xs text-red-600 dark:text-red-400">Incorrect</p>
                        )
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Part 2: Log Analysis */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Part 2: Patient Zero Analysis - Server Log Review</CardTitle>
            <CardDescription>
              Click each server to review its antivirus logs, then classify its infection status
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Server Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {serverLogs.map((server) => {
                const status = serverStatus[server.serverId];
                const isCorrect = submitted && status === server.correctStatus;
                const isIncorrect = submitted && status !== server.correctStatus;
                
                return (
                  <div key={server.serverId} className="space-y-3">
                    {/* Server Button */}
                    <Button
                      variant="outline"
                      className={`w-full h-24 flex flex-col items-center justify-center gap-2 ${
                        isCorrect ? 'border-green-500 bg-green-50 dark:bg-green-950' :
                        isIncorrect ? 'border-red-500 bg-red-50 dark:bg-red-950' : ''
                      }`}
                      onClick={() => setSelectedServer(server.serverId)}
                    >
                      <Server className="h-8 w-8" />
                      <div className="text-center">
                        <p className="text-xs font-medium">Server {server.serverId.slice(-1)}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{server.serverIp}</p>
                      </div>
                    </Button>

                    {/* Status Selection */}
                    <Select
                      value={status}
                      onValueChange={(value) => handleServerStatusChange(server.serverId, value)}
                      disabled={submitted}
                    >
                      <SelectTrigger className={isIncorrect ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select status..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Clean">Clean</SelectItem>
                        <SelectItem value="Infected">Infected</SelectItem>
                        <SelectItem value="Origin">Origin (Patient Zero)</SelectItem>
                      </SelectContent>
                    </Select>
                    {submitted && (
                      isCorrect ? (
                        <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" /> Correct: {server.correctStatus}
                        </p>
                      ) : (
                        <p className="text-xs text-red-600 dark:text-red-400">
                          Incorrect - Should be: {server.correctStatus}
                        </p>
                      )
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-6">
          {!submitted ? (
            <Button 
              onClick={handleSubmit} 
              disabled={!isComplete}
              className="flex-1"
              size="lg"
            >
              <FileText className="mr-2 h-4 w-4" />
              Submit Analysis
            </Button>
          ) : (
            <Button onClick={handleReset} variant="outline" className="flex-1" size="lg">
              Reset Analysis
            </Button>
          )}
        </div>

        {/* Results and Explanation */}
        {submitted && showExplanation && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Analysis Review</span>
                <span className={`text-2xl font-bold ${
                  score && score >= 80 ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  Score: {score}%
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Part 1 Explanation */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white">
                  Part 1: Attack Type Explanations
                </h3>
                <div className="space-y-4">
                  {attackScenarios.map((attack) => {
                    const explanation = threatAnalysisExplanation.attackExplanations[attack.correctAnswer as keyof typeof threatAnalysisExplanation.attackExplanations];
                    return (
                      <div key={attack.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">
                          {attack.correctAnswer}
                        </h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                          <strong>Attack:</strong> {explanation.reasoning}
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          <strong>Remediation:</strong> {explanation.remediation}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Part 2 Explanation */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white">
                  Part 2: Server Analysis Explanations
                </h3>
                <div className="space-y-4">
                  {serverLogs.map((server) => {
                    const explanation = threatAnalysisExplanation.serverAnalysis[server.serverIp as keyof typeof threatAnalysisExplanation.serverAnalysis];
                    return (
                      <div key={server.serverId} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">
                          Server {server.serverId.slice(-1)} ({server.serverIp}) - {explanation.status}
                        </h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                          {explanation.reasoning}
                        </p>
                        <div className="mt-2">
                          <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Critical Indicators:</p>
                          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                            {explanation.criticalIndicators.map((indicator: string, idx: number) => (
                              <li key={idx} className="flex items-start gap-1">
                                <span className="text-red-500">•</span>
                                <span>{indicator}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Forensic Principles */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white">
                  Forensic Analysis Principles:
                </h3>
                <ul className="space-y-2">
                  {threatAnalysisExplanation.forensicPrinciples.map((principle, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{principle}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Server Log Dialog */}
      <Dialog open={selectedServer !== null} onOpenChange={(open) => !open && setSelectedServer(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              Server {selectedServer?.slice(-1)} - Antivirus Logs
            </DialogTitle>
            <DialogDescription>
              {getServerLog(selectedServer || '')?.serverIp}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-96 w-full rounded-md border p-4">
            <div className="space-y-2">
              {getServerLog(selectedServer || '')?.logs.map((log, index) => (
                <div 
                  key={index} 
                  className={`p-2 rounded text-xs font-mono ${
                    log.type === 'Error' ? 'bg-red-50 dark:bg-red-950' :
                    log.type === 'Warn' ? 'bg-yellow-50 dark:bg-yellow-950' :
                    'bg-gray-50 dark:bg-gray-800'
                  }`}
                >
                  <div className="flex gap-3">
                    <span className="text-gray-500 dark:text-gray-400 whitespace-nowrap">{log.timestamp}</span>
                    <Badge 
                      variant={log.type === 'Error' ? 'destructive' : log.type === 'Warn' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {log.type}
                    </Badge>
                    <span className="flex-1 text-gray-700 dark:text-gray-300">{log.message}</span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
