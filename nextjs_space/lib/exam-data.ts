// Security+ SY0-701 Exam Data

export interface ExamQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0-based index (for single-choice questions)
  correctAnswers?: number[]; // For multiple-choice questions
  isMultipleChoice?: boolean; // If true, user must select multiple answers
  requiredSelections?: number; // Number of answers to select (e.g., 2 for "Choose TWO")
  explanation: string;
  domain: string;
}

export interface AcronymQuestion {
  id: string;
  acronym: string;
  fullForm: string;
  explanation: string;
  options: string[];
  correctAnswer: number;
}

// 100 Security+ Exam Questions Pool
export const examQuestionBank: ExamQuestion[] = [
  {
    id: "q1",
    question: "An employee received an email from a payment website that asked the employee to update contact information. The employee entered the log-in information but received a 'page not found' error message. Which of the following types of social engineering attacks occurred?",
    options: [
      "Brand impersonation",
      "Pretexting",
      "Typosquatting",
      "Phishing"
    ],
    correctAnswer: 3,
    explanation: "Phishing ist ein Social-Engineering-Angriff, der betrügerische E-Mails von scheinbar legitimen Quellen verwendet, um Benutzer dazu zu bringen, auf bösartige Links zu klicken oder sensible Informationen preiszugeben. Die gefälschte Website hat die Anmeldeinformationen gestohlen.",
    domain: "2.2 Threats, Vulnerabilities, and Mitigations"
  },
  {
    id: "q2",
    question: "An enterprise is trying to limit outbound DNS traffic originating from its internal network. Outbound DNS requests will only be allowed from one device with the IP address 10.50.10.25. Which of the following firewall ACLs will accomplish this goal?",
    options: [
      "access-list outbound permit 0.0.0.0/0 10.50.10.25/32 port 53\naccess-list outbound deny 0.0.0.0/0 0.0.0.0/0 port 53",
      "access-list outbound permit 0.0.0.0/0 0.0.0.0/0 port 53\naccess-list outbound deny 10.50.10.25/32 0.0.0.0/0 port 53",
      "access-list outbound permit 0.0.0.0/0 0.0.0.0/0 port 53\naccess-list outbound deny 0.0.0.0/0 10.50.10.25/32 port 53",
      "access-list outbound permit 10.50.10.25/32 0.0.0.0/0 port 53\naccess-list outbound deny 0.0.0.0/0 0.0.0.0/0 port 53"
    ],
    correctAnswer: 3,
    explanation: "Die korrekte ACL erlaubt nur dem Gerät mit IP 10.50.10.25 ausgehende DNS-Anfragen (Port 53) und blockiert alle anderen Geräte. Die Permit-Regel muss vor der Deny-Regel stehen.",
    domain: "4.1 Security Architecture"
  },
  {
    id: "q3",
    question: "A data administrator is configuring authentication for a SaaS application and would like to reduce the number of credentials employees need to maintain. The company prefers to use domain credentials to access new SaaS applications. Which of the following methods would allow this functionality?",
    options: ["SSO", "LEAP", "MFA", "PEAP"],
    correctAnswer: 0,
    explanation: "Single Sign-On (SSO) ermöglicht es Benutzern, mit einem Satz von Anmeldeinformationen auf mehrere Anwendungen zuzugreifen. SSO kann mit Domain-Credentials über Protokolle wie SAML, OAuth oder OpenID Connect implementiert werden.",
    domain: "4.6 Identity and Access Management"
  },
  {
    id: "q4",
    question: "Which of the following scenarios describes a possible business email compromise attack?",
    options: [
      "An employee receives a gift card request in an email that has an executive's name in the display field",
      "Employees who open an email attachment receive messages demanding payment to access files",
      "A service desk employee receives an email from the HR director asking for log-in credentials",
      "An employee receives an email claiming to be from the IRS requesting payment information"
    ],
    correctAnswer: 0,
    explanation: "Business Email Compromise (BEC) ist ein Angriff, bei dem sich der Angreifer als Führungskraft ausgibt, um Mitarbeiter zu betrügen. Die Verwendung des Namens einer Führungskraft im Anzeigefeld ist typisch für BEC.",
    domain: "2.2 Threats, Vulnerabilities, and Mitigations"
  },
  {
    id: "q5",
    question: "A company prevented direct access from the database administrators' workstations to the network segment that contains database servers. Which of the following should a database administrator use to access the database servers?",
    options: ["Jump server", "RADIUS", "HSM", "Load balancer"],
    correctAnswer: 0,
    explanation: "Ein Jump-Server (auch Bastion Host) fungiert als sicherer Vermittler zwischen dem Arbeitsplatz des Administrators und den Datenbankservern. Er bietet Zugriffskontrolle, Protokollierung und verhindert direkten Zugriff.",
    domain: "4.1 Security Architecture"
  },
  {
    id: "q6",
    question: "An organization's internet-facing website was compromised when an attacker exploited a buffer overflow. Which of the following should the organization deploy to best protect against similar attacks in the future?",
    options: ["NGFW", "WAF", "TLS", "SD-WAN"],
    correctAnswer: 1,
    explanation: "Eine Web Application Firewall (WAF) überwacht und filtert HTTP/HTTPS-Traffic zu Webanwendungen und kann Buffer Overflow, SQL Injection, XSS und andere Web-Angriffe erkennen und blockieren.",
    domain: "4.5 Security Infrastructure"
  },
  {
    id: "q7",
    question: "An administrator notices that several users are logging in from suspicious IP addresses. After speaking with the users, the administrator determines that the employees were not logging in from those IP addresses and resets the affected users' passwords. Which of the following should the administrator implement to prevent this type of attack from succeeding in the future?",
    options: [
      "Multifactor authentication",
      "Permissions assignment",
      "Access management",
      "Password complexity"
    ],
    correctAnswer: 0,
    explanation: "Multi-Faktor-Authentifizierung (MFA) erfordert mindestens zwei Faktoren zur Identitätsprüfung. Selbst wenn ein Passwort kompromittiert ist, kann ein Angreifer ohne den zweiten Faktor (z.B. Token, Biometrie) nicht zugreifen.",
    domain: "4.6 Identity and Access Management"
  },
  {
    id: "q8",
    question: "An employee receives a text message that appears to have been sent by the payroll department and is asking for credential verification. Which of the following social engineering techniques are being attempted? (Choose TWO)",
    options: ["Typosquatting", "Phishing", "Impersonation", "Vishing", "Smishing", "Misinformation"],
    correctAnswer: 4,
    explanation: "Smishing (SMS Phishing) verwendet Textnachrichten, um Opfer zu täuschen. Impersonation (hier auch zutreffend) bedeutet, sich als jemand anderes auszugeben. Die richtige Antwort fokussiert auf Smishing da es sich um eine SMS handelt.",
    domain: "2.2 Threats, Vulnerabilities, and Mitigations"
  },
  {
    id: "q9",
    question: "During a security incident, the security operations team identified sustained network traffic from a malicious IP address: 10.1.4.9. A security analyst is creating an inbound firewall rule to block the IP address from accessing the organization's network. Which of the following fulfills this request?",
    options: [
      "access-list inbound deny ip source 0.0.0.0/0 destination 10.1.4.9/32",
      "access-list inbound deny ip source 10.1.4.9/32 destination 0.0.0.0/0",
      "access-list inbound permit ip source 10.1.4.9/32 destination 0.0.0.0/0",
      "access-list inbound permit ip source 0.0.0.0/0 destination 10.1.4.9/32"
    ],
    correctAnswer: 1,
    explanation: "Die Regel muss eingehenden Traffic von der bösartigen IP 10.1.4.9 (Source) zu beliebigen Zielen (0.0.0.0/0) blockieren. Die Aktion muss 'deny' sein.",
    domain: "4.5 Security Infrastructure"
  },
  {
    id: "q10",
    question: "A company needs to provide administrative access to internal resources while minimizing the traffic allowed through the security boundary. Which of the following methods is most secure?",
    options: [
      "Implementing a bastion host",
      "Deploying a perimeter network",
      "Installing a WAF",
      "Utilizing single sign-on"
    ],
    correctAnswer: 0,
    explanation: "Ein Bastion Host bietet einen einzelnen, gesicherten Zugangspunkt für administrative Zugriffe. Er minimiert die Angriffsfläche und ermöglicht starke Authentifizierung, Verschlüsselung und Protokollierung.",
    domain: "4.1 Security Architecture"
  },
  {
    id: "q11",
    question: "A security analyst is reviewing alerts in the SIEM related to potential malicious network traffic coming from an employee's corporate laptop. The security analyst has determined that additional data about the executable running on the machine is necessary to continue the investigation. Which of the following logs should the analyst use as a data source?",
    options: ["Application", "IPS/IDS", "Network", "Endpoint"],
    correctAnswer: 3,
    explanation: "Endpoint-Logs enthalten detaillierte Informationen über laufende Prozesse, Executables, Dateioperationen und Systemaktivitäten auf dem Gerät. Sie sind die beste Quelle für Informationen über ausgeführte Programme.",
    domain: "4.8 Logging and Monitoring"
  },
  {
    id: "q12",
    question: "A cyber operations team informs a security analyst about a new tactic malicious actors are using to compromise networks. SIEM alerts have not yet been configured. Which of the following best describes what the security analyst should do to identify this behavior?",
    options: ["Digital forensics", "E-discovery", "Incident response", "Threat hunting"],
    correctAnswer: 3,
    explanation: "Threat Hunting ist die proaktive Suche nach Anzeichen bösartiger Aktivitäten im Netzwerk, bevor Alerts ausgelöst werden. Es ermöglicht die Identifizierung neuer TTPs (Tactics, Techniques, Procedures) und verborgener Bedrohungen.",
    domain: "4.8 Logging and Monitoring"
  },
  {
    id: "q13",
    question: "A company purchased cyber insurance to address items listed on the risk register. Which of the following strategies does this represent?",
    options: ["Accept", "Transfer", "Mitigate", "Avoid"],
    correctAnswer: 1,
    explanation: "Risk Transfer bedeutet die Übertragung des Risikos auf eine dritte Partei. Cyber-Versicherungen sind ein klassisches Beispiel für Risk Transfer, da finanzielle Verluste durch Cyberangriffe auf die Versicherung übertragen werden.",
    domain: "5.1 Security Program Management"
  },
  {
    id: "q14",
    question: "A security administrator would like to protect data on employees' laptops. Which of the following encryption techniques should the security administrator use?",
    options: ["Partition", "Asymmetric", "Full disk", "Database"],
    correctAnswer: 2,
    explanation: "Full Disk Encryption (FDE) verschlüsselt alle Daten auf einer Festplatte, einschließlich Betriebssystem, Anwendungen und Dateien. FDE schützt Daten im Falle von Diebstahl oder Verlust des Laptops.",
    domain: "1.4 Cryptography"
  },
  {
    id: "q15",
    question: "Which of the following security control types does an acceptable use policy best represent?",
    options: ["Detective", "Compensating", "Corrective", "Preventive"],
    correctAnswer: 3,
    explanation: "Eine Acceptable Use Policy (AUP) ist ein präventives (Preventive) Control, da sie Regeln definiert, um Sicherheitsvorfälle im Voraus zu verhindern. Sie ist ein administratives Control, das unerwünschte Verhaltensweisen abschrecken soll.",
    domain: "5.1 Security Program Management"
  },
  {
    id: "q16",
    question: "An IT manager informs the entire help desk staff that only the IT manager and the help desk lead will have access to the administrator console. Which of the following security techniques is the IT manager setting up?",
    options: ["Hardening", "Employee monitoring", "Configuration enforcement", "Least privilege"],
    correctAnswer: 3,
    explanation: "Least Privilege bedeutet, dass Benutzer nur die minimalen Berechtigungen erhalten, die sie zur Erfüllung ihrer Aufgaben benötigen. Die Beschränkung des Admin-Zugriffs auf zwei Personen folgt diesem Prinzip.",
    domain: "4.6 Identity and Access Management"
  },
  {
    id: "q17",
    question: "Which of the following is the most likely to be used to document risks, responsible parties, and thresholds?",
    options: ["Risk tolerance", "Risk transfer", "Risk register", "Risk analysis"],
    correctAnswer: 2,
    explanation: "Ein Risk Register ist ein Dokument, das alle identifizierten Risiken, deren Eigentümer, Wahrscheinlichkeit, Auswirkung, Schwellenwerte und Reaktionsstrategien dokumentiert. Es ist ein zentrales Tool im Risikomanagement.",
    domain: "5.1 Security Program Management"
  },
  {
    id: "q18",
    question: "Which of the following should a security administrator adhere to when setting up a new set of firewall rules?",
    options: [
      "Disaster recovery plan",
      "Incident response procedure",
      "Business continuity plan",
      "Change management procedure"
    ],
    correctAnswer: 3,
    explanation: "Change Management Procedures stellen sicher, dass Änderungen (wie neue Firewall-Regeln) geplant, genehmigt, dokumentiert und getestet werden, bevor sie implementiert werden. Dies minimiert Fehler und Ausfallzeiten.",
    domain: "5.1 Security Program Management"
  },
  {
    id: "q19",
    question: "A company is expanding its threat surface program and allowing individuals to security test the company's internet-facing application. The company will compensate researchers based on the vulnerabilities discovered. Which of the following best describes the program?",
    options: ["Open-source intelligence", "Bug bounty", "Red team", "Penetration testing"],
    correctAnswer: 1,
    explanation: "Ein Bug Bounty Programm belohnt externe Sicherheitsforscher für das Finden und Melden von Sicherheitslücken. Es ist eine kosteneffektive Methode, die Sicherheit von Anwendungen zu verbessern.",
    domain: "5.3 Security Awareness and Training"
  },
  {
    id: "q20",
    question: "Which of the following threat actors is the most likely to use large financial resources to attack critical systems located in other countries?",
    options: ["Insider", "Unskilled attacker", "Nation-state", "Hacktivist"],
    correctAnswer: 2,
    explanation: "Nation-State Akteure sind staatlich geförderte Gruppen mit umfangreichen Ressourcen, die komplexe und gezielte Angriffe auf kritische Infrastrukturen und Systeme in anderen Ländern durchführen.",
    domain: "2.1 Threat Actors and Motivations"
  },
  {
    id: "q21",
    question: "Which of the following enables the use of an input field to run commands that can view or manipulate data?",
    options: ["Cross-site scripting", "Side loading", "Buffer overflow", "SQL injection"],
    correctAnswer: 3,
    explanation: "SQL Injection ermöglicht es Angreifern, SQL-Befehle über Eingabefelder einzuschleusen, um Daten anzuzeigen, zu ändern oder zu löschen. Es ist eine der häufigsten Web-Schwachstellen.",
    domain: "2.3 Application and Network Attacks"
  },
  {
    id: "q22",
    question: "Employees in the research and development business unit receive extensive training to ensure they understand how to best protect company data. Which of the following is the type of data these employees are most likely to use in day-to-day work activities?",
    options: ["Encrypted", "Intellectual property", "Critical", "Data in transit"],
    correctAnswer: 1,
    explanation: "Research and Development arbeitet mit Intellectual Property (geistigem Eigentum) wie Patenten, Designs, Formeln und proprietären Informationen. Diese Daten sind hochsensibel und erfordern besonderen Schutz.",
    domain: "3.3 Data Types and Classifications"
  },
  {
    id: "q23",
    question: "A technician wants to improve the situational and environmental awareness of existing users as they transition from remote to in-office work. Which of the following is the best option?",
    options: [
      "Send out periodic security reminders",
      "Update the content of new hire documentation",
      "Modify the content of recurring training",
      "Implement a phishing campaign"
    ],
    correctAnswer: 2,
    explanation: "Recurring Training (wiederkehrende Schulungen) sollte modifiziert werden, um aktuelle Bedrohungen und Best Practices für die veränderte Arbeitsumgebung zu behandeln. Dies verbessert das Sicherheitsbewusstsein nachhaltig.",
    domain: "5.3 Security Awareness and Training"
  },
  {
    id: "q24",
    question: "Which of the following roles, according to the shared responsibility model, is responsible for securing the company's database in an IaaS model for a cloud environment?",
    options: ["Client", "Third-party vendor", "Cloud provider", "DBA"],
    correctAnswer: 0,
    explanation: "Im IaaS-Modell ist der Cloud Provider für die physische Infrastruktur verantwortlich, während der Client für OS, Anwendungen und Daten (einschließlich Datenbanken) verantwortlich ist.",
    domain: "3.1 Cloud and Virtualization Concepts"
  },
  {
    id: "q25",
    question: "Which of the following is used to quantitatively measure the criticality of a vulnerability?",
    options: ["CVE", "CVSS", "CIA", "CERT"],
    correctAnswer: 1,
    explanation: "CVSS (Common Vulnerability Scoring System) bietet eine standardisierte Methode zur Bewertung des Schweregrads von Sicherheitslücken mit einem Score von 0-10. Dies hilft bei der Priorisierung von Patches.",
    domain: "5.2 Security Concepts"
  },
  {
    id: "q26",
    question: "Which of the following methods to secure credit card data is best to use when a requirement is to see only the last four numbers on a credit card?",
    options: ["Encryption", "Hashing", "Masking", "Tokenization"],
    correctAnswer: 2,
    explanation: "Masking ersetzt Teile sensibler Daten mit Symbolen (z.B. ****-****-****-1234), während einige Ziffern sichtbar bleiben. Dies ermöglicht Identifikation, während die vollständigen Daten geschützt sind.",
    domain: "1.4 Cryptography"
  },
  {
    id: "q27",
    question: "An administrator finds that all user workstations and servers are displaying a message that is associated with files containing an extension of .ryk. Which of the following types of infections is present on the systems?",
    options: ["Virus", "Trojan", "Spyware", "Ransomware"],
    correctAnswer: 3,
    explanation: "Ransomware verschlüsselt Dateien und fordert Lösegeld für die Entschlüsselung. Die .ryk-Erweiterung ist typisch für Ryuk Ransomware, die große Organisationen angreift.",
    domain: "2.4 Malware"
  },
  {
    id: "q28",
    question: "A healthcare organization wants to provide a web application that allows individuals to digitally report health emergencies. Which of the following is the most important consideration during development?",
    options: ["Scalability", "Availability", "Cost", "Ease of deployment"],
    correctAnswer: 1,
    explanation: "Availability (Verfügbarkeit) ist entscheidend für eine Notfall-Meldeanwendung im Gesundheitswesen. Ausfallzeiten könnten lebensbedrohliche Folgen haben. Die Anwendung muss immer erreichbar sein.",
    domain: "5.2 Security Concepts"
  },
  {
    id: "q29",
    question: "An organization wants a third-party vendor to do a penetration test that targets a specific device. The organization has provided basic information about the device. Which of the following best describes this kind of penetration test?",
    options: ["Partially known environment", "Unknown environment", "Integrated", "Known environment"],
    correctAnswer: 0,
    explanation: "Partially Known Environment (Gray Box Test) bedeutet, dass der Tester einige Informationen über das Ziel hat, aber nicht alle. Dies ist realistischer als vollständige Kenntnis oder völlige Unkenntnis.",
    domain: "5.3 Security Assessment and Testing"
  },
  {
    id: "q30",
    question: "An attacker posing as the Chief Executive Officer calls an employee and instructs the employee to buy gift cards. Which of the following techniques is the attacker using?",
    options: ["Smishing", "Disinformation", "Impersonating", "Whaling"],
    correctAnswer: 3,
    explanation: "Whaling (auch CEO Fraud genannt) ist ein gezielter Phishing-Angriff gegen hochrangige Führungskräfte oder deren Imitation zur Täuschung von Mitarbeitern. Der Angreifer gibt sich als CEO aus.",
    domain: "2.2 Threats, Vulnerabilities, and Mitigations"
  },
  {
    id: "q31",
    question: "An analyst is evaluating the implementation of Zero Trust principles within the data plane. Which of the following would be most relevant for the analyst to evaluate?",
    options: ["Secured zones", "Subject role", "Adaptive identity", "Threat scope reduction"],
    correctAnswer: 0,
    explanation: "Secured Zones sind logische oder physische Netzwerksegmente, die Daten und Ressourcen basierend auf Sensibilität isolieren. Sie sind ein Kernkonzept der Zero Trust Data Plane.",
    domain: "1.2 Zero Trust"
  },
  {
    id: "q32",
    question: "An organization is leveraging a VPN between its headquarters and a branch location. Which of the following is the VPN protecting?",
    options: ["Data in use", "Data in transit", "Geographic restrictions", "Data sovereignty"],
    correctAnswer: 1,
    explanation: "Ein VPN schützt Data in Transit (Daten während der Übertragung) durch Verschlüsselung und Tunneling. Dies verhindert Abhören und Manipulation während der Übertragung über unsichere Netzwerke.",
    domain: "3.2 Secure Communication"
  },
  {
    id: "q33",
    question: "The marketing department set up its own project management software without telling the appropriate departments. Which of the following describes this scenario?",
    options: ["Shadow IT", "Insider threat", "Data exfiltration", "Service disruption"],
    correctAnswer: 0,
    explanation: "Shadow IT bezeichnet die Nutzung nicht autorisierter IT-Ressourcen in einer Organisation. Dies stellt Sicherheitsrisiken dar, da IT-Security und Compliance umgangen werden.",
    domain: "5.1 Security Program Management"
  },
  {
    id: "q34",
    question: "A security analyst scans a company's public network and discovers a host is running a remote desktop that can be used to access the production network. Which of the following changes should the security analyst recommend?",
    options: [
      "Changing the remote desktop port to a non-standard number",
      "Setting up a VPN and placing the jump server inside the firewall",
      "Using a proxy for web connections from the remote desktop server",
      "Connecting the remote server to the domain and increasing the password length"
    ],
    correctAnswer: 1,
    explanation: "Ein VPN mit Jump Server hinter der Firewall bietet sichere, authentifizierte Verbindungen zum Produktionsnetzwerk. Der Remote Desktop sollte nicht direkt vom Internet erreichbar sein.",
    domain: "4.1 Security Architecture"
  },
  {
    id: "q35",
    question: "Which of the following involves an attempt to take advantage of database misconfigurations?",
    options: ["Buffer overflow", "SQL injection", "VM escape", "Memory injection"],
    correctAnswer: 1,
    explanation: "SQL Injection nutzt Datenbank-Fehlkonfigurationen oder unsichere Code-Praktiken aus, um unautorisierten Zugriff auf Datenbanken zu erhalten oder Daten zu manipulieren.",
    domain: "2.3 Application and Network Attacks"
  },
  {
    id: "q36",
    question: "An organization would like to store customer data on a separate part of the network that is not accessible to users on the main corporate network. Which of the following should the administrator use to accomplish this goal?",
    options: ["Segmentation", "Isolation", "Patching", "Encryption"],
    correctAnswer: 0,
    explanation: "Network Segmentation teilt das Netzwerk in kleinere, isolierte Segmente auf. Dies verbessert Sicherheit und Performance durch Begrenzung des Zugriffs und der Angriffsfläche.",
    domain: "2.5 Network Security"
  },
  {
    id: "q37",
    question: "A newly identified network access vulnerability has been found in the OS of legacy IoT devices. Which of the following would best mitigate this vulnerability quickly?",
    options: ["Insurance", "Patching", "Segmentation", "Replacement"],
    correctAnswer: 2,
    explanation: "Segmentation isoliert Legacy-IoT-Geräte vom Rest des Netzwerks und begrenzt die Auswirkungen einer Kompromittierung. Dies ist oft die schnellste Lösung, wenn Patches nicht verfügbar sind.",
    domain: "2.5 Network Security"
  },
  {
    id: "q38",
    question: "A bank insists all of its vendors must prevent data loss on stolen laptops. Which of the following strategies is the bank requiring?",
    options: ["Encryption at rest", "Masking", "Data classification", "Permission restrictions"],
    correctAnswer: 0,
    explanation: "Encryption at Rest verschlüsselt gespeicherte Daten auf Geräten. Bei Diebstahl sind die Daten ohne Entschlüsselungsschlüssel unlesbar, was Datenverlust verhindert.",
    domain: "1.4 Cryptography"
  },
  {
    id: "q39",
    question: "Which of the following would be best suited for constantly changing environments?",
    options: ["RTOS", "Containers", "Embedded systems", "SCADA"],
    correctAnswer: 1,
    explanation: "Container bieten leichtgewichtige, portable und skalierbare Virtualisierung. Sie sind ideal für sich häufig ändernde Umgebungen, da sie schnell bereitgestellt und aktualisiert werden können.",
    domain: "3.1 Cloud and Virtualization Concepts"
  },
  {
    id: "q40",
    question: "After a recent vulnerability scan, a security engineer needs to harden the routers within the corporate network. Which of the following is the most appropriate to disable?",
    options: ["Console access", "Routing protocols", "VLANs", "Web-based administration"],
    correctAnswer: 3,
    explanation: "Web-basierte Administration sollte deaktiviert werden, da sie zusätzliche Angriffsfläche bietet. Router sollten über sichere Protokolle wie SSH über Console oder CLI verwaltet werden.",
    domain: "2.5 Network Security"
  },
  {
    id: "q41",
    question: "A security administrator needs a method to secure data in an environment that includes some form of checks to track any changes. Which of the following should the administrator set up to achieve this goal?",
    options: ["SPF", "GPO", "NAC", "FIM"],
    correctAnswer: 3,
    explanation: "File Integrity Monitoring (FIM) überwacht Änderungen an wichtigen Dateien und Systemkonfigurationen. Es erkennt unautorisiierte Modifikationen und ist entscheidend für die Compliance.",
    domain: "4.5 Security Infrastructure"
  },
  {
    id: "q42",
    question: "An administrator is reviewing a single server's security logs and discovers repeated failed login attempts from different IP addresses. Which of the following best describes the action captured in this log file?",
    options: ["Brute-force attack", "Privilege escalation", "Failed password audit", "Forgotten password by the user"],
    correctAnswer: 0,
    explanation: "Ein Brute-Force-Angriff versucht systematisch verschiedene Passwörter, um Zugang zu erlangen. Mehrere fehlgeschlagene Login-Versuche in kurzer Zeit sind typische Indikatoren.",
    domain: "2.3 Application and Network Attacks"
  },
  {
    id: "q43",
    question: "A security engineer is implementing FDE for all laptops in an organization. Which of the following are the most important for the engineer to consider as part of the planning process? (Choose TWO)",
    options: ["Key escrow", "TPM presence", "Digital signatures", "Data tokenization", "Public key management", "Certificate authority linking"],
    correctAnswer: 0,
    explanation: "Key Escrow (Schlüsselhinterlegung) und TPM (Trusted Platform Module) sind entscheidend für FDE. Key Escrow ermöglicht Wiederherstellung bei Schlüsselverlust, TPM bietet Hardwaresicherheit für Verschlüsselungsschlüssel.",
    domain: "1.4 Cryptography"
  },
  {
    id: "q44",
    question: "An enterprise has been experiencing attacks focused on exploiting vulnerabilities in older browser versions with well-known exploits. Which of the following security solutions should be configured to best provide the ability to monitor and block these known signature-based attacks?",
    options: ["IPS", "Proxy", "WAF", "Load balancer"],
    correctAnswer: 0,
    explanation: "Ein Intrusion Prevention System (IPS) kann bekannte Angriffssignaturen erkennen und blockieren. Es überwacht Netzwerkverkehr in Echtzeit und stoppt Exploits, bevor sie Systeme erreichen.",
    domain: "4.5 Security Infrastructure"
  },
  {
    id: "q45",
    question: "Which of the following best describes the action a security team will most likely be required to take after a legal hold is initiated?",
    options: [
      "Retain the emails between the security team and affected customers for 30 days",
      "Retain any communications related to the security breach until further notice",
      "Retain any communications between security members during the breach response",
      "Retain all emails from the company to affected customers for an indefinite period"
    ],
    correctAnswer: 1,
    explanation: "Ein Legal Hold erfordert die Aufbewahrung aller relevanten Kommunikationen und Daten bis zur Klärung rechtlicher Angelegenheiten. Dies verhindert Vernichtung potenzieller Beweismittel.",
    domain: "5.1 Security Program Management"
  },
  {
    id: "q46",
    question: "A network manager wants to protect the company's VPN by implementing multifactor authentication that uses something you know, something you have, and something you are. Which of the following would accomplish this goal?",
    options: [
      "Domain name, PKI, GeoIP lookup",
      "VPN IP address, company ID, facial structure",
      "Password, authentication token, thumbprint",
      "Company URL, TLS certificate, home address"
    ],
    correctAnswer: 2,
    explanation: "Passwort (Wissen), Authentication Token (Besitz) und Fingerabdruck (Biometrie) repräsentieren die drei MFA-Faktoren und bieten starke Authentifizierung für VPN-Zugriff.",
    domain: "4.6 Identity and Access Management"
  },
  {
    id: "q47",
    question: "Which of the following would be the best way to handle a critical business application that is running on a legacy server?",
    options: ["Segmentation", "Isolation", "Hardening", "Decommissioning"],
    correctAnswer: 1,
    explanation: "Isolation trennt das Legacy-System vom Rest des Netzwerks, während die kritische Anwendung weiter läuft. Dies minimiert Risiken, bis eine Migration möglich ist.",
    domain: "2.5 Network Security"
  },
  {
    id: "q48",
    question: "Which of the following vulnerabilities is exploited when an attacker overwrites a register with a malicious address?",
    options: ["VM escape", "SQL injection", "Buffer overflow", "Race condition"],
    correctAnswer: 2,
    explanation: "Buffer Overflow tritt auf, wenn mehr Daten in einen Speicherbereich geschrieben werden, als dieser aufnehmen kann. Angreifer können dies nutzen, um Register zu überschreiben und Code auszuführen.",
    domain: "2.3 Application and Network Attacks"
  },
  {
    id: "q49",
    question: "After a recent ransomware attack on a company's system, an administrator reviewed the log files. Which of the following control types did the administrator use?",
    options: ["Compensating", "Detective", "Preventive", "Corrective"],
    correctAnswer: 1,
    explanation: "Detective Controls wie Log-Dateien identifizieren und überwachen Sicherheitsvorfälle nach deren Auftreten. Sie helfen bei der Analyse und Untersuchung von Angriffen.",
    domain: "5.2 Security Concepts"
  },
  {
    id: "q50",
    question: "Which of the following agreement types defines the time frame in which a vendor needs to respond?",
    options: ["SOW", "SLA", "MOA", "MOU"],
    correctAnswer: 1,
    explanation: "Ein Service Level Agreement (SLA) definiert Leistungsmetriken, einschließlich Reaktionszeiten und Verfügbarkeit. Es legt fest, wie schnell ein Anbieter auf Anfragen reagieren muss.",
    domain: "5.1 Security Program Management"
  },
  {
    id: "q51",
    question: "A Chief Information Security Officer wants to monitor the company's servers for SQLi attacks and allow for comprehensive investigations. The company uses SSL decryption. Which of the following strategies would best accomplish this goal?",
    options: [
      "Logging all NetFlow traffic into a SIEM",
      "Deploying network traffic sensors on the same subnet as the servers",
      "Logging endpoint and OS-specific security logs",
      "Enabling full packet capture for traffic entering and exiting the servers"
    ],
    correctAnswer: 3,
    explanation: "Full Packet Capture zeichnet den gesamten Netzwerkverkehr auf und ermöglicht detaillierte Analyse von SQLi-Angriffen, einschließlich Payload, Timing und Auswirkungen.",
    domain: "4.8 Logging and Monitoring"
  },
  {
    id: "q52",
    question: "Which of the following best practices gives administrators a set period to perform changes to an operational system to ensure availability and minimize business impacts?",
    options: ["Impact analysis", "Scheduled downtime", "Backout plan", "Change management boards"],
    correctAnswer: 1,
    explanation: "Scheduled Downtime (geplante Ausfallzeit) ist eine festgelegte Periode für Wartung und Updates. Sie ermöglicht Änderungen ohne unerwartete Störungen des Geschäftsbetriebs.",
    domain: "5.1 Security Program Management"
  },
  {
    id: "q53",
    question: "Which of the following actions could a security engineer take to ensure workstations and servers are properly monitored for unauthorized changes and software?",
    options: [
      "Configure all systems to log scheduled tasks",
      "Collect and monitor all traffic exiting the network",
      "Block traffic based on known malicious signatures",
      "Install endpoint management software on all systems"
    ],
    correctAnswer: 3,
    explanation: "Endpoint Management Software überwacht und kontrolliert Konfigurationen, Sicherheit und Software-Installationen zentral. Es erkennt unautorisiertÄnderungen und erzwingt Richtlinien.",
    domain: "4.5 Security Infrastructure"
  },
  {
    id: "q54",
    question: "After a security awareness training session, a user called the IT help desk and reported a suspicious call. The caller stated that the CFO wanted credit card information to close an invoice. Which of the following topics did the user recognize?",
    options: ["Insider threat", "Email phishing", "Social engineering", "Executive whaling"],
    correctAnswer: 2,
    explanation: "Social Engineering manipuliert Menschen, um Informationen preiszugeben oder Aktionen auszuführen. Das Vorgeben, im Auftrag des CFO zu handeln, ist eine klassische Social-Engineering-Taktik.",
    domain: "2.2 Threats, Vulnerabilities, and Mitigations"
  },
  {
    id: "q55",
    question: "Which of the following exercises should an organization use to improve its incident response process?",
    options: ["Tabletop", "Replication", "Failover", "Recovery"],
    correctAnswer: 0,
    explanation: "Tabletop Exercises sind simulierte Szenarien, die den Incident Response Plan testen. Teilnehmer diskutieren ihre Rollen und Aktionen, identifizieren Lücken und verbessern die Koordination.",
    domain: "5.3 Security Awareness and Training"
  },
  {
    id: "q56",
    question: "Which of the following is used to validate a certificate when it is presented to a user?",
    options: ["OCSP", "CSR", "CA", "CRC"],
    correctAnswer: 0,
    explanation: "OCSP (Online Certificate Status Protocol) überprüft in Echtzeit, ob ein Zertifikat widerrufen wurde. Es ist schneller und effizienter als Certificate Revocation Lists (CRLs).",
    domain: "1.4 Cryptography"
  },
  {
    id: "q57",
    question: "Malware spread across a company's network after an employee visited a compromised industry blog. Which of the following best describes this type of attack?",
    options: ["Impersonation", "Disinformation", "Watering-hole", "Smishing"],
    correctAnswer: 2,
    explanation: "Ein Watering-Hole-Angriff kompromittiert Websites, die von einer bestimmten Zielgruppe häufig besucht werden. Wenn Benutzer die Seite besuchen, werden ihre Systeme infiziert.",
    domain: "2.2 Threats, Vulnerabilities, and Mitigations"
  },
  {
    id: "q58",
    question: "A company's marketing department collects, modifies, and stores sensitive customer data. The infrastructure team is responsible for securing the data while in transit and at rest. Which of the following data roles describes the customer?",
    options: ["Processor", "Custodian", "Subject", "Owner"],
    correctAnswer: 2,
    explanation: "Data Subject ist die Person, deren persönliche Daten gesammelt werden. Data Subjects haben Rechte bezüglich ihrer Daten, wie Zugriff, Korrektur und Löschung (GDPR).",
    domain: "3.3 Data Types and Classifications"
  },
  {
    id: "q59",
    question: "Which of the following automation use cases would best enhance the security posture by rapidly updating permissions when employees leave a company?",
    options: [
      "Provisioning resources",
      "Disabling access",
      "Reviewing change approvals",
      "Escalating permission requests"
    ],
    correctAnswer: 1,
    explanation: "Disabling Access automatisiert die sofortige Deaktivierung von Benutzerkonten und Berechtigungen beim Ausscheiden von Mitarbeitern. Dies verhindert unautorisierten Zugriff durch ehemalige Mitarbeiter.",
    domain: "4.6 Identity and Access Management"
  },
  {
    id: "q60",
    question: "An administrator discovers that some files on a database server were recently encrypted. The administrator sees from the security logs that the data was last accessed by a domain user. Which of the following best describes the type of attack that occurred?",
    options: ["Insider threat", "Social engineering", "Watering-hole", "Unauthorized attacker"],
    correctAnswer: 0,
    explanation: "Ein Insider Threat kommt von jemandem mit legitimem Zugriff auf Systeme. Ein Domain-User, der Dateien verschlüsselt, ist ein klassischer Fall eines böswilligen oder kompromittierten Insiders.",
    domain: "2.1 Threat Actors and Motivations"
  },
  {
    id: "q61",
    question: "Ein Sicherheitsingenieur implementiert FDE für alle Laptops in einem Unternehmen. Welche der folgenden Punkte sind für den Ingenieur im Rahmen der Planung am wichtigsten zu berücksichtigen? (Wählen Sie ZWEI aus)",
    options: [
      "Schlüsseltreuhhand",
      "TPM- Präsenz",
      "Digitale Signaturen",
      "Datenokenisierung",
      "Verwaltung öffentlicher Schlüssel",
      "Verknüpfung mit Zertifizierungsstellen"
    ],
    correctAnswers: [0, 1],
    isMultipleChoice: true,
    requiredSelections: 2,
    explanation: "Bei der Implementierung von Full Disk Encryption (FDE) sind Schlüsseltreuhhand (Key Escrow) und TPM-Präsenz (Trusted Platform Module) am wichtigsten. Key Escrow ermöglicht die Wiederherstellung von Daten bei Verlust des Schlüssels, während TPM sichere Hardwareunterstützung für Verschlüsselungsschlüssel bietet.",
    domain: "3.3 Cryptographic Solutions",
    correctAnswer: 0 // Fallback for old code
  },
  {
    id: "q62",
    question: "An employee receives a text message that appears to have been sent by the payroll department and is asking for credential verification. Which of the following social engineering techniques are being attempted? (Choose TWO)",
    options: [
      "Typosquatting",
      "Phishing",
      "Impersonation",
      "Vishing",
      "Smishing",
      "Misinformation"
    ],
    correctAnswers: [1, 4],
    isMultipleChoice: true,
    requiredSelections: 2,
    explanation: "Phishing ist der Oberbegriff für betrügerische Nachrichten, die sensible Informationen stehlen sollen. Smishing ist speziell Phishing via SMS/Textnachrichten. Da die Nachricht per Text kam und nach Anmeldedaten fragt, sind beide Techniken zutreffend.",
    domain: "2.2 Threats, Vulnerabilities, and Mitigations",
    correctAnswer: 1 // Fallback for old code
  },
  {
    id: "q63",
    question: "A company wants to implement a backup strategy that allows for the fastest recovery time. Which TWO backup types should be combined to achieve this goal? (Choose TWO)",
    options: [
      "Full backup",
      "Incremental backup",
      "Differential backup",
      "Snapshot",
      "Continuous data protection",
      "Archive backup"
    ],
    correctAnswers: [0, 2],
    isMultipleChoice: true,
    requiredSelections: 2,
    explanation: "Eine Kombination aus Full Backup und Differential Backup bietet die schnellste Wiederherstellungszeit. Man benötigt nur das letzte Full Backup und das letzte Differential Backup, im Gegensatz zu Incremental, wo alle Incremental Backups seit dem letzten Full Backup wiederhergestellt werden müssen.",
    domain: "4.2 Resilience and Recovery",
    correctAnswer: 0 // Fallback for old code
  },
  {
    id: "q64",
    question: "Which of the following are characteristics of a properly implemented zero trust security model? (Choose TWO)",
    options: [
      "Implicit trust for internal users",
      "Continuous verification of user identity",
      "Network perimeter as primary defense",
      "Least privilege access",
      "Static security policies",
      "Trust based on network location"
    ],
    correctAnswers: [1, 3],
    isMultipleChoice: true,
    requiredSelections: 2,
    explanation: "Zero Trust basiert auf zwei Hauptprinzipien: Continuous Verification (ständige Überprüfung der Identität) und Least Privilege Access (minimale Zugriffsrechte). Zero Trust geht davon aus, dass es keine vertrauenswürdige Netzwerkzone gibt und jede Anfrage verifiziert werden muss.",
    domain: "4.1 Security Architecture",
    correctAnswer: 1 // Fallback for old code
  },
  {
    id: "q65",
    question: "A security analyst is implementing controls to protect against SQL injection attacks. Which TWO methods are most effective? (Choose TWO)",
    options: [
      "Input validation",
      "Disabling JavaScript",
      "Parameterized queries",
      "Installing antivirus",
      "Using HTTPS",
      "Network segmentation"
    ],
    correctAnswers: [0, 2],
    isMultipleChoice: true,
    requiredSelections: 2,
    explanation: "Input Validation und Parameterized Queries (Prepared Statements) sind die effektivsten Methoden gegen SQL Injection. Input Validation filtert bösartige Eingaben, während Parameterized Queries SQL-Code von Daten trennen und die Ausführung von eingeschleustem Code verhindern.",
    domain: "2.2 Threats, Vulnerabilities, and Mitigations",
    correctAnswer: 0 // Fallback for old code
  }
];

