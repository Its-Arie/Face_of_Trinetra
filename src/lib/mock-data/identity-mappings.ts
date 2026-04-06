import { type IdentityGroup, type CrossCloudActivity, type UnmappedIdentity, type IdentityEmbeddingPoint, type PivotAlert } from '../../types/identity';

export const mockIdentityGroups: IdentityGroup[] = [
  {
    group_id: 'group_john_doe',
    logical_name: 'John Doe',
    identities: {
      aws: { identity_id: 'user_john', display_name: 'user_john', provider: 'aws', account_type: 'human', email: 'john.doe@corp.com', arn_or_id: 'arn:aws:iam::123456789:user/john', last_active: new Date(Date.now() - 3 * 60000).toISOString(), action_count_24h: 15, malicious_action_count: 5 },
      azure: { identity_id: 'john.doe@corp.com', display_name: 'john.doe@corp.com', provider: 'azure', account_type: 'human', email: 'john.doe@corp.com', arn_or_id: 'john.doe@corp.com', last_active: new Date(Date.now() - 18 * 60000).toISOString(), action_count_24h: 12, malicious_action_count: 1 },
      gcp: { identity_id: 'john@project.iam.gserviceaccount.com', display_name: 'john@gcp.iam', provider: 'gcp', account_type: 'human', email: 'john.doe@corp.com', arn_or_id: 'john@project.iam.gserviceaccount.com', last_active: new Date(Date.now() - 25 * 60000).toISOString(), action_count_24h: 18, malicious_action_count: 2 }
    },
    linking_status: 'fully_linked',
    avg_similarity: 0.93,
    pairwise_similarity: { aws_azure: 0.96, aws_gcp: 0.93, azure_gcp: 0.91 },
    risk_score: 0.89,
    risk_level: 'critical',
    risk_trend: 0.15,
    total_actions_24h: 45,
    malicious_actions_24h: 8,
    feature_contributions: { username_pattern: 0.85, login_behavior: 0.65, resource_access: 0.80, time_correlation: 0.55, ip_overlap: 0.92 },
    pivot_alert_count: 2
  },
  {
    group_id: 'group_alice_wong',
    logical_name: 'Alice Wong',
    identities: {
      aws: { identity_id: 'user_alice', display_name: 'user_alice', provider: 'aws', account_type: 'human', email: 'alice.wong@corp.com', arn_or_id: 'arn:aws:iam::123456789:user/alice', last_active: new Date(Date.now() - 12 * 60000).toISOString(), action_count_24h: 10, malicious_action_count: 2 },
      azure: { identity_id: 'alice.wong@corp.com', display_name: 'alice.wong@corp.com', provider: 'azure', account_type: 'human', email: 'alice.wong@corp.com', arn_or_id: 'alice.wong@corp.com', last_active: new Date(Date.now() - 45 * 60000).toISOString(), action_count_24h: 15, malicious_action_count: 3 },
      gcp: { identity_id: 'alice@project.iam.gserviceaccount.com', display_name: 'alice@gcp.iam', provider: 'gcp', account_type: 'human', email: 'alice.wong@corp.com', arn_or_id: 'alice@project.iam.gserviceaccount.com', last_active: new Date(Date.now() - 60 * 60000).toISOString(), action_count_24h: 13, malicious_action_count: 0 }
    },
    linking_status: 'fully_linked',
    avg_similarity: 0.91,
    pairwise_similarity: { aws_azure: 0.94, aws_gcp: 0.91, azure_gcp: 0.89 },
    risk_score: 0.78,
    risk_level: 'high',
    risk_trend: 0.08,
    total_actions_24h: 38,
    malicious_actions_24h: 5,
    feature_contributions: { username_pattern: 0.80, login_behavior: 0.70, resource_access: 0.75, time_correlation: 0.60, ip_overlap: 0.88 },
    pivot_alert_count: 1
  },
  {
    group_id: 'group_bob_smith',
    logical_name: 'Bob Smith',
    identities: {
      aws: { identity_id: 'user_bob', display_name: 'user_bob', provider: 'aws', account_type: 'human', email: 'bob.smith@corp.com', arn_or_id: 'arn:aws:iam::123456789:user/bob', last_active: new Date(Date.now() - 30 * 60000).toISOString(), action_count_24h: 20, malicious_action_count: 0 },
      azure: { identity_id: 'bob.smith@corp.com', display_name: 'bob.smith@corp.com', provider: 'azure', account_type: 'human', email: 'bob.smith@corp.com', arn_or_id: 'bob.smith@corp.com', last_active: new Date(Date.now() - 120 * 60000).toISOString(), action_count_24h: 11, malicious_action_count: 1 },
      gcp: { identity_id: 'bob@project.iam.gserviceaccount.com', display_name: 'bob@gcp.iam', provider: 'gcp', account_type: 'human', email: 'bob.smith@corp.com', arn_or_id: 'bob@project.iam.gserviceaccount.com', last_active: new Date(Date.now() - 180 * 60000).toISOString(), action_count_24h: 10, malicious_action_count: 0 }
    },
    linking_status: 'fully_linked',
    avg_similarity: 0.95,
    pairwise_similarity: { aws_azure: 0.97, aws_gcp: 0.95, azure_gcp: 0.94 },
    risk_score: 0.35,
    risk_level: 'low',
    risk_trend: -0.05,
    total_actions_24h: 41,
    malicious_actions_24h: 1,
    feature_contributions: { username_pattern: 0.95, login_behavior: 0.85, resource_access: 0.60, time_correlation: 0.80, ip_overlap: 0.95 },
    pivot_alert_count: 0
  },
  {
    group_id: 'group_sarah_chen',
    logical_name: 'Sarah Chen',
    identities: {
      aws: { identity_id: 'user_sarah', display_name: 'user_sarah', provider: 'aws', account_type: 'human', email: 'sarah.chen@corp.com', arn_or_id: 'arn:aws:iam::123456789:user/sarah', last_active: new Date(Date.now() - 60 * 60000).toISOString(), action_count_24h: 8, malicious_action_count: 1 },
      azure: { identity_id: 'sarah.chen@corp.com', display_name: 'sarah.chen@corp.com', provider: 'azure', account_type: 'human', email: 'sarah.chen@corp.com', arn_or_id: 'sarah.chen@corp.com', last_active: new Date(Date.now() - 120 * 60000).toISOString(), action_count_24h: 15, malicious_action_count: 1 },
      gcp: { identity_id: 'user_sarah_gcp', display_name: 'user_sarah_gcp', provider: 'gcp', account_type: 'human', email: 'sarah.chen@corp.com', arn_or_id: 'user_sarah_gcp', last_active: new Date(Date.now() - 45 * 60000).toISOString(), action_count_24h: 5, malicious_action_count: 0 }
    },
    linking_status: 'fully_linked',
    avg_similarity: 0.90,
    pairwise_similarity: { aws_azure: 0.92, aws_gcp: 0.88, azure_gcp: 0.90 },
    risk_score: 0.52,
    risk_level: 'medium',
    risk_trend: 0.00,
    total_actions_24h: 28,
    malicious_actions_24h: 2,
    feature_contributions: { username_pattern: 0.75, login_behavior: 0.60, resource_access: 0.85, time_correlation: 0.70, ip_overlap: 0.80 },
    pivot_alert_count: 1
  },
  {
    group_id: 'group_mike_ross',
    logical_name: 'Mike Ross',
    identities: {
      aws: { identity_id: 'user_mike', display_name: 'user_mike', provider: 'aws', account_type: 'human', email: 'mike.ross@corp.com', arn_or_id: 'arn:aws:iam::123456789:user/mike', last_active: new Date(Date.now() - 20 * 60000).toISOString(), action_count_24h: 12, malicious_action_count: 2 },
      azure: { identity_id: 'user_mike_az', display_name: 'user_mike_az', provider: 'azure', account_type: 'human', email: 'mike.ross@corp.com', arn_or_id: 'user_mike_az', last_active: new Date(Date.now() - 240 * 60000).toISOString(), action_count_24h: 8, malicious_action_count: 0 },
      gcp: { identity_id: 'mike@project.iam.gserviceaccount.com', display_name: 'mike@gcp.iam', provider: 'gcp', account_type: 'human', email: 'mike.ross@corp.com', arn_or_id: 'mike@project.iam.gserviceaccount.com', last_active: new Date(Date.now() - 60 * 60000).toISOString(), action_count_24h: 12, malicious_action_count: 1 }
    },
    linking_status: 'fully_linked',
    avg_similarity: 0.87,
    pairwise_similarity: { aws_azure: 0.90, aws_gcp: 0.87, azure_gcp: 0.85 },
    risk_score: 0.65,
    risk_level: 'medium',
    risk_trend: 0.12,
    total_actions_24h: 32,
    malicious_actions_24h: 3,
    feature_contributions: { username_pattern: 0.60, login_behavior: 0.80, resource_access: 0.70, time_correlation: 0.65, ip_overlap: 0.85 },
    pivot_alert_count: 1
  },
  {
    group_id: 'group_david_kumar',
    logical_name: 'David Kumar',
    identities: {
      aws: { identity_id: 'user_david', display_name: 'user_david', provider: 'aws', account_type: 'human', email: 'david.kumar@corp.com', arn_or_id: 'arn:aws:iam::123456789:user/david', last_active: new Date(Date.now() - 360 * 60000).toISOString(), action_count_24h: 15, malicious_action_count: 1 },
      azure: { identity_id: 'david.kumar@corp.com', display_name: 'david.kumar@corp.com', provider: 'azure', account_type: 'human', email: 'david.kumar@corp.com', arn_or_id: 'david.kumar@corp.com', last_active: new Date(Date.now() - 480 * 60000).toISOString(), action_count_24h: 7, malicious_action_count: 0 },
      gcp: null
    },
    linking_status: 'partially_linked',
    avg_similarity: 0.93,
    pairwise_similarity: { aws_azure: 0.93, aws_gcp: null, azure_gcp: null },
    risk_score: 0.31,
    risk_level: 'low',
    risk_trend: -0.03,
    total_actions_24h: 22,
    malicious_actions_24h: 1,
    feature_contributions: { username_pattern: 0.90, login_behavior: 0.75, resource_access: 0.50, time_correlation: 0.85, ip_overlap: 0.90 },
    pivot_alert_count: 0
  },
  {
    group_id: 'group_emma_wilson',
    logical_name: 'Emma Wilson',
    identities: {
      aws: { identity_id: 'user_emma', display_name: 'user_emma', provider: 'aws', account_type: 'human', email: 'emma.wilson@corp.com', arn_or_id: 'arn:aws:iam::123456789:user/emma', last_active: new Date(Date.now() - 240 * 60000).toISOString(), action_count_24h: 8, malicious_action_count: 0 },
      azure: { identity_id: 'emma.wilson@corp.com', display_name: 'emma.wilson@corp.com', provider: 'azure', account_type: 'human', email: 'emma.wilson@corp.com', arn_or_id: 'emma.wilson@corp.com', last_active: new Date(Date.now() - 300 * 60000).toISOString(), action_count_24h: 6, malicious_action_count: 0 },
      gcp: { identity_id: 'emma@project.iam.gserviceaccount.com', display_name: 'emma@gcp.iam', provider: 'gcp', account_type: 'human', email: 'emma.wilson@corp.com', arn_or_id: 'emma@project.iam.gserviceaccount.com', last_active: new Date(Date.now() - 360 * 60000).toISOString(), action_count_24h: 5, malicious_action_count: 0 }
    },
    linking_status: 'fully_linked',
    avg_similarity: 0.96,
    pairwise_similarity: { aws_azure: 0.98, aws_gcp: 0.96, azure_gcp: 0.95 },
    risk_score: 0.18,
    risk_level: 'low',
    risk_trend: -0.07,
    total_actions_24h: 19,
    malicious_actions_24h: 0,
    feature_contributions: { username_pattern: 0.95, login_behavior: 0.90, resource_access: 0.85, time_correlation: 0.90, ip_overlap: 0.98 },
    pivot_alert_count: 0
  },
  {
    group_id: 'group_raj_patel',
    logical_name: 'Raj Patel',
    identities: {
      aws: { identity_id: 'user_raj', display_name: 'user_raj', provider: 'aws', account_type: 'human', email: 'raj.patel@corp.com', arn_or_id: 'arn:aws:iam::123456789:user/raj', last_active: new Date(Date.now() - 120 * 60000).toISOString(), action_count_24h: 5, malicious_action_count: 0 },
      azure: { identity_id: 'raj.patel@corp.com', display_name: 'raj.patel@corp.com', provider: 'azure', account_type: 'human', email: 'raj.patel@corp.com', arn_or_id: 'raj.patel@corp.com', last_active: new Date(Date.now() - 180 * 60000).toISOString(), action_count_24h: 7, malicious_action_count: 0 },
      gcp: { identity_id: 'raj@project.iam.gserviceaccount.com', display_name: 'raj@gcp.iam', provider: 'gcp', account_type: 'human', email: 'raj.patel@corp.com', arn_or_id: 'raj@project.iam.gserviceaccount.com', last_active: new Date(Date.now() - 300 * 60000).toISOString(), action_count_24h: 3, malicious_action_count: 0 }
    },
    linking_status: 'fully_linked',
    avg_similarity: 0.93,
    pairwise_similarity: { aws_azure: 0.95, aws_gcp: 0.93, azure_gcp: 0.91 },
    risk_score: 0.12,
    risk_level: 'low',
    risk_trend: 0.00,
    total_actions_24h: 15,
    malicious_actions_24h: 0,
    feature_contributions: { username_pattern: 0.90, login_behavior: 0.85, resource_access: 0.70, time_correlation: 0.85, ip_overlap: 0.95 },
    pivot_alert_count: 0
  }
];

