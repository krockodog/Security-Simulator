'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, Terminal, CheckCircle2, XCircle } from 'lucide-react'
import { toolChallenges as pt003ToolChallenges, toolCommanderOptions } from '@/lib/pt003-data'

// Transform pt003 data to UI format with options
const toolChallenges = pt003ToolChallenges.map((ch, idx) => {
  // Generate wrong options based on tool type
  const wrongOptions = toolCommanderOptions.commonFlags[ch.tool as keyof typeof toolCommanderOptions.commonFlags] || []
  const options = [ch.correctCommand]
  
  // Generate 3 plausible wrong answers
  if (ch.tool === 'Nmap') {
    options.push(
      `nmap -sV ${ch.correctCommand.split(' ').pop()}`,
      `nmap -O ${ch.correctCommand.split(' ').pop()}`,
      `nmap --top-ports 100 ${ch.correctCommand.split(' ').pop()}`
    )
  } else if (ch.tool === 'SQLmap') {
    options.push(
      'sqlmap --crawl http://target.com',
      'sqlmap -d mysql://target',
      'sqlmap --wizard'
    )
  } else if (ch.tool === 'Hydra') {
    options.push(
      'hydra -l admin -p password 10.0.0.1',
      'hydra -L users.txt ftp://10.0.0.1',
      'hydra -U ssh'
    )
  } else if (ch.tool === 'Gobuster') {
    options.push(
      'gobuster dns -d example.com',
      'gobuster vhost -u http://example.com',
      'gobuster fuzz -u http://example.com/FUZZ'
    )
  } else if (ch.tool === 'Hashcat') {
    options.push(
      'hashcat -m 5600 hash.txt wordlist.txt',
      'hashcat -a 3 hash.txt ?a?a?a?a?a',
      'hashcat --show hash.txt'
    )
  } else if (ch.tool === 'Metasploit') {
    options.push(
      'use auxiliary/scanner/smb/smb_version',
      'use exploit/multi/handler',
      'use post/windows/gather/hashdump'
    )
  } else if (ch.tool === 'Nikto') {
    options.push(
      'nikto -h https://target.com -ssl',
      'nikto -update',
      'nikto -Display 1 -h target.com'
    )
  } else if (ch.tool === 'Wireshark') {
    options.push(
      'tshark -r capture.pcap -Y "http"',
      'wireshark -i eth0',
      'tshark -D'
    )
  } else if (ch.tool === 'John the Ripper') {
    options.push(
      'john --incremental shadow',
      'john --show shadow',
      'john --format=raw-md5 hashes.txt'
    )
  } else {
    // Generic fallback options
    options.push(
      `${ch.tool.toLowerCase()} --help`,
      `${ch.tool.toLowerCase()} -v`,
      `${ch.tool.toLowerCase()} --version`
    )
  }

  return {
    id: ch.id,
    tool: ch.tool,
    question: ch.scenario,
    correct: ch.correctCommand,
    options: options.slice(0, 4).sort(() => Math.random() - 0.5),
    explanation: ch.explanation,
    usage: `Flags verwendet: ${ch.flags.join(' ')}`
  }
})

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
