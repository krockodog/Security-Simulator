# CompTIA Security+ & PenTest+ Exam Simulator

🎓 **Umfassender Lern-Simulator für CompTIA Security+ SY0-701 und PenTest+ PT0-003 Zertifizierungen**

🌐 **Live Demo:** [https://trygit.me](https://trygit.me)

---

## 🌟 Features

### 🔐 Security+ SY0-701

#### 📝 Exam Modus
- **60 Prüfungsfragen** mit 90-Minuten Timer
- **Realistische Bewertung** (765+ zum Bestehen)
- **Detaillierte Ergebnisse** mit Erklärungen

#### 📚 Akronym Quiz
- **46 Security+ Akronyme** mit sofortigem Feedback

#### 🎯 6 Performance-Based Questions
| PBQ | Thema | Beschreibung |
|-----|-------|--------------|
| 1 | Firewall Rules | Regel-Priorisierung, DMZ, Implicit Deny |
| 2 | Incident Response | NIST Lifecycle, Ransomware-Szenario |
| 3 | VPN Configuration | IPsec, Encryption, DH Groups |
| 4 | Threat Analysis | Log-Analyse, Attack Types |
| 5 | Log Analysis | APT-Detection, Cyber Kill Chain |
| 6 | Certificate Mgmt | PKI, Troubleshooting |

---

### 🕵️ PenTest+ PT0-003

#### 📝 90 Fragen Exam
- **5 Domänen** vollständig abgedeckt:
  - Planning & Scoping (14 Fragen)
  - Information Gathering (19 Fragen)
  - Attacks & Exploits (19 Fragen)
  - Reporting (14 Fragen)
  - Tools & Code Analysis (24 Fragen)
- **Bilingual EN/DE**

#### 🎯 10 Performance-Based Questions
| PBQ | Thema | Beschreibung |
|-----|-------|--------------|
| 1 | Web Vulnerabilities | HTTP-Payload Analyse |
| 2 | Nmap Construction | Flag-basiertes Command Building |
| 3 | Certificate Assessment | SSL/TLS Analyse |
| 4 | Python Script | Port Scanner Code |
| 5 | DNS Reconnaissance | DNS Enumeration |
| 6 | Robots.txt Analysis | Web Recon |
| 7 | Wireless Pentest | WPA2 Enterprise, Deauth |
| 8 | Cloud S3 Security | AWS S3 Audit |
| 9 | Container Escape | Docker Breakout, cgroups |
| 10 | DOM XSS | Client-Side Exploitation |

#### 💻 Tool Commander (10 Challenges)
Interaktive CLI-Challenges für:
- **Nmap** - Network Scanning
- **SQLmap** - SQL Injection
- **Hydra** - Brute Force
- **Gobuster** - Directory Enumeration
- **Hashcat** - Password Cracking
- **Metasploit** - Exploitation Framework
- **Nikto** - Web Vulnerability Scanner
- **Wireshark/tshark** - Packet Analysis
- **John the Ripper** - Password Cracking

---

## 🎨 Design

- **Dark Cyber Theme** - Pure Black (#000) mit Cyan/Magenta Neon-Akzenten
- **Responsive Design** für alle Geräte
- **DSGVO-konform** mit Cookie-Consent Banner

---

## 🚀 Tech Stack

| Technologie | Version |
|-------------|---------|
| Next.js | 14.2.28 |
| TypeScript | 5.2.2 |
| Tailwind CSS | 3.3.3 |
| Radix UI | Latest |
| PostgreSQL | Prisma ORM |

---

## 📦 Installation

```bash
# Clone
git clone https://github.com/krockodog/Security-Simulator.git
cd Security-Simulator

# Install
yarn install

# Database
yarn prisma generate
yarn prisma migrate dev

# Run
yarn dev
```

---

## 🏗️ Projekt-Struktur

```
app/
├── page.tsx                    # Kursauswahl
├── security-plus/              # Security+ Dashboard
├── pentest-plus/               # PenTest+ Dashboard
├── exam/                       # Security+ Exam (60 Fragen)
├── pentest-exam/               # PenTest+ Exam (90 Fragen)
├── acronym-quiz/               # Akronym Quiz
├── tool-commander/             # Tool Commander Challenges
├── pbq/                        # Security+ PBQs
│   ├── firewall/
│   ├── incident-response/
│   ├── vpn-config/
│   ├── threat-analysis/
│   ├── log-analysis/
│   └── certificate-mgmt/
└── pentest-pbq/                # PenTest+ PBQs
    ├── web-vulns/
    ├── nmap-command/
    ├── certificate/
    ├── python-script/
    ├── dns-recon/
    ├── robots-txt/
    ├── wireless/
    ├── cloud-s3/
    ├── container-escape/
    └── dom-xss/

lib/
├── exam-data.ts                # Security+ Fragen & Akronyme
├── pt003-data.ts               # PenTest+ Fragen, PBQs, Tool Commander
├── pbq-data.ts                 # Security+ PBQ Content
└── types.ts                    # TypeScript Definitionen
```

---

## 📊 Implementierungsstatus

| Zertifizierung | Exam | PBQs | Extras | Status |
|----------------|------|------|--------|--------|
| Security+ SY0-701 | 60 Fragen | 6/6 | Akronym Quiz (46) | ✅ 100% |
| PenTest+ PT0-003 | 90 Fragen | 10/10 | Tool Commander (10) | ✅ 100% |
| Network+ N10-009 | - | - | - | 🔜 Coming Soon |
| Linux+ XK0-005 | - | - | - | 🔜 Coming Soon |
| LPI-1 (LPIC-1) | - | - | - | 🔜 Coming Soon |

---

## 📝 Lizenz

Ausschließlich zu Lernzwecken.

---

## 🙏 Danksagungen

- **CompTIA** für die Zertifizierungsprogramme
- **Professor Messer** für Lernmaterialien
- **Pass4Success** für Prüfungsinhalte

---

**© 2025 CompTIA Zertifikation - als Unterstützung | Entwickelt für IT-Studenten | trygit.me**