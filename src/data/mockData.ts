export const repositories = [
  { id: 'fintech-advisory-bot', name: 'fintech-advisory-bot', assets: 36, thisWeek: 7, issues: { critical: 2, high: 4, medium: 3, low: 3 }, totalIssues: 12 },
  { id: 'hr-advisory-bot', name: 'hr-advisory-bot', assets: 15, thisWeek: 6, issues: { critical: 0, high: 2, medium: 2, low: 1 }, totalIssues: 5 },
  { id: 'dev-advisory-bot', name: 'dev-advisory-bot', assets: 4, thisWeek: 3, issues: { critical: 1, high: 6, medium: 6, low: 3 }, totalIssues: 16 },
  { id: 'acme-lorem-repo-name', name: 'acme-lorem-repo-name', assets: 7, thisWeek: 3, issues: { critical: 0, high: 0, medium: 0, low: 0 }, totalIssues: 0 },
  { id: 'dolor-long-repo-name', name: 'dolor-long-repo-name', assets: 4, thisWeek: 2, issues: { critical: 0, high: 0, medium: 0, low: 0 }, totalIssues: 0 },
  { id: 'amet-long-repo-name', name: 'amet-long-repo-name', assets: 4, thisWeek: 2, issues: { critical: 0, high: 0, medium: 1, low: 2 }, totalIssues: 0 },
  { id: 'ipsum-long-repo-name', name: 'ipsum-long-repo-name', assets: 3, thisWeek: 0, issues: { critical: 0, high: 0, medium: 1, low: 2 }, totalIssues: 0 },
  { id: 'nunquam-repo-name', name: 'nunquam-repo-name', assets: 3, thisWeek: 0, issues: { critical: 0, high: 0, medium: 1, low: 2 }, totalIssues: 0 },
  { id: 'another-long-repo-name', name: 'another-long-repo-name', assets: 2, thisWeek: 0, issues: { critical: 0, high: 0, medium: 1, low: 1 }, totalIssues: 0 },
  { id: 'acme-another-repo-name', name: 'acme-another-repo-name', assets: 2, thisWeek: 0, issues: { critical: 0, high: 0, medium: 1, low: 1 }, totalIssues: 0 },
];

export const assets: Record<string, { id: string; name: string; type: string; issues: { critical: number; high: number; medium: number; low: number }; vendor: string }[]> = {
  'dev-advisory-bot': [
    { id: 'gpt-4o-turbo', name: 'gpt-4o-turbo', type: 'Model', issues: { critical: 1, high: 1, medium: 1, low: 0 }, vendor: 'OpenAI' },
    { id: 'customer_data_v2', name: 'customer_data_v2', type: 'Model', issues: { critical: 0, high: 5, medium: 3, low: 2 }, vendor: '–' },
    { id: 'stripe-connector', name: 'Stripe connector', type: 'Model', issues: { critical: 0, high: 0, medium: 1, low: 0 }, vendor: 'Stripe' },
    { id: 'finance-codes', name: 'finance codes', type: 'Model', issues: { critical: 0, high: 0, medium: 1, low: 0 }, vendor: '–' },
  ],
  'fintech-advisory-bot': [
    { id: 'gpt-4-turbo', name: 'gpt-4-turbo', type: 'Model', issues: { critical: 1, high: 2, medium: 1, low: 0 }, vendor: 'OpenAI' },
    { id: 'claude-3-5-sonnet', name: 'claude-3-5-sonnet', type: 'Model', issues: { critical: 1, high: 1, medium: 1, low: 1 }, vendor: 'Anthropic' },
    { id: 'finance-dataset-v3', name: 'finance-dataset-v3', type: 'Dataset', issues: { critical: 0, high: 1, medium: 1, low: 2 }, vendor: '–' },
  ],
};

