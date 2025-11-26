import Link from 'next/link'
import { Shield, Target, Network, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 max-w-6xl">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-slate-900">CompTIA Security+ SY0-701</h1>
              <p className="text-sm text-slate-600">PBQ Simulator</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Target className="h-4 w-4" />
            Exam-Realistic Practice
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Master Performance-Based Questions
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Practice realistic PBQ scenarios that closely replicate the actual CompTIA Security+ OneVUE exam environment with interactive drag-and-drop functionality.
          </p>
        </div>

        {/* Instructions Card */}
        <Card className="mb-8 border-2 shadow-lg">
          <CardHeader className="bg-slate-50">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              Exam Instructions
            </CardTitle>
            <CardDescription>Read carefully before starting the simulation</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Format</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>2 Performance-Based Questions (PBQs)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Drag-and-drop interface similar to actual exam</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Immediate feedback and detailed explanations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Can reset and retry each question</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Instructions</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Read the scenario carefully before starting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Drag items from the left panel to the answer area</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Order matters - arrange items in correct sequence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Submit when ready to see your score and explanation</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* PBQ Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="hover:shadow-xl transition-shadow border-2">
            <CardHeader className="bg-gradient-to-br from-blue-50 to-white">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Network className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle>PBQ 1: Firewall Rules</CardTitle>
                  <CardDescription>Network Security</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-slate-600 mb-4">
                Configure firewall rules for a corporate network with DMZ. Apply proper rule ordering, implement security best practices, and follow the principle of least privilege.
              </p>
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                <span className="px-2 py-1 bg-slate-100 rounded">ACLs</span>
                <span className="px-2 py-1 bg-slate-100 rounded">Network Segmentation</span>
                <span className="px-2 py-1 bg-slate-100 rounded">Implicit Deny</span>
              </div>
              <Link href="/pbq/firewall">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Start PBQ 1
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow border-2">
            <CardHeader className="bg-gradient-to-br from-red-50 to-white">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-red-600 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle>PBQ 2: Incident Response</CardTitle>
                  <CardDescription>Security Operations</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-slate-600 mb-4">
                Respond to a ransomware incident following the NIST incident response lifecycle. Properly sequence steps from detection through post-incident activities.
              </p>
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                <span className="px-2 py-1 bg-slate-100 rounded">NIST IR</span>
                <span className="px-2 py-1 bg-slate-100 rounded">Containment</span>
                <span className="px-2 py-1 bg-slate-100 rounded">Forensics</span>
              </div>
              <Link href="/pbq/incident-response">
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  Start PBQ 2
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Info Section */}
        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
          <CardContent className="pt-6">
            <div className="text-center">
              <Shield className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Prepare for Success</h3>
              <p className="text-slate-300 max-w-2xl mx-auto">
                These realistic PBQ simulations are designed to help you master the hands-on skills tested in the CompTIA Security+ SY0-701 certification exam. Practice as many times as you need to build confidence.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white mt-12">
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          <p className="text-center text-sm text-slate-600">
            CompTIA Security+ SY0-701 PBQ Simulator • Practice Environment
          </p>
        </div>
      </footer>
    </div>
  )
}
