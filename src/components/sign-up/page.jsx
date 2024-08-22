"use client";

import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../components/ui/card";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import React from "react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Component() {
  const pathname = usePathname();
  const router = useRouter();

  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const signUp = async () => {
    try {
      const response = await axios.post("/api/sign-up", signupData);
      if (response.data.success) {
        router.push("/dashboard");
      }
    } catch (error) {}
  };

  return (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md space-y-6 shadow-md">
          <Card>
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl">
                Welcome to AI Interview
              </CardTitle>
              <CardDescription>
                Please {pathname === "/login" ? "login" : "sign up"} to
                continue.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Username</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  onChange={(e) =>
                    setSignupData({ ...signupData, username: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={(e) =>
                    setSignupData({ ...signupData, email: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  onChange={(e) =>
                    setSignupData({ ...signupData, password: e.target.value })
                  }
                />
              </div>
              <Button className="w-full" onClick={signUp}>
                Sign Up
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="underline" prefetch={false}>
                  Login
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
