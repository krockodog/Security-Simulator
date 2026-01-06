'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, Terminal, CheckCircle2, XCircle } from 'lucide-react'

interface ToolChallenge {
  id: string
  tool: string
  question: string
  correct: string
  options: string[]
  explanation: string
  usage: string
}

const toolChallenges: ToolChallenge[] = [
  { 
    id: '1', 
    tool: 'Nmap', 
    question: 'Scan all ports on 10.0.0.1', 
    correct: 'nmap -p- 10.0.0.1', 
    options: ['nmap -p- 10.0.0.1', 'nmap -sV 10.0.0.1', 'nmap -O 10.0.0.1', 'nmap --top-ports 100 10.0.0.1'],
    explanation: '-p- scannt alle 65535 Ports. -sV zeigt Versionen, -O erkennt OS, --top-ports scannt nur häufige Ports.',
    usage: 'Nutze -p- für vollständige Port-Enumerierung bei Penetration Tests.'
  },
  { 
    id: '2', 
    tool: 'SQLmap', 
    question: 'Test URL for SQL injection', 
    correct: 'sqlmap -u "http://site.com/page?id=1"', 
    options: ['sqlmap -u "http://site.com/page?id=1"', 'sqlmap --crawl http://site.com', 'sqlmap -d mysql', 'sqlmap --wizard'],
    explanation: '-u spezifiziert die Ziel-URL mit Parameter. --crawl crawlt die Website, -d verbindet direkt zur DB.',
    usage: 'Teste immer URL-Parameter auf SQL Injection-Schwachstellen.'
  },
  { 
    id: '3', 
    tool: 'Hydra', 
    question: 'SSH brute-force with wordlists', 
    correct: 'hydra -L users.txt -P pass.txt ssh://10.0.0.1', 
    options: ['hydra -L users.txt -P pass.txt ssh://10.0.0.1', 'hydra -l admin -p password 10.0.0.1', 'hydra -L users.txt ftp://10.0.0.1', 'hydra -U ssh'],
    explanation: '-L nutzt Username-Liste, -P nutzt Passwort-Liste. -l/-p sind für einzelne Credentials.',
    usage: 'Hydra eignet sich für Brute-Force-Angriffe auf Login-Services.'
  },
  { 
    id: '4', 
    tool: 'Gobuster', 
    question: 'Directory enumeration on website', 
    correct: 'gobuster dir -u http://site.com -w wordlist.txt', 
    options: ['gobuster dir -u http://site.com -w wordlist.txt', 'gobuster dns -d site.com', 'gobuster vhost -u http://site.com', 'gobuster help'],
    explanation: 'dir-Modus für Directory Brute-Forcing, dns für DNS-Subdomains, vhost für Virtual Hosts.',
    usage: 'Finde versteckte Verzeichnisse und Dateien auf Webservern.'
  },
  { 
    id: '5', 
    tool: 'Hashcat', 
    question: 'Crack NTLM hashes with wordlist', 
    correct: 'hashcat -m 1000 hashes.txt wordlist.txt', 
    options: ['hashcat -m 1000 hashes.txt wordlist.txt', 'hashcat -m 5600 hashes.txt', 'hashcat -a 3 hashes.txt', 'hashcat --help'],
    explanation: '-m 1000 ist der Hash-Type für NTLM. -m 5600 ist für NetNTLMv2, -a 3 ist Brute-Force-Modus.',
    usage: 'Hashcat ist der schnellste Hash-Cracker mit GPU-Unterstützung.'
  },
  { 
    id: '6', 
    tool: 'Metasploit', 
    question: 'Use EternalBlue exploit', 
    correct: 'use exploit/windows/smb/ms17_010_eternalblue', 
    options: ['use exploit/windows/smb/ms17_010_eternalblue', 'use auxiliary/scanner/smb/smb_version', 'use exploit/multi/handler', 'use post/windows/gather/hashdump'],
    explanation: 'EternalBlue exploitet SMBv1 (MS17-010). scanner/smb_version scannt nur, multi/handler ist ein Payload Handler.',
    usage: 'Kritische Windows-Schwachstelle für lateral movement.'
  },
  { 
    id: '7', 
    tool: 'John', 
    question: 'Crack /etc/shadow with wordlist', 
    correct: 'john --wordlist=rockyou.txt shadow', 
    options: ['john --wordlist=rockyou.txt shadow', 'john --incremental shadow', 'john --show shadow', 'john --format=raw-md5 hashes'],
    explanation: '--wordlist nutzt Dictionary Attack. --incremental ist Brute-Force, --show zeigt bereits gecrackte Hashes.',
    usage: 'John the Ripper für Linux/Unix Password Cracking.'
  },
  { 
    id: '8', 
    tool: 'Nikto', 
    question: 'Scan web server for vulnerabilities', 
    correct: 'nikto -h http://site.com', 
    options: ['nikto -h http://site.com', 'nikto -h http://site.com -ssl', 'nikto -update', 'nikto -Display 1'],
    explanation: '-h spezifiziert den Host. -ssl erzwingt SSL/TLS, -update aktualisiert die Datenbank.',
    usage: 'Automatisierter Web-Server-Scanner für bekannte Schwachstellen.'
  },
  { 
    id: '9', 
    tool: 'Responder', 
    question: 'Capture hashes on interface eth0', 
    correct: 'responder -I eth0 -wrf', 
    options: ['responder -I eth0 -wrf', 'responder -A', 'responder -h', 'responder --lm'],
    explanation: '-I spezifiziert Interface, -w startet WPAD-Server, -r aktiviert SMB-Relay, -f startet Fingerprinting.',
    usage: 'LLMNR/NBT-NS Poisoning für Credential Harvesting in Windows-Netzwerken.'
  },
  { 
    id: '10', 
    tool: 'Burp Suite', 
    question: 'Which mode intercepts HTTP requests?', 
    correct: 'Proxy → Intercept', 
    options: ['Proxy → Intercept', 'Scanner → Active Scan', 'Intruder → Positions', 'Repeater → Send'],
    explanation: 'Proxy Intercept fängt Requests ab. Scanner scannt automatisch, Intruder führt Fuzzing durch, Repeater sendet modifizierte Requests.',
    usage: 'Essential für Web Application Penetration Testing und Request-Manipulation.'
  }
]

