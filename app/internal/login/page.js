"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Loader2, Lock } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!supabase) {
      setError("Supabase connection is not configured.");
      setLoading(false);
      return;
    }

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      router.push("/internal/user");
    } catch (err) {
      setError(err.message || "Invalid login credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center p-4 pt-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[360px] w-full bg-white rounded-[2rem] border border-gray-100 shadow-xl p-8 space-y-6"
      >
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-[#9f0202]/5 rounded-xl flex items-center justify-center text-[#9f0202] mx-auto mb-2">
            <Lock size={24} />
          </div>
          <h1 className="text-xl font-black text-gray-900 uppercase tracking-tight">Admin Access</h1>
          <p className="text-gray-400 text-xs">Sign in to manage the platform.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <Label className="text-[9px] font-black uppercase text-gray-400 tracking-widest ml-1">Email Address</Label>
            <Input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 bg-gray-50 border-transparent rounded-xl focus:ring-[#9f0202] text-sm" 
              placeholder="admin@pvadvisory.in"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-[9px] font-black uppercase text-gray-400 tracking-widest ml-1">Password</Label>
            <Input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 bg-gray-50 border-transparent rounded-xl focus:ring-[#9f0202] text-sm" 
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p className="text-[10px] text-red-500 bg-red-50 p-2.5 rounded-lg border border-red-100 font-bold">{error}</p>
          )}

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full h-12 bg-[#9f0202] hover:bg-[#7a0101] text-white font-bold rounded-xl text-base shadow-lg shadow-[#9f0202]/10 mt-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Sign In to Dashboard"}
          </Button>
        </form>

        <div className="text-center">
          <p className="text-[9px] text-gray-300 font-bold uppercase tracking-widest">
            Protected by Supabase Authentication
          </p>
        </div>
      </motion.div>
    </div>
  );
}