export const assetDetails: Record<string, {
  name: string; type: string; repository: string; firstDiscovered: string; occurrences: number;
  issues: { critical: number; high: number; medium: number; low: number };
  capabilities: { architecture: string; parameters: string; tokenLimit: number; inputOutput: string; scores: { label: string; value: number }[] };
  riskProfile: { categories: { label: string; value: number }[] };
  infrastructure: { policy: string; type: string; region: string; dataResidency: string };
  audit: { lastAssessed: string; assessedBy: string; notes: string };
  occurrenceList: { file: string; line: number; column: number }[];
}> = {
  'gpt-4o-turbo': {
    name: 'gpt-4o-turbo', type: 'Model', repository: 'dev-advisory-bot',
    firstDiscovered: 'Jan 13, 2026', occurrences: 3,
    issues: { critical: 1, high: 1, medium: 1, low: 0 },
    capabilities: {
      architecture: 'Transformer (MOE)', parameters: 'SaaS (Hosted API)',
      tokenLimit: 128000, inputOutput: 'Multimodal',
      scores: [
        { label: 'Logic & reasoning tasks', value: 60 },
        { label: 'Coding & software engineering tasks', value: 54 },
        { label: 'Transition & multilingual tasks', value: 88 },
        { label: 'General purpose tasks', value: 96 },
      ],
    },
    riskProfile: {
      categories: [
        { label: 'CBRN', value: 85 }, { label: 'Privacy & PII', value: 72 },
        { label: 'Factual accuracy', value: 60 }, { label: 'Malicious code', value: 45 },
        { label: 'Bias & fairness', value: 55 }, { label: 'Jailbreak resistance', value: 40 },
        { label: 'Toxicity', value: 50 }, { label: 'Human autonomy', value: 65 },
      ],
    },
    infrastructure: {
      policy: '<really long policy name lorem ipsum dolor sit amet>',
      type: 'SaaS (Hosted API)', region: 'US-East (Virginia)', dataResidency: 'United states',
    },
    audit: { lastAssessed: 'Jan 15, 2025', assessedBy: 'Evo risk agent', notes: '<noted or commentary added by Snyk. Multiline>' },
    occurrenceList: [
      { file: '.../scripts/acme-tools/mod_fin.py', line: 143, column: 25 },
      { file: '.../scripts/acme-tools/mod_res.py', line: 80, column: 1 },
      { file: '.../scripts/acme-tools/mod_ind.py', line: 73, column: 7 },
    ],
  },
};

export const policies = [
  { id: 'block-deepseek', name: 'Block DeepSeek', severity: 'Critical', issues: 1, status: 'Active', createdBy: 'Edgar Doe' },
  { id: 'disallow-log4j', name: 'Disallow Library Log4j-v2.14', severity: 'High', issues: 1, status: 'Active', createdBy: 'Evo agent' },
  { id: 'disallow-urllib3', name: 'Disallow Library Urllib3-v1.26.4', severity: 'High', issues: 1, status: 'Active', createdBy: 'Evo agent' },
  { id: 'disallow-modelname', name: 'Disallow Modelname', severity: 'Medium', issues: 1, status: 'Active', createdBy: 'Evo agent' },
  { id: 'mcp-policy', name: '<MCP policy name>', severity: 'Low', issues: 1, status: 'Active', createdBy: 'Evo agent' },
  { id: 'disallow-llama', name: 'Disallow Model Llama-3-70B', severity: 'Medium', issues: 0, status: 'Active', createdBy: 'Edgar Doe' },
  { id: 'disallow-mcp-gacy', name: 'Disallow MCP server...gacyKnowledge-Base', severity: 'Medium', issues: 0, status: 'Active', createdBy: 'Evo agent' },
  { id: 'disallow-log4j-2', name: 'Disallow Library Log4j-v2.14', severity: 'Medium', issues: 0, status: 'Active', createdBy: 'Evo agent' },
  { id: 'disallow-dataset', name: 'Disallow Dataset Personal-Finance-V1', severity: 'Medium', issues: 0, status: 'Active', createdBy: 'Evo agent' },
  { id: 'disallow-mcp-local', name: 'Disallow MCP server UnverifiedLocalHost', severity: 'Medium', issues: 0, status: 'Active', createdBy: 'John doe' },
];

export const policyIssues = [
  { id: 'pytorch-1131', assetName: 'PyTorch-1.13.1', repository: '<longer repository name>', policyName: 'Disallow Library PyTo...', severity: 'Critical', occurrences: 1 },
  { id: 'log4j-214', assetName: 'Log4j-v2.14', repository: '<longer repository name>', policyName: 'Disallow Library Log...', severity: 'High', occurrences: 1 },
  { id: 'urllib3-1264', assetName: 'Urllib3-v1.26.4', repository: '<longer repository name>', policyName: 'Disallow Library Urll...', severity: 'High', occurrences: 1 },
  { id: 'deepseek-v32', assetName: 'DeepSeek-V3.2', repository: '<longer repository name>', policyName: 'Disallow Model Deep...', severity: 'Medium', occurrences: 1 },
  { id: 'gpt-4-32k', assetName: 'GPT-4-32k-0314', repository: '<longer repository name>', policyName: 'Disallow Model GPT-...', severity: 'Low', occurrences: 1 },
];

