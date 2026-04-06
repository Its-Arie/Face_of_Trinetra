export interface LogEntry {
  id: string;
  timestamp: string;
  provider: 'aws' | 'azure' | 'gcp';
  entity_type: 'User' | 'VM' | 'Container' | 'IP' | 'Role' | 'CVE' | 'CloudAccount';
  entity_id: string;
  action: string;
  target_type: string | null;
  target_id: string | null;
  source_ip: string;
  region: string;
  cloud_account: string;
  status: 'success' | 'failure';
  is_malicious: boolean;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'benign';
  attack_phase: string | null;
  raw_log: any;
  normalized_log: any;
}
