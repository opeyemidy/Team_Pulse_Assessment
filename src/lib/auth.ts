import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, COOKIE_NAME } from '@/app/constants';
import { Args, User } from '@/interfaces';

// Create JWT token
export function createToken(user: User): string {
  return jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });
}

// Verify JWT token
export function verifyToken(token: string): User | null {
  try {
    return jwt.verify(token, JWT_SECRET) as User;
  } catch {
    return null;
  }
}

// Get current user from cookies (for server components/actions)
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) return null;

  return verifyToken(token);
}

// Get current user from request (for API routes)
export function getCurrentUserFromRequest(request: NextRequest): User | null {
  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) return null;

  return verifyToken(token);
}

// Set authentication cookie
export async function setAuthCookie(user: User) {
  const token = createToken(user);
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

// Remove authentication cookie
export async function removeAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

// Require authentication - redirect if not authenticated
export async function requireAuth(): Promise<User> {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return user;
}

// Require authentication for server actions - throws error if not authenticated
export async function requireServerActionAuth(): Promise<User> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('Authentication required');
  }

  return user;
}

// Higher-order function to wrap server actions with authentication
export function withServerActionAuth<T extends unknown[], R>(
  action: (user: User, ...args: T) => Promise<R>
) {
  return async (...args: T): Promise<R> => {
    const user = await requireServerActionAuth();
    return action(user, ...args);
  };
}

// Redirect if already authenticated
export async function redirectIfAuthenticated() {
  const user = await getCurrentUser();

  if (user) {
    redirect('/dashboard');
  }
}

// API Route Authentication Helpers
export function withAuth(
  handler: (
    request: NextRequest,
    arg: Args,
    user: User
  ) => Promise<NextResponse>
) {
  return async (request: NextRequest, args: Args) => {
    const user = getCurrentUserFromRequest(request);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return handler(request, args, user);
  };
}

export function requireApiAuth(request: NextRequest): User {
  const user = getCurrentUserFromRequest(request);

  if (!user) {
    throw new Error('Unauthorized');
  }

  return user;
}

// Set cookie for API routes
export function setAuthCookieResponse(
  user: User,
  response: NextResponse
): NextResponse {
  const token = createToken(user);

  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });

  return response;
}

// Remove cookie for API routes
export function removeAuthCookieResponse(response: NextResponse): NextResponse {
  response.cookies.delete(COOKIE_NAME);
  return response;
}
