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
      {children}
    </ButtonContainer>
  );
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
    background: #ccc;
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
`;
