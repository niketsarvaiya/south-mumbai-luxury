"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAdminSession } from "@/lib/auth";

export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const session = getAdminSession();
    if (!session) {
      router.replace("/admin/login");
    } else {
      setChecked(true);
    }
  }, [router]);

  if (!checked) {
    return (
      <div className="min-h-screen bg-warm-grey-900 flex items-center justify-center">
        <div className="w-6 h-6 border border-champagne/40 border-t-champagne rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
