export function generateUserData() {
  const timestamp = Date.now();
  return {
    firstName: 'Momotaz',
    lastName: 'Zahan',
    email: `testuser_${timestamp}@example.com`,
    password: 'Password@123',
    billing: {
      country: 'United States',
      state: 'California',
      city: 'Los Angeles',
      address1: '123 QA Automation Ave',
      zipCode: '90001',
      phone: '1234567890'
    }
  };
}