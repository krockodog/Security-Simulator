'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, ArrowLeft, Clock, Construction } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function LPI1Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Zurück zur Kursauswahl
        </Link>

        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-orange-600 to-orange-800 rounded-2xl shadow-xl">
              <BookOpen className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-800 mb-4">
            LPI Level 1 (LPIC-1)
          </h1>
          <p className="text-xl text-gray-600">
            Linux Professional Institute Zertifizierung
          </p>
        </div>

        <Alert className="mb-8 border-orange-200 bg-orange-50">
          <Construction className="h-5 w-5 text-orange-600" />
          <AlertTitle className="text-orange-900 text-lg">In Vorbereitung</AlertTitle>
          <AlertDescription className="text-orange-800">
            Dieser Kurs befindet sich derzeit in der Entwicklung. Inhalte werden in Kürze verfügbar sein.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Was erwartet dich?</CardTitle>
            <CardDescription>Geplante Inhalte für LPIC-1</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Prüfungen</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• <strong>101-500:</strong> System Architecture, Linux Installation, GNU & Unix Commands, Devices & Filesystems</li>
                <li>• <strong>102-500:</strong> Shells & Scripting, User Interfaces, Administrative Tasks, Essential System Services, Networking, Security</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Themenbereiche</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• System-Architektur und Bootloader</li>
                <li>• Paket-Management (dpkg, rpm, apt, yum)</li>
                <li>• GNU- und Unix-Kommandos</li>
                <li>• Dateisysteme und Geräte</li>
                <li>• Shell-Umgebung und Scripting</li>
                <li>• Benutzer- und Gruppen-Verwaltung</li>
                <li>• Netzwerk-Konfiguration</li>
                <li>• Sicherheit (SSH, GPG, iptables)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Geplante Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Getrennte Übungen für 101-500 und 102-500</li>
                <li>• Kommandozeilen-Simulationen</li>
                <li>• Realistische Troubleshooting-Szenarien</li>
                <li>• Scripting-Challenges</li>
                <li>• Vollständige Examen für beide Prüfungen</li>
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