'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { SignedIn, SignedOut } from '@clerk/nextjs';

import { sidebarLinks } from '@/constants';

const LeftSidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;

          return (
            <Link
              key={link.label}
              className={`leftsidebar_link ${isActive && 'bg-primary-500'}`}
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
          <SignedOut>
            <div className="flex cursor-pointer">
              <Image alt="logout" height={24} src="/assets/logout.svg" width={24} />
              <button>asdf</button>
            </div>
          </SignedOut>
        </SignedIn>
      </div>
    </section>
  );
};

export default LeftSidebar;
