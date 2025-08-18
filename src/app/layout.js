import Navigation from '@/components/Navigation'
import "./globals.css";

export const metadata = {
  title: "MoneyBuddy - Smart Finance Tracker",
  description: "Your personal finance companion for smart money management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <div className="flex h-full">
          <Navigation />
          <main className="flex-1 lg:ml-64">
            <div className="p-4 lg:p-8">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
