'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Server, ArrowLeft, Clock, Construction } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function LinuxPlusPage() {
  return (
    <div className="min-h-screen cyber-grid py-12 px-4 sm:px-6 lg:px-8">
      <div className="scanline" />
      
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center text-[rgb(var(--cyber-yellow))] hover:text-[rgb(var(--cyber-cyan))] mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Zurück zur Kursauswahl
        </Link>

        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-[rgb(var(--cyber-surface))] rounded-2xl neon-magenta">
              <Server className="h-16 w-16 text-[rgb(var(--cyber-yellow))]" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-readable neon-text-cyan mb-4">
            CompTIA Linux+ XK0-005
          </h1>
          <p className="text-xl text-readable-dim">
            Linux-Administration und System-Management
          </p>
        </div>

        <Alert className="mb-8 border-2 border-[rgb(var(--cyber-yellow))] bg-[rgba(255,255,0,0.05)]">
          <Construction className="h-5 w-5 text-[rgb(var(--cyber-yellow))]" />
          <AlertTitle className="text-readable text-lg">In Vorbereitung</AlertTitle>
          <AlertDescription className="text-readable-dim">
            Dieser Kurs befindet sich derzeit in der Entwicklung. Inhalte werden in Kürze verfügbar sein.
          </AlertDescription>
        </Alert>

        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="text-2xl text-readable">Was erwartet dich?</CardTitle>
            <CardDescription className="text-readable-dim">Geplante Inhalte für Linux+</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2 text-readable">Themenbereiche</h3>
              <ul className="space-y-2 text-readable-dim">
                <li>• Linux-Installation und Paket-Management</li>
                <li>• Dateisystem-Hierarchie und Berechtigungen</li>
                <li>• Shell-Scripting (Bash)</li>
                <li>• Systemd und Service-Management</li>
                <li>• Netzwerk-Konfiguration</li>
                <li>• Security und Firewall (iptables, firewalld)</li>
                <li>• Kernel-Management und Troubleshooting</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2 text-readable">Geplante Features</h3>
              <ul className="space-y-2 text-readable-dim">
                <li>• Interaktive Kommandozeilen-Simulationen</li>
                <li>• Bash-Scripting-Challenges</li>
                <li>• Dateisystem-Berechtigungs-PBQs</li>
                <li>• Log-Analyse und Troubleshooting</li>
                <li>• 90-Fragen-Examen</li>
              </ul>
            </div>

            <div className="pt-4">
              <div className="flex items-center gap-2 text-sm text-readable-dim">
                <Clock className="h-4 w-4" />
                <span>Voraussichtliche Verfügbarkeit: TBD</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Link href="/">
            <Button size="lg" className="cyber-button neon-border-cyan bg-[rgb(var(--cyber-surface-elevated))] text-readable">
              Zu verfügbaren Kursen zurückkehren
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
