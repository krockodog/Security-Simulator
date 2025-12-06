// Realistic CompTIA Security+ SY0-701 PBQ Data

export interface FirewallRule {
  id: string;
  sourceIp: string;
  destinationIp: string;
  port: string;
  protocol: string;
  action: 'Allow' | 'Deny';
  description: string;
}

export interface IncidentResponseStep {
  id: string;
  phase: string;
  step: string;
  description: string;
}

// PBQ 3: VPN Configuration
export interface VPNConfig {
  encryption: string;
  hashing: string;
  dhGroup: string;
  protocol: string;
}

export interface AttackScenario {
  id: string;
  description: string;
  correctAnswer: string;
}

export interface ServerLog {
  serverId: string;
  serverIp: string;
  logs: LogEntry[];
  correctStatus: 'Clean' | 'Infected' | 'Origin';
}

export interface LogEntry {
  timestamp: string;
  type: 'Info' | 'Warn' | 'Error';
  message: string;
}

// PBQ 1: Firewall Rules Configuration
export const firewallScenario = {
  title: "Firewall Rules Configuration",
  scenario: `You are a security administrator at TechCorp Industries. The company has recently implemented a new DMZ to host their web and email servers. You need to configure the perimeter firewall rules to ensure proper security while maintaining necessary business functionality.\n\nNetwork Layout:\n- Internal Network: 192.168.10.0/24\n- DMZ: 10.0.10.0/24\n- Web Server (DMZ): 10.0.10.50\n- Mail Server (DMZ): 10.0.10.51\n- Database Server (Internal): 192.168.10.100\n- Known Malicious IP: 203.0.113.45\n\nRequirements:\n- Allow public access to web and mail servers\n- Restrict database access to internal network only\n- Block known malicious IPs\n- Follow proper firewall rule ordering (most specific to least specific)\n- Implement implicit deny at the end`,
  instructions: "Drag and drop the firewall rules into the correct order from top to bottom. Rules are processed in order, with the first match taking effect.",
};

export const firewallRules: FirewallRule[] = [
  {
    id: 'rule1',
    sourceIp: '203.0.113.45',
    destinationIp: 'Any',
    port: 'Any',
    protocol: 'Any',
    action: 'Deny',
    description: 'Block known malicious IP'
  },
  {
    id: 'rule2',
    sourceIp: 'Any',
    destinationIp: '10.0.10.50',
    port: '443',
    protocol: 'TCP',
    action: 'Allow',
    description: 'Allow HTTPS to web server'
  },
  {
    id: 'rule3',
    sourceIp: 'Any',
    destinationIp: '10.0.10.50',
    port: '80',
    protocol: 'TCP',
    action: 'Allow',
    description: 'Allow HTTP to web server'
  },
  {
    id: 'rule4',
    sourceIp: 'Any',
    destinationIp: '10.0.10.51',
    port: '25',
    protocol: 'TCP',
    action: 'Allow',
    description: 'Allow SMTP to mail server'
  },
  {
    id: 'rule5',
    sourceIp: '10.0.10.0/24',
    destinationIp: '192.168.10.100',
    port: '3306',
    protocol: 'TCP',
    action: 'Allow',
    description: 'Allow DMZ to database server'
  },
  {
    id: 'rule6',
    sourceIp: '192.168.10.0/24',
    destinationIp: '192.168.10.100',
    port: '3306',
    protocol: 'TCP',
    action: 'Allow',
    description: 'Allow internal to database'
  },
  {
    id: 'rule7',
    sourceIp: 'Any',
    destinationIp: '192.168.10.0/24',
    port: 'Any',
    protocol: 'Any',
    action: 'Deny',
    description: 'Deny external to internal'
  },
  {
    id: 'rule8',
    sourceIp: 'Any',
    destinationIp: 'Any',
    port: 'Any',
    protocol: 'Any',
    action: 'Deny',
    description: 'Implicit deny all (cleanup rule)'
  }
];

// Correct order for firewall rules
export const correctFirewallOrder = [
  'rule1', // Block malicious IP first (most specific threat)
  'rule2', // Allow HTTPS to web server
  'rule3', // Allow HTTP to web server
  'rule4', // Allow SMTP to mail server
  'rule6', // Allow internal to database
  'rule5', // Allow DMZ to database
  'rule7', // Deny external to internal network
  'rule8'  // Implicit deny all
];

export const firewallExplanation = {
  correctOrder: correctFirewallOrder,
  reasoning: [
    "Rule 1 (Block 203.0.113.45): Most specific rule - block known malicious IP before any other processing",
    "Rule 2-4 (Allow public services): Allow necessary public access to DMZ servers (HTTPS, HTTP, SMTP)",
    "Rule 6 (Internal to DB): Allow internal network access to database - more restrictive source",
    "Rule 5 (DMZ to DB): Allow DMZ servers to access database for application functionality",
    "Rule 7 (Deny external to internal): Explicitly deny external access to internal network",
    "Rule 8 (Implicit deny): Catch-all rule to deny any traffic not explicitly allowed"
  ],
  keyPrinciples: [
    "Most specific rules first (individual IPs before networks)",
    "Deny known threats immediately",
    "Allow required services explicitly",
    "Deny broader ranges after specific allows",
    "Implicit deny all at the end"
  ]
};

// PBQ 2: Incident Response Workflow
export const incidentResponseScenario = {
  title: "Incident Response Workflow",
  scenario: `At 2:45 AM, the Security Operations Center (SOC) receives multiple alerts indicating suspicious file encryption activity on several workstations. Initial analysis suggests a ransomware infection. Multiple users report being unable to access their files, and ransom notes have appeared on affected systems.\n\nYour role: Lead the incident response team through the proper NIST incident response lifecycle to contain and resolve this security incident while minimizing business impact and preserving evidence for potential legal action.`,
  instructions: "Arrange the incident response steps in the correct order according to the NIST SP 800-61 Incident Response lifecycle. Some steps may occur in parallel, but arrange them in their logical sequence.",
};

