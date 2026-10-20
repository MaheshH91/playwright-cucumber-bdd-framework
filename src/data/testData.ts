export interface UserCredential {
  email: string;
  password: string;
  description?: string;
  expectedError?: string;
}

export const LOGIN_TEST_DATA = {
  validUsers: [
    { email: 'maheshpatil234@gmail.com', password: '12345', description: 'Standard user' },
    { email: 'maheshpatil34@gmail.com', password: '12345', description: 'Secondary user' },
    { email: 'sangramnarale@gmail.com', password: '12345', description: 'Standard user' },
    { email: 'mahesh.jadhav@aressindia.net', password: '123456789', description: 'Admin user' },
    { email: 'mahesh.holkar@gmail.com', password: '12345', description: 'Standard user' },
    { email: 'shriram@gmail.com', password: '12345', description: 'Standard user' }
  ] as UserCredential[],

  invalidUsers: [
    {
      email: 'invalid_user999@test.com',
      password: 'wrongpassword123',
      expectedError: 'Warning: No match for E-Mail Address and/or Password.'
    }
  ] as UserCredential[]
};
