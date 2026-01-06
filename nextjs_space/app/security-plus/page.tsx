'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Shield, Terminal, BookCheck, ArrowLeft } from 'lucide-react'

export default function SecurityPlusPage() {
  const [userName, setUserName] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [tempName, setTempName] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem('userName')
    if (stored) {
      setUserName(stored)
    } else {
      setIsDialogOpen(true)
    }
  }, [])

  const handleSaveName = () => {
    if (tempName.trim()) {
      localStorage.setItem('userName', tempName.trim())
      setUserName(tempName.trim())
      setIsDialogOpen(false)
    }
  }

  const handleEditName = () => {
    setTempName(userName)
    setIsDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Zurück zur Kursauswahl
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-xl">
              <Shield className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 mb-4">
            CompTIA Security+ SY0-701
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Interaktive Performance-Based Questions und Prüfungssimulator
          </p>
          
          {userName && (
            <div className="mt-6 inline-flex items-center gap-3">
              <p className="text-lg text-gray-700">
                Willkommen, <span className="font-semibold text-blue-600">{userName}</span>
              </p>
              <Button variant="outline" size="sm" onClick={handleEditName}>
                Name ändern
              </Button>
            </div>
          )}
        </div>

        {/* Name Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Wie heißt du?</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Dein Name</Label>
                <Input
                  id="name"
                  placeholder="z.B. Max Mustermann"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSaveName} disabled={!tempName.trim()}>
                Speichern
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Main Actions */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Link href="/exam">
            <Card className="h-full hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-700" />
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <BookCheck className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl">Examen</CardTitle>
                </div>
                <CardDescription className="text-base">
                  60 Fragen | 90 Minuten | Prüfungsmodus
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Simuliere die echte Prüfung mit zeitgesteuertem Examen und Multiple-Choice-Fragen.
                </p>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:opacity-90 shadow-md hover:shadow-lg transition-all">
                  Examen starten
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/acronym-quiz">
            <Card className="h-full hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
              <div className="h-2 bg-gradient-to-r from-purple-500 to-purple-700" />
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <BookCheck className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-2xl">Akronym-Quiz</CardTitle>
                </div>
                <CardDescription className="text-base">
                  40 zufällige Fragen | Sofortiges Feedback
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Lerne die wichtigsten IT-Security-Akronyme mit interaktivem Quiz.
                </p>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:opacity-90 shadow-md hover:shadow-lg transition-all">
                  Quiz starten
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Card className="h-full bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="h-2 bg-gradient-to-r from-green-500 to-green-700" />
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Terminal className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl">6 PBQs</CardTitle>
              </div>
              <CardDescription className="text-base">
                Performance-Based Questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Praktische Aufgaben mit Drag & Drop für realistische Prüfungsvorbereitung.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* PBQ Grid */}
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Performance-Based Questions</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Firewall-Regeln', href: '/pbq/firewall', gradient: 'from-red-500 to-orange-500' },
            { title: 'Incident Response', href: '/pbq/incident-response', gradient: 'from-blue-500 to-cyan-500' },
            { title: 'VPN-Konfiguration', href: '/pbq/vpn-config', gradient: 'from-purple-500 to-pink-500' },
            { title: 'Log-Analyse', href: '/pbq/log-analysis', gradient: 'from-green-500 to-teal-500' },
            { title: 'Threat Analysis', href: '/pbq/threat-analysis', gradient: 'from-yellow-500 to-orange-500' },
            { title: 'Zertifikat-Management', href: '/pbq/certificate-mgmt', gradient: 'from-indigo-500 to-purple-500' }
          ].map((pbq) => (
            <Link key={pbq.href} href={pbq.href}>
              <Card className="h-full hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer flex flex-col">
                <div className={`h-2 bg-gradient-to-r ${pbq.gradient}`} />
                <CardHeader className="flex-1">
                  <CardTitle className="text-xl">{pbq.title}</CardTitle>
                </CardHeader>
                <CardContent className="mt-auto">
                  <Button className={`w-full bg-gradient-to-r ${pbq.gradient} hover:opacity-90`}>
                    PBQ starten
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}