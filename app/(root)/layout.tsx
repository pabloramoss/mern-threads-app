import type { Metadata } from 'next';

import { ClerkProvider, currentUser } from '@clerk/nextjs';
import '../globals.css';
import { Inter } from 'next/font/google';

import Bottombar from '@/components/shared/Bottombar';
import LeftSidebar from '@/components/shared/LeftSidebar';
import RightSidebar from '@/components/shared/RightSidebar';
import Topbar from '@/components/shared/Topbar';
import { fetchUser } from '@/lib/actions/user.actions';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Threads',
  description: 'A Next.js 13 Meta Threads app',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser();

  if (!user) return null; // to avoid typescript warnings

  const userInfo = await fetchUser(user.id);

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Topbar userImage={userInfo.image} />
          <main className="flex flex-row">
            <LeftSidebar />
            <section className="main-container">
              <div className="w-full max-w-4xl">{children}</div>
            </section>
            <RightSidebar />
          </main>
          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  );
}
