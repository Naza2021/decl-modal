import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface NoSSRProps {
  children: React.ReactNode;
}

export const NoSSR: React.FC<NoSSRProps> = ({ children }) => {
  const [ssr, setSsr] = useState(false);
  const { isReady } = useRouter();

  useEffect(() => {
    setSsr(true);
  }, []);

  if (isReady === false || ssr === false) return null;
  return children as any;
};
