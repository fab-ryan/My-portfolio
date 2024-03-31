import { themes } from '@/utils/theme';
import styled from 'styled-components';

interface Props {
  onClick?: () => void;
  styles?: React.CSSProperties;
  children: React.ReactNode;
  disabled?: boolean;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

export const Button = ({
  onClick,
  styles,
  children,
  disabled,
  type,
}: Props) => {
  return (
    <ButtonContainer
      onClick={onClick}
      style={styles}
      disabled={disabled}
      type={type}
    >
      {disabled && <LoadingIcon />}
      {children}
    </ButtonContainer>
  );
};

export const LoadingIcon = (className?: { className?: string }) => {
  return <LoadingIcons className={className?.className} />;
};

const ButtonContainer = styled.button`
  background: linear-gradient(to bottom, #13a7d4, #00657e);
  border: none;
  color: ${themes.text};
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 15px;

  font-weight: bold;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 12px;
  transition: 0.3s;
  &:hover {
    background: linear-gradient(to bottom, #00657e, #13a7d4);
  }
  &:disabled {
    background: #00657ed4;
    cursor: not-allowed;
  }
  &:focus {
    outline: none;
  }

  &:active {
    transform: translateY(4px);
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
  }

  display: flex;
  flex-direction: row;
`;

const LoadingIcons = styled.div`
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  margin-right: 10px;
`;
