# Course Begleiter - IT-Zertifizierungsplattform

## Übersicht

Der **Course Begleiter** ist eine umfassende, interaktive Lernplattform zur Vorbereitung auf verschiedene IT-Zertifizierungen. Die Anwendung bietet realistische Performance-Based Questions (PBQs), Prüfungssimulationen und detaillierte Erklärungen.

## Verfügbare Kurse

### ✅ Vollständig Implementiert

#### 1. CompTIA Security+ (SY0-701)
- **6 PBQs** mit Drag & Drop:
  - Firewall-Regeln
  - Incident Response
  - VPN-Konfiguration
  - Log-Analyse
  - Threat Analysis
  - Zertifikat-Management
- **60-Fragen-Examen** mit 90-Minuten-Timer
- **Akronym-Quiz** mit 40 randomisierten Fragen
- Detaillierte Erklärungen und Feedback

#### 2. CompTIA PenTest+ (PT0-003)
- **Datenstruktur vollständig** (`lib/pt003-data.ts`):
  - 10 PBQ-Szenarien (Web Vulnerabilities, Nmap, DNS, AWS S3, Docker, etc.)
  - 10 Tool Commander Challenges (Nmap, SQLmap, Metasploit, Hydra, etc.)
  - 34 Multiple-Choice-Fragen (Domains 1 & 2 vollständig)
  - Bilingual EN/DE Support
- **UI-Integration ausstehend**

### 🔜 In Vorbereitung

3. **CompTIA Network+ (N10-009)** - Coming Soon
4. **CompTIA Linux+ (XK0-005)** - Coming Soon
5. **LPI Level 1 (LPIC-1)** - Coming Soon

## Projektstruktur

```
security_plus_pbq_simulator/
├── nextjs_space/
│   ├── app/
│   │   ├── page.tsx                    # Haupt-Kursauswahl
│   │   ├── security-plus/
│   │   │   └── page.tsx                # Security+ Dashboard
│   │   ├── pentest-plus/
│   │   │   └── page.tsx                # PenTest+ Dashboard
│   │   ├── network-plus/
│   │   │   └── page.tsx                # Network+ (Coming Soon)
│   │   ├── linux-plus/
│   │   │   └── page.tsx                # Linux+ (Coming Soon)
│   │   ├── lpi-1/
│   │   │   └── page.tsx                # LPI-1 (Coming Soon)
│   │   ├── exam/
│   │   │   └── page.tsx                # 60-Fragen Security+ Examen
│   │   ├── acronym-quiz/
│   │   │   └── page.tsx                # Akronym-Quiz
│   │   └── pbq/
│   │       ├── firewall/
│   │       ├── incident-response/
│   │       ├── vpn-config/
│   │       ├── log-analysis/
│   │       ├── threat-analysis/
│   │       └── certificate-mgmt/
│   ├── lib/
│   │   ├── pbq-data.ts                 # Security+ PBQ Daten
│   │   ├── pt003-data.ts               # PenTest+ Daten (vollständig)
│   │   └── exam-data.ts                # Prüfungsfragen
│   └── components/
│       ├── pbq/
│       │   └── drag-drop-area.tsx      # Wiederverwendbare Drag & Drop
│       └── ui/                         # shadcn/ui Komponenten
└── README.md
```

## Technologie-Stack

- **Framework:** Next.js 14 (App Router)
- **Sprache:** TypeScript
- **Styling:** Tailwind CSS
- **UI-Komponenten:** shadcn/ui (Radix UI)
- **Datenbank:** PostgreSQL (via Prisma)
- **Icons:** Lucide React

## Features

### Kursauswahl-System
- Übersichtliche Landing Page mit allen verfügbaren Kursen
- Visuell ansprechende Kurs-Karten mit Status-Badges
- Farbkodierte Gradienten pro Zertifizierung
- Deaktivierte Kurse mit "Coming Soon" Status

### Security+ Features
- ✅ 6 realistische PBQs mit Drag & Drop
- ✅ 60-Fragen-Examen mit Timer
- ✅ Akronym-Quiz mit randomisierten Antworten
- ✅ Detaillierte Erklärungen und Lernmaterialien
- ✅ Session-basiertes Tracking
- ✅ Responsive Design für alle Geräte

### PenTest+ Features (In Entwicklung)
- ⏳ 10 PBQ-Szenarien (Daten fertig)
- ⏳ Tool Commander Mode (Daten fertig)
- ⏳ 90 Multiple-Choice-Fragen (34/90 fertig)
- ⏳ Bilingual EN/DE Interface

## Installation & Entwicklung

### Voraussetzungen
- Node.js 18+
- PostgreSQL
- Yarn

### Setup

```bash
cd /home/ubuntu/security_plus_pbq_simulator/nextjs_space

# Dependencies installieren
yarn install

# Prisma Client generieren
yarn prisma generate

# Datenbank initialisieren (falls noch nicht geschehen)
yarn prisma db push

# Development Server starten
yarn dev
```

Die Anwendung ist dann verfügbar unter: `http://localhost:3000`

## Deployment

Das Projekt ist bereits für Deployment auf Abacus.AI vorbereitet:

```bash
# Build für Produktion
yarn build

# Produktions-Server starten
yarn start
```

**Aktuelles Deployment:** `trygit.me`

## Nächste Schritte

### Kurzfristig
1. ✅ Multi-Kurs-Auswahl-System implementiert
2. ⏳ PenTest+ UI-Komponenten implementieren
3. ⏳ Restliche 56 PenTest+ MC-Fragen erstellen
4. ⏳ Tool Commander interaktive Challenges

### Mittelfristig
5. ⏳ Network+ Inhalte und PBQs
6. ⏳ Linux+ Command-Line-Simulationen
7. ⏳ LPI-1 Prüfungsinhalt

### Langfristig
- Benutzer-Authentifizierung
- Fortschritts-Tracking über Kurse hinweg
- Detaillierte Analytics pro Kurs
- Export von Lernergebnissen

## Datenquellen

### Security+
- Professor Messer's Security+ SY0-701 Course Notes
- Pass4Success Practice Exams
- ExamTopics Community Questions

### PenTest+
- 8 PBQ PDFs (ET63, ET56, ET11, ET48, ET267, ET337, etc.)
- CompTIA PT0-003 Study Guide
- CompTIA PT0-003 Official Exam Questions

## Lizenz & Verwendung

Dieses Projekt wurde entwickelt für **persönliche Prüfungsvorbereitung**. 
Alle Inhalte basieren auf öffentlich verfügbaren Studienmaterialien und offiziellen CompTIA-Prüfungszielen.

---

**Entwickelt mit ❤️ für IT-Professionals | 2025**
