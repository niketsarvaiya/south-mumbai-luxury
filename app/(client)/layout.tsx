import AuthGuard from "@/components/client/AuthGuard";
import Navbar from "@/components/client/Navbar";
import Footer from "@/components/client/Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </AuthGuard>
  );
}