export const incidentResponseSteps: IncidentResponseStep[] = [
  {
    id: 'step1',
    phase: 'Preparation',
    step: 'Activate incident response team and review IR plan',
    description: 'Assemble the CSIRT, review ransomware response procedures, ensure communication channels are established'
  },
  {
    id: 'step2',
    phase: 'Detection & Analysis',
    step: 'Confirm ransomware infection and assess scope',
    description: 'Validate alerts, identify ransomware variant, determine number of affected systems, analyze attack vector'
  },
  {
    id: 'step3',
    phase: 'Detection & Analysis',
    step: 'Collect and preserve evidence',
    description: 'Take forensic images, capture memory dumps, preserve logs, document ransomware notes and IOCs'
  },
  {
    id: 'step4',
    phase: 'Containment',
    step: 'Isolate infected systems from network',
    description: 'Disconnect affected workstations, block lateral movement, segment network to prevent spread'
  },
  {
    id: 'step5',
    phase: 'Containment',
    step: 'Identify and secure backup systems',
    description: 'Verify backup integrity, isolate backup servers, ensure ransomware has not compromised backups'
  },
  {
    id: 'step6',
    phase: 'Eradication',
    step: 'Remove ransomware from affected systems',
    description: 'Wipe infected systems, remove persistence mechanisms, patch vulnerabilities exploited by attacker'
  },
  {
    id: 'step7',
    phase: 'Eradication',
    step: 'Update security controls and block IOCs',
    description: 'Update AV signatures, block malicious IPs/domains, update firewall rules, strengthen security controls'
  },
  {
    id: 'step8',
    phase: 'Recovery',
    step: 'Restore systems from clean backups',
    description: 'Rebuild systems from known-good state, restore data from verified clean backups, test functionality'
  },
  {
    id: 'step9',
    phase: 'Recovery',
    step: 'Gradually bring systems back online with monitoring',
    description: 'Phased restoration, enhanced monitoring, verify no reinfection, validate business operations'
  },
  {
    id: 'step10',
    phase: 'Post-Incident Activity',
    step: 'Conduct lessons learned meeting',
    description: 'Document incident timeline, identify response gaps, review what worked and what needs improvement'
  },
  {
    id: 'step11',
    phase: 'Post-Incident Activity',
    step: 'Update IR plan and implement improvements',
    description: 'Update procedures based on lessons learned, implement additional controls, enhance training programs'
  }
];

// Correct order for incident response
export const correctIncidentResponseOrder = [
  'step1',  // Preparation: Activate IR team
  'step2',  // Detection: Confirm and assess
  'step3',  // Detection: Collect evidence
  'step4',  // Containment: Isolate systems
  'step5',  // Containment: Secure backups
  'step6',  // Eradication: Remove malware
  'step7',  // Eradication: Update controls
  'step8',  // Recovery: Restore systems
  'step9',  // Recovery: Bring systems online
  'step10', // Post-Incident: Lessons learned
  'step11'  // Post-Incident: Update plan
];

export const incidentResponseExplanation = {
  correctOrder: correctIncidentResponseOrder,
  reasoning: [
    "Step 1 (Preparation): Immediately activate the IR team and review the plan - this is the foundation for all response activities",
    "Step 2 (Detection): Confirm the ransomware infection and understand the scope before taking action",
    "Step 3 (Detection): Collect evidence early while systems are still accessible - critical for forensics and potential prosecution",
    "Step 4 (Containment): Isolate infected systems to prevent lateral movement - highest priority to stop the spread",
    "Step 5 (Containment): Secure backup systems to ensure recovery capability - ransomware often targets backups",
    "Step 6 (Eradication): Remove the ransomware completely from all affected systems",
    "Step 7 (Eradication): Update security controls to prevent reinfection",
    "Step 8 (Recovery): Restore systems from clean backups once environment is secured",
    "Step 9 (Recovery): Gradually restore services with enhanced monitoring to ensure no reinfection",
    "Step 10 (Post-Incident): Review the incident to understand what happened and how response went",
    "Step 11 (Post-Incident): Implement improvements to prevent future incidents and improve response"
  ],
  nistPhases: [
    "Preparation: Have plans, tools, and teams ready before incidents occur",
    "Detection & Analysis: Identify and understand the scope of the incident",
    "Containment, Eradication & Recovery: Stop the spread, remove threats, restore operations",
    "Post-Incident Activity: Learn from the incident and improve future response"
  ]
};

// PBQ 3: VPN Configuration
export const vpnConfigScenario = {
  title: "Secure Site-to-Site VPN Configuration",
  scenario: `You are a network security engineer tasked with establishing a secure Site-to-Site IPsec VPN tunnel between the company's headquarters and a new branch office. The connection must use the strongest available cryptographic algorithms to protect sensitive corporate data transmitted between locations.\n\nNetwork Details:\n- HQ Gateway: 198.51.100.10\n- Branch Gateway: 203.0.113.50\n- Internal HQ Network: 10.10.0.0/16\n- Internal Branch Network: 10.20.0.0/16\n\nSecurity Requirements:\n- Use strongest encryption standard\n- Use strongest hashing algorithm\n- Use strongest Diffie-Hellman group for key exchange\n- Use protocol that provides both confidentiality and authentication\n\nThe VPN concentrator will reject any insecure cryptographic proposals and only accept configurations that meet current security best practices (as of 2024).`,
  instructions: "Configure the VPN tunnel by selecting the appropriate cryptographic parameters. The tunnel will only establish if all four parameters meet current security standards."
};

export const vpnConfigOptions = {
  encryption: ['DES', '3DES', 'AES-128', 'AES-256'],
  hashing: ['MD5', 'SHA-1', 'SHA-256', 'SHA-512'],
  dhGroup: ['Group 2 (1024-bit)', 'Group 5 (1536-bit)', 'Group 14 (2048-bit)', 'Group 20 (384-bit ECC)'],
  protocol: ['AH (Authentication Header)', 'ESP (Encapsulating Security Payload)']
};

