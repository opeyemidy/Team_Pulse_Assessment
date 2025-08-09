'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
import { loginAction } from '@/actions/auth';
import FormSubmitButton from '@/components/FormSubmitButton';
import { loginSchema } from '@/schemas';
import { useActionState } from 'react';
import { NotificationCard } from '@/components/NotificationCard';


type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const [state, formAction] = useActionState(loginAction, { success: false });
  const form =
    useForm<LoginForm>({
      resolver: zodResolver(loginSchema),
      mode: 'onChange',
      defaultValues: {
        email: 'admin@teampulse.dev',
        password: 'password123',
      },
    });

  const isSubmitting = form.formState.isSubmitting;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-muted/20 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        {state.errors?.notification && (
          <NotificationCard notifications={[{
            id: '1',
            type: 'error',
            title: 'Error',
            message: state.errors.notification[0],
          }]} />
        )}
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
              <form action={formAction} className="space-y-4">
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
                          disabled={isSubmitting}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>{state.errors?.email?.[0]}</FormMessage>
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
                          disabled={isSubmitting}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>{state.errors?.password?.[0]}</FormMessage>
                    </FormItem>
                  )}
                />

                <FormSubmitButton label="Sign In" disabled={!form.formState.isValid || isSubmitting} />
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
