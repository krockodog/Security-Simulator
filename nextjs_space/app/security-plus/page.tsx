'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Terminal, BookCheck, ArrowLeft } from 'lucide-react'

// Defensive Shield SVG Component
const DefensiveShield = ({ className = "h-12 w-12" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z" fill="currentColor" opacity="0.3"/>
    <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm6 9.09c0 4-2.55 7.7-6 8.83-3.45-1.13-6-4.82-6-8.83V6.31l6-2.12 6 2.12v4.78z" fill="currentColor"/>
    <path d="M10.5 13.5l-2-2 1.41-1.41L11.5 11.67l3.59-3.58L16.5 9.5z" fill="currentColor" opacity="0.8"/>
  </svg>
)

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
    <div className="min-h-screen bg-black cyber-grid py-12 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-[rgb(var(--cyber-cyan))] hover:text-[rgb(var(--cyber-blue))] mb-6 transition-colors neon-text-cyan">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Zurück zur Kursauswahl
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-[rgb(var(--cyber-surface))] rounded-2xl neon-blue">
              <DefensiveShield className="h-16 w-16 text-[rgb(var(--cyber-blue))]" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-readable neon-text-cyan glitch mb-4">
            CompTIA Security+ SY0-701
          </h1>
          <p className="text-xl text-readable-dim max-w-2xl mx-auto">
            Interaktive Performance-Based Questions und Prüfungssimulator
          </p>
          
          {userName && (
            <div className="mt-6 inline-flex items-center gap-3">
              <p className="text-lg text-readable">
                Willkommen, <span className="font-semibold text-[rgb(var(--cyber-cyan))]">{userName}</span>
              </p>
              <Button variant="outline" size="sm" onClick={handleEditName} className="border-[rgb(var(--cyber-border))] text-readable-dim hover:border-[rgb(var(--cyber-cyan))] hover:text-[rgb(var(--cyber-cyan))]">
                Name ändern
              </Button>
            </div>
          )}
        </div>

        {/* Name Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-[rgb(var(--cyber-surface))] border-2 border-[rgb(var(--cyber-cyan))]">
            <DialogHeader>
              <DialogTitle className="text-readable">Wie heißt du?</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-readable">Dein Name</Label>
                <Input
                  id="name"
                  placeholder="z.B. Max Mustermann"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                  className="cyber-input"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSaveName} disabled={!tempName.trim()} className="cyber-button neon-border-cyan bg-[rgb(var(--cyber-surface-elevated))] text-readable">
                Speichern
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Main Actions */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Link href="/exam">
            <Card className="cyber-card h-full hover:shadow-2xl cursor-pointer">
              <div className="h-1 neon-border-blue" />
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 bg-[rgb(var(--cyber-surface-elevated))] rounded-lg neon-blue">
                    <BookCheck className="h-8 w-8 text-[rgb(var(--cyber-blue))]" />
                  </div>
                  <CardTitle className="text-2xl text-readable">Examen</CardTitle>
                </div>
                <CardDescription className="text-base text-readable-dim">
                  60 Fragen | 90 Minuten | Prüfungsmodus
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-readable-dim mb-4">
                  Simuliere die echte Prüfung mit zeitgesteuertem Examen und Multiple-Choice-Fragen.
                </p>
                <Button className="w-full cyber-button neon-border-blue bg-[rgb(var(--cyber-surface-elevated))] text-readable">
                  Examen starten
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/acronym-quiz">
            <Card className="cyber-card h-full hover:shadow-2xl cursor-pointer">
              <div className="h-1 neon-border-magenta" />
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 bg-[rgb(var(--cyber-surface-elevated))] rounded-lg neon-magenta">
                    <BookCheck className="h-8 w-8 text-[rgb(var(--cyber-magenta))]" />
                  </div>
                  <CardTitle className="text-2xl text-readable">Akronym-Quiz</CardTitle>
                </div>
                <CardDescription className="text-base text-readable-dim">
                  40 zufällige Fragen | Sofortiges Feedback
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-readable-dim mb-4">
                  Lerne die wichtigsten IT-Security-Akronyme mit interaktivem Quiz.
                </p>
                <Button className="w-full cyber-button neon-border-magenta bg-[rgb(var(--cyber-surface-elevated))] text-readable">
                  Quiz starten
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Card className="cyber-card h-full">
            <div className="h-1 neon-border-cyan" />
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-[rgb(var(--cyber-surface-elevated))] rounded-lg neon-cyan">
                  <Terminal className="h-8 w-8 text-[rgb(var(--cyber-cyan))]" />
                </div>
                <CardTitle className="text-2xl text-readable">6 PBQs</CardTitle>
              </div>
              <CardDescription className="text-base text-readable-dim">
                Performance-Based Questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-readable-dim mb-4">
                Praktische Aufgaben mit Drag & Drop für realistische Prüfungsvorbereitung.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* PBQ Grid */}
        <h2 className="text-3xl font-bold text-readable mb-6">Performance-Based Questions</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Firewall-Regeln', href: '/pbq/firewall', neonClass: 'neon-border-magenta' },
            { title: 'Incident Response', href: '/pbq/incident-response', neonClass: 'neon-border-cyan' },
            { title: 'VPN-Konfiguration', href: '/pbq/vpn-config', neonClass: 'neon-border-magenta' },
            { title: 'Log-Analyse', href: '/pbq/log-analysis', neonClass: 'neon-border-cyan' },
            { title: 'Threat Analysis', href: '/pbq/threat-analysis', neonClass: 'neon-border-blue' },
            { title: 'Zertifikat-Management', href: '/pbq/certificate-mgmt', neonClass: 'neon-border-cyan' }
          ].map((pbq) => (
            <Link key={pbq.href} href={pbq.href}>
              <Card className="cyber-card h-full hover:shadow-xl cursor-pointer flex flex-col">
                <div className={`h-1 ${pbq.neonClass}`} />
                <CardHeader className="flex-1">
                  <CardTitle className="text-xl text-readable">{pbq.title}</CardTitle>
                </CardHeader>
                <CardContent className="mt-auto">
                  <Button className={`w-full cyber-button ${pbq.neonClass} bg-[rgb(var(--cyber-surface-elevated))] text-readable`}>
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