export const correctVPNConfig: VPNConfig = {
  encryption: 'AES-256',
  hashing: 'SHA-256',
  dhGroup: 'Group 14 (2048-bit)',
  protocol: 'ESP (Encapsulating Security Payload)'
};

export const vpnConfigExplanation = {
  correctConfig: correctVPNConfig,
  reasoning: {
    encryption: "AES-256 is the strongest symmetric encryption algorithm available in this list. DES and 3DES are deprecated and considered insecure. While AES-128 is secure, AES-256 provides a higher security margin and is required for top-secret information by many standards.",
    hashing: "SHA-256 is the minimum recommended hashing algorithm for modern VPNs. MD5 and SHA-1 are cryptographically broken and should never be used. SHA-256 provides strong collision resistance and is widely supported. (SHA-512 would also be acceptable in practice, but SHA-256 is the standard answer for Security+)",
    dhGroup: "Group 14 (2048-bit) is the minimum recommended Diffie-Hellman group for modern implementations. Group 2 (1024-bit) is too weak and can be broken. Group 5 is better but still below current recommendations. Group 14 provides adequate security for key exchange.",
    protocol: "ESP (Encapsulating Security Payload) provides both confidentiality (encryption) and authentication, making it superior to AH (Authentication Header), which only provides authentication without encryption. ESP is the standard choice for IPsec VPNs requiring data protection."
  },
  securityPrinciples: [
    "Always use the strongest available encryption (AES-256 over AES-128, 3DES, or DES)",
    "Never use deprecated algorithms (MD5, SHA-1, DES, 3DES)",
    "Ensure Diffie-Hellman groups are at least 2048-bit for adequate security",
    "Use ESP for VPNs that require both confidentiality and authentication",
    "Follow current NIST and industry standards for cryptographic algorithm selection"
  ]
};

// PBQ 4: Threat Analysis & Incident Response
export const threatAnalysisScenario = {
  title: "Threat Analysis & Forensic Investigation",
  scenario: `You are a security analyst responding to multiple security incidents across your organization's network. Your tasks are:\n\n1. **Attack Identification**: Match each attack description to the correct attack type and recommend the best remediation action.\n\n2. **Patient Zero Analysis**: A malware outbreak has occurred on three servers. Review the antivirus logs for each server to identify which server was the origin of the infection (Patient Zero), which servers are currently infected, and which servers are clean.\n\nServer Information:\n- Server A: 192.168.10.22 (File Server)\n- Server B: 192.168.10.37 (Application Server)  \n- Server C: 192.168.10.41 (Database Server)\n\nYour goal is to correctly identify attack types, recommend appropriate remediation, and determine the infection status of each server based on log analysis.`,
  instructions: "Part 1: Select the correct attack type and remediation for each scenario. Part 2: Review server logs and classify each server as Clean, Infected, or Origin (Patient Zero)."
};

export const attackScenarios: AttackScenario[] = [
  {
    id: 'attack1',
    description: 'An attacker sends multiple SYN packets from multiple sources',
    correctAnswer: 'Botnet/DDoS'
  },
  {
    id: 'attack2',
    description: 'The attack establishes a connection which allows remote commands to be executed',
    correctAnswer: 'RAT (Remote Access Trojan)'
  },
  {
    id: 'attack3',
    description: 'The attack is self-propagating and compromises a SQL database using well-known credentials as it moves through the network',
    correctAnswer: 'Worm'
  },
  {
    id: 'attack4',
    description: 'The attacker uses hardware to remotely monitor a user\'s input activity to harvest credentials',
    correctAnswer: 'Keylogger'
  },
  {
    id: 'attack5',
    description: 'The attacker embeds hidden access in an internally developed application that bypasses account login',
    correctAnswer: 'Backdoor'
  }
];

export const attackOptions = [
  'Botnet/DDoS',
  'RAT (Remote Access Trojan)',
  'Logic Bomb',
  'Backdoor',
  'Virus',
  'Spyware',
  'Worm',
  'Adware',
  'Ransomware',
  'Keylogger',
  'Phishing'
];

export const remediationOptions = [
  'Enable DDoS protection',
  'Implement a host-based IPS',
  'Disable remote access services',
  'Change the default application password',
  'Implement 2FA using push notification',
  'Conduct a code review',
  'Patch vulnerable systems',
  'Disable vulnerable services',
  'Update cryptographic algorithms'
];

export const attackRemediationMap: { [key: string]: string } = {
  'Botnet/DDoS': 'Enable DDoS protection',
  'RAT (Remote Access Trojan)': 'Implement a host-based IPS',
  'Worm': 'Change the default application password',
  'Keylogger': 'Disable vulnerable services',
  'Backdoor': 'Conduct a code review'
};

export const serverLogs: ServerLog[] = [
  {
    serverId: 'server1',
    serverIp: '192.168.10.22',
    logs: [
      { timestamp: '4/17/2019 14:30', type: 'Info', message: 'Scheduled scan initiated' },
      { timestamp: '4/17/2019 14:31', type: 'Info', message: 'Checking for update' },
      { timestamp: '4/17/2019 14:32', type: 'Info', message: 'No update available' },
      { timestamp: '4/17/2019 14:33', type: 'Info', message: 'Checking for definition update' },
      { timestamp: '4/17/2019 14:34', type: 'Info', message: 'No definition update available' },
      { timestamp: '4/17/2019 14:35', type: 'Info', message: 'Scan type = full' },
      { timestamp: '4/17/2019 14:36', type: 'Info', message: 'Scan start' },
      { timestamp: '4/17/2019 14:37', type: 'Info', message: 'Scanning system files' },
      { timestamp: '4/17/2019 14:38', type: 'Info', message: 'Scanning temporary files' },
      { timestamp: '4/17/2019 14:39', type: 'Info', message: 'Scanning services' },
      { timestamp: '4/17/2019 14:40', type: 'Info', message: 'Scanning boot sector' },
      { timestamp: '4/17/2019 14:41', type: 'Info', message: 'Scan complete' },
      { timestamp: '4/17/2019 14:42', type: 'Info', message: 'Files removed: 0' },
      { timestamp: '4/17/2019 14:43', type: 'Info', message: 'Files quarantined: 0' },
      { timestamp: '4/17/2019 14:44', type: 'Info', message: 'Boot sector: clean' },
      { timestamp: '4/17/2019 14:45', type: 'Info', message: 'Next scheduled scan: 4/18/2019 14:30' },
      { timestamp: '4/18/2019 2:31', type: 'Warn', message: 'Scheduled scan disabled by process svchost.exe (PID: 4443)' },
      { timestamp: '4/18/2019 2:32', type: 'Warn', message: 'Scheduled update disabled by process svchost.exe (PID: 4443)' },
      { timestamp: '4/18/2019 2:33', type: 'Error', message: 'Antivirus service stopped unexpectedly' }
    ],
    correctStatus: 'Origin'
  },
  {
    serverId: 'server2',
    serverIp: '192.168.10.37',
    logs: [
      { timestamp: '4/17/2019 14:30', type: 'Info', message: 'Scheduled scan initiated' },
      { timestamp: '4/17/2019 14:31', type: 'Info', message: 'Checking for update' },
      { timestamp: '4/17/2019 14:32', type: 'Info', message: 'No update available' },
      { timestamp: '4/17/2019 14:33', type: 'Info', message: 'Checking for definition update' },
      { timestamp: '4/17/2019 14:34', type: 'Info', message: 'No definition update available' },
      { timestamp: '4/17/2019 14:35', type: 'Info', message: 'Scan type = full' },
      { timestamp: '4/17/2019 14:36', type: 'Info', message: 'Scan start' },
      { timestamp: '4/17/2019 14:37', type: 'Info', message: 'Scanning system files' },
      { timestamp: '4/17/2019 14:38', type: 'Info', message: 'Scanning temporary files' },
      { timestamp: '4/17/2019 14:39', type: 'Info', message: 'Scanning services' },
      { timestamp: '4/17/2019 14:40', type: 'Info', message: 'Scanning boot sector' },
      { timestamp: '4/17/2019 14:41', type: 'Info', message: 'Scan complete' },
      { timestamp: '4/17/2019 14:42', type: 'Info', message: 'Files removed: 0' },
      { timestamp: '4/17/2019 14:43', type: 'Info', message: 'Files quarantined: 0' },
      { timestamp: '4/17/2019 14:44', type: 'Info', message: 'Boot sector: clean' },
      { timestamp: '4/17/2019 14:45', type: 'Info', message: 'Next scheduled scan: 4/18/2019 14:30' },
      { timestamp: '4/18/2019 14:30', type: 'Info', message: 'Scheduled scan initiated' },
      { timestamp: '4/18/2019 14:31', type: 'Info', message: 'Checking for update' },
      { timestamp: '4/18/2019 14:32', type: 'Info', message: 'No update available' },
      { timestamp: '4/18/2019 14:33', type: 'Info', message: 'Checking for definition update' },
      { timestamp: '4/18/2019 14:34', type: 'Info', message: 'Update available v18.2.3.4440' },
      { timestamp: '4/18/2019 14:33', type: 'Info', message: 'Downloading update' },
      { timestamp: '4/18/2019 14:35', type: 'Info', message: 'Definition update complete' },
      { timestamp: '4/18/2019 14:35', type: 'Info', message: 'Scan type = full' },
      { timestamp: '4/18/2019 14:36', type: 'Info', message: 'Scan start' },
      { timestamp: '4/18/2019 14:37', type: 'Info', message: 'Scanning system files' },
      { timestamp: '4/18/2019 14:37', type: 'Warn', message: 'Threat detected: svchost.exe - Matches definition v18.2.3.4440' },
      { timestamp: '4/18/2019 14:37', type: 'Info', message: 'File quarantined: svchost.exe' },
      { timestamp: '4/18/2019 14:38', type: 'Info', message: 'Threat successfully removed' },
      { timestamp: '4/18/2019 14:39', type: 'Info', message: 'Scan complete - System clean' }
    ],
    correctStatus: 'Clean'
  },
  {
    serverId: 'server3',
    serverIp: '192.168.10.41',
    logs: [
      { timestamp: '4/17/2019 14:30', type: 'Info', message: 'Scheduled scan initiated' },
      { timestamp: '4/17/2019 14:31', type: 'Info', message: 'Checking for update' },
      { timestamp: '4/17/2019 14:32', type: 'Info', message: 'No update available' },
      { timestamp: '4/17/2019 14:33', type: 'Info', message: 'Checking for definition update' },
      { timestamp: '4/17/2019 14:34', type: 'Info', message: 'No definition update available' },
      { timestamp: '4/17/2019 14:35', type: 'Info', message: 'Scan type = full' },
      { timestamp: '4/17/2019 14:36', type: 'Info', message: 'Scan start' },
      { timestamp: '4/17/2019 14:37', type: 'Info', message: 'Scanning system files' },
      { timestamp: '4/17/2019 14:38', type: 'Info', message: 'Scanning temporary files' },
      { timestamp: '4/17/2019 14:39', type: 'Info', message: 'Scanning services' },
      { timestamp: '4/17/2019 14:40', type: 'Info', message: 'Scanning boot sector' },
      { timestamp: '4/17/2019 14:41', type: 'Info', message: 'Scan complete' },
      { timestamp: '4/17/2019 14:42', type: 'Info', message: 'Files removed: 0' },
      { timestamp: '4/17/2019 14:43', type: 'Info', message: 'Files quarantined: 0' },
      { timestamp: '4/17/2019 14:44', type: 'Info', message: 'Boot sector: clean' },
      { timestamp: '4/17/2019 14:45', type: 'Info', message: 'Next scheduled scan: 4/18/2019 14:30' },
      { timestamp: '4/18/2019 14:30', type: 'Info', message: 'Scheduled scan initiated' },
      { timestamp: '4/18/2019 14:31', type: 'Info', message: 'Checking for update' },
      { timestamp: '4/18/2019 14:32', type: 'Error', message: 'Update server unreachable - Connection timeout' },
      { timestamp: '4/18/2019 14:33', type: 'Error', message: 'Failed to download definition updates' },
      { timestamp: '4/18/2019 14:34', type: 'Info', message: 'Proceeding with existing definitions' },
      { timestamp: '4/18/2019 14:35', type: 'Info', message: 'Scan type = full' },
      { timestamp: '4/18/2019 14:36', type: 'Info', message: 'Scan start' },
      { timestamp: '4/18/2019 14:37', type: 'Info', message: 'Scanning system files' },
      { timestamp: '4/18/2019 14:38', type: 'Info', message: 'Scanning complete - No threats detected' },
      { timestamp: '4/18/2019 14:39', type: 'Warn', message: 'Scan completed with outdated definitions' }
    ],
    correctStatus: 'Infected'
  }
];