export const issueDetails: Record<string, {
  name: string; description: string; repository: string; assetName: string;
  firstDiscovered: string; severity: string;
  remediationSteps: string;
  occurrences: { location: string; line: number; column: number }[];
}> = {
  'pytorch-1131': {
    name: 'PyTorch-1.13.1 in <longer repository name>',
    description: 'Additional descriptive text',
    repository: 'github.com/orgname/reponame/',
    assetName: 'PyTorch-1.13.1',
    firstDiscovered: 'Oct 10, 2025',
    severity: 'Critical',
    remediationSteps: 'Use an approved model vendor from your organization\'s allowlist.',
    occurrences: [
      { location: '.../scripts/acme-tools/mod_fin.py', line: 143, column: 25 },
      { location: '.../scripts/acme-tools/mod_res.py', line: 80, column: 1 },
      { location: '.../scripts/acme-tools/mod_ind.py', line: 73, column: 7 },
    ],
  },
  'deepseek-v32': {
    name: 'DeepSeek-v4 in <longer repository name>',
    description: 'Additional descriptive text',
    repository: 'github.com/orgname/reponame/',
    assetName: 'DeepSeek-v4',
    firstDiscovered: 'Oct 10, 2025',
    severity: 'Critical',
    remediationSteps: 'Use an approved model vendor from your organization\'s allowlist.',
    occurrences: [
      { location: '.../scripts/acme-tools/mod_fin.py', line: 143, column: 25 },
      { location: '.../scripts/acme-tools/mod_res.py', line: 80, column: 1 },
      { location: '.../scripts/acme-tools/mod_ind.py', line: 73, column: 7 },
    ],
  },
};

export const savedReports = [
  { id: 'new-issues-severity', name: 'New issues by severity', createdAt: 'Jan 22 2026', createdBy: 'Ana Parada' },
  { id: 'critical-assets', name: 'Critical assets overview', createdAt: 'Jan 20 2026', createdBy: 'Ana Parada' },
  { id: 'repo-coverage', name: 'Repository scan coverage', createdAt: 'Jan 18 2026', createdBy: 'Edgar Doe' },
  { id: 'policy-violations', name: 'Policy violations this month', createdAt: 'Jan 15 2026', createdBy: 'Ana Parada' },
  { id: 'model-inventory', name: 'All models grouped by count', createdAt: 'Jan 12 2026', createdBy: 'Evo agent' },
];

export const reportRows = [
  { assetName: 'PyTorch-1.13.1', severity: 'Critical', createdAt: 'Jan 22 2026', assignedTo: 'Ana Parada', occurrences: 1 },
  { assetName: 'Log4j-v2.14', severity: 'Critical', createdAt: 'Jan 22 2026', assignedTo: 'Ana Parada', occurrences: 1 },
  { assetName: 'Urllib3-v1.26.4', severity: 'High', createdAt: 'Jan 22 2026', assignedTo: 'Ana Parada', occurrences: 1 },
  { assetName: 'DeepSeek-V3.2', severity: 'Medium', createdAt: 'Jan 22 2026', assignedTo: 'Ana Parada', occurrences: 1 },
  { assetName: 'GPT-4-32k-0314', severity: 'Low', createdAt: 'Jan 22 2026', assignedTo: 'Ana Parada', occurrences: 1 },
  { assetName: 'GPT-4-32k-0314', severity: 'Low', createdAt: 'Jan 22 2026', assignedTo: 'Ana Parada', occurrences: 1 },
  { assetName: 'GPT-4-32k-0314', severity: 'Low', createdAt: 'Jan 22 2026', assignedTo: 'Ana Parada', occurrences: 1 },
  { assetName: 'GPT-4-32k-0314', severity: 'Low', createdAt: 'Jan 22 2026', assignedTo: 'Ana Parada', occurrences: 1 },
  { assetName: 'GPT-4-32k-0314', severity: 'Low', createdAt: 'Jan 22 2026', assignedTo: 'Ana Parada', occurrences: 1 },
  { assetName: 'GPT-4-32k-0314', severity: 'Low', createdAt: 'Jan 22 2026', assignedTo: 'Ana Parada', occurrences: 1 },
];

export const scansJobs = {
  activeTests: [
    { id: '1', description: 'Re-apply policies', type: 'Test', initiator: 'Alex Perekatov', status: 'Running', progress: 30 },
  ],
  finishedJobs: [
    { id: '2', description: 'Scan <prompt>', type: 'Scan', initiator: 'Alex Perekatov', status: 'Success', finished: 'Just now' },
    { id: '3', description: 'Re-apply policies', type: 'Test', initiator: 'Alex Perekatov', status: 'Success', finished: 'Just now' },
    { id: '4', description: 'Daily repositories scan', type: 'Scan', initiator: 'Evo agent', status: 'Success', finished: '1 day ago' },
    { id: '5', description: 'Daily repositories scan', type: 'Scan', initiator: 'Evo agent', status: 'Success', finished: '2 days ago' },
    { id: '6', description: 'Daily repositories scan', type: 'Scan', initiator: 'Evo agent', status: 'Success', finished: '3 days ago' },
    { id: '7', description: 'Daily repositories scan', type: 'Scan', initiator: 'Evo agent', status: 'Success', finished: '4 days ago' },
    { id: '8', description: 'Daily repositories scan', type: 'Scan', initiator: 'Evo agent', status: 'Success', finished: '5 days ago' },
    { id: '9', description: 'Daily repositories scan', type: 'Scan', initiator: 'Evo agent', status: 'Success', finished: '6 days ago' },
    { id: '10', description: 'Daily repositories scan', type: 'Scan', initiator: 'Evo agent', status: 'Success', finished: '7 days ago' },
  ],
};
