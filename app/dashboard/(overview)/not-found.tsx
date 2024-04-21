'use client';

import { useEffect } from 'react';
import { Metadata } from 'next';
import { Button, DashboardLayouts, Text } from '@/components';
import styled from 'styled-components';


export const metadata: Metadata = {
  title: 'Error',
};

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <DashboardLayouts>
      <Containers>
        <Text>Something went wrong!</Text>
        <Button
          onClick={
            // Attempt to recover by trying to re-render the invoices route
            () => reset()
          }
        >
          Try again
        </Button>
      </Containers>
    </DashboardLayouts>
  );
}

const Containers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
`;
