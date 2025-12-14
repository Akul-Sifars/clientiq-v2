/**
 * FILE OVERVIEW:
 *   Purpose: Login route with authentication logic
 *   Key Concepts: TanStack Router, React Hook Form, Zod validation
 *   Module Type: Route Component
 *   @ai_context: Handles user login with form validation
 */

import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Eye, EyeOff, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { ModeToggle } from "@/components/mode-toggle";
import { useTheme } from "@/components/theme-provider";
import { login, isAuthenticated } from "@/lib/auth";
import { loginSchema, type LoginFormData } from "@/lib/schemas/auth";

export const Route = createFileRoute("/login")({
  beforeLoad: () => {
    if (isAuthenticated()) {
      throw { redirect: { to: "/" } };
    }
  },
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  const logoSrc = isDark ? "/logos/Logo White.png" : "/logos/Logo Black.png";

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setServerError("");

    await new Promise((resolve) => setTimeout(resolve, 500));

    const result = login(data.email, data.password);

    if (result.success) {
      navigate({ to: "/" });
    } else {
      setServerError(result.error || "Login failed");
    }
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
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="pt-0">
            <FieldGroup>
              {serverError && (
                <div className="rounded-md bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
                  {serverError}
                </div>
              )}

              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        {...field}
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        className="pl-10"
                        aria-invalid={fieldState.invalid}
                        autoComplete="email"
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pr-10"
                        aria-invalid={fieldState.invalid}
                        autoComplete="current-password"
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
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 pt-6">
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full bg-linear-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white"
            >
              {form.formState.isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <a
                href="/signup"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Sign up
              </a>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
