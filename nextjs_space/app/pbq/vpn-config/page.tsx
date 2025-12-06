'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Network, Shield, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  vpnConfigScenario, 
  vpnConfigOptions, 
  correctVPNConfig,
  vpnConfigExplanation,
  VPNConfig
} from '@/lib/pbq-data';

export default function VPNConfigPBQ() {
  const [config, setConfig] = useState<VPNConfig>({
    encryption: '',
    hashing: '',
    dhGroup: '',
    protocol: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSubmit = () => {
    // Calculate score
    let correctCount = 0;
    if (config.encryption === correctVPNConfig.encryption) correctCount++;
    if (config.hashing === correctVPNConfig.hashing) correctCount++;
    if (config.dhGroup === correctVPNConfig.dhGroup) correctCount++;
    if (config.protocol === correctVPNConfig.protocol) correctCount++;
    
    const finalScore = (correctCount / 4) * 100;
    setScore(finalScore);
    setSubmitted(true);
    setShowExplanation(true);

    // Save to database
    fetch('/api/pbq/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pbqType: 'vpn-config',
        userAnswer: config,
        score: finalScore
      })
    }).catch(err => console.error('Failed to save attempt:', err));
  };

  const handleReset = () => {
    setConfig({
      encryption: '',
      hashing: '',
      dhGroup: '',
      protocol: ''
    });
    setSubmitted(false);
    setScore(null);
    setShowExplanation(false);
  };

  const isConfigComplete = config.encryption && config.hashing && config.dhGroup && config.protocol;
  const isCorrect = score === 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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
            <div className="p-3 bg-blue-600 rounded-lg">
              <Network className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {vpnConfigScenario.title}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">PBQ #3 - IPsec VPN Security Configuration</p>
            </div>
          </div>
        </div>

        {/* Scenario Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              Scenario
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-line text-gray-700 dark:text-gray-300">
              {vpnConfigScenario.scenario}
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {vpnConfigScenario.instructions}
          </AlertDescription>
        </Alert>

        {/* VPN Configuration Interface */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>VPN Tunnel Configuration</CardTitle>
            <CardDescription>
              Configure Phase 1 (IKE) and Phase 2 (IPsec) parameters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* HQ and Branch Gateways */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border-2 border-blue-200 dark:border-blue-800">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">HQ Gateway</h3>
                <div className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
                  <p>Public IP: 198.51.100.10</p>
                  <p>Internal Network: 10.10.0.0/16</p>
                </div>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg border-2 border-purple-200 dark:border-purple-800">
                <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Branch Gateway</h3>
                <div className="space-y-1 text-sm text-purple-800 dark:text-purple-200">
                  <p>Public IP: 203.0.113.50</p>
                  <p>Internal Network: 10.20.0.0/16</p>
                </div>
              </div>
            </div>

            {/* Configuration Parameters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Encryption */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Encryption Algorithm *
                </label>
                <Select 
                  value={config.encryption || undefined} 
                  onValueChange={(value) => setConfig({...config, encryption: value})}
                  disabled={submitted}
                >
                  <SelectTrigger className={submitted && config.encryption !== correctVPNConfig.encryption ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select encryption..." />
                  </SelectTrigger>
                  <SelectContent>
                    {vpnConfigOptions.encryption.map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {submitted && config.encryption !== correctVPNConfig.encryption && (
                  <p className="text-xs text-red-600 dark:text-red-400">Incorrect - see explanation below</p>
                )}
                {submitted && config.encryption === correctVPNConfig.encryption && (
                  <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Correct
                  </p>
                )}
              </div>

              {/* Hashing */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Hashing Algorithm *
                </label>
                <Select 
                  value={config.hashing || undefined} 
                  onValueChange={(value) => setConfig({...config, hashing: value})}
                  disabled={submitted}
                >
                  <SelectTrigger className={submitted && config.hashing !== correctVPNConfig.hashing ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select hashing..." />
                  </SelectTrigger>
                  <SelectContent>
                    {vpnConfigOptions.hashing.map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {submitted && config.hashing !== correctVPNConfig.hashing && (
                  <p className="text-xs text-red-600 dark:text-red-400">Incorrect - see explanation below</p>
                )}
                {submitted && config.hashing === correctVPNConfig.hashing && (
                  <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Correct
                  </p>
                )}
              </div>

              {/* DH Group */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Diffie-Hellman Group *
                </label>
                <Select 
                  value={config.dhGroup || undefined} 
                  onValueChange={(value) => setConfig({...config, dhGroup: value})}
                  disabled={submitted}
                >
                  <SelectTrigger className={submitted && config.dhGroup !== correctVPNConfig.dhGroup ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select DH group..." />
                  </SelectTrigger>
                  <SelectContent>
                    {vpnConfigOptions.dhGroup.map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {submitted && config.dhGroup !== correctVPNConfig.dhGroup && (
                  <p className="text-xs text-red-600 dark:text-red-400">Incorrect - see explanation below</p>
                )}
                {submitted && config.dhGroup === correctVPNConfig.dhGroup && (
                  <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Correct
                  </p>
                )}
              </div>

              {/* Protocol */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  IPsec Protocol *
                </label>
                <Select 
                  value={config.protocol || undefined} 
                  onValueChange={(value) => setConfig({...config, protocol: value})}
                  disabled={submitted}
                >
                  <SelectTrigger className={submitted && config.protocol !== correctVPNConfig.protocol ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select protocol..." />
                  </SelectTrigger>
                  <SelectContent>
                    {vpnConfigOptions.protocol.map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {submitted && config.protocol !== correctVPNConfig.protocol && (
                  <p className="text-xs text-red-600 dark:text-red-400">Incorrect - see explanation below</p>
                )}
                {submitted && config.protocol === correctVPNConfig.protocol && (
                  <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Correct
                  </p>
                )}
              </div>
            </div>

            {/* Connection Status */}
            {submitted && (
              <div className={`mt-6 p-4 rounded-lg border-2 ${
                isCorrect 
                  ? 'bg-green-50 border-green-500 dark:bg-green-950 dark:border-green-500' 
                  : 'bg-red-50 border-red-500 dark:bg-red-950 dark:border-red-500'
              }`}>
                <div className="flex items-center gap-3">
                  {isCorrect ? (
                    <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                  )}
                  <div>
                    <h4 className={`font-semibold ${
                      isCorrect 
                        ? 'text-green-900 dark:text-green-100' 
                        : 'text-red-900 dark:text-red-100'
                    }`}>
                      {isCorrect ? '✓ Tunnel Established Successfully' : '✗ Insecure Proposal Rejected'}
                    </h4>
                    <p className={`text-sm ${
                      isCorrect 
                        ? 'text-green-700 dark:text-green-300' 
                        : 'text-red-700 dark:text-red-300'
                    }`}>
                      {isCorrect 
                        ? 'The VPN tunnel is operational with secure cryptographic parameters.' 
                        : 'The VPN concentrator rejected the proposal due to insecure cryptographic choices. Review the requirements and try again.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              {!submitted ? (
                <Button 
                  onClick={handleSubmit} 
                  disabled={!isConfigComplete}
                  className="flex-1"
                  size="lg"
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Establish VPN Tunnel
                </Button>
              ) : (
                <Button onClick={handleReset} variant="outline" className="flex-1" size="lg">
                  Reset Configuration
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results and Explanation */}
        {submitted && showExplanation && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Configuration Review</span>
                <span className={`text-2xl font-bold ${
                  isCorrect ? 'text-green-600' : 'text-red-600'
                }`}>
                  Score: {score}%
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Correct Configuration */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white">
                  Correct Configuration:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Encryption</p>
                    <p className="font-semibold text-green-700 dark:text-green-300">{correctVPNConfig.encryption}</p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Hashing</p>
                    <p className="font-semibold text-green-700 dark:text-green-300">{correctVPNConfig.hashing}</p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">DH Group</p>
                    <p className="font-semibold text-green-700 dark:text-green-300">{correctVPNConfig.dhGroup}</p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Protocol</p>
                    <p className="font-semibold text-green-700 dark:text-green-300">{correctVPNConfig.protocol}</p>
                  </div>
                </div>
              </div>

              {/* Detailed Explanations */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white">
                  Why These Choices?
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Encryption:</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{vpnConfigExplanation.reasoning.encryption}</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Hashing:</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{vpnConfigExplanation.reasoning.hashing}</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">DH Group:</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{vpnConfigExplanation.reasoning.dhGroup}</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Protocol:</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{vpnConfigExplanation.reasoning.protocol}</p>
                  </div>
                </div>
              </div>

              {/* Security Principles */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white">
                  Key Security Principles:
                </h3>
                <ul className="space-y-2">
                  {vpnConfigExplanation.securityPrinciples.map((principle, index) => (
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
    </div>
  );
}
