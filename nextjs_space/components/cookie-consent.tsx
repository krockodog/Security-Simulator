'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Cookie } from 'lucide-react'

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Prüfe ob Zustimmung bereits erteilt wurde
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    localStorage.setItem('cookie-consent-date', new Date().toISOString())
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom duration-500">
      <Card className="max-w-4xl mx-auto cyber-card border-2 border-[rgb(var(--cyber-cyan))] bg-black/95 backdrop-blur-sm">
        <div className="p-6 flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-start gap-3 flex-1">
            <Cookie className="h-6 w-6 text-[rgb(var(--cyber-cyan))] flex-shrink-0 mt-1" />
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-readable">Cookie-Hinweis</h3>
              <p className="text-sm text-readable-dim leading-relaxed">
                Diese Website verwendet <span className="text-[rgb(var(--cyber-cyan))]">temporäre Cookies</span> und <span className="text-[rgb(var(--cyber-cyan))]">localStorage</span> ausschließlich zur Speicherung deiner:
              </p>
              <ul className="text-sm text-readable-dim space-y-1 ml-4">
                <li>• Prüfungsfortschritte und Antworten</li>
                <li>• Persönlichen Einstellungen (Name, Theme-Präferenzen)</li>
                <li>• Session-Daten während der Nutzung</li>
              </ul>
              <p className="text-xs text-readable-dim mt-2">
                Wir verwenden <span className="font-semibold">keine Tracking-Cookies</span> und geben <span className="font-semibold">keine Daten an Dritte</span> weiter. Alle Daten bleiben lokal auf deinem Gerät.
              </p>
            </div>
          </div>
          <Button 
            onClick={acceptCookies}
            className="cyber-button neon-border-cyan bg-[rgb(var(--cyber-surface-elevated))] text-readable hover:bg-[rgb(var(--cyber-surface))] whitespace-nowrap"
            size="lg"
          >
            Verstanden
          </Button>
        </div>
      </Card>
    </div>
  )
}
