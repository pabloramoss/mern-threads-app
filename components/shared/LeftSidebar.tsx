'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { SignOutButton, SignedIn, useAuth } from '@clerk/nextjs';

import { sidebarLinks } from '@/constants';

const LeftSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { userId } = useAuth();

  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;

          if (link.route === '/profile') link.route = `${link.route}/${userId}`;

          return (
            <Link
              key={link.label}
              className={`leftsidebar_link ${isActive && 'bg-primary-500 '}`}
              href={link.route}
            >
              <Image alt={link.label} height={24} src={link.imgURL} width={24} />

              <p className="text-light-1 max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 px-6">
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push('/sign-in')}>
            <div className="flex cursor-pointer gap-4 p-4">
              <Image alt="logout" height={24} src="/assets/logout.svg" width={24} />

              <p className="text-light-2 max-lg:hidden">Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
};

export default LeftSidebar;
