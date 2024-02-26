'use client';

import styled from 'styled-components';
import { Button } from '@/components';
import * as Yup from 'yup';
import {
  withFormik,
  FormikProps,
  FormikErrors,
  Form,
  ErrorMessage,
  Formik,
} from 'formik';
import InputText from '@/components/InputText';
import { themes } from '@/utils/theme';

type FormValues = {
  email: string;
  password: string;
};
export default function Login() {
  const validationSchema = Yup.object<FormValues>().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string(),
  });

  return (
    <Wrapper>
      <Containers>
        <Title>Sign in</Title>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            console.log(values);
          }}
        >
          {({ isSubmitting, errors, touched, validateOnChange }) => (
            <Form>
              <InputText
                type='email'
                placeholder='Email'
                name='email'
              />
              {errors.email && touched.email ? (
                <ErrorMessage
                  name='email'
                  component='div'
                  className='error'
                />
              ) : null}
              <InputText
                type='password'
                placeholder='Password'
                name='password'
              />
              {errors.password && touched.password ? (
                <ErrorMessage
                  name='password'
                  component='div'
                  className='error'
                />
              ) : null}
              <Button disabled={isSubmitting}>Sign in</Button>
            </Form>
          )}
        </Formik>
      </Containers>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Containers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  border: 1px solid ${themes.secondary};
  background: linear-gradient(to left, #0e202c, #11141a);
  border-radius: 5px;
  width: 500px;
  padding: 20px;

  .error {
    color: red;
    margin-bottom: 10px;
  }
`;

const Title = styled.h1`
  margin-bottom: 20px;
  color: ${themes.secondary};
`;
