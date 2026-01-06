'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Network, ArrowLeft, Clock, Construction } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function NetworkPlusPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center text-green-600 hover:text-green-700 mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Zurück zur Kursauswahl
        </Link>

        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-green-600 to-green-800 rounded-2xl shadow-xl">
              <Network className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-800 mb-4">
            CompTIA Network+ N10-009
          </h1>
          <p className="text-xl text-gray-600">
            Netzwerk-Grundlagen und Infrastruktur
          </p>
        </div>

        <Alert className="mb-8 border-green-200 bg-green-50">
          <Construction className="h-5 w-5 text-green-600" />
          <AlertTitle className="text-green-900 text-lg">In Vorbereitung</AlertTitle>
          <AlertDescription className="text-green-800">
            Dieser Kurs befindet sich derzeit in der Entwicklung. Inhalte werden in Kürze verfügbar sein.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Was erwartet dich?</CardTitle>
            <CardDescription>Geplante Inhalte für Network+</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Themenbereiche</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Netzwerk-Topologien und Architekturen</li>
                <li>• OSI- und TCP/IP-Modell</li>
                <li>• Routing und Switching</li>
                <li>• Netzwerk-Sicherheit</li>
                <li>• Wireless Networking</li>
                <li>• Cloud und Virtualisierung</li>
                <li>• Netzwerk-Troubleshooting</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Geplante Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Interaktive Netzwerk-Diagramme</li>
                <li>• Subnet-Rechner Übungen</li>
                <li>• Protokoll-Analyse PBQs</li>
                <li>• Troubleshooting-Szenarien</li>
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