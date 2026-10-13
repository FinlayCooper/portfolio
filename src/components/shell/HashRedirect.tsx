'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Old single-page anchors. The server never sees the hash, so this runs here.
const targets: Record<string, string> = {
  about: '/about',
  workflow: '/about/workflow',
  education: '/about/education',
  'tech-stack': '/about/skills',
  experience: '/experience',
  projects: '/projects',
  contact: '/contact',
};

const HashRedirect = () => {
  const router = useRouter();
  useEffect(() => {
    const target = targets[window.location.hash.slice(1)];
    if (target) router.replace(target);
  }, [router]);
  return null;
};

export default HashRedirect;
