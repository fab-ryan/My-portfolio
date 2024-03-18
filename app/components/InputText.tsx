import { themes } from '@/utils/theme';
import styled from 'styled-components';
import { Field, FieldAttributes } from 'formik';
import React, { InputHTMLAttributes } from 'react';
import { FiAlertCircle } from 'react-icons/fi';

type Props = {
  type: InputHTMLAttributes<HTMLInputElement>['type'] | 'textarea';
  name: string;
  placeholder: string;
  onChange: FieldAttributes<any>['onChange'];
  onBlur: FieldAttributes<any>['onBlur'];
  value: string;
  id: string;
} & FieldAttributes<any> &
  InputHTMLAttributes<HTMLInputElement>;

const InputText: React.FC<Props> = (props) => {
  const { type, placeholder, name, field, onChange, form, ...othersProps } =
    props;
  const { touched, errors } = form;
  return (
    <>
    
      <Input
        type={type}
        placeholder={placeholder}
        name={name}
        as={type === 'textarea' ? 'textarea' : 'input'}
        rows={type === 'textarea' ? 5 : undefined}
        onChange={onChange}
        {...othersProps}
        errors={touched[field.name] && errors[field.name] ? 'true' : 'false'}
      />
      {touched[field.name] && errors[field.name] && (
        <ErrorContainer>
          <span>
            <FiAlertCircle size={20} />
            {errors[field.name]}
          </span>
        </ErrorContainer>
      )}
    </>
  );
};

export default InputText;

const Input = styled.input<{ errors: string }>`
  width: 100%;
  padding: 1rem 1.5rem;
  border-radius: 5px;
  outline: none;
  font-size: 1rem;
  transition: all 0.3s ease;
  margin-bottom: 1rem;
  resize: none;
  background: ${themes.primary};
  color: ${themes.text};
  &:focus {
    border: 1px solid
      ${(props) => (props.errors === 'true' ? '#ff0000a8' : themes.secondary)};
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
  border: ${(props) =>
    props.errors === 'true'
      ? '1px solid #ff0000a8'
      : `1px solid ${themes.tertiary}`};
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  overflow: hidden;
  position: relative;

  span {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #ff0000a8;
    margin-bottom: 10px;
  }
`;
