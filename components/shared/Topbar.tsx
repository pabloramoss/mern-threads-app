import Link from 'next/link';
import Image from 'next/image';
import { OrganizationSwitcher, SignedIn, SignedOut } from '@clerk/nextjs';

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
            <SignedOut>
              <div className="flex cursor-pointer">
                <Image alt="logout" height={24} src="/assets/logout.svg" width={24} />
              </div>
            </SignedOut>
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
