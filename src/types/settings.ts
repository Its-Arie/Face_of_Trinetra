export interface UserProfile {
  fullName: string;
  email: string;
  phone: string | null;
  timezone: string;
  language: string;
  avatarInitials: string;
}

export interface CloudConnectionStatus {
  connected: boolean;
  status: "connected" | "delayed" | "disconnected" | "needs_reconnect";
  lastSync: string;
  connectedSince: string;
  permissions: string;
}

export interface AWSConnection extends CloudConnectionStatus {
  accountId: string;
  regions: string[];
}

export interface AzureConnection extends CloudConnectionStatus {
  subscriptionId: string;
}

export interface GCPConnection extends CloudConnectionStatus {
  projectId: string;
}

export interface ActiveSession {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
  ip: string;
}

export interface LoginActivity {
  id: string;
  timestamp: string;
  device: string;
  location: string;
  ip: string;
  status: "success" | "failed";
}

export interface ApiKey {
  id: string;
  name: string;
  createdAt: string;
  lastUsed: string;
  partialKey: string;
}

export interface NotificationSettings {
  emailEnabled: boolean;
  browserEnabled: boolean;
  slackEnabled: boolean;
  slackWebhook: string;
  frequency: "realtime" | "hourly" | "daily";
  quietHoursEnabled: boolean;
  quietFrom: string;
  quietTo: string;
}

export interface AlertPreferences {
  minSeverity: "critical" | "high" | "medium" | "low";
  attackTypes: {
    privilegeEscalation: boolean;
    lateralMovement: boolean;
    crossCloudPivot: boolean;
    cveExploitation: boolean;
  };
  groupDuplicates: boolean;
  showBenign: boolean;
  autoDismissLow: boolean;
  defaultProvider: string;
  defaultTimeRange: string;
  defaultSeverityView: string;
}
