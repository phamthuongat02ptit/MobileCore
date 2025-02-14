const BASE_URL = 'YOUR_API_URL';

export const loginApi = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password}),
    });
    return await response.json();
  } catch (error) {
    throw new Error('Login failed');
  }
};

export const registerApi = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password}),
    });
    return await response.json();
  } catch (error) {
    throw new Error('Registration failed');
  }
};

export const forgotPasswordApi = async email => {
  try {
    const response = await fetch(`${BASE_URL}/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email}),
    });
    return await response.json();
  } catch (error) {
    throw new Error('Password reset request failed');
  }
};
