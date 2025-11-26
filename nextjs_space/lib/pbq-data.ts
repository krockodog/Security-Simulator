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
