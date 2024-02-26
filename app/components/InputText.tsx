import { themes } from '@/utils/theme';
import styled from 'styled-components';
import {
  Field,
  ErrorMessage,
  useField,
  FieldAttributes,
  FieldProps,
} from 'formik';
import { InputHTMLAttributes } from 'react';

type Props = {
  type: InputHTMLAttributes<HTMLInputElement>['type'] | 'textarea';
  name: string;
  placeholder: string;
} & FieldAttributes<{}>;

const InputText: React.FC<Props> = (props) => {
  const { type, placeholder, name, onChange } = props;
  console.log('props', props.value, onChange);
  return (
    <Input
      type={type}
      placeholder={placeholder}
      name={name}
      as={type === 'textarea' ? 'textarea' : 'input'}
      rows={type === 'textarea' ? 5 : undefined}
    />
  );
};

export default InputText;

const Input = styled(Field)`
  width: 100%;
  padding: 1rem 1.5rem;
  border-radius: 5px;
  border: 1px solid ${themes.tertiary};
  outline: none;
  font-size: 1rem;
  transition: all 0.3s ease;
  margin-bottom: 1rem;
  resize: none;
  background: ${themes.primary};
  color: ${themes.text};
  &:focus {
    border: 1px solid ${themes.secondary};
  }

  &::placeholder {
    color: ${themes.tertiary};
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 0.5rem;
  }
`;
