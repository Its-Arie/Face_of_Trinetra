export const mockCloudAccounts = {
  aws: [
    {
      accountId: '123456789012',
      linkedEmail: 'adarsh.aur@gmail.com',
      username: 'admin-user-prod',
      region: 'us-east-1',
      resources: { vms: 12, containers: 3, roles: 5 },
      accountName: 'Trinetra-Production'
    },
    {
      accountId: '234567890123',
      linkedEmail: 'sohomnandy9@gmail.com',
      username: 'sohom-dev-user',
      region: 'ap-south-1',
      resources: { vms: 5, containers: 2, roles: 3 },
      accountName: 'Sohom-Dev'
    },
    {
      accountId: '987654321098',
      linkedEmail: 'someone.else@gmail.com',
      username: 'other-user',
      region: 'eu-west-1',
      resources: { vms: 4, containers: 1, roles: 2 },
      accountName: 'Other-Account'
    }
  ],
  azure: [
    {
      tenantId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      linkedEmail: 'adarsh.aur@gmail.com',
      username: 'adarsh.ranjan@corp.onmicrosoft.com',
      region: 'eastus',
      resources: { vms: 8, containers: 2, roles: 4 },
      accountName: 'Trinetra-Corp'
    },
    {
      tenantId: 'x1y2z3w4-a5b6-7890-cdef-ab1234567890',
      linkedEmail: 'wrong.user@gmail.com',
      username: 'wrong.person@other.onmicrosoft.com',
      region: 'westeurope',
      resources: { vms: 3, containers: 0, roles: 1 },
      accountName: 'Other-Tenant'
    }
  ],
  gcp: [
    {
      projectId: 'trinetra-prod-123456',
      linkedEmail: 'adarsh.aur@gmail.com',
      username: 'adarsh@trinetra-prod.iam.gserviceaccount.com',
      region: 'us-central1',
      resources: { vms: 6, containers: 4, roles: 3 },
      accountName: 'Trinetra Production'
    },
    {
      projectId: 'other-project-789',
      linkedEmail: 'not.me@gmail.com',
      username: 'sa@other-project.iam.gserviceaccount.com',
      region: 'asia-south1',
      resources: { vms: 2, containers: 1, roles: 1 },
      accountName: 'Other Project'
    }
  ]
};
