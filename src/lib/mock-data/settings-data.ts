import {
  type UserProfile,
  type ActiveSession,
  type LoginActivity,
  type ApiKey,
  type NotificationSettings,
  type AlertPreferences
} from '../../types/settings';

export const mockUserProfile: UserProfile = {
  fullName: "Adarsh Ranjan",
  email: "adarsh.aur@gmail.com",
  phone: "+91 9876543210",
  timezone: "Asia/Kolkata",
  language: "English",
  avatarInitials: "AR",
};

export const mockCloudConnections = {
  aws: {
    connected: true,
    accountId: "123456789",
    connectedSince: "2026-01-10",
    lastSync: "2s ago",
    regions: ["us-east-1"],
    status: "connected",
    permissions: "CloudTrail, IAM Read",
  },
  azure: {
    connected: true,
    subscriptionId: "sub-azure-001",
    connectedSince: "2026-01-12",
    lastSync: "5s ago",
    status: "connected",
    permissions: "Activity Log Read",
  },
  gcp: {
    connected: true,
    projectId: "gcp-project-01",
    connectedSince: "2026-01-14",
    lastSync: "45s ago",
    status: "delayed",
    permissions: "Cloud Audit Log Read",
  },
};

export const mockActiveSessions: ActiveSession[] = [
  {
    id: "sess_001",
    device: "Chrome on Windows",
    location: "Kolkata, India",
    lastActive: "Now",
    isCurrent: true,
    ip: "203.0.113.1",
  },
  {
    id: "sess_002",
    device: "Safari on iPhone",
    location: "Kolkata, India",
    lastActive: "2 hours ago",
    isCurrent: false,
    ip: "203.0.113.5",
  },
  {
    id: "sess_003",
    device: "Firefox on MacOS",
    location: "Mumbai, India",
    lastActive: "Yesterday",
    isCurrent: false,
    ip: "198.51.100.10",
  },
];

export const mockLoginActivity: LoginActivity[] = [
  {
    id: "login_001",
    timestamp: "2026-02-19 14:31",
    device: "Chrome on Windows",
    location: "Kolkata, India",
    ip: "203.0.113.1",
    status: "success",
  },
  {
    id: "login_002",
    timestamp: "2026-02-19 09:15",
    device: "Chrome on Windows",
    location: "Kolkata, India",
    ip: "203.0.113.1",
    status: "success",
  },
  {
    id: "login_003",
    timestamp: "2026-02-18 22:43",
    device: "Safari on iPhone",
    location: "Kolkata, India",
    ip: "203.0.113.5",
    status: "success",
  },
  {
    id: "login_004",
    timestamp: "2026-02-18 14:10",
    device: "Unknown Device",
    location: "Mumbai, India",
    ip: "198.51.100.2",
    status: "failed",
  },
  {
    id: "login_005",
    timestamp: "2026-02-17 11:30",
    device: "Chrome on Windows",
    location: "Kolkata, India",
    ip: "203.0.113.1",
    status: "success",
  },
];

export const mockApiKeys: ApiKey[] = [
  {
    id: "key_001",
    name: "My Dashboard Key",
    createdAt: "2026-01-10",
    lastUsed: "3 days ago",
    partialKey: "trinetra_sk_••••••••••••abcd",
  },
  {
    id: "key_002",
    name: "Monitoring Integration",
    createdAt: "2026-01-20",
    lastUsed: "1 day ago",
    partialKey: "trinetra_sk_••••••••••••efgh",
  },
];

export const mockNotificationSettings: NotificationSettings = {
  emailEnabled: true,
  browserEnabled: false,
  slackEnabled: false,
  slackWebhook: "",
  frequency: "realtime",
  quietHoursEnabled: false,
  quietFrom: "23:00",
  quietTo: "07:00",
};

export const mockAlertPreferences: AlertPreferences = {
  minSeverity: "high",
  attackTypes: {
    privilegeEscalation: true,
    lateralMovement: true,
    crossCloudPivot: true,
    cveExploitation: true,
  },
  groupDuplicates: true,
  showBenign: false,
  autoDismissLow: true,
  defaultProvider: "all",
  defaultTimeRange: "24h",
  defaultSeverityView: "all",
};
