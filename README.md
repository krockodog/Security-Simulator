# CompTIA Certification PBQ Simulator

> **Live Demo:** [https://trygit.me](https://trygit.me)

Ein interaktiver Performance-Based Questions (PBQ) Simulator für CompTIA Security+ (SY0-701) und PenTest+ (PT0-003) Zertifizierungen.

## 🎯 Features

### Security+ SY0-701
- **6 PBQ-Simulationen:**
  - Firewall Rule Ordering (Drag & Drop)
  - Incident Response Workflow
  - Threat Analysis & Remediation
  - Log Analysis
  - Certificate Management
  - VPN Configuration
- **60 Multiple-Choice Fragen** aus allen Domains
- **46 Akronym-Quiz Fragen** (randomisierte Antwortpositionen)

### PenTest+ PT0-003
- **10 interaktive PBQ-Simulationen:**
  1. Nmap Command Construction
  2. Web Vulnerability Analysis
  3. Certificate/TLS Testing
  4. Python Exploit Scripting
  5. Container Escape (Docker Privilege Escalation)
  6. DNS Reconnaissance & WHOIS
  7. Robots.txt Vulnerability Analysis
  8. DOM-based XSS Exploitation
  9. AWS S3 Bucket Security
  10. Wireless Penetration Testing

- **Tool Commander:** 10 CLI-Challenges für:
  - Nmap, SQLmap, Hydra, Gobuster
  - Hashcat, Metasploit, Nikto
  - Wireshark/tshark, John the Ripper

- **91 Multiple-Choice Fragen:**
  | Domain | Fragen | Gewichtung |
  |--------|--------|------------|
  | Planning & Scoping | 14 | 15% |
  | Information Gathering | 19 | 21% |
  | Attacks & Exploits | 19 | 35% |
  | Reporting | 14 | 15% |
  | Tools & Code Analysis | 24 | 20% |

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Radix UI
- **Database:** PostgreSQL + Prisma ORM
- **Theme:** Dark "Cyber" Design (Pure Black + Cyan/Magenta Accents)

## 📁 Projektstruktur

```
nextjs_space/
├── app/
│   ├── page.tsx                 # Landing Page
│   ├── security-plus/           # Security+ Dashboard
│   ├── pentest-plus/            # PenTest+ Dashboard
│   ├── exam/                    # Security+ MCQ Exam
│   ├── pentest-exam/            # PenTest+ MCQ Exam
│   ├── acronym-quiz/            # Akronym-Quiz
│   ├── tool-commander/          # CLI Tool Challenges
│   ├── pbq/                     # Security+ PBQs
│   │   ├── firewall/
│   │   ├── incident-response/
│   │   ├── threat-analysis/
│   │   ├── log-analysis/
│   │   ├── certificate-mgmt/
│   │   └── vpn-config/
│   └── pentest-pbq/             # PenTest+ PBQs
│       ├── nmap-command/
│       ├── web-vulns/
│       ├── certificate/
│       ├── python-script/
│       ├── container-escape/
│       ├── dns-recon/
│       ├── robots-txt/
│       ├── dom-xss/
│       ├── cloud-s3/
│       └── wireless/
├── lib/
│   ├── exam-data.ts             # Security+ Fragen
│   ├── pt003-data.ts            # PenTest+ Fragen (91 MCQ + 10 PBQ)
│   └── pbq-data.ts              # Security+ PBQ Content
└── components/
    ├── ui/                      # Radix UI Components
    ├── pbq/                     # PBQ-spezifische Components
    └── cookie-consent.tsx       # DSGVO-Banner
```

## 🚀 Installation

```bash
# Repository klonen
git clone https://github.com/yourusername/security-plus-pbq-simulator.git
cd security-plus-pbq-simulator/nextjs_space

# Dependencies installieren
yarn install

# Prisma Client generieren
yarn prisma generate

# Development Server starten
yarn dev
```

## 📊 Implementierungsstatus

| Zertifizierung | PBQs | MCQs | Status |
|----------------|------|------|--------|
| Security+ SY0-701 | 6/6 | 60/60 | ✅ Vollständig |
| PenTest+ PT0-003 | 10/10 | 91/91 | ✅ Vollständig |
| Network+ N10-009 | - | - | 🔜 Coming Soon |
| Linux+ XK0-005 | - | - | 🔜 Coming Soon |
| LPI-1 (101/102) | - | - | 🔜 Coming Soon |

## 🎨 Design

- **Theme:** Minimalistisches "Cyber" Dark Mode
- **Hintergrund:** Pure Black (`#000000`)
- **Akzentfarben:** Cyan (`#00FFFF`) + Magenta (`#FF00FF`)
- **Borders:** 1px subtle mit `border-cyan-500/30`
- **Komponenten:** shadcn/ui basiert auf Radix Primitives

## 📝 DSGVO-Konformität

- Cookie-Consent Banner mit expliziter Zustimmung
- Keine Third-Party Tracking-Scripts
- LocalStorage nur für Benutzereinstellungen

## 📜 Lizenz

Dieses Projekt ist für **Bildungszwecke** konzipiert.

---

**© 2025 CompTIA - Zertifikation - als Unterstützung | Entwickelt für IT - Studenten**  
**Copyright by [trygit.me](https://trygit.me)**