export const threatAnalysisExplanation = {
  attackExplanations: {
    'Botnet/DDoS': {
      reasoning: "Multiple SYN packets from multiple sources is the signature of a SYN flood attack, typically executed by a botnet for DDoS purposes. The attacker uses many compromised systems to overwhelm the target with connection requests.",
      remediation: "DDoS protection services can detect and filter malicious traffic patterns, rate-limit connections, and use challenge-response mechanisms to distinguish legitimate users from bot traffic."
    },
    'RAT (Remote Access Trojan)': {
      reasoning: "A connection that allows remote command execution is characteristic of a Remote Access Trojan, which gives attackers persistent backdoor access to execute arbitrary commands on the compromised system.",
      remediation: "Host-based IPS can detect and block malicious command execution patterns, unauthorized process creation, and suspicious network communications typical of RAT behavior."
    },
    'Worm': {
      reasoning: "Self-propagating malware that spreads through a network using well-known credentials is a worm. Worms automatically replicate and spread without user interaction, often exploiting weak passwords.",
      remediation: "Changing default passwords prevents worms from using credential-based propagation. Default credentials are one of the most common attack vectors for worms."
    },
    'Keylogger': {
      reasoning: "Hardware that monitors user input to harvest credentials is a keylogger. Hardware keyloggers are physical devices placed between keyboards and computers to intercept keystrokes.",
      remediation: "Disabling unnecessary physical ports (USB, PS/2) and implementing port security can prevent hardware keylogger attachment. Physical security controls are also essential."
    },
    'Backdoor': {
      reasoning: "Hidden access in an application that bypasses authentication is a backdoor. Backdoors are often embedded by malicious insiders or through supply chain compromises in internally developed software.",
      remediation: "Code reviews can identify backdoors by examining source code for unauthorized authentication bypasses, hidden admin accounts, or suspicious logic that circumvents security controls."
    }
  },
  serverAnalysis: {
    '192.168.10.22': {
      status: 'Origin (Patient Zero)',
      reasoning: "Server 192.168.10.22 is Patient Zero based on several indicators: (1) The malicious svchost.exe process (PID 4443) disabled scheduled scans and updates at 2:31-2:32 AM on 4/18, indicating active malware infection. (2) The antivirus service was stopped, preventing detection and removal. (3) The timeline shows this occurred BEFORE other servers detected the malware, making it the origin of the outbreak. (4) No remediation was successfully performed on this server.",
      criticalIndicators: [
        "Scheduled scan disabled by suspicious process",
        "Antivirus service stopped",
        "Earliest infection timestamp",
        "No successful remediation"
      ]
    },
    '192.168.10.37': {
      status: 'Clean',
      reasoning: "Server 192.168.10.37 successfully detected and removed the threat: (1) It downloaded updated virus definitions (v18.2.3.4440) at 14:34. (2) The malicious svchost.exe was immediately detected at 14:37 during the scan. (3) The file was successfully quarantined. (4) The scan completed with confirmation that the threat was removed and the system is clean. (5) The updated definitions allowed detection of the malware that Patient Zero couldn't detect.",
      criticalIndicators: [
        "Successfully downloaded definition updates",
        "Threat detected immediately after update",
        "File successfully quarantined",
        "System confirmed clean after remediation"
      ]
    },
    '192.168.10.41': {
      status: 'Infected',
      reasoning: "Server 192.168.10.41 remains infected but undetected: (1) It failed to connect to the update server at 14:32, preventing it from downloading new virus definitions. (2) The scan proceeded with outdated definitions that don't include signatures for the malware. (3) The scan reported 'No threats detected' but this is a false negative due to outdated definitions. (4) The warning at 14:39 confirms the scan used outdated definitions, meaning any new malware would not be detected. (5) Given the malware spread from .22 and .37 detected it after updating, .41 is almost certainly infected but unable to detect it.",
      criticalIndicators: [
        "Failed to download definition updates",
        "Scan used outdated definitions",
        "Update server unreachable (possibly blocked by malware)",
        "False negative due to missing signatures"
      ]
    }
  },
  forensicPrinciples: [
    "Timeline Analysis: Establish the sequence of events to identify Patient Zero",
    "Indicator Analysis: Look for behavioral indicators (disabled AV, stopped services)",
    "Update Status: Servers with current definitions can detect threats that outdated ones miss",
    "Network Propagation: Malware often spreads from one origin to multiple targets",
    "False Negatives: Clean scan results don't guarantee cleanliness if definitions are outdated"
  ]
};

// PBQ 5: System Log Analysis
export interface SystemLogEntry {
  id: string;
  host: string;
  timestamp: string;
  logType: 'System' | 'Security' | 'Application' | 'Firewall';
  severity: 'Info' | 'Warning' | 'Error' | 'Critical';
  message: string;
  pid?: number;
  user?: string;
  sourceIp?: string;
}

