'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { sidebarLinks } from '@/constants';

function Bottombar() {
  const pathname = usePathname();

  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;

          return (
            <Link
              key={link.label}
              className={`bottombar_link ${isActive && 'bg-primary-500'}`}
              href={link.route}
            >
              <Image
                alt={link.label}
                className="object-contain"
                height={16}
                src={link.imgURL}
                width={16}
              />

              <p className="text-subtle-medium text-light-1 max-sm:hidden">
                {link.label.split(' ')[0]}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default Bottombar;
