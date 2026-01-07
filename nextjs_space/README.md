# 🎓 CompTIA - Zertifikation - Begleiter

> Dein interaktiver Lernpartner für CompTIA-Zertifizierungen

[![Live Demo](https://img.shields.io/badge/Live-trygit.me-00ffff?style=for-the-badge)](https://trygit.me)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?style=for-the-badge&logo=typescript)](https://typescriptlang.org)

---

## 📋 Inhaltsverzeichnis

- [Überblick](#-überblick)
- [Security+ SY0-701](#-security-sy0-701)
- [PenTest+ PT0-003](#-pentest-pt0-003)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Projektstruktur](#-projektstruktur)
- [Roadmap](#-roadmap)

---

## 🌟 Überblick

Der **CompTIA - Zertifikation - Begleiter** ist eine interaktive Lernplattform für IT-Sicherheitszertifizierungen. Die Anwendung bietet realistische Prüfungssimulationen, Performance-Based Questions (PBQs) und praktische Tool-Übungen.

### ✨ Highlights

- 🖥️ **Dark Cyber Theme** - Professionelles Design mit Neon-Akzenten
- 📱 **Responsive** - Optimiert für Desktop, Tablet und Mobile
- 🔒 **DSGVO-konform** - Cookie-Consent Banner integriert
- 🎯 **Prüfungsnah** - Realistische Fragen und Szenarien
- 🌐 **Bilingual** - Deutsch/Englisch Unterstützung

---

## 🛡️ Security+ SY0-701

### 📝 Exam Simulation
| Feature | Details |
|---------|---------|
| Fragen | 60 Multiple-Choice |
| Timer | 90 Minuten |
| Bestehensgrenze | 765+ Punkte |
| Bewertung | 100-900 Skala |

### 📚 Akronym Quiz
- **46 Security-Akronyme** mit sofortigem Feedback
- Randomisierte Fragen und Antwortpositionen
- Detaillierte Erklärungen

### 🎯 Performance-Based Questions (6)

| # | PBQ | Szenario | Skills |
|---|-----|----------|--------|
| 1 | **Firewall Rules** | Netzwerk-Segmentierung | Regel-Priorisierung, DMZ, Implicit Deny |
| 2 | **Incident Response** | Ransomware-Angriff | NIST Lifecycle, Containment, Eradication |
| 3 | **VPN Configuration** | Site-to-Site IPsec | Encryption, DH Groups, Hashing |
| 4 | **Threat Analysis** | Log-Analyse | Attack Types, Patient Zero, Remediation |
| 5 | **Log Analysis** | APT-Detection | Cyber Kill Chain, Digital Forensics |
| 6 | **Certificate Management** | PKI Troubleshooting | Expired, Revoked, Self-Signed |

---

## 🕵️ PenTest+ PT0-003

### 📝 Exam Simulation
| Feature | Details |
|---------|---------|
| Fragen | 90 Multiple-Choice |
| Domänen | 5 (vollständig abgedeckt) |
| Sprache | Bilingual EN/DE |

#### Domänenverteilung
| Domäne | Gewichtung | Fragen |
|--------|------------|--------|
| Planning & Scoping | 15% | 14 |
| Information Gathering | 21% | 19 |
| Attacks & Exploits | 35% | 19 |
| Reporting | 15% | 14 |
| Tools & Code Analysis | 20% | 24 |

### 🎯 Performance-Based Questions (10)

| # | PBQ | Szenario | Technologien |
|---|-----|----------|--------------|
| 1 | **Web Vulnerabilities** | HTTP-Payload Analyse | OWASP Top 10, Injection |
| 2 | **Nmap Construction** | Command Building | Port Scanning, Service Detection |
| 3 | **Certificate Assessment** | SSL/TLS Audit | X.509, Chain Validation |
| 4 | **Python Script** | Port Scanner | Socket Programming, Threading |
| 5 | **DNS Reconnaissance** | Enumeration | Zone Transfer, WHOIS |
| 6 | **Robots.txt Analysis** | Web Recon | Directory Discovery |
| 7 | **Wireless Pentest** | WPA2 Enterprise | Deauth, Hash Extraction |
| 8 | **Cloud S3 Security** | AWS Audit | Bucket Policies, ACLs |
| 9 | **Container Escape** | Docker Breakout | Cgroups, Namespace Escape |
| 10 | **DOM XSS** | Client-Side Exploits | Payload Crafting, WAF Bypass |

### 💻 Tool Commander (10 Challenges)

Interaktive CLI-Szenarien mit Multiple-Choice:

| Tool | Einsatzgebiet | Beispiel-Szenario |
|------|---------------|-------------------|
| **Nmap** | Network Scanning | Ping Sweep, Service Detection |
| **SQLmap** | SQL Injection | POST Parameter Injection |
| **Hydra** | Brute Force | SSH Password Attack |
| **Gobuster** | Directory Enum | Web Path Discovery |
| **Hashcat** | Password Cracking | NTLM with Rules |
| **Metasploit** | Exploitation | EternalBlue (MS17-010) |
| **Nikto** | Web Scanning | Vulnerability Detection |
| **Wireshark** | Packet Analysis | HTTP Traffic Capture |
| **John the Ripper** | Hash Cracking | Shadow File Attack |

---

## 🚀 Tech Stack

| Kategorie | Technologie | Version |
|-----------|-------------|---------|
| Framework | Next.js (App Router) | 14.2.28 |
| Sprache | TypeScript | 5.2.2 |
| Styling | Tailwind CSS | 3.3.3 |
| UI Components | Radix UI + Shadcn/ui | Latest |
| Database | PostgreSQL + Prisma | 6.7.0 |
| State | React Hooks + Zustand | 5.0.3 |
| Animations | Framer Motion | 10.18.0 |

---

## 📦 Installation

### Voraussetzungen
- Node.js 18+
- PostgreSQL
- Yarn

### Setup

```bash
# Repository klonen
git clone https://github.com/krockodog/Security-Simulator.git
cd Security-Simulator

# Dependencies installieren
yarn install

# Environment konfigurieren
cp .env.example .env
# DATABASE_URL in .env anpassen

# Datenbank initialisieren
yarn prisma generate
yarn prisma migrate dev

# Development Server starten
yarn dev
```

Öffne [http://localhost:3000](http://localhost:3000)

---

## 🏗️ Projektstruktur

```
nextjs_space/
├── app/
│   ├── page.tsx                    # Kursauswahl (Homepage)
│   ├── layout.tsx                  # Root Layout + Cookie Consent
│   ├── globals.css                 # Dark Cyber Theme
│   │
│   ├── security-plus/              # Security+ Dashboard
│   ├── exam/                       # Security+ Exam (60 Fragen)
│   ├── acronym-quiz/               # Akronym Quiz (46 Begriffe)
│   ├── pbq/                        # Security+ PBQs
│   │   ├── firewall/
│   │   ├── incident-response/
│   │   ├── vpn-config/
│   │   ├── threat-analysis/
│   │   ├── log-analysis/
│   │   └── certificate-mgmt/
│   │
│   ├── pentest-plus/               # PenTest+ Dashboard
│   ├── pentest-exam/               # PenTest+ Exam (90 Fragen)
│   ├── tool-commander/             # Tool Challenges (10)
│   ├── pentest-pbq/                # PenTest+ PBQs
│   │   ├── web-vulns/
│   │   ├── nmap-command/
│   │   ├── certificate/
│   │   ├── python-script/
│   │   ├── dns-recon/
│   │   ├── robots-txt/
│   │   ├── wireless/
│   │   ├── cloud-s3/
│   │   ├── container-escape/
│   │   └── dom-xss/
│   │
│   ├── network-plus/               # 🔜 Coming Soon
│   ├── linux-plus/                 # 🔜 Coming Soon
│   └── lpi-1/                      # 🔜 Coming Soon
│
├── components/
│   ├── ui/                         # Shadcn/ui Components
│   ├── pbq/                        # Drag-Drop Components
│   └── cookie-consent.tsx          # DSGVO Banner
│
├── lib/
│   ├── exam-data.ts                # Security+ Fragen + Akronyme
│   ├── pt003-data.ts               # PenTest+ Fragen + PBQs + Tools
│   ├── pbq-data.ts                 # Security+ PBQ Content
│   ├── types.ts                    # TypeScript Definitionen
│   └── utils.ts                    # Utility Functions
│
└── prisma/
    └── schema.prisma               # Database Schema
```

---

## 📊 Implementierungsstatus

| Zertifizierung | Exam | PBQs | Extras | Status |
|----------------|------|------|--------|--------|
| **Security+ SY0-701** | ✅ 60 Fragen | ✅ 6/6 | ✅ 46 Akronyme | 🟢 100% |
| **PenTest+ PT0-003** | ✅ 90 Fragen | ✅ 10/10 | ✅ 10 Tool Challenges | 🟢 100% |
| Network+ N10-009 | 🔜 | 🔜 | 🔜 | ⚪ Geplant |
| Linux+ XK0-005 | 🔜 | 🔜 | 🔜 | ⚪ Geplant |
| LPIC-1 (101/102) | 🔜 | 🔜 | 🔜 | ⚪ Geplant |

---

## 🗺️ Roadmap

### Phase 1 ✅ (Abgeschlossen)
- [x] Security+ SY0-701 Exam + PBQs
- [x] Akronym Quiz
- [x] Dark Cyber Theme
- [x] DSGVO Cookie Consent

### Phase 2 ✅ (Abgeschlossen)
- [x] PenTest+ PT0-003 Exam (90 Fragen)
- [x] 10 PenTest+ PBQs
- [x] Tool Commander (10 Challenges)
- [x] Bilingual Support (EN/DE)

### Phase 3 🔜 (Geplant)
- [ ] Network+ N10-009
- [ ] Linux+ XK0-005
- [ ] LPIC-1 (101-500/102-500)
- [ ] Fortschritts-Tracking mit Datenbank
- [ ] Benutzer-Accounts

---

## 🙏 Danksagungen

- **CompTIA** - Zertifizierungsprogramme
- **Professor Messer** - Lernmaterialien
- **Pass4Success** - Prüfungsvorbereitung
- **Shadcn/ui** - UI Components

---

## 📝 Lizenz

Dieses Projekt dient ausschließlich zu Lernzwecken.

---

<div align="center">

**© 2025 CompTIA - Zertifikation - Begleiter**

Entwickelt für IT-Studenten | [trygit.me](https://trygit.me)

</div>