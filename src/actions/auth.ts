'use server';

import {
  setAuthCookie,
  removeAuthCookie,
  redirectIfAuthenticated,
} from '@/lib/auth';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import { loginSchema } from '@/schemas';
import { SignInError } from '@/interfaces';

// Mock user database - replace with your actual database
const users = [
  {
    id: '2',
    email: 'admin@teampulse.dev',
    name: 'John Doe',
    password: '$2b$10$q1U1AySJ/T7nbCtV5Pkdb.Ja6SdJ5F6O70qmXZTAWiIk5nGUSgkyG', // "password123"
  },
];

// hash password
export const hashedPassword = async (password: string) =>
  await bcrypt.hash(password, 10);

export async function loginAction(
  prevState: SignInError,
  formData: FormData
): Promise<SignInError> {
  await redirectIfAuthenticated();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const result = loginSchema.safeParse({ email, password });

  if (!result.success) {
    const flattenedErrors = result.error.flatten();
    return {
      success: false,
      errors: flattenedErrors.fieldErrors,
    };
  }

  try {
    // Find user in database
    const user = users.find((u) => u.email === email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return {
        success: false,
        errors: {
          notification: ['Invalid credentials'],
        },
      };
    }

    // Set authentication cookie
    await setAuthCookie({
      id: user.id,
      email: user.email,
      name: user.name,
    });

    // Redirect to dashboard after successful login
    redirect('/dashboard');
  } catch (error) {
    console.error('Login error:', error);

    return {
      success: false,
      errors: {
        notification: ['An error occurred during login'],
      },
    };
  }
}

export async function logoutAction() {
  await removeAuthCookie();
  redirect('/login');
}
