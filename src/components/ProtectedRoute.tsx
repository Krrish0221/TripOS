"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { openAuthModal } = useAuth();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAuth = localStorage.getItem("tripos_auth");
      if (storedAuth !== "true") {
        openAuthModal();
        router.push("/");
      } else {
        setIsReady(true);
      }
    }
  }, [router, openAuthModal]);

  if (!isReady) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-[#131315] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-blue-600 dark:text-blue-400 mb-4" size={48} />
        <p className="text-zinc-500 dark:text-zinc-400 font-medium">Authenticating destination...</p>
      </div>
    );
  }

  return <>{children}</>;
}
