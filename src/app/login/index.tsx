'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form =
    useForm<LoginForm>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
        email: 'admin@teampulse.dev',
        password: 'password123',
      },
    });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);

    // Mock authentication delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      // Mock authentication check
      if (
        data.email === 'admin@teampulse.dev' &&
        data.password === 'password123'
      ) {
        toast({
          title: 'Login Successful',
          description: 'Welcome back, Admin!',
        });

        // Store mock auth state
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', data.email);

        router.push('/dashboard');
      } else {
        toast({
          variant: 'destructive',
          title: 'Authentication Failed',
          description:
            'Invalid email or password. Use admin@teampulse.dev / password123',
        });
      }
    } catch {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-muted/20 to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-card-hover">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>
          <CardDescription>
            Sign in to your account to continue
            <br />
            <span className="text-xs text-muted-foreground mt-2 block">
              Demo: admin@teampulse.dev / password123
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        autoComplete="email"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full shadow-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
