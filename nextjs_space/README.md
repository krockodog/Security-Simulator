# CompTIA Security+ SY0-701 Exam Simulator

🎓 **Ein umfassender Lern-Simulator für die CompTIA Security+ SY0-701 Zertifizierungsprüfung**

## 🌟 Features

### 📝 Exam Modus
- **60 zufällige Prüfungsfragen** aus einem Pool von Fragen
- **90-Minuten Timer** mit automatischer Submission
- **Realistische Bewertung** (100-900 Punkte-Skala)
- **765+ Punkte zum Bestehen** (wie im echten Exam)
- **Keine sofortige Rückmeldung** während des Exams (exam-ähnlich)
- **Detaillierte Ergebnisse** nach Submission mit Erklärungen

### 📚 Akronym Quiz
- **40 zufällige Security+ Akronyme**
- **Sofortiges Feedback** nach jeder Antwort
- **Kurze Erklärungen** für jedes Akronym
- **Fortschritts-Tracking** durch das Quiz

### 🎯 Performance-Based Questions (PBQs)

#### 1. **Firewall Rules Configuration**
- Netzwerk-Segmentierung und DMZ
- Regel-Priorisierung und Ordering
- Implicit Deny und Best Practices

#### 2. **Incident Response**
- NIST Incident Response Lifecycle
- Ransomware-Szenario
- Richtige Reihenfolge der Response-Schritte

#### 3. **VPN Configuration**
- IPsec Site-to-Site VPN
- Encryption, Hashing, DH Groups
- Security Standards und Protocols

#### 4. **Threat Analysis**
- Log-Analyse und Attack Types
- Patient Zero Identification
- Remediation Matching

#### 5. **System Log Analysis**
- APT-Detection durch Log-Analyse
- Cyber Kill Chain Mapping
- Digital Forensics Investigation

#### 6. **Certificate Management**
- PKI und Certificate Lifecycle
- Troubleshooting (Expired, Revoked, Self-Signed)
- Remediation Actions

### 🎨 Design Features
- **Personalisierte Begrüßung** mit Namen-Speicherung
- **Dark/Light Mode** Support
- **Responsive Design** für alle Geräte
- **Farbcodierte Kategorien** für bessere Navigation
- **Drag-and-Drop** Interaktionen für PBQs

## 🚀 Technologie-Stack

- **Framework**: Next.js 14.2.28 (App Router)
- **Sprache**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + Shadcn/ui
- **Database**: PostgreSQL (Prisma ORM)
- **State Management**: React Hooks + Zustand
- **Deployment**: Vercel/Docker-ready

## 📦 Installation

### Voraussetzungen
- Node.js 18+ oder höher
- PostgreSQL Datenbank
- Yarn Package Manager

### Setup

1. **Repository klonen**
```bash
git clone https://github.com/krockodog/Sec-Simulator.git
cd Sec-Simulator
```

2. **Dependencies installieren**
```bash
yarn install
```

3. **Environment Variables konfigurieren**
```bash
cp .env.example .env
```

Bearbeiten Sie `.env` und fügen Sie Ihre Datenbank-URL hinzu:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/security_plus_db"
```

4. **Datenbank Setup**
```bash
# Prisma Client generieren
yarn prisma generate

# Datenbank-Migrationen ausführen
yarn prisma migrate dev
```

5. **Development Server starten**
```bash
yarn dev
```

Öffnen Sie [http://localhost:3000](http://localhost:3000) in Ihrem Browser.

## 🏗️ Projekt-Struktur

```
.
├── app/
│   ├── page.tsx                 # Homepage mit Übersicht
│   ├── exam/                    # 60-Fragen Exam
│   ├── acronym-quiz/           # Akronym-Quiz
│   ├── pbq/                    # Performance-Based Questions
│   │   ├── firewall/
│   │   ├── incident-response/
│   │   ├── vpn-config/
│   │   ├── threat-analysis/
│   │   ├── log-analysis/
│   │   └── certificate-mgmt/
│   └── api/
│       └── pbq/submit/         # API für PBQ-Tracking
├── components/
│   ├── pbq/                    # PBQ-spezifische Components
│   └── ui/                     # Shadcn UI Components
├── lib/
│   ├── exam-data.ts            # Exam & Quiz Fragen
│   ├── pbq-data.ts             # PBQ Content
│   ├── types.ts                # TypeScript Typen
│   └── utils.ts                # Utility-Funktionen
├── prisma/
│   └── schema.prisma           # Datenbank-Schema
└── public/                     # Statische Assets
```

## 📊 Datenbank-Schema

### PBQSession
- Session-Tracking für Benutzer
- Eindeutige Session-IDs
- Timestamp-Tracking

### PBQAttempt
- PBQ-Versuche mit Scoring
- JSON-Storage für User-Antworten
- Performance-Metriken

## 🎯 Verwendung

### Exam starten
1. Homepage öffnen
2. "Exam starten" Button klicken
3. 60 Fragen in 90 Minuten beantworten
4. Exam absenden für Bewertung
5. Detaillierte Ergebnisse mit Erklärungen ansehen

### Akronym-Quiz
1. "Quiz starten" Button klicken
2. Akronyme einzeln beantworten
3. Sofortiges Feedback nach jeder Antwort
4. Fortschritt durch alle 40 Fragen tracken

### PBQs absolvieren
1. Gewünschte PBQ auswählen
2. Szenario und Anweisungen lesen
3. Interaktive Aufgaben lösen (Drag-and-Drop, Auswahl)
4. Lösung absenden für Bewertung
5. Feedback und Erklärungen erhalten

## 🔧 Scripts

```bash
# Development
yarn dev              # Development Server starten

# Build
yarn build           # Production Build erstellen
yarn start           # Production Server starten

# Database
yarn prisma generate # Prisma Client generieren
yarn prisma migrate dev # Migrations ausführen
yarn prisma studio   # Prisma Studio öffnen

# Type Checking
yarn tsc --noEmit    # TypeScript Type-Check
```

## 🌐 Deployment

### Vercel (empfohlen)
1. Repository zu Vercel verbinden
2. Environment Variables konfigurieren
3. Automatisches Deployment bei Push

### Docker
```bash
# Image bauen
docker build -t security-plus-simulator .

# Container starten
docker run -p 3000:3000 security-plus-simulator
```

## 🤝 Beitragen

Beiträge sind willkommen! Bitte:
1. Fork das Repository
2. Feature-Branch erstellen (`git checkout -b feature/AmazingFeature`)
3. Änderungen committen (`git commit -m 'Add some AmazingFeature'`)
4. Branch pushen (`git push origin feature/AmazingFeature`)
5. Pull Request öffnen

## 📝 Lizenz

Dieses Projekt dient ausschließlich zu Lernzwecken. Alle Fragen und Inhalte sind zu Bildungszwecken erstellt.

## 🙏 Danksagungen

- **CompTIA** für das Security+ Zertifizierungsprogramm
- **Professor Messer** für exzellente Lernmaterialien
- **Shadcn/ui** für die großartigen UI-Components

## 📧 Kontakt

Bei Fragen oder Feedback:
- GitHub Issues: [Sec-Simulator Issues](https://github.com/krockodog/Sec-Simulator/issues)

---

**Viel Erfolg bei der CompTIA Security+ SY0-701 Prüfung! 🎓🔒**
