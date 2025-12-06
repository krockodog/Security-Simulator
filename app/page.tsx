'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Shield, Target, Network, AlertTriangle, Lock, Search, FileText, BookOpen, User, Edit2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

export default function HomePage() {
  const [userName, setUserName] = useState('')
  const [tempName, setTempName] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Load name from localStorage on mount
  useEffect(() => {
    const storedName = localStorage.getItem('examUserName')
    if (storedName) {
      setUserName(storedName)
      setTempName(storedName)
    } else {
      // Show dialog if no name is stored
      setIsDialogOpen(true)
    }
  }, [])

  const handleSaveName = () => {
    if (tempName.trim()) {
      localStorage.setItem('examUserName', tempName.trim())
      setUserName(tempName.trim())
      setIsDialogOpen(false)
    }
  }

  const handleEditName = () => {
    setTempName(userName)
    setIsDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">
      {/* Name Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Willkommen zur Security+ Prüfungsvorbereitung!</DialogTitle>
            <DialogDescription>
              Bitte gib deinen Namen ein, um die Plattform zu personalisieren.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Dein Name"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
              className="text-lg"
            />
          </div>
          <DialogFooter>
            <Button onClick={handleSaveName} disabled={!tempName.trim()}>
              Speichern
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 max-w-6xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-slate-900">CompTIA Security+ SY0-701</h1>
                <p className="text-sm text-slate-600">Exam Preparation Platform</p>
              </div>
            </div>
            {userName && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEditName}
                className="flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">{userName}</span>
                <Edit2 className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Target className="h-4 w-4" />
            Vollständige Prüfungsvorbereitung
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Security+ Prüfungsvorbereitung
          </h2>
          {userName && (
            <div className="mb-4">
              <p className="text-2xl md:text-3xl font-semibold text-blue-600 flex items-center justify-center gap-2">
                <User className="h-6 w-6 md:h-8 md:w-8" />
                Willkommen zurück, {userName}!
              </p>
            </div>
          )}
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Realistische PBQs, 60-Fragen Exam und Akronym-Quiz für die CompTIA Security+ SY0-701 Zertifizierung.
          </p>
        </div>

        {/* Exam Modes */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Full Exam */}
          <Card className="hover:shadow-xl transition-shadow border-2 border-blue-300 flex flex-col">
            <CardHeader className="bg-gradient-to-br from-blue-50 to-white pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-600 rounded-lg">
                  <FileText className="h-7 w-7 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">60-Fragen Exam</CardTitle>
                  <CardDescription className="text-base">Vollständige Prüfungssimulation</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 flex-1 flex flex-col">
              <p className="text-slate-600 mb-6 leading-relaxed">
                Komplette Prüfungssimulation mit 60 zufälligen Fragen aus allen Domains. 90 Minuten Zeit, 765+ Punkte zum Bestehen. Auswertung am Ende!
              </p>
              <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600 mb-6">
                <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-md font-medium">60 Fragen</span>
                <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-md font-medium">90 Minuten</span>
                <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-md font-medium">765+ zum Bestehen</span>
              </div>
              <Link href="/exam" className="mt-auto">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-6 rounded-lg shadow-md hover:shadow-lg transition-all">
                  Exam starten
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Acronym Quiz */}
          <Card className="hover:shadow-xl transition-shadow border-2 border-green-300 flex flex-col">
            <CardHeader className="bg-gradient-to-br from-green-50 to-white pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-600 rounded-lg">
                  <BookOpen className="h-7 w-7 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">Akronymen Quiz</CardTitle>
                  <CardDescription className="text-base">Lerne wichtige Begriffe</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 flex-1 flex flex-col">
              <p className="text-slate-600 mb-6 leading-relaxed">
                Teste dein Wissen über Security+ Akronyme! 40 Fragen mit sofortiger Rückmeldung und Erklärungen nach jeder Antwort.
              </p>
              <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600 mb-6">
                <span className="px-3 py-1.5 bg-green-50 text-green-700 rounded-md font-medium">40 Akronyme</span>
                <span className="px-3 py-1.5 bg-green-50 text-green-700 rounded-md font-medium">Sofortiges Feedback</span>
                <span className="px-3 py-1.5 bg-green-50 text-green-700 rounded-md font-medium">Mit Erklärungen</span>
              </div>
              <Link href="/acronym-quiz" className="mt-auto">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-lg font-semibold py-6 rounded-lg shadow-md hover:shadow-lg transition-all">
                  Quiz starten
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* PBQ Section Header */}
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-slate-900 mb-2">Performance-Based Questions (PBQs)</h3>
          <p className="text-lg text-slate-600">Interaktive Szenarien mit Drag-and-Drop Funktionalität</p>
        </div>

        {/* Instructions Card */}
        <Card className="mb-8 border-2 shadow-lg">
          <CardHeader className="bg-slate-50">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              PBQ Instructions
            </CardTitle>
            <CardDescription>Lese die Anweisungen vor dem Start</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Format</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>6 Performance-Based Questions (PBQs)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Interaktive Oberflächen wie im echten Exam</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Sofortiges Feedback mit Erklärungen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Beliebig oft wiederholen</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Anleitung</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Lese das Szenario sorgfältig</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Folge den spezifischen Anweisungen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Fülle alle Felder aus vor dem Absenden</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Absenden um Score und Erklärung zu sehen</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* PBQ Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* PBQ 1: Firewall Rules */}
          <Card className="hover:shadow-xl transition-shadow border-2 flex flex-col h-full">
            <CardHeader className="bg-gradient-to-br from-blue-50 to-white">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Network className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle>PBQ 1: Firewall Rules</CardTitle>
                  <CardDescription>Network Security</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 flex-1 flex flex-col">
              <p className="text-slate-600 mb-4">
                Configure firewall rules for a corporate network with DMZ. Apply proper rule ordering, implement security best practices, and follow the principle of least privilege.
              </p>
              <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500 mb-4">
                <span className="px-2 py-1 bg-slate-100 rounded">ACLs</span>
                <span className="px-2 py-1 bg-slate-100 rounded">Network Segmentation</span>
                <span className="px-2 py-1 bg-slate-100 rounded">Implicit Deny</span>
              </div>
              <Link href="/pbq/firewall" className="mt-auto">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all">
                  Start PBQ 1
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* PBQ 2: Incident Response */}
          <Card className="hover:shadow-xl transition-shadow border-2 flex flex-col h-full">
            <CardHeader className="bg-gradient-to-br from-red-50 to-white">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-red-600 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle>PBQ 2: Incident Response</CardTitle>
                  <CardDescription>Security Operations</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 flex-1 flex flex-col">
              <p className="text-slate-600 mb-4">
                Respond to a ransomware incident following the NIST incident response lifecycle. Properly sequence steps from detection through post-incident activities.
              </p>
              <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500 mb-4">
                <span className="px-2 py-1 bg-slate-100 rounded">NIST IR</span>
                <span className="px-2 py-1 bg-slate-100 rounded">Containment</span>
                <span className="px-2 py-1 bg-slate-100 rounded">Forensics</span>
              </div>
              <Link href="/pbq/incident-response" className="mt-auto">
                <Button className="w-full bg-red-600 hover:bg-red-700 shadow-md hover:shadow-lg transition-all">
                  Start PBQ 2
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* PBQ 3: VPN Configuration */}
          <Card className="hover:shadow-xl transition-shadow border-2 flex flex-col h-full">
            <CardHeader className="bg-gradient-to-br from-indigo-50 to-white">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-indigo-600 rounded-lg">
                  <Lock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle>PBQ 3: VPN Configuration</CardTitle>
                  <CardDescription>Cryptography & VPN</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 flex-1 flex flex-col">
              <p className="text-slate-600 mb-4">
                Configure a secure Site-to-Site IPsec VPN tunnel. Select appropriate encryption, hashing, DH group, and protocol to meet current security standards.
              </p>
              <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500 mb-4">
                <span className="px-2 py-1 bg-slate-100 rounded">IPsec</span>
                <span className="px-2 py-1 bg-slate-100 rounded">Encryption</span>
                <span className="px-2 py-1 bg-slate-100 rounded">VPN</span>
              </div>
              <Link href="/pbq/vpn-config" className="mt-auto">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all">
                  Start PBQ 3
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* PBQ 4: Threat Analysis */}
          <Card className="hover:shadow-xl transition-shadow border-2 flex flex-col h-full">
            <CardHeader className="bg-gradient-to-br from-orange-50 to-white">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-orange-600 rounded-lg">
                  <Search className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle>PBQ 4: Threat Analysis</CardTitle>
                  <CardDescription>Threat Intelligence & Forensics</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 flex-1 flex flex-col">
              <p className="text-slate-600 mb-4">
                Identify attack types and match them with appropriate remediation. Analyze server logs to determine Patient Zero in a malware outbreak scenario.
              </p>
              <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500 mb-4">
                <span className="px-2 py-1 bg-slate-100 rounded">Log Analysis</span>
                <span className="px-2 py-1 bg-slate-100 rounded">Attack Types</span>
                <span className="px-2 py-1 bg-slate-100 rounded">Forensics</span>
              </div>
              <Link href="/pbq/threat-analysis" className="mt-auto">
                <Button className="w-full bg-orange-600 hover:bg-orange-700 shadow-md hover:shadow-lg transition-all">
                  Start PBQ 4
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* PBQ 5: System Log Analysis */}
          <Card className="hover:shadow-xl transition-shadow border-2 flex flex-col h-full">
            <CardHeader className="bg-gradient-to-br from-purple-50 to-white">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-600 rounded-lg">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle>PBQ 5: Log Analysis</CardTitle>
                  <CardDescription>Digital Forensics & APT Detection</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 flex-1 flex flex-col">
              <p className="text-slate-600 mb-4">
                Investigate a sophisticated APT attack by analyzing system, security, and firewall logs. Identify Patient Zero, attack vectors, and compromised accounts.
              </p>
              <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500 mb-4">
                <span className="px-2 py-1 bg-slate-100 rounded">System Logs</span>
                <span className="px-2 py-1 bg-slate-100 rounded">APT Analysis</span>
                <span className="px-2 py-1 bg-slate-100 rounded">Kill Chain</span>
              </div>
              <Link href="/pbq/log-analysis" className="mt-auto">
                <Button className="w-full bg-purple-600 hover:bg-purple-700 shadow-md hover:shadow-lg transition-all">
                  Start PBQ 5
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* PBQ 6: Certificate Management */}
          <Card className="hover:shadow-xl transition-shadow border-2 flex flex-col h-full">
            <CardHeader className="bg-gradient-to-br from-teal-50 to-white">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-teal-600 rounded-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle>PBQ 6: Certificate Mgmt</CardTitle>
                  <CardDescription>PKI & Certificate Lifecycle</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 flex-1 flex flex-col">
              <p className="text-slate-600 mb-4">
                Troubleshoot certificate issues across the enterprise. Identify expired, revoked, and misconfigured certificates and implement proper remediation actions.
              </p>
              <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500 mb-4">
                <span className="px-2 py-1 bg-slate-100 rounded">PKI</span>
                <span className="px-2 py-1 bg-slate-100 rounded">Certificate Lifecycle</span>
                <span className="px-2 py-1 bg-slate-100 rounded">Troubleshooting</span>
              </div>
              <Link href="/pbq/certificate-mgmt" className="mt-auto">
                <Button className="w-full bg-teal-600 hover:bg-teal-700 shadow-md hover:shadow-lg transition-all">
                  Start PBQ 6
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Info Section */}
        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
          <CardContent className="pt-6">
            <div className="text-center">
              <Shield className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Vollständige Prüfungsvorbereitung</h3>
              <p className="text-slate-300 max-w-2xl mx-auto">
                Bereite dich optimal auf die CompTIA Security+ SY0-701 Zertifizierung vor: Mit 6 realistischen PBQs, einem 60-Fragen Exam und Akronym-Quiz. Übe so oft du willst und baue Selbstvertrauen auf!
              </p>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white mt-12">
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          <p className="text-center text-sm text-slate-600">
            CompTIA Security+ SY0-701 Exam Preparation • 6 PBQs • 60-Fragen Exam • Akronym-Quiz
          </p>
        </div>
      </footer>
    </div>
  )
}
