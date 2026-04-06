import { type NEREntityCounts, type NERExtraction } from '../../types/cve';

export const nerEntityCounts: NEREntityCounts = {
  SOFTWARE: 12,
  VERSION: 15,
  ERROR: 8,
  EXPLOIT: 5,
  IP: 6,
  PORT: 9,
  USER: 14,
  PATH: 11
};

export const recentExtractions: NERExtraction[] = [
  {
    id: "ner-001",
    entityType: "SOFTWARE",
    extractedText: "Apache HTTP Server",
    confidence: 0.98,
    sourceLogId: "log_047",
    provider: "aws",
    timestamp: "2026-01-15T14:31:02Z"
  },
  {
    id: "ner-002",
    entityType: "ERROR",
    extractedText: "CVE-2024-9999",
    confidence: 0.96,
    sourceLogId: "log_048",
    provider: "aws",
    timestamp: "2026-01-15T14:31:02Z"
  },
  {
    id: "ner-003",
    entityType: "VERSION",
    extractedText: "2.4.49",
    confidence: 0.94,
    sourceLogId: "log_047",
    provider: "aws",
    timestamp: "2026-01-15T14:31:02Z"
  },
  {
    id: "ner-004",
    entityType: "EXPLOIT",
    extractedText: "remote code exec",
    confidence: 0.91,
    sourceLogId: "log_049",
    provider: "gcp",
    timestamp: "2026-01-15T14:30:45Z"
  },
  {
    id: "ner-005",
    entityType: "IP",
    extractedText: "203.0.113.42",
    confidence: 0.99,
    sourceLogId: "log_050",
    provider: "aws",
    timestamp: "2026-01-15T14:30:45Z"
  },
  {
    id: "ner-006",
    entityType: "PORT",
    extractedText: "443",
    confidence: 0.97,
    sourceLogId: "log_051",
    provider: "azure",
    timestamp: "2026-01-15T14:30:30Z"
  },
  {
    id: "ner-007",
    entityType: "USER",
    extractedText: "user_john",
    confidence: 0.99,
    sourceLogId: "log_047",
    provider: "aws",
    timestamp: "2026-01-15T14:31:02Z"
  },
  {
    id: "ner-008",
    entityType: "PATH",
    extractedText: "/etc/shadow",
    confidence: 0.88,
    sourceLogId: "log_052",
    provider: "gcp",
    timestamp: "2026-01-15T14:30:15Z"
  },
  {
    id: "ner-009",
    entityType: "SOFTWARE",
    extractedText: "Kubernetes",
    confidence: 0.96,
    sourceLogId: "log_053",
    provider: "aws",
    timestamp: "2026-01-15T14:30:00Z"
  },
  {
    id: "ner-010",
    entityType: "VERSION",
    extractedText: "1.27.1",
    confidence: 0.93,
    sourceLogId: "log_053",
    provider: "aws",
    timestamp: "2026-01-15T14:30:00Z"
  }
];
