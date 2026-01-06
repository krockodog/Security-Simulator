'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Shield, 
  Terminal, 
  Network, 
  Server, 
  BookOpen,
  Lock,
  CheckCircle2,
  Clock
} from 'lucide-react'

interface Course {
  id: string
  title: string
  subtitle: string
  icon: React.ReactNode
  color: string
  gradient: string
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
    icon: <Shield className="h-12 w-12" />,
    color: 'text-blue-600',
    gradient: 'from-blue-500 to-blue-700',
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
    icon: <Terminal className="h-12 w-12" />,
    color: 'text-red-600',
    gradient: 'from-red-500 to-red-700',
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
    color: 'text-green-600',
    gradient: 'from-green-500 to-green-700',
    available: false,
    href: '/network-plus',
    description: 'Netzwerk-Topologien, Protokolle, Troubleshooting'
  },
  {
    id: 'linux-plus',
    title: 'CompTIA Linux+',
    subtitle: 'XK0-005',
    icon: <Server className="h-12 w-12" />,
    color: 'text-purple-600',
    gradient: 'from-purple-500 to-purple-700',
    available: false,
    href: '/linux-plus',
    description: 'Linux-Administration, Shell-Scripting, System-Management'
  },
  {
    id: 'lpi-1',
    title: 'LPI Level 1',
    subtitle: 'LPIC-1',
    icon: <BookOpen className="h-12 w-12" />,
    color: 'text-orange-600',
    gradient: 'from-orange-500 to-orange-700',
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-red-600/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center space-y-6">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-xl">
                <Lock className="h-16 w-16 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-red-600">
              Course Begleiter
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Interaktive Prüfungsvorbereitung für IT-Zertifizierungen
            </p>
            
            {userName && (
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">Willkommen zurück, <span className="font-semibold">{userName}</span></span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Course Selection */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Wähle deinen Kurs</h2>
          <p className="text-gray-600 text-lg">Beginne mit der Prüfungsvorbereitung für deine gewünschte Zertifizierung</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Card 
              key={course.id}
              className={`relative overflow-hidden transition-all duration-300 ${
                course.available 
                  ? 'hover:shadow-2xl hover:scale-105 cursor-pointer' 
                  : 'opacity-60 cursor-not-allowed'
              }`}
            >
              {/* Gradient Header */}
              <div className={`h-3 bg-gradient-to-r ${course.gradient}`} />
              
              <CardHeader className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className={`${course.color}`}>
                    {course.icon}
                  </div>
                  {course.available ? (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      Verfügbar
                    </Badge>
                  ) : (
                    <Badge variant="secondary">
                      Demnächst
                    </Badge>
                  )}
                </div>
                
                <div>
                  <CardTitle className="text-2xl mb-2">{course.title}</CardTitle>
                  <Badge variant="outline" className="font-mono">
                    {course.subtitle}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <CardDescription className="text-base">
                  {course.description}
                </CardDescription>

                {course.available && (
                  <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                    {course.pbqCount && (
                      <div className="flex items-center gap-1">
                        <Terminal className="h-4 w-4" />
                        <span>{course.pbqCount} PBQs</span>
                      </div>
                    )}
                    {course.questionsCount && (
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>{course.questionsCount} Fragen</span>
                      </div>
                    )}
                  </div>
                )}

                {course.available ? (
                  <Link href={course.href} className="block mt-6">
                    <Button 
                      className={`w-full bg-gradient-to-r ${course.gradient} hover:opacity-90 transition-all`}
                      size="lg"
                    >
                      Kurs starten
                    </Button>
                  </Link>
                ) : (
                  <Button 
                    disabled 
                    className="w-full mt-6"
                    size="lg"
                    variant="outline"
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
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Was bietet der Course Begleiter?</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-3">
              <div className="inline-flex p-4 bg-blue-100 rounded-full">
                <Terminal className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-lg">Realistische PBQs</h4>
              <p className="text-gray-600">Performance-Based Questions mit Drag & Drop wie in der echten Prüfung</p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="inline-flex p-4 bg-purple-100 rounded-full">
                <CheckCircle2 className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-lg">Praxis-Fragen</h4>
              <p className="text-gray-600">Hunderte von Prüfungsfragen mit detaillierten Erklärungen</p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="inline-flex p-4 bg-red-100 rounded-full">
                <Clock className="h-8 w-8 text-red-600" />
              </div>
              <h4 className="font-semibold text-lg">Examen-Modus</h4>
              <p className="text-gray-600">Zeitgesteuerte Prüfungssimulationen für optimale Vorbereitung</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-600">
        <p>© 2025 Course Begleiter | Entwickelt für IT-Professionals</p>
      </footer>
    </div>
  )
}