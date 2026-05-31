"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getClientSession } from "@/lib/auth";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const session = getClientSession();
    if (!session) {
      router.replace("/access");
    } else {
      setChecked(true);
    }
  }, [router]);

  if (!checked) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border border-champagne/40 border-t-champagne rounded-full animate-spin" />
          <p className="text-xs font-sans tracking-widest uppercase text-warm-grey-500">
            Verifying access...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
