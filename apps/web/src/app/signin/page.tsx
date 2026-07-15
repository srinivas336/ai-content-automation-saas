"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();

  async function handleSignIn() {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    setMessage(error.message);
  } else {
   router.push("/dashboard");
  }
}

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
      <div className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-900 p-8">
        <h1 className="text-3xl font-bold">Sign In</h1>

        <p className="mt-2 text-slate-400">
          Welcome back! Sign in to your account.
        </p>

        <div className="mt-8 space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg bg-slate-800 px-4 py-3 text-white outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg bg-slate-800 px-4 py-3 text-white outline-none"
          />

         <button
  onClick={handleSignIn}
  className="w-full rounded-lg bg-blue-600 py-3 font-medium hover:bg-blue-700"
>
  Sign In
</button>
<p className="mt-4 text-sm text-slate-400">
  {message}
</p>
        </div>
      </div>
    </main>
  );
}