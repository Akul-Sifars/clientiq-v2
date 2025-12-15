/**
 * FILE OVERVIEW:
 *   Purpose: Signup route for new user registration
 *   Key Concepts: TanStack Router, Form handling, Registration
 *   Module Type: Route Component
 *   @ai_context: Handles new user registration
 */

import { useState } from 'react';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { Eye, EyeOff, Mail, User, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ModeToggle } from '@/components/mode-toggle';
import { useTheme } from '@/components/theme-provider';
import { isAuthenticated } from '@/lib/auth';

export const Route = createFileRoute('/signup')({
  beforeLoad: () => {
    if (isAuthenticated()) {
      throw redirect({ to: '/' });
    }
  },
  component: SignupPage,
});

function PasswordStrength({ password }: { password: string }) {
  const requirements = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "Contains uppercase", met: /[A-Z]/.test(password) },
    { label: "Contains lowercase", met: /[a-z]/.test(password) },
    { label: "Contains number", met: /\d/.test(password) },
  ];

  if (!password) return null;

  return (
    <div className="mt-2 space-y-1">
      {requirements.map((req) => (
        <div key={req.label} className="flex items-center gap-2 text-xs">
          {req.met ? (
            <Check className="size-3 text-green-500" />
          ) : (
            <X className="size-3 text-muted-foreground" />
          )}
          <span
            className={req.met ? "text-green-500" : "text-muted-foreground"}
          >
            {req.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function SignupPage() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  const logoSrc = isDark ? "/logos/Logo White.png" : "/logos/Logo Black.png";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    navigate({ to: "/login" });
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative">
      <div className="absolute inset-0 bg-linear-to-br from-violet-500/10 via-transparent to-blue-500/10" />

      <div className="absolute top-4 right-4 z-10">
        <ModeToggle />
      </div>

      <Card className="relative w-full max-w-md border-border/50 shadow-xl">
        <CardHeader className="space-y-1 text-center pb-2">
          <div className="mx-auto">
            <img src={logoSrc} alt="ClientIQ" className="h-20 w-auto mx-auto" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Create an account
          </CardTitle>
          <CardDescription>
            Enter your details to get started with ClientIQ
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pt-0">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="firstName"
                    placeholder="John"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input id="lastName" placeholder="Doe" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className="pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
              <PasswordStrength password={password} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox id="terms" className="mt-0.5" required />
              <Label
                htmlFor="terms"
                className="text-sm font-normal leading-snug"
              >
                I agree to the{" "}
                <a
                  href="/terms"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  Privacy Policy
                </a>
              </Label>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 pt-6">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-linear-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white"
            >
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Sign in
              </a>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
