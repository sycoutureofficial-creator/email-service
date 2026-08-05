import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "House of Spandana — Email Studio",
  description: "Compose and send branded emails for House of Spandana",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <aside className="sidebar">
            <div className="sidebar-brand">
              <img src="/logo.png" alt="House of Spandana" className="sidebar-logo" />
              <span className="sidebar-title">Email Studio</span>
            </div>
            <nav className="sidebar-nav">
              <a href="/" className="nav-item">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                Dashboard
              </a>
              <a href="/compose" className="nav-item">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                Compose
              </a>
            </nav>
            <div className="sidebar-footer">
              <p>Sending as</p>
              <p className="sender-email">info.houseofspandana@gmail.com</p>
            </div>
          </aside>
          <main className="main-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
