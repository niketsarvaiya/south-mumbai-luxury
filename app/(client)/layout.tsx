import AuthGuard from "@/components/client/AuthGuard";
import Navbar from "@/components/client/Navbar";
import Footer from "@/components/client/Footer";
import { ThemeProvider } from "@/lib/theme";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthGuard>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </AuthGuard>
    </ThemeProvider>
  );
}