export interface LogQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const systemLogAnalysisScenario = {
  title: "System Log Analysis & Forensic Investigation",
  scenario: `You are a security analyst investigating suspicious activity on your network. Multiple systems have reported anomalies, and you need to analyze system logs, security logs, and firewall logs to determine:

1. **What type of attack occurred?**
2. **Which user account was compromised?**
3. **What was the attack vector (initial access method)?**
4. **Which system was Patient Zero?**
5. **What remediation steps should be taken?**

Your organization uses Windows servers with standard logging enabled. The Security Operations Center (SOC) has collected logs from multiple sources spanning a 24-hour period. Analyze the logs carefully to identify the attack timeline, tactics, and indicators of compromise (IOCs).`,
  instructions: "Review all log entries from different systems and sources. Answer each question based on your forensic analysis of the logs. Pay attention to timestamps, user accounts, source IPs, and process behaviors."
};

export const systemLogEntries: SystemLogEntry[] = [
  // Web Server - Initial compromise
  { id: 'log1', host: 'WEB-SRV-01', timestamp: '2024-01-15 08:45:12', logType: 'Application', severity: 'Info', message: 'IIS: GET /login.php - 200 OK', sourceIp: '203.0.113.45' },
  { id: 'log2', host: 'WEB-SRV-01', timestamp: '2024-01-15 09:23:41', logType: 'Application', severity: 'Warning', message: 'IIS: Multiple failed login attempts detected', sourceIp: '203.0.113.45' },
  { id: 'log3', host: 'WEB-SRV-01', timestamp: '2024-01-15 09:24:15', logType: 'Security', severity: 'Warning', message: 'Account lockout: admin after 10 failed attempts', user: 'admin' },
  { id: 'log4', host: 'WEB-SRV-01', timestamp: '2024-01-15 09:31:22', logType: 'Application', severity: 'Info', message: 'IIS: POST /upload.php - SQL injection attempt blocked by WAF', sourceIp: '203.0.113.45' },
  { id: 'log5', host: 'WEB-SRV-01', timestamp: '2024-01-15 10:15:33', logType: 'Security', severity: 'Critical', message: 'Successful login: jdavis from 203.0.113.45', user: 'jdavis', sourceIp: '203.0.113.45' },
  { id: 'log6', host: 'WEB-SRV-01', timestamp: '2024-01-15 10:16:01', logType: 'Application', severity: 'Warning', message: 'Unusual file upload: cmd.php (detected web shell patterns)', user: 'jdavis' },
  { id: 'log7', host: 'WEB-SRV-01', timestamp: '2024-01-15 10:16:45', logType: 'System', severity: 'Error', message: 'Process created: cmd.exe (PID: 3344) by w3wp.exe', pid: 3344 },
  
  // Firewall logs showing lateral movement
  { id: 'log8', host: 'FIREWALL-01', timestamp: '2024-01-15 10:17:12', logType: 'Firewall', severity: 'Info', message: 'Allowed: 10.0.10.50 -> 192.168.10.100:445 (SMB)', sourceIp: '10.0.10.50' },
  { id: 'log9', host: 'FIREWALL-01', timestamp: '2024-01-15 10:17:45', logType: 'Firewall', severity: 'Warning', message: 'Port scan detected: 10.0.10.50 scanning 192.168.10.0/24', sourceIp: '10.0.10.50' },
  
  // Database Server - Lateral movement target
  { id: 'log10', host: 'DB-SRV-02', timestamp: '2024-01-15 10:18:33', logType: 'Security', severity: 'Critical', message: 'Failed login attempt: Administrator from 10.0.10.50', sourceIp: '10.0.10.50' },
  { id: 'log11', host: 'DB-SRV-02', timestamp: '2024-01-15 10:19:41', logType: 'Security', severity: 'Critical', message: 'Successful login: svc_backup from 10.0.10.50 using NTLM', user: 'svc_backup', sourceIp: '10.0.10.50' },
  { id: 'log12', host: 'DB-SRV-02', timestamp: '2024-01-15 10:20:15', logType: 'System', severity: 'Warning', message: 'Scheduled task created: SystemUpdate by svc_backup', user: 'svc_backup' },
  { id: 'log13', host: 'DB-SRV-02', timestamp: '2024-01-15 10:21:02', logType: 'Application', severity: 'Error', message: 'SQL Server: Unusual query - SELECT * FROM users; Data exfiltration suspected' },
  
  // Domain Controller - Credential dumping
  { id: 'log14', host: 'DC-01', timestamp: '2024-01-15 10:22:18', logType: 'Security', severity: 'Critical', message: 'LSASS memory access by unknown process (mimikatz.exe)', pid: 4512 },
  { id: 'log15', host: 'DC-01', timestamp: '2024-01-15 10:22:45', logType: 'Security', severity: 'Critical', message: 'Domain Admin credential access: KRBTGT hash requested', user: 'svc_backup' },
  
  // Indicators of persistence
  { id: 'log16', host: 'WEB-SRV-01', timestamp: '2024-01-15 10:25:33', logType: 'System', severity: 'Critical', message: 'Registry modification: HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run - Persistence established' },
  { id: 'log17', host: 'WEB-SRV-01', timestamp: '2024-01-15 10:26:12', logType: 'Application', severity: 'Error', message: 'Windows Defender: Real-time protection disabled by administrator' }
];

