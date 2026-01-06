'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Server, ArrowLeft, Clock, Construction } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function LinuxPlusPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Zurück zur Kursauswahl
        </Link>

        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl shadow-xl">
              <Server className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800 mb-4">
            CompTIA Linux+ XK0-005
          </h1>
          <p className="text-xl text-gray-600">
            Linux-Administration und System-Management
          </p>
        </div>

        <Alert className="mb-8 border-purple-200 bg-purple-50">
          <Construction className="h-5 w-5 text-purple-600" />
          <AlertTitle className="text-purple-900 text-lg">In Vorbereitung</AlertTitle>
          <AlertDescription className="text-purple-800">
            Dieser Kurs befindet sich derzeit in der Entwicklung. Inhalte werden in Kürze verfügbar sein.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Was erwartet dich?</CardTitle>
            <CardDescription>Geplante Inhalte für Linux+</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Themenbereiche</h3>
              <ul className="space-y-2 text-gray-600">
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
              <h3 className="font-semibold text-lg mb-2">Geplante Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Interaktive Kommandozeilen-Simulationen</li>
                <li>• Bash-Scripting-Challenges</li>
                <li>• Dateisystem-Berechtigungs-PBQs</li>
                <li>• Log-Analyse und Troubleshooting</li>
                <li>• 90-Fragen-Examen</li>
              </ul>
            </div>

            <div className="pt-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>Voraussichtliche Verfügbarkeit: TBD</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Link href="/">
            <Button size="lg" variant="outline">
              Zu verfügbaren Kursen zurückkehren
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}