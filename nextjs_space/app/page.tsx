'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Terminal, 
  Network, 
  Server, 
  BookOpen,
  CheckCircle2,
  Clock
} from 'lucide-react'

// Anonymous Mask SVG Component
const AnonymousMask = ({ className = "h-12 w-12" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor" opacity="0.3"/>
    <path d="M12 4C7.58 4 4 7.58 4 12s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm-3 13v-1c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v1h-6zm6.5-6.5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zm-7 0c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5z" fill="currentColor"/>
    <path d="M9 14h6v3H9z" fill="currentColor" opacity="0.5"/>
  </svg>
)

// Defensive Shield SVG Component  
const DefensiveShield = ({ className = "h-12 w-12" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z" fill="currentColor" opacity="0.3"/>
    <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm6 9.09c0 4-2.55 7.7-6 8.83-3.45-1.13-6-4.82-6-8.83V6.31l6-2.12 6 2.12v4.78z" fill="currentColor"/>
    <path d="M10.5 13.5l-2-2 1.41-1.41L11.5 11.67l3.59-3.58L16.5 9.5z" fill="currentColor" opacity="0.8"/>
  </svg>
)

interface Course {
  id: string
  title: string
  subtitle: string
  icon: React.ReactNode
  color: string
  neonClass: string
  available: boolean
  pbqCount?: number
  questionsCount?: number
  href: string
  description: string
}

const courses: Course[] = [
  {
    id: 'security-plus',
    title: 'CompTIA Security+',
    subtitle: 'SY0-701',
    icon: <DefensiveShield className="h-12 w-12" />,
    color: 'text-[rgb(var(--cyber-blue))]',
    neonClass: 'neon-border-blue',
    available: true,
    pbqCount: 6,
    questionsCount: 60,
    href: '/security-plus',
    description: 'Praktische PBQs, 60-Fragen-Examen, Akronym-Quiz'
  },
  {
    id: 'pentest-plus',
    title: 'CompTIA PenTest+',
    subtitle: 'PT0-003',
    icon: <AnonymousMask className="h-12 w-12" />,
    color: 'text-[rgb(var(--cyber-magenta))]',
    neonClass: 'neon-border-magenta',
    available: true,
    pbqCount: 10,
    questionsCount: 90,
    href: '/pentest-plus',
    description: 'Tool Commander, realistische PBQs, 90 Fragen'
  },
  {
    id: 'network-plus',
    title: 'CompTIA Network+',
    subtitle: 'N10-009',
    icon: <Network className="h-12 w-12" />,
    color: 'text-[rgb(var(--cyber-success))]',
    neonClass: 'neon-border-cyan',
    available: false,
    href: '/network-plus',
    description: 'Netzwerk-Topologien, Protokolle, Troubleshooting'
  },
  {
    id: 'linux-plus',
    title: 'CompTIA Linux+',
    subtitle: 'XK0-005',
    icon: <Server className="h-12 w-12" />,
    color: 'text-[rgb(var(--cyber-yellow))]',
    neonClass: 'neon-border-cyan',
    available: false,
    href: '/linux-plus',
    description: 'Linux-Administration, Shell-Scripting, System-Management'
  },
  {
    id: 'lpi-1',
    title: 'LPI Level 1',
    subtitle: 'LPIC-1',
    icon: <BookOpen className="h-12 w-12" />,
    color: 'text-[rgb(var(--cyber-cyan))]',
    neonClass: 'neon-border-cyan',
    available: false,
    href: '/lpi-1',
    description: 'Linux Professional Institute Zertifizierung Level 1'
  }
]

export default function HomePage() {
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem('userName')
    if (stored) setUserName(stored)
  }, [])

  return (
    <div className="min-h-screen bg-black cyber-grid relative">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,255,255,0.03)] via-transparent to-[rgba(255,0,255,0.03)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center space-y-6">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-[rgb(var(--cyber-surface))] rounded-2xl neon-cyan">
                <Terminal className="h-16 w-16 text-[rgb(var(--cyber-cyan))]" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold text-[rgb(var(--cyber-text))] neon-text-cyan glitch">
              CompTIA - Zertifikation - Begleiter
            </h1>
            
            <p className="text-xl md:text-2xl text-readable-dim max-w-3xl mx-auto">
              Interaktive Prüfungsvorbereitung für IT-Zertifizierungen
            </p>
            
            {userName && (
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-[rgb(var(--cyber-surface))] rounded-full neon-border-cyan">
                <CheckCircle2 className="h-5 w-5 text-[rgb(var(--cyber-success))]" />
                <span className="text-readable">Willkommen zurück, <span className="font-semibold text-[rgb(var(--cyber-cyan))]">{userName}</span></span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Course Selection */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-readable mb-4">Wähle deinen Kurs</h2>
          <p className="text-readable-dim text-lg">Beginne mit der Prüfungsvorbereitung für deine gewünschte Zertifizierung</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Card 
              key={course.id}
              className={`cyber-card relative ${
                course.available 
                  ? 'hover:shadow-2xl cursor-pointer' 
                  : 'opacity-60 cursor-not-allowed'
              }`}
            >
              {/* Neon Top Border */}
              <div className={`h-1 ${course.neonClass}`} />
              
              <CardHeader className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className={course.color}>
                    {course.icon}
                  </div>
                  {course.available ? (
                    <Badge className="cyber-badge cyber-badge-available">
                      Verfügbar
                    </Badge>
                  ) : (
                    <Badge className="cyber-badge cyber-badge-soon">
                      Demnächst
                    </Badge>
                  )}
                </div>
                
                <div>
                  <CardTitle className="text-2xl mb-2 text-readable">{course.title}</CardTitle>
                  <Badge variant="outline" className="font-mono border-[rgb(var(--cyber-border))] text-[rgb(var(--cyber-cyan))]">
                    {course.subtitle}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <CardDescription className="text-base text-readable-dim">
                  {course.description}
                </CardDescription>

                {course.available && (
                  <div className="flex flex-wrap gap-3 text-sm text-readable-dim">
                    {course.pbqCount && (
                      <div className="flex items-center gap-1">
                        <Terminal className="h-4 w-4 text-[rgb(var(--cyber-cyan))]" />
                        <span>{course.pbqCount} PBQs</span>
                      </div>
                    )}
                    {course.questionsCount && (
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4 text-[rgb(var(--cyber-success))]" />
                        <span>{course.questionsCount} Fragen</span>
                      </div>
                    )}
                  </div>
                )}

                {course.available ? (
                  <Link href={course.href} className="block mt-6">
                    <Button 
                      className={`w-full cyber-button bg-[rgb(var(--cyber-surface-elevated))] ${course.neonClass} text-readable hover:bg-[rgb(var(--cyber-surface))]`}
                      size="lg"
                    >
                      Kurs starten
                    </Button>
                  </Link>
                ) : (
                  <Button 
                    disabled 
                    className="w-full mt-6 bg-[rgb(var(--cyber-surface))] border border-[rgb(var(--cyber-border))] text-readable-dim"
                    size="lg"
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    In Vorbereitung
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="cyber-card p-8 md:p-12">
          <h3 className="text-2xl font-bold text-readable mb-8 text-center">Was bietet der CompTIA - Zertifikation - Begleiter?</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-3">
              <div className="inline-flex p-4 bg-[rgb(var(--cyber-surface-elevated))] rounded-full neon-cyan">
                <Terminal className="h-8 w-8 text-[rgb(var(--cyber-cyan))]" />
              </div>
              <h4 className="font-semibold text-lg text-readable">Realistische PBQs</h4>
              <p className="text-readable-dim">Performance-Based Questions mit Drag & Drop wie in der echten Prüfung</p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="inline-flex p-4 bg-[rgb(var(--cyber-surface-elevated))] rounded-full neon-magenta">
                <CheckCircle2 className="h-8 w-8 text-[rgb(var(--cyber-magenta))]" />
              </div>
              <h4 className="font-semibold text-lg text-readable">Praxis-Fragen</h4>
              <p className="text-readable-dim">Hunderte von Prüfungsfragen mit detaillierten Erklärungen</p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="inline-flex p-4 bg-[rgb(var(--cyber-surface-elevated))] rounded-full neon-blue">
                <Clock className="h-8 w-8 text-[rgb(var(--cyber-blue))]" />
              </div>
              <h4 className="font-semibold text-lg text-readable">Examen-Modus</h4>
              <p className="text-readable-dim">Zeitgesteuerte Prüfungssimulationen für optimale Vorbereitung</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-readable-dim border-t border-[rgb(var(--cyber-border))]">
        <p>© 2025 CompTIA - Zertifikation - Begleiter | Entwickelt für IT-Professionals</p>
      </footer>
    </div>
  )
}