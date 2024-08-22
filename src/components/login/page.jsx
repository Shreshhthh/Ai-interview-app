"use client";

import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

import { useRouter } from "next/navigation";
import { sign } from "jsonwebtoken";

export default function Component() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleOnLogin = async () => {
    try {
      const response = await axios.post("/api/login", loginData);
      const emailcfg = response.config.data;
      const email = JSON.parse(emailcfg);
      const maild = email.email;

      toast({
        title: "Login Success",
        description: "You have been logged in successfully",
      });
      if (response.data.success) {
        router.push("/dashboard");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid email or password",
      });
    }
  };

  const handleNextSignIn = async (loginData) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: loginData.email,
      password: loginData.password,
    });
    if (result) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="mx-auto w-full max-w-md space-y-8 border p-8 shadow-md rounded-lg">
        <div>
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground">
              Enter your email and password to sign in.
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />
            </div>
            <Button type="submit" className="w-full" onClick={handleNextSignIn}>
              Sign in
            </Button>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-5">
            Don't have an account?{" "}
            <Link href="/sign-up" className="underline cursor-pointer">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