export const mockUnmappedIdentities: UnmappedIdentity[] = [
  {
    identity_id: 'svc_lambda_exec',
    provider: 'aws',
    account_type: 'service',
    last_seen: new Date(Date.now() - 120 * 60000).toISOString(),
    risk_assessment: 'medium',
    suggested_action: 'Verify if this Lambda execution role has equivalent service principals on Azure/GCP. Check CloudFormation/Terraform for cross-cloud deployment configurations.',
    recent_actions: [
      { id: 'act_u1', timestamp: new Date(Date.now() - 120 * 60000).toISOString(), identity_used: 'svc_lambda_exec', provider: 'aws', action: 'INVOKE_FUNCTION', target: 'arn:aws:lambda:us-east-1:123:function:process_data', region: 'us-east-1', source_ip: '10.0.1.45', is_malicious: false, attack_phase: null },
      { id: 'act_u2', timestamp: new Date(Date.now() - 125 * 60000).toISOString(), identity_used: 'svc_lambda_exec', provider: 'aws', action: 'S3_GET_OBJECT', target: 'arn:aws:s3:::data-bucket/config.json', region: 'us-east-1', source_ip: '10.0.1.45', is_malicious: false, attack_phase: null }
    ]
  },
  {
    identity_id: 'deploy_bot_az',
    provider: 'azure',
    account_type: 'service',
    last_seen: new Date(Date.now() - 30 * 60000).toISOString(),
    risk_assessment: 'low',
    suggested_action: 'This appears to be an Azure DevOps pipeline service connection. Check if equivalent CI/CD identities exist on AWS CodePipeline or GCP Cloud Build.',
    recent_actions: [
      { id: 'act_u3', timestamp: new Date(Date.now() - 30 * 60000).toISOString(), identity_used: 'deploy_bot_az', provider: 'azure', action: 'CREATE_RESOURCE', target: 'vm_webapp_01', region: 'eastus', source_ip: '20.15.100.2', is_malicious: false, attack_phase: null },
      { id: 'act_u4', timestamp: new Date(Date.now() - 35 * 60000).toISOString(), identity_used: 'deploy_bot_az', provider: 'azure', action: 'KEYVAULT_READ', target: 'kv_prod_secrets', region: 'eastus', source_ip: '20.15.100.2', is_malicious: false, attack_phase: null }
    ]
  },
  {
    identity_id: 'ci_runner_gcp',
    provider: 'gcp',
    account_type: 'system',
    last_seen: new Date(Date.now() - 15 * 60000).toISOString(),
    risk_assessment: 'high',
    suggested_action: 'This GCP service account has elevated permissions and recent IAM modifications. Investigate if this is a compromised CI/CD runner. Check for equivalent runner identities on AWS/Azure.',
    recent_actions: [
      { id: 'act_u5', timestamp: new Date(Date.now() - 15 * 60000).toISOString(), identity_used: 'ci_runner_gcp', provider: 'gcp', action: 'SET_IAM_POLICY', target: 'projects/prod-env/serviceAccounts/ci_runner_gcp', region: 'global', source_ip: '35.200.10.5', is_malicious: true, attack_phase: 'Privilege Escalation' },
      { id: 'act_u6', timestamp: new Date(Date.now() - 20 * 60000).toISOString(), identity_used: 'ci_runner_gcp', provider: 'gcp', action: 'COMPUTE_INSTANCE_CREATE', target: 'instances/crypto-miner-01', region: 'us-central1', source_ip: '35.200.10.5', is_malicious: true, attack_phase: 'Execution' }
    ]
  }
];

export const mockCrossCloudActivities: Record<string, CrossCloudActivity[]> = {
  'group_john_doe': [
    { id: 'act_1', timestamp: new Date(Date.now() - 3 * 60000).toISOString(), identity_used: 'user_john', provider: 'aws', action: 'ASSUME_ROLE', target: 'admin_role', region: 'us-east-1', source_ip: '203.0.113.42', is_malicious: true, attack_phase: 'Privilege Escalation' },
    { id: 'act_2', timestamp: new Date(Date.now() - 18 * 60000).toISOString(), identity_used: 'john.doe@corp.com', provider: 'azure', action: 'ACCESS', target: 'vm_015', region: 'westeurope', source_ip: '198.51.100.15', is_malicious: false, attack_phase: null },
    { id: 'act_3', timestamp: new Date(Date.now() - 25 * 60000).toISOString(), identity_used: 'john@project.iam.gserviceaccount.com', provider: 'gcp', action: 'API_CALL', target: 'compute.instances.list', region: 'us-central1', source_ip: '35.192.0.1', is_malicious: false, attack_phase: null },
    { id: 'act_4', timestamp: new Date(Date.now() - 40 * 60000).toISOString(), identity_used: 'user_john', provider: 'aws', action: 'ACCESS', target: 'vm_007', region: 'us-east-1', source_ip: '203.0.113.42', is_malicious: true, attack_phase: 'Initial Access' },
    { id: 'act_5', timestamp: new Date(Date.now() - 120 * 60000).toISOString(), identity_used: 'john.doe@corp.com', provider: 'azure', action: 'LOGIN', target: 'Azure Portal', region: 'westeurope', source_ip: '198.51.100.15', is_malicious: false, attack_phase: null }
  ],
  'group_alice_wong': [
    { id: 'act_6', timestamp: new Date(Date.now() - 12 * 60000).toISOString(), identity_used: 'user_alice', provider: 'aws', action: 'EXPORT_KEYS', target: 'IAM Access Keys', region: 'us-east-1', source_ip: '45.33.22.11', is_malicious: true, attack_phase: 'Credential Access' },
    { id: 'act_7', timestamp: new Date(Date.now() - 45 * 60000).toISOString(), identity_used: 'alice.wong@corp.com', provider: 'azure', action: 'LOGIN', target: 'Azure Portal', region: 'eastus', source_ip: '45.33.22.11', is_malicious: true, attack_phase: 'Cross-Cloud Pivot' },
    { id: 'act_8', timestamp: new Date(Date.now() - 60 * 60000).toISOString(), identity_used: 'alice@project.iam.gserviceaccount.com', provider: 'gcp', action: 'STORAGE_READ', target: 'gs://analytics-data', region: 'us-central1', source_ip: '104.154.22.10', is_malicious: false, attack_phase: null }
  ]
};

