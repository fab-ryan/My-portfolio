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
      {type == 'checkbox' ? (
        <CheckBox>
          <RadioButton
            type={type}
            placeholder={placeholder}
            name={name}
            as={type === 'textarea' ? 'textarea' : 'input'}
            rows={type === 'textarea' ? 5 : undefined}
            onChange={onChange}
            {...othersProps}
            errors={
              touched[field.name] && errors[field.name] ? 'true' : 'false'
            }
          ></RadioButton>
          <label className='custom-checkbox'></label>
        </CheckBox>
      ) : (
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
      )}
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

export const Select = (props: Props) => {
  const { type, placeholder, name, field, onChange, form, ...othersProps } =
    props;
  const { touched, errors } = form;

  return (
    <SelectComponent
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      {...othersProps}
      errors={touched[field.name] && errors[field.name] ? 'true' : 'false'}
    />
  );
};
export default InputText;

const SelectComponent = styled.select<{ errors: string }>`
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

    option {
      background: ${themes.primary};
      color: ${themes.text};
    
    }
`;

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

const RadioButton = styled.input`
  position: relative;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  margin: 0;
  padding: 0;
  border: none;
  overflow: hidden;
  appearance: none;
`;

const CheckBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  .custom-checkbox {
    position: relative;
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 3px;
    transition: background-color 0.3s;
  }

  .custom-checkbox::after {
    content: '';
    position: absolute;
    display: none;
  }

  input[type='checkbox']:checked + .custom-checkbox::after {
    display: block;
  }

  .custom-checkbox::after {
    left: 6px;
    top: 2px;
    width: 6px;
    height: 12px;
    border: solid ${themes.secondary};
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
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
