import { type LogEntry } from '../../types/log-entry';

const generateMockLogs = (): LogEntry[] => {
  const logs: LogEntry[] = [];
  const now = Date.now();

  const providers = ['aws', 'azure', 'gcp'] as const;
  const entities = [
    { type: 'User', ids: ['user_john', 'user_alice', 'user_bob', 'user_sarah_gcp', 'user_mike_az', 'user_alice_az', 'user_john_gcp'] },
    { type: 'VM', ids: ['vm_001', 'vm_003', 'vm_007', 'vm_010', 'vm_012', 'vm_015', 'vm_020', 'vm_022'] },
    { type: 'Container', ids: ['container_k8s_01', 'container_k8s_02', 'container_gke_01', 'container_aci_01'] },
    { type: 'IP', ids: ['ip_mal_01', 'ip_mal_02', 'ip_ext_03', 'ip_corp_10', 'ip_corp_11'] },
    { type: 'Role', ids: ['admin_role', 'readonly_role', 'deploy_role', 'network_admin_role', 'billing_role', 'security_audit_role', 'devops_role'] },
    { type: 'CVE', ids: ['CVE-2024-9999', 'CVE-2024-1234', 'CVE-2023-8888', 'CVE-2024-5678', 'CVE-2023-4321', 'CVE-2024-7777'] },
    { type: 'CloudAccount', ids: ['aws_account_01', 'azure_sub_01', 'gcp_project_01'] }
  ] as const;

  const attackStory = [
    { provider: 'aws', entity_type: 'User', entity_id: 'user_john', action: 'ASSUME_ROLE', target_type: 'Role', target_id: 'admin_role', is_malicious: true, severity: 'high', attack_phase: 'privilege_escalation' },
    { provider: 'aws', entity_type: 'User', entity_id: 'user_john', action: 'ACCESS', target_type: 'VM', target_id: 'vm_007', is_malicious: true, severity: 'medium', attack_phase: 'initial_access' },
    { provider: 'gcp', entity_type: 'VM', entity_id: 'vm_007', action: 'CONNECTS_TO', target_type: 'VM', target_id: 'vm_015', is_malicious: true, severity: 'high', attack_phase: 'lateral_movement' },
    { provider: 'gcp', entity_type: 'IP', entity_id: 'ip_mal_02', action: 'EXPLOITS', target_type: 'CVE', target_id: 'CVE-2024-9999', is_malicious: true, severity: 'critical', attack_phase: 'cve_exploitation' },
    { provider: 'azure', entity_type: 'User', entity_id: 'user_alice_az', action: 'CROSS_CLOUD_ACCESS', target_type: 'CloudAccount', target_id: 'gcp_project_01', is_malicious: true, severity: 'high', attack_phase: 'cross_cloud_pivot' }
  ];

  const benignActions = ['LOGIN', 'API_CALL', 'S3_READ', 'BLOB_READ', 'GCS_READ', 'DEPLOY'];

  for (let i = 0; i < 100; i++) {
    const isStoryEvent = i < 35 && i % 7 === 0;
    const storyEvent = isStoryEvent ? attackStory[(i / 7) % attackStory.length] : null;

    const provider = storyEvent ? storyEvent.provider as 'aws' | 'azure' | 'gcp' : providers[i % 3];
    const entityGroup = entities[i % entities.length];
    const entity_type = storyEvent ? storyEvent.entity_type as any : entityGroup.type;
    const entity_id = storyEvent ? storyEvent.entity_id : entityGroup.ids[i % entityGroup.ids.length];
    
    const is_malicious = storyEvent ? true : Math.random() > 0.8;
    const severity = storyEvent ? storyEvent.severity as any : (is_malicious ? 'medium' : 'benign');
    const action = storyEvent ? storyEvent.action : benignActions[i % benignActions.length];
    const attack_phase = storyEvent ? storyEvent.attack_phase : null;

    const timestamp = new Date(now - (i * 45000)).toISOString(); // Spread over ~1.25 hours

    let raw_log: any = {};
    if (provider === 'aws') {
      raw_log = {
        eventVersion: "1.08",
        eventSource: "iam.amazonaws.com",
        eventName: action === 'ASSUME_ROLE' ? 'AssumeRole' : action,
        awsRegion: "us-east-1",
        sourceIPAddress: "203.0.113.42",
        userIdentity: { type: "IAMUser", arn: `arn:aws:iam::123456789:${entity_type.toLowerCase()}/${entity_id}`, accountId: "123456789" },
        eventTime: timestamp,
        eventID: `evt-${i.toString().padStart(5, '0')}`
      };
      if (storyEvent?.target_id) {
        raw_log.requestParameters = { roleArn: `arn:aws:iam::123456789:role/${storyEvent.target_id}` };
      }
    } else if (provider === 'azure') {
      raw_log = {
        operationName: `Microsoft.Authorization/${action.toLowerCase()}`,
        caller: `${entity_id}@corp.com`,
        callerIpAddress: "198.51.100.15",
        category: "Administrative",
        level: severity === 'benign' ? "Information" : "Warning",
        resourceLocation: "westeurope",
        subscriptionId: "sub-azure-001",
        eventTimestamp: timestamp,
        status: { value: "Succeeded" }
      };
    } else {
      raw_log = {
        protoPayload: {
          methodName: `compute.instances.${action.toLowerCase()}`,
          authenticationInfo: { principalEmail: `${entity_id}@project.iam.gserviceaccount.com` },
          requestMetadata: { callerIp: "35.192.0.1" },
          serviceName: "compute.googleapis.com"
        },
        timestamp: timestamp,
        severity: severity === 'benign' ? "INFO" : "ERROR"
      };
    }

    const normalized_log = {
      provider,
      entity_type,
      entity_id,
      action,
      target_type: storyEvent?.target_type || null,
      target_id: storyEvent?.target_id || null,
      source_ip: provider === 'aws' ? '203.0.113.42' : provider === 'azure' ? '198.51.100.15' : '35.192.0.1',
      region: provider === 'aws' ? 'us-east-1' : provider === 'azure' ? 'westeurope' : 'us-central1',
      cloud_account: provider === 'aws' ? 'aws_account_01' : provider === 'azure' ? 'azure_sub_01' : 'gcp_project_01',
      status: "success",
      timestamp,
      is_malicious,
      severity,
      attack_phase
    };

    logs.push({
      id: `log_${(i + 1).toString().padStart(3, '0')}`,
      timestamp,
      provider,
      entity_type,
      entity_id,
      action,
      target_type: storyEvent?.target_type || null,
      target_id: storyEvent?.target_id || null,
      source_ip: normalized_log.source_ip,
      region: normalized_log.region,
      cloud_account: normalized_log.cloud_account,
      status: "success",
      is_malicious,
      severity,
      attack_phase,
      raw_log,
      normalized_log
    });
  }
  return logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export const mockLogEntries = generateMockLogs();
