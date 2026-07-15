"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function loadUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/signin");
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      setEmail(user?.email ?? "");
    }

    loadUser();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/signin");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="flex items-center justify-between border-b border-slate-800 px-8 py-5">
        <div>
          <h1 className="text-2xl font-bold">
            AI Content Automation
          </h1>
          <p className="text-sm text-slate-400">
            Welcome back, {email}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-600 px-5 py-2 hover:bg-red-700"
        >
          Logout
        </button>
      </header>

      <main className="mx-auto max-w-6xl p-8">
        <h2 className="text-4xl font-bold">
          Dashboard
        </h2>

        <p className="mt-2 text-slate-400">
          Manage your AI content from one place.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="text-lg font-semibold">
              Content Generated
            </h3>

            <p className="mt-4 text-4xl font-bold">
              0
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="text-lg font-semibold">
              Scheduled Posts
            </h3>

            <p className="mt-4 text-4xl font-bold">
              0
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="text-lg font-semibold">
              AI Credits
            </h3>

            <p className="mt-4 text-4xl font-bold">
              100
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}