export default function ToolCommanderPage() {
  // Initialize with empty answers (user can fill them out)
  const [answers, setAnswers] = useState<{[key: string]: string}>({})
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => setSubmitted(true)
  const calculateScore = () => {
    let correct = 0
    toolChallenges.forEach(ch => {
      if (answers[ch.id] === ch.correct) correct++
    })
    return Math.round((correct / toolChallenges.length) * 100)
  }

  return (
    <div className="min-h-screen bg-black cyber-grid py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <Link href="/pentest-plus" className="inline-flex items-center text-[rgb(var(--cyber-magenta))] hover:text-[rgb(var(--cyber-cyan))] mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Zurück zu PenTest+
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Terminal className="h-8 w-8 text-[rgb(var(--cyber-cyan))]" />
            <h1 className="text-3xl font-bold text-readable">Tool Commander</h1>
          </div>
          <p className="text-readable-dim text-lg">10 interaktive Challenges für PenTest-Tools</p>
        </div>

        <div className="space-y-4 mb-8">
          {toolChallenges.map((challenge, idx) => {
            const isCorrect = submitted && answers[challenge.id] === challenge.correct
            const isIncorrect = submitted && answers[challenge.id] && answers[challenge.id] !== challenge.correct

            return (
              <Card key={challenge.id} className={`cyber-card ${
                submitted ? isCorrect ? 'border-[rgb(var(--cyber-success))]' : isIncorrect ? 'border-[rgb(var(--cyber-error))]' : '' : ''
              }`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-readable">
                      {idx + 1}. {challenge.tool}: {challenge.question}
                    </CardTitle>
                    {submitted && (
                      isCorrect ? <CheckCircle2 className="h-5 w-5 text-[rgb(var(--cyber-success))]" /> :
                      isIncorrect ? <XCircle className="h-5 w-5 text-[rgb(var(--cyber-error))]" /> : null
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Select value={answers[challenge.id]} onValueChange={(val) => setAnswers({...answers, [challenge.id]: val})} disabled={submitted}>
                    <SelectTrigger className="cyber-input">
                      <SelectValue placeholder="Wähle Kommando..." />
                    </SelectTrigger>
                    <SelectContent className="bg-[rgb(var(--cyber-surface))] border-[rgb(var(--cyber-border))]">
                      {challenge.options.map(opt => (
                        <SelectItem key={opt} value={opt} className="text-readable">
                          <code className="text-sm">{opt}</code>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {submitted && (
                    <div className="mt-4 p-4 bg-[rgb(var(--cyber-surface-elevated))] rounded-lg border border-[rgb(var(--cyber-border))] space-y-2">
                      {!isCorrect && (
                        <div className="mb-3 pb-3 border-b border-[rgb(var(--cyber-border))]">
                          <p className="text-sm font-semibold text-[rgb(var(--cyber-success))] mb-1">
                            ✓ Richtige Antwort:
                          </p>
                          <code className="text-sm text-[rgb(var(--cyber-cyan))] bg-black/50 px-2 py-1 rounded">{challenge.correct}</code>
                        </div>
                      )}
                      <div>
                        <p className="text-xs font-semibold text-[rgb(var(--cyber-cyan))] mb-1">Erklärung:</p>
                        <p className="text-sm text-readable-dim">{challenge.explanation}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-[rgb(var(--cyber-magenta))] mb-1">Verwendung:</p>
                        <p className="text-sm text-readable-dim">{challenge.usage}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="flex gap-4">
          {!submitted ? (
            <Button onClick={handleSubmit} disabled={Object.keys(answers).length < toolChallenges.length} className="cyber-button neon-border-magenta bg-[rgb(var(--cyber-surface-elevated))] text-readable" size="lg">
              Auswertung anzeigen
            </Button>
          ) : (
            <Button onClick={() => { setAnswers({}); setSubmitted(false); }} className="cyber-button neon-border-cyan bg-[rgb(var(--cyber-surface-elevated))] text-readable" size="lg">
              Zurücksetzen
            </Button>
          )}
        </div>

        {submitted && (
          <Card className="cyber-card mt-8">
            <CardHeader>
              <CardTitle className="text-2xl text-readable">Ergebnis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-readable">
                Score: <span className={`font-bold ${calculateScore() >= 80 ? 'text-[rgb(var(--cyber-success))]' : calculateScore() >= 60 ? 'text-[rgb(var(--cyber-yellow))]' : 'text-[rgb(var(--cyber-error))]'}`}>{calculateScore()}%</span>
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