// Security+ Acronyms Pool
export const acronymQuestions: AcronymQuestion[] = [
  {
    id: "a1",
    acronym: "IAM",
    fullForm: "Identity and Access Management",
    explanation: "IAM verwaltet digitale Identitäten und kontrolliert Zugriff auf Ressourcen.",
    options: [
      "Internet Access Management",
      "Identity and Access Management",
      "Internal Application Module",
      "Infrastructure Asset Management"
    ],
    correctAnswer: 1
  },
  {
    id: "a2",
    acronym: "SIEM",
    fullForm: "Security Information and Event Management",
    explanation: "SIEM sammelt und analysiert Sicherheitsereignisse aus verschiedenen Quellen.",
    options: [
      "Security Incident and Event Monitor",
      "System Information Exchange Module",
      "Security Information and Event Management",
      "Secure Internet Email Manager"
    ],
    correctAnswer: 2
  },
  {
    id: "a3",
    acronym: "VPN",
    fullForm: "Virtual Private Network",
    explanation: "VPN erstellt einen verschlüsselten Tunnel für sichere Verbindungen über unsichere Netzwerke.",
    options: [
      "Virtual Personal Network",
      "Verified Protection Network",
      "Virtual Private Network",
      "Variable Port Number"
    ],
    correctAnswer: 2
  },
  {
    id: "a4",
    acronym: "IDS",
    fullForm: "Intrusion Detection System",
    explanation: "IDS überwacht Netzwerkverkehr und erkennt verdächtige Aktivitäten.",
    options: [
      "Internal Data Storage",
      "Intrusion Detection System",
      "Internet Directory Service",
      "Integrated Defense System"
    ],
    correctAnswer: 1
  },
  {
    id: "a5",
    acronym: "IPS",
    fullForm: "Intrusion Prevention System",
    explanation: "IPS erkennt und blockiert Angriffe automatisch in Echtzeit.",
    options: [
      "Internet Protocol Security",
      "Intrusion Prevention System",
      "Internal Protection Service",
      "Information Processing System"
    ],
    correctAnswer: 1
  },
  {
    id: "a6",
    acronym: "ACL",
    fullForm: "Access Control List",
    explanation: "ACL definiert Berechtigungen für Benutzer oder Systeme auf Ressourcen.",
    options: [
      "Application Control Layer",
      "Access Control List",
      "Advanced Cipher Logic",
      "Automated Configuration Log"
    ],
    correctAnswer: 1
  },
  {
    id: "a7",
    acronym: "WAF",
    fullForm: "Web Application Firewall",
    explanation: "WAF schützt Webanwendungen vor HTTP/HTTPS-basierten Angriffen.",
    options: [
      "Wide Area Firewall",
      "Web Application Firewall",
      "Wireless Access Filter",
      "Web Authentication Framework"
    ],
    correctAnswer: 1
  },
  {
    id: "a8",
    acronym: "DLP",
    fullForm: "Data Loss Prevention",
    explanation: "DLP verhindert unbefugten Zugriff und Exfiltration sensibler Daten.",
    options: [
      "Data Link Protocol",
      "Digital License Protection",
      "Data Loss Prevention",
      "Dynamic Loading Process"
    ],
    correctAnswer: 2
  },
  {
    id: "a9",
    acronym: "MFA",
    fullForm: "Multi-Factor Authentication",
    explanation: "MFA erfordert mehrere Authentifizierungsfaktoren für erhöhte Sicherheit.",
    options: [
      "Multiple File Access",
      "Multi-Factor Authentication",
      "Managed Firewall Application",
      "Master File Allocation"
    ],
    correctAnswer: 1
  },
  {
    id: "a10",
    acronym: "PKI",
    fullForm: "Public Key Infrastructure",
    explanation: "PKI verwaltet digitale Zertifikate und Public-Key-Verschlüsselung.",
    options: [
      "Private Key Integration",
      "Public Key Infrastructure",
      "Protected Kernel Interface",
      "Port Key Identifier"
    ],
    correctAnswer: 1
  },
  {
    id: "a11",
    acronym: "SSL",
    fullForm: "Secure Sockets Layer",
    explanation: "SSL ist ein Verschlüsselungsprotokoll für sichere Internetverbindungen (Vorgänger von TLS).",
    options: [
      "System Security Layer",
      "Secure Sockets Layer",
      "Server Side Logic",
      "Standard Security Link"
    ],
    correctAnswer: 1
  },
  {
    id: "a12",
    acronym: "TLS",
    fullForm: "Transport Layer Security",
    explanation: "TLS verschlüsselt Daten während der Übertragung (Nachfolger von SSL).",
    options: [
      "Transport Layer Security",
      "Trusted Link System",
      "Terminal Login Service",
      "Total Loss Security"
    ],
    correctAnswer: 0
  },
  {
    id: "a13",
    acronym: "SSH",
    fullForm: "Secure Shell",
    explanation: "SSH ermöglicht sichere verschlüsselte Remote-Verbindungen und Kommandoausführung.",
    options: [
      "System Security Host",
      "Secure Shell",
      "Server Side Hosting",
      "Standard Security Header"
    ],
    correctAnswer: 1
  },
  {
    id: "a14",
    acronym: "FTP",
    fullForm: "File Transfer Protocol",
    explanation: "FTP überträgt Dateien zwischen Systemen (unsicher, ohne Verschlüsselung).",
    options: [
      "Fast Transfer Protocol",
      "File Transport Program",
      "File Transfer Protocol",
      "Firewall Transmission Port"
    ],
    correctAnswer: 2
  },
  {
    id: "a15",
    acronym: "SFTP",
    fullForm: "Secure File Transfer Protocol",
    explanation: "SFTP ist die sichere Version von FTP mit SSH-Verschlüsselung.",
    options: [
      "Standard File Transfer Protocol",
      "Secure File Transfer Protocol",
      "System File Transfer Program",
      "Simple Fast Transfer Protocol"
    ],
    correctAnswer: 1
  },
  {
    id: "a16",
    acronym: "DNS",
    fullForm: "Domain Name System",
    explanation: "DNS übersetzt Domain-Namen in IP-Adressen.",
    options: [
      "Data Network Service",
      "Domain Name System",
      "Digital Naming Standard",
      "Distributed Network Storage"
    ],
    correctAnswer: 1
  },
  {
    id: "a17",
    acronym: "DHCP",
    fullForm: "Dynamic Host Configuration Protocol",
    explanation: "DHCP weist Geräten automatisch IP-Adressen und Netzwerkkonfigurationen zu.",
    options: [
      "Direct Host Connection Protocol",
      "Dynamic Host Configuration Protocol",
      "Data Handling Control Process",
      "Distributed Hardware Communication Port"
    ],
    correctAnswer: 1
  },
  {
    id: "a18",
    acronym: "NAT",
    fullForm: "Network Address Translation",
    explanation: "NAT übersetzt private IP-Adressen in öffentliche für Internetzugriff.",
    options: [
      "Network Access Tool",
      "Network Address Translation",
      "Node Authentication Type",
      "Network Application Transfer"
    ],
    correctAnswer: 1
  },
  {
    id: "a19",
    acronym: "VLAN",
    fullForm: "Virtual Local Area Network",
    explanation: "VLAN segmentiert ein physisches Netzwerk in logische Teilnetze.",
    options: [
      "Virtual Link Access Network",
      "Variable Local Area Node",
      "Virtual Local Area Network",
      "Verified LAN Access"
    ],
    correctAnswer: 2
  },
  {
    id: "a20",
    acronym: "LDAP",
    fullForm: "Lightweight Directory Access Protocol",
    explanation: "LDAP greift auf Verzeichnisdienste wie Active Directory zu und fragt diese ab.",
    options: [
      "Local Data Access Protocol",
      "Lightweight Directory Access Protocol",
      "Link Distribution Application Process",
      "Layered Defense Access Point"
    ],
    correctAnswer: 1
  },
  {
    id: "a21",
    acronym: "RADIUS",
    fullForm: "Remote Authentication Dial-In User Service",
    explanation: "RADIUS bietet zentrale AAA-Dienste (Authentication, Authorization, Accounting).",
    options: [
      "Remote Access Directory and Identification User Service",
      "Rapid Authentication Dial-In User System",
      "Remote Authentication Dial-In User Service",
      "Restricted Access Database for Internet User Security"
    ],
    correctAnswer: 2
  },
  {
    id: "a22",
    acronym: "TACACS+",
    fullForm: "Terminal Access Controller Access-Control System Plus",
    explanation: "TACACS+ ist ein AAA-Protokoll von Cisco für Netzwerkgeräte-Authentifizierung.",
    options: [
      "Terminal Access Control and Authentication Communication System Plus",
      "Terminal Access Controller Access-Control System Plus",
      "Trusted Authentication Control and Access Communication Service Plus",
      "Transport Access Control Authentication and Cipher System Plus"
    ],
    correctAnswer: 1
  },
  {
    id: "a23",
    acronym: "SSO",
    fullForm: "Single Sign-On",
    explanation: "SSO ermöglicht Zugriff auf multiple Systeme mit einer Authentifizierung.",
    options: [
      "Secure System Operation",
      "Single Sign-On",
      "Standard Security Option",
      "System Security Officer"
    ],
    correctAnswer: 1
  },
  {
    id: "a24",
    acronym: "SAML",
    fullForm: "Security Assertion Markup Language",
    explanation: "SAML ist ein XML-basierter Standard für SSO und Identitätsföderation.",
    options: [
      "System Access Management Language",
      "Security Assertion Markup Language",
      "Secure Authentication Message Layer",
      "Standard Access Management Logic"
    ],
    correctAnswer: 1
  },
  {
    id: "a25",
    acronym: "OAuth",
    fullForm: "Open Authorization",
    explanation: "OAuth ist ein Framework für sichere API-Autorisierung ohne Passwortfreigabe.",
    options: [
      "Open Access Authentication",
      "Object Authentication",
      "Open Authorization",
      "Operational Authentication"
    ],
    correctAnswer: 2
  },
  {
    id: "a26",
    acronym: "FIM",
    fullForm: "File Integrity Monitoring",
    explanation: "FIM überwacht kritische Dateien auf unautorierte Änderungen.",
    options: [
      "File Integration Management",
      "Firewall Intrusion Monitor",
      "File Integrity Monitoring",
      "Federated Identity Manager"
    ],
    correctAnswer: 2
  },
  {
    id: "a27",
    acronym: "NGFW",
    fullForm: "Next-Generation Firewall",
    explanation: "NGFW kombiniert traditionelle Firewall mit erweiterten Funktionen wie IPS und Application Control.",
    options: [
      "Network Gateway Firewall",
      "Next-Generation Firewall",
      "New Grade Filtering Wall",
      "Network Guard Firewall"
    ],
    correctAnswer: 1
  },
  {
    id: "a28",
    acronym: "EDR",
    fullForm: "Endpoint Detection and Response",
    explanation: "EDR erkennt und reagiert auf Bedrohungen auf Endgeräten.",
    options: [
      "Electronic Data Recovery",
      "Endpoint Detection and Response",
      "Enhanced Defense Routing",
      "External Device Restriction"
    ],
    correctAnswer: 1
  },
  {
    id: "a29",
    acronym: "XDR",
    fullForm: "Extended Detection and Response",
    explanation: "XDR erweitert EDR um Netzwerk-, Cloud- und andere Datenquellen.",
    options: [
      "External Data Repository",
      "Extended Detection and Response",
      "Extreme Defense Routing",
      "Cross-Domain Relay"
    ],
    correctAnswer: 1
  },
  {
    id: "a30",
    acronym: "SOAR",
    fullForm: "Security Orchestration, Automation, and Response",
    explanation: "SOAR automatisiert Sicherheitsprozesse und koordiniert Incident Response.",
    options: [
      "System Operations and Recovery",
      "Security Operations Automated Response",
      "Security Orchestration, Automation, and Response",
      "Standard Operating Access Rules"
    ],
    correctAnswer: 2
  },
  {
    id: "a31",
    acronym: "CVSS",
    fullForm: "Common Vulnerability Scoring System",
    explanation: "CVSS bewertet den Schweregrad von Sicherheitslücken mit Score 0-10.",
    options: [
      "Critical Vulnerability Scanning System",
      "Common Vulnerability Scoring System",
      "Cyber Vulnerability Security Standard",
      "Certified Vulnerability Scan Service"
    ],
    correctAnswer: 1
  },
  {
    id: "a32",
    acronym: "CVE",
    fullForm: "Common Vulnerabilities and Exposures",
    explanation: "CVE ist eine Datenbank öffentlich bekannter Sicherheitslücken.",
    options: [
      "Common Vulnerabilities and Exposures",
      "Critical Virus Encyclopedia",
      "Cyber Vulnerability Explorer",
      "Central Verification Entity"
    ],
    correctAnswer: 0
  },
  {
    id: "a33",
    acronym: "TPM",
    fullForm: "Trusted Platform Module",
    explanation: "TPM ist ein Hardware-Chip für sichere Kryptografie und Schlüsselspeicherung.",
    options: [
      "Total Protection Mode",
      "Trusted Platform Module",
      "Transport Protocol Manager",
      "Terminal Password Management"
    ],
    correctAnswer: 1
  },
  {
    id: "a34",
    acronym: "HSM",
    fullForm: "Hardware Security Module",
    explanation: "HSM ist ein dediziertes Hardware-Gerät für Schlüsselgenerierung und -speicherung.",
    options: [
      "Host Security Manager",
      "Hardware Security Module",
      "Hybrid Storage Module",
      "High-Speed Memory"
    ],
    correctAnswer: 1
  },
  {
    id: "a35",
    acronym: "AES",
    fullForm: "Advanced Encryption Standard",
    explanation: "AES ist ein symmetrischer Verschlüsselungsalgorithmus (128/192/256 Bit).",
    options: [
      "Automated Encryption System",
      "Advanced Encryption Standard",
      "Application Entry Security",
      "Adaptive Encryption Service"
    ],
    correctAnswer: 1
  },
  {
    id: "a36",
    acronym: "RSA",
    fullForm: "Rivest-Shamir-Adleman",
    explanation: "RSA ist ein asymmetrischer Verschlüsselungsalgorithmus für Public-Key-Kryptografie.",
    options: [
      "Remote Security Access",
      "Rivest-Shamir-Adleman",
      "Rotating Secure Algorithm",
      "Redundant System Architecture"
    ],
    correctAnswer: 1
  },
  {
    id: "a37",
    acronym: "NIST",
    fullForm: "National Institute of Standards and Technology",
    explanation: "NIST entwickelt Sicherheitsstandards und -richtlinien für die US-Regierung.",
    options: [
      "Network Information Security Tool",
      "National Institute of Standards and Technology",
      "Network Intrusion Security Team",
      "New International Security Technology"
    ],
    correctAnswer: 1
  },
  {
    id: "a38",
    acronym: "GDPR",
    fullForm: "General Data Protection Regulation",
    explanation: "GDPR ist die EU-Datenschutzverordnung zum Schutz personenbezogener Daten.",
    options: [
      "Global Data Privacy Rules",
      "General Data Protection Regulation",
      "Governing Digital Privacy Rights",
      "Global Defense Protection Registry"
    ],
    correctAnswer: 1
  },
  {
    id: "a39",
    acronym: "PCI DSS",
    fullForm: "Payment Card Industry Data Security Standard",
    explanation: "PCI DSS definiert Sicherheitsanforderungen für Kreditkartendaten-Verarbeitung.",
    options: [
      "Private Card Information Data Storage System",
      "Payment Card Industry Data Security Standard",
      "Protected Credit Information Digital Security Service",
      "Public Card Identification Data Secure Standard"
    ],
    correctAnswer: 1
  },
  {
    id: "a40",
    acronym: "HIPAA",
    fullForm: "Health Insurance Portability and Accountability Act",
    explanation: "HIPAA regelt den Schutz von Gesundheitsdaten in den USA.",
    options: [
      "Healthcare Information Protection and Access Act",
      "Hospital Insurance Privacy and Accountability Act",
      "Health Insurance Portability and Accountability Act",
      "Healthcare Identification Privacy Administration Act"
    ],
    correctAnswer: 2
  }
];

// Utility function to get random questions
export function getRandomQuestions(count: number = 60): ExamQuestion[] {
  const shuffled = [...examQuestionBank].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, examQuestionBank.length));
}

// Utility function to get random acronyms
export function getRandomAcronyms(count: number = 40): AcronymQuestion[] {
  const shuffled = [...acronymQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, acronymQuestions.length));
}
