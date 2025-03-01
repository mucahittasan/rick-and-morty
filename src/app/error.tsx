'use client';

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <main className="container mx-auto px-4 py-16 text-center">
      <h1 className="mb-4 text-4xl font-bold">Something went wrong</h1>
      <p className="text-muted-foreground mx-auto mb-8 max-w-md">
        We&apos;re sorry, but there was an error loading the page. Please try again or contact
        support if the problem persists.
      </p>
      <div className="flex justify-center gap-4">
        <Button onClick={reset} variant="default">
          Try again
        </Button>
        <Button onClick={() => (window.location.href = '/')} variant="outline">
          Go to homepage
        </Button>
      </div>
    </main>
  );
}
