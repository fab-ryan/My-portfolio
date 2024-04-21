import { themes } from '@/utils/theme';
import styled from 'styled-components';

interface ColoredTextProps {
  colored?: boolean;
  children: React.ReactNode;
  transformed?: React.CSSProperties['textTransform'];
  className?: string;
}

export const Text = ({
  colored,
  children,
  transformed = 'uppercase',
  className,
}: ColoredTextProps) => {
  const color = colored ? themes.secondary : themes.text;

  return (
    <H1
      className={className}
      style={{ color, textTransform: transformed }}
    >
      {children}
    </H1>
  );
};

const H1 = styled.div`
  font-size: 2rem;
  margin: 0;
  @media (max-width: 414px) {
    font-size: 1.5rem;
  }
`;
