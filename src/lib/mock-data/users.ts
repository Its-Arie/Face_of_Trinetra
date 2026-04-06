import { type User } from '../../types/auth';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Adarsh Ranjan',
    email: 'adarsh.aur@gmail.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Adarsh',
    createdAt: '2026-01-10T10:00:00Z',
    isFirstLogin: false,
    connectedProviders: {
      aws: {
        provider: 'aws',
        accountId: '123456789012',
        accountName: 'Trinetra-Production',
        username: 'admin-user-prod',
        region: 'us-east-1',
        resources: { vms: 12, containers: 3, roles: 5 },
        connectedAt: '2026-01-10T10:05:00Z',
        status: 'active'
      },
      azure: {
        provider: 'azure',
        accountId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        accountName: 'Trinetra-Corp',
        username: 'adarsh.ranjan@corp.onmicrosoft.com',
        region: 'eastus',
        resources: { vms: 8, containers: 2, roles: 4 },
        connectedAt: '2026-01-10T10:06:00Z',
        status: 'active'
      },
      gcp: {
        provider: 'gcp',
        accountId: 'trinetra-prod-123456',
        accountName: 'Trinetra Production',
        username: 'adarsh@trinetra-prod.iam.gserviceaccount.com',
        region: 'us-central1',
        resources: { vms: 6, containers: 4, roles: 3 },
        connectedAt: '2026-01-10T10:07:00Z',
        status: 'active'
      }
    }
  },
  {
    id: '2',
    name: 'Sohom Nandy',
    email: 'sohomnandy9@gmail.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sohom',
    createdAt: '2026-01-12T08:00:00Z',
    isFirstLogin: false,
    connectedProviders: {
      aws: {
        provider: 'aws',
        accountId: '234567890123',
        accountName: 'Sohom-Dev',
        username: 'sohom-dev-user',
        region: 'ap-south-1',
        resources: { vms: 5, containers: 2, roles: 3 },
        connectedAt: '2026-01-12T08:10:00Z',
        status: 'active'
      },
      azure: null,
      gcp: null
    }
  },
  {
    id: '3',
    name: 'Rohan Dutta',
    email: 'rohandutta4752@gmail.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan',
    createdAt: '2026-01-14T09:00:00Z',
    isFirstLogin: true,
    connectedProviders: { aws: null, azure: null, gcp: null }
  }
];
