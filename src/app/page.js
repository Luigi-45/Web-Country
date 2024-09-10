'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

function RedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/dashboard');
  }, [router]);

  return null; 
}

export default RedirectPage;
