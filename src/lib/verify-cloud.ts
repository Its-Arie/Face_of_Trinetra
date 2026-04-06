import { type VerificationResult } from '../types/auth';
import { mockCloudAccounts } from './mock-data/cloud-accounts';

export function verifyCloudAccount(
  provider: 'aws' | 'azure' | 'gcp',
  accountId: string,
  userEmail: string
): VerificationResult {
  // Step 1: Format validation
  if (provider === 'aws' && !/^\d{12}$/.test(accountId)) {
    return { success: false, error: 'format_error',
      message: 'AWS Account ID must be exactly 12 digits.' };
  }
  if (provider === 'azure' &&
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
        .test(accountId)) {
    return { success: false, error: 'format_error',
      message: 'Azure Tenant ID must be a valid UUID format.' };
  }
  if (provider === 'gcp' && !/^[a-z][a-z0-9-]{4,28}[a-z0-9]$/.test(accountId)) {
    return { success: false, error: 'format_error',
      message: 'GCP Project ID must be 6-30 lowercase letters, digits, or hyphens.' };
  }

  // Step 2: Look up account
  const accounts = mockCloudAccounts[provider];
  const account = accounts.find((a: any) => {
    if (provider === 'aws') return a.accountId === accountId;
    if (provider === 'azure') return a.tenantId === accountId;
    if (provider === 'gcp') return a.projectId === accountId;
    return false;
  });

  // Case 1: Not found
  if (!account) {
    return { success: false, error: 'not_found',
      message: 'Account ID not found. Please check and try again.' };
  }

  // Case 2: Email mismatch
  if (account.linkedEmail !== userEmail) {
    return { success: false, error: 'email_mismatch',
      message: `This cloud account is not associated with your email (${userEmail}). Please use the account linked to your registered email.` };
  }

  // Case 3: Success
  return {
    success: true,
    data: {
      username: account.username,
      region: account.region,
      resources: account.resources,
      accountName: account.accountName
    }
  };
}