export const mockEmbeddingPoints: IdentityEmbeddingPoint[] = [
  // John Doe Cluster
  { identity_id: 'user_john', display_name: 'user_john', provider: 'aws', group_id: 'group_john_doe', logical_name: 'John Doe', x: 19.2, y: 34.8, is_outlier: false, risk_level: 'critical' },
  { identity_id: 'john.doe@corp.com', display_name: 'john.doe@corp.com', provider: 'azure', group_id: 'group_john_doe', logical_name: 'John Doe', x: 20.5, y: 35.3, is_outlier: false, risk_level: 'critical' },
  { identity_id: 'john@project.iam.gserviceaccount.com', display_name: 'john@gcp.iam', provider: 'gcp', group_id: 'group_john_doe', logical_name: 'John Doe', x: 20.1, y: 34.1, is_outlier: false, risk_level: 'critical' },
  // Alice Wong Cluster
  { identity_id: 'user_alice', display_name: 'user_alice', provider: 'aws', group_id: 'group_alice_wong', logical_name: 'Alice Wong', x: 54.3, y: 59.7, is_outlier: false, risk_level: 'high' },
  { identity_id: 'alice.wong@corp.com', display_name: 'alice.wong@corp.com', provider: 'azure', group_id: 'group_alice_wong', logical_name: 'Alice Wong', x: 55.8, y: 60.4, is_outlier: false, risk_level: 'high' },
  { identity_id: 'alice@project.iam.gserviceaccount.com', display_name: 'alice@gcp.iam', provider: 'gcp', group_id: 'group_alice_wong', logical_name: 'Alice Wong', x: 55.1, y: 61.2, is_outlier: false, risk_level: 'high' },
  // Bob Smith Cluster
  { identity_id: 'user_bob', display_name: 'user_bob', provider: 'aws', group_id: 'group_bob_smith', logical_name: 'Bob Smith', x: 39.5, y: 14.8, is_outlier: false, risk_level: 'low' },
  { identity_id: 'bob.smith@corp.com', display_name: 'bob.smith@corp.com', provider: 'azure', group_id: 'group_bob_smith', logical_name: 'Bob Smith', x: 40.8, y: 15.5, is_outlier: false, risk_level: 'low' },
  { identity_id: 'bob@project.iam.gserviceaccount.com', display_name: 'bob@gcp.iam', provider: 'gcp', group_id: 'group_bob_smith', logical_name: 'Bob Smith', x: 40.2, y: 14.2, is_outlier: false, risk_level: 'low' },
  // Sarah Chen Cluster
  { identity_id: 'user_sarah', display_name: 'user_sarah', provider: 'aws', group_id: 'group_sarah_chen', logical_name: 'Sarah Chen', x: 69.1, y: 39.5, is_outlier: false, risk_level: 'medium' },
  { identity_id: 'sarah.chen@corp.com', display_name: 'sarah.chen@corp.com', provider: 'azure', group_id: 'group_sarah_chen', logical_name: 'Sarah Chen', x: 70.8, y: 40.8, is_outlier: false, risk_level: 'medium' },
  { identity_id: 'user_sarah_gcp', display_name: 'user_sarah_gcp', provider: 'gcp', group_id: 'group_sarah_chen', logical_name: 'Sarah Chen', x: 70.3, y: 39.2, is_outlier: false, risk_level: 'medium' },
  // Mike Ross Cluster
  { identity_id: 'user_mike', display_name: 'user_mike', provider: 'aws', group_id: 'group_mike_ross', logical_name: 'Mike Ross', x: 29.4, y: 74.3, is_outlier: false, risk_level: 'medium' },
  { identity_id: 'user_mike_az', display_name: 'user_mike_az', provider: 'azure', group_id: 'group_mike_ross', logical_name: 'Mike Ross', x: 30.7, y: 75.8, is_outlier: false, risk_level: 'medium' },
  { identity_id: 'mike@project.iam.gserviceaccount.com', display_name: 'mike@gcp.iam', provider: 'gcp', group_id: 'group_mike_ross', logical_name: 'Mike Ross', x: 30.1, y: 74.9, is_outlier: false, risk_level: 'medium' },
  // David Kumar Cluster
  { identity_id: 'user_david', display_name: 'user_david', provider: 'aws', group_id: 'group_david_kumar', logical_name: 'David Kumar', x: 79.5, y: 19.8, is_outlier: false, risk_level: 'low' },
  { identity_id: 'david.kumar@corp.com', display_name: 'david.kumar@corp.com', provider: 'azure', group_id: 'group_david_kumar', logical_name: 'David Kumar', x: 80.2, y: 20.5, is_outlier: false, risk_level: 'low' },
  // Emma Wilson Cluster
  { identity_id: 'user_emma', display_name: 'user_emma', provider: 'aws', group_id: 'group_emma_wilson', logical_name: 'Emma Wilson', x: 14.8, y: 54.6, is_outlier: false, risk_level: 'low' },
  { identity_id: 'emma.wilson@corp.com', display_name: 'emma.wilson@corp.com', provider: 'azure', group_id: 'group_emma_wilson', logical_name: 'Emma Wilson', x: 15.3, y: 55.2, is_outlier: false, risk_level: 'low' },
  { identity_id: 'emma@project.iam.gserviceaccount.com', display_name: 'emma@gcp.iam', provider: 'gcp', group_id: 'group_emma_wilson', logical_name: 'Emma Wilson', x: 15.7, y: 56.1, is_outlier: false, risk_level: 'low' },
  // Raj Patel Cluster
  { identity_id: 'user_raj', display_name: 'user_raj', provider: 'aws', group_id: 'group_raj_patel', logical_name: 'Raj Patel', x: 59.6, y: 79.4, is_outlier: false, risk_level: 'low' },
  { identity_id: 'raj.patel@corp.com', display_name: 'raj.patel@corp.com', provider: 'azure', group_id: 'group_raj_patel', logical_name: 'Raj Patel', x: 60.3, y: 80.7, is_outlier: false, risk_level: 'low' },
  { identity_id: 'raj@project.iam.gserviceaccount.com', display_name: 'raj@gcp.iam', provider: 'gcp', group_id: 'group_raj_patel', logical_name: 'Raj Patel', x: 60.8, y: 79.9, is_outlier: false, risk_level: 'low' },
  // Outliers
  { identity_id: 'svc_lambda_exec', display_name: 'svc_lambda_exec', provider: 'aws', group_id: 'unmapped_1', logical_name: 'Unknown', x: 90, y: 85, is_outlier: true, risk_level: 'medium' },
  { identity_id: 'deploy_bot_az', display_name: 'deploy_bot_az', provider: 'azure', group_id: 'unmapped_2', logical_name: 'Unknown', x: 5, y: 90, is_outlier: true, risk_level: 'low' },
  { identity_id: 'ci_runner_gcp', display_name: 'ci_runner_gcp', provider: 'gcp', group_id: 'unmapped_3', logical_name: 'Unknown', x: 85, y: 5, is_outlier: true, risk_level: 'high' }
];