export const systemLogQuestions: LogQuestion[] = [
  {
    id: 'q1',
    question: 'What type of attack is being executed based on the log analysis?',
    options: [
      'Distributed Denial of Service (DDoS)',
      'Advanced Persistent Threat (APT) with lateral movement',
      'Ransomware outbreak',
      'Insider threat data exfiltration'
    ],
    correctAnswer: 'Advanced Persistent Threat (APT) with lateral movement',
    explanation: 'The logs show a sophisticated multi-stage attack: (1) Initial compromise via web server, (2) Credential harvesting, (3) Lateral movement to database server, (4) Privilege escalation to Domain Admin, (5) Credential dumping (mimikatz), (6) Persistence establishment. This pattern is characteristic of an APT attack.'
  },
  {
    id: 'q2',
    question: 'Which user account was initially compromised by the attacker?',
    options: [
      'admin',
      'jdavis',
      'svc_backup',
      'Administrator'
    ],
    correctAnswer: 'jdavis',
    explanation: 'Log5 shows the first successful login was "jdavis" at 10:15:33 from the malicious IP 203.0.113.45, right after multiple failed attempts on the "admin" account. The attacker then used jdavis credentials to upload a web shell.'
  },
  {
    id: 'q3',
    question: 'What was the initial attack vector (entry point)?',
    options: [
      'SQL Injection vulnerability',
      'Brute force attack on RDP',
      'Phishing email with malicious attachment',
      'Password spraying attack on web application'
    ],
    correctAnswer: 'Password spraying attack on web application',
    explanation: 'Logs show multiple failed login attempts (log2-log4) against different accounts (admin, then jdavis) from the same IP, followed by successful authentication. This pattern indicates a password spraying attack where the attacker tries common passwords against multiple accounts to avoid account lockouts.'
  },
  {
    id: 'q4',
    question: 'Which system was Patient Zero (the first compromised system)?',
    options: [
      'WEB-SRV-01 (Web Server)',
      'DB-SRV-02 (Database Server)',
      'DC-01 (Domain Controller)',
      'FIREWALL-01'
    ],
    correctAnswer: 'WEB-SRV-01 (Web Server)',
    explanation: 'WEB-SRV-01 shows the earliest compromise indicators: initial failed logins (09:23), successful login (10:15), web shell upload (10:16), and command execution (10:16). All subsequent activity on other systems originated from this server, making it Patient Zero.'
  },
  {
    id: 'q5',
    question: 'What critical security control failed to prevent the web shell upload?',
    options: [
      'Antivirus software was disabled',
      'File upload validation and execution prevention',
      'Network segmentation',
      'Multi-factor authentication'
    ],
    correctAnswer: 'File upload validation and execution prevention',
    explanation: 'Log6 shows a web shell (cmd.php) was successfully uploaded despite being detected. The application should have: (1) Blocked PHP file uploads, (2) Validated file types, (3) Prevented execution in upload directories. The web shell execution (log7) indicates inadequate upload security controls.'
  }
];

export const systemLogExplanation = {
  attackTimeline: [
    '08:45 - Initial reconnaissance: Attacker accesses login page',
    '09:23-09:31 - Brute force/password spray: Multiple failed logins, then SQL injection attempt',
    '10:15 - Initial compromise: Successful login as jdavis',
    '10:16 - Web shell deployment: cmd.php uploaded and executed',
    '10:17 - Discovery: Port scanning internal network for SMB shares',
    '10:18-10:19 - Lateral movement: Access DB server using compromised credentials',
    '10:20-10:21 - Persistence & Exfiltration: Scheduled task creation, data theft',
    '10:22 - Privilege escalation: Credential dumping (mimikatz) on Domain Controller',
    '10:25-10:26 - Post-exploitation: Registry persistence, disable AV'
  ],
  killChain: [
    'Reconnaissance: Web application enumeration',
    'Weaponization: Password list preparation',
    'Delivery: Password spraying attack',
    'Exploitation: Successful authentication as jdavis',
    'Installation: Web shell upload (cmd.php)',
    'Command & Control: cmd.exe execution for remote commands',
    'Actions on Objectives: Lateral movement, credential dumping, data exfiltration'
  ],
  remediationSteps: [
    'Immediate: Isolate all affected systems (WEB-SRV-01, DB-SRV-02, DC-01)',
    'Immediate: Reset passwords for jdavis, svc_backup, and all domain accounts',
    'Immediate: Block source IP 203.0.113.45 at perimeter firewall',
    'Short-term: Remove web shells, scheduled tasks, and registry persistence',
    'Short-term: Force password reset for all users with MFA enrollment',
    'Short-term: Rebuild compromised systems from known-good backups',
    'Long-term: Implement MFA on all web applications',
    'Long-term: Enable file upload restrictions and execution prevention',
    'Long-term: Deploy EDR solutions for behavioral detection',
    'Long-term: Network segmentation between DMZ and internal networks'
  ]
};

// PBQ 6: Certificate Management
export interface Certificate {
  id: string;
  commonName: string;
  issuer: string;
  validFrom: string;
  validTo: string;
  keyUsage: string[];
  extendedKeyUsage?: string[];
  subjectAltNames?: string[];
  status: 'Valid' | 'Expired' | 'Revoked' | 'Self-Signed';
  purpose: string;
}

export interface CertificateIssue {
  id: string;
  certificate: Certificate;
  issue: string;
  correctAction: string;
}

export const certificateManagementScenario = {
  title: "PKI Certificate Management & Troubleshooting",
  scenario: `You are a security administrator managing your organization's Public Key Infrastructure (PKI). Several certificate-related issues have been reported across the network:

1. Web server SSL/TLS certificates showing browser warnings
2. VPN authentication failures
3. Email encryption problems
4. Code signing verification errors

Your task is to:
- Review each digital certificate
- Identify the security issue or misconfiguration
- Select the appropriate remediation action
- Understand PKI best practices and certificate lifecycle management

Organization Details:
- Internal CA: dc01.company.local
- External web services: *.company.com
- Valid certificate authorities: DigiCert, Let's Encrypt, Internal CA
- Certificate validity period policy: Maximum 13 months for web certificates`,
  instructions: "Examine each certificate carefully. Identify the problem and select the correct remediation action based on PKI best practices and security standards."
};

