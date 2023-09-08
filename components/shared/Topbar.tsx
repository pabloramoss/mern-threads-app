'use client';
import Link from 'next/link';
import Image from 'next/image';
import { OrganizationSwitcher, SignOutButton, SignedIn } from '@clerk/nextjs';
import router from 'next/router';

const Topbar: React.FC = () => {
  return (
    <nav className="topbar">
      <Link className="flex items-center gap-4" href="/">
        <Image alt="logo" height={28} src="/assets/logo.svg" width={28} />
        <p className="text-heading-3-bold text-light-1 max-xs:hidden">Threads</p>
      </Link>
      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton signOutCallback={() => router.push('/sign-in')}>
              <div className="flex cursor-pointer gap-4 p-4">
                <Image alt="logout" height={24} src="/assets/logout.svg" width={24} />

                <p className="text-light-2 max-lg:hidden">Logout</p>
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
        <OrganizationSwitcher
          appearance={{ elements: { organizationSwitcherTrigger: 'py-2 px-4' } }}
        />
      </div>
    </nav>
  );
};

export default Topbar;