export const mockPivotAlerts: PivotAlert[] = [
  {
    id: 'pivot_001',
    timestamp: new Date(Date.now() - 3 * 60000).toISOString(),
    relative_time: '3m ago',
    severity: 'critical',
    source_identity: 'user_john',
    source_provider: 'aws',
    target_identity: 'john@gcp.iam',
    target_provider: 'gcp',
    logical_user: 'John Doe',
    pivot_path: 'Assumed admin_role on AWS → Token reuse → Accessed compute.instances on GCP',
    threat_score: 0.89,
    evidence: [
      'Same source IP (203.0.113.42) used within 3-minute window',
      'admin_role credentials used to generate cross-cloud token',
      'GCP compute access from non-standard region'
    ],
    related_node_id: 'user_john'
  },
  {
    id: 'pivot_002',
    timestamp: new Date(Date.now() - 18 * 60000).toISOString(),
    relative_time: '18m ago',
    severity: 'high',
    source_identity: 'john.doe@corp.com',
    source_provider: 'azure',
    target_identity: 'user_john',
    target_provider: 'aws',
    logical_user: 'John Doe',
    pivot_path: 'Azure VM access → credential relay → AWS S3 bucket access',
    threat_score: 0.76,
    evidence: [
      'Azure session token used in AWS API call',
      'Unusual region for this user identity'
    ],
    related_node_id: 'john.doe@corp.com'
  },
  {
    id: 'pivot_003',
    timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
    relative_time: '45m ago',
    severity: 'high',
    source_identity: 'user_alice',
    source_provider: 'aws',
    target_identity: 'alice.wong@corp.com',
    target_provider: 'azure',
    logical_user: 'Alice Wong',
    pivot_path: 'AWS IAM key export → Azure portal login → Resource Group access',
    threat_score: 0.81,
    evidence: [
      'AWS access key used to authenticate Azure AD',
      'After-hours access pattern detected'
    ],
    related_node_id: 'user_alice'
  },
  {
    id: 'pivot_004',
    timestamp: new Date(Date.now() - 120 * 60000).toISOString(),
    relative_time: '2h ago',
    severity: 'medium',
    source_identity: 'sarah.chen@corp.com',
    source_provider: 'azure',
    target_identity: 'user_sarah_gcp',
    target_provider: 'gcp',
    logical_user: 'Sarah Chen',
    pivot_path: 'Azure service connection → GCP project access',
    threat_score: 0.62,
    evidence: [
      'Service principal used across clouds',
      'Low-risk actions performed'
    ],
    related_node_id: 'sarah.chen@corp.com'
  },
  {
    id: 'pivot_005',
    timestamp: new Date(Date.now() - 240 * 60000).toISOString(),
    relative_time: '4h ago',
    severity: 'medium',
    source_identity: 'user_mike',
    source_provider: 'aws',
    target_identity: 'user_mike_az',
    target_provider: 'azure',
    logical_user: 'Mike Ross',
    pivot_path: 'AWS console session → Azure CLI login',
    threat_score: 0.58,
    evidence: [
      'Sequential logins from same IP',
      'Different cloud providers accessed simultaneously'
    ],
    related_node_id: 'user_mike'
  }
];