export const certificates: Certificate[] = [
  {
    id: 'cert1',
    commonName: 'www.company.com',
    issuer: 'Self-Signed',
    validFrom: '2022-01-01',
    validTo: '2027-01-01',
    keyUsage: ['Digital Signature', 'Key Encipherment'],
    extendedKeyUsage: ['Server Authentication'],
    subjectAltNames: ['www.company.com', 'company.com'],
    status: 'Self-Signed',
    purpose: 'Public-facing web server'
  },
  {
    id: 'cert2',
    commonName: 'vpn.company.com',
    issuer: 'CN=DigiCert SHA2 Secure Server CA',
    validFrom: '2023-01-15',
    validTo: '2024-01-14',
    keyUsage: ['Digital Signature', 'Key Encipherment'],
    extendedKeyUsage: ['Server Authentication', 'Client Authentication'],
    subjectAltNames: ['vpn.company.com'],
    status: 'Expired',
    purpose: 'VPN gateway'
  },
  {
    id: 'cert3',
    commonName: 'John Smith',
    issuer: 'CN=company.local-CA',
    validFrom: '2023-06-01',
    validTo: '2025-06-01',
    keyUsage: ['Digital Signature', 'Key Encipherment', 'Data Encipherment'],
    extendedKeyUsage: ['Email Protection', 'Client Authentication'],
    status: 'Revoked',
    purpose: 'S/MIME email encryption'
  },
  {
    id: 'cert4',
    commonName: 'company-codesign',
    issuer: 'CN=DigiCert Code Signing CA',
    validFrom: '2021-03-10',
    validTo: '2024-03-10',
    keyUsage: ['Digital Signature'],
    extendedKeyUsage: ['Code Signing'],
    status: 'Valid',
    purpose: 'Software code signing'
  },
  {
    id: 'cert5',
    commonName: '*.company.com',
    issuer: "CN=Let's Encrypt Authority X3",
    validFrom: '2024-01-01',
    validTo: '2025-07-01',
    keyUsage: ['Digital Signature', 'Key Encipherment'],
    extendedKeyUsage: ['Server Authentication'],
    subjectAltNames: ['*.company.com', 'company.com', 'www.company.com'],
    status: 'Valid',
    purpose: 'Wildcard certificate for multiple subdomains'
  }
];

export const certificateIssues: CertificateIssue[] = [
  {
    id: 'issue1',
    certificate: certificates[0],
    issue: 'Browsers show "Not Secure" warning - Untrusted certificate authority',
    correctAction: 'Replace with certificate from trusted public CA (DigiCert, Let\'s Encrypt)'
  },
  {
    id: 'issue2',
    certificate: certificates[1],
    issue: 'VPN clients cannot connect - Certificate validation failure',
    correctAction: 'Renew the expired certificate immediately'
  },
  {
    id: 'issue3',
    certificate: certificates[2],
    issue: 'Email encryption fails - Certificate not trusted',
    correctAction: 'Issue new certificate - current one is revoked'
  },
  {
    id: 'issue4',
    certificate: certificates[3],
    issue: 'Code signing warnings appear during software installation',
    correctAction: 'Renew certificate - approaching expiration date'
  },
  {
    id: 'issue5',
    certificate: certificates[4],
    issue: 'Certificate violates policy - exceeds maximum validity period',
    correctAction: 'Replace with certificate having maximum 13-month validity'
  }
];

export const certificateActions = [
  'Replace with certificate from trusted public CA (DigiCert, Let\'s Encrypt)',
  'Renew the expired certificate immediately',
  'Issue new certificate - current one is revoked',
  'Renew certificate - approaching expiration date',
  'Replace with certificate having maximum 13-month validity',
  'Add certificate to trusted root store',
  'Enable certificate pinning',
  'Update certificate with correct key usage extensions',
  'Implement certificate transparency monitoring',
  'Configure OCSP stapling'
];

export const certificateExplanation = {
  issue1: {
    problem: 'Self-signed certificates are not trusted by browsers because they are not issued by a recognized Certificate Authority (CA). This causes browser security warnings and erodes user trust.',
    solution: 'Obtain a certificate from a publicly trusted CA like DigiCert or Let\'s Encrypt. Public CAs are included in browser and OS trust stores, eliminating security warnings.',
    bestPractice: 'Never use self-signed certificates for public-facing services. Reserve self-signed certificates for internal testing only.'
  },
  issue2: {
    problem: 'Expired certificates are automatically rejected by VPN clients as they can no longer be validated. Certificate validity is crucial for establishing trust.',
    solution: 'Renew the certificate before expiration. Implement certificate monitoring to alert 30-60 days before expiration to prevent service disruptions.',
    bestPractice: 'Set up automated certificate renewal where possible (e.g., Let\'s Encrypt ACME protocol) and maintain a certificate inventory with expiration dates.'
  },
  issue3: {
    problem: 'Revoked certificates are published on Certificate Revocation Lists (CRL) or checked via OCSP. Once revoked, a certificate is permanently untrusted and cannot be un-revoked.',
    solution: 'Issue a new certificate with a new key pair. Investigate why the certificate was revoked (key compromise, employee termination, etc.) before issuing a replacement.',
    bestPractice: 'Implement proper key management and protection. Use HSMs for high-value certificates. Maintain procedures for certificate revocation in security incidents.'
  },
  issue4: {
    problem: 'Code signing certificates require high trust levels. Users will see warnings if the certificate is expired or nearing expiration, potentially blocking software installation.',
    solution: 'Renew the code signing certificate before expiration. After renewal, re-sign all software packages with the new certificate.',
    bestPractice: 'Code signing certificates typically have longer validity periods (1-3 years). Plan renewals well in advance as re-signing software takes time.'
  },
  issue5: {
    problem: 'CA/Browser Forum Baseline Requirements limit TLS certificate validity to 398 days (approximately 13 months). Certificates with longer validity violate these requirements and may be distrusted.',
    solution: 'Replace the certificate with one having a maximum 398-day (13-month) validity period to comply with industry standards.',
    bestPractice: 'Follow CA/Browser Forum guidelines for certificate issuance. The 13-month limit improves security by forcing more frequent key rotation and certificate updates.'
  },
  pkiConcepts: [
    'Certificate Authorities (CAs): Trusted entities that issue digital certificates',
    'Certificate Lifecycle: Issuance → Renewal → Revocation → Expiration',
    'Certificate Validation: Checking validity period, revocation status, and trust chain',
    'Key Usage: Specifies what cryptographic operations a certificate can perform',
    'Extended Key Usage (EKU): Specifies specific purposes (Server Auth, Code Signing, Email)',
    'Subject Alternative Names (SAN): Allows multiple domain names in one certificate',
    'Trust Chain: Certificate → Intermediate CA → Root CA',
    'Certificate Transparency: Public logging of certificate issuance for security',
    'OCSP: Online Certificate Status Protocol for real-time revocation checking'
  ]
};
