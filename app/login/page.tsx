'use client';

import styled from 'styled-components';
import { Button } from '../components';
import * as Yup from 'yup';
import { Form, ErrorMessage, Formik, Field } from 'formik';
import InputText from '../components/InputText';
import { themes } from '@/utils/theme';
import { useLoginMutation } from '@/redux';
import { useSelector } from '@/hooks/useActions';
import { Suspense, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

type FormValues = {
  email: string;
  password: string;
};
export default function Login() {
  const validationSchema = Yup.object<FormValues>().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });
  const router = useRouter();
  const { data, loading, error } = useSelector((state) => state.auth);
  const [login] = useLoginMutation();
  useEffect(() => {
    if (data.success && data.data.role == 'admin') {
      router.push('/dashboard');
    } else if (!data.success && data.data?.access_token !== '') {
      router.push('/');
    }
  }, [data]);
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
              login(values)
                .unwrap()
                .then((e) => {
                  if (e.success) {
                    localStorage.setItem('token', e.data.access_token);
                    toast.success(e.message);
                    actions.setSubmitting(false);
                  } else {
                    toast.error(e.message);
                    actions.setSubmitting(false);
                    console.log(e, 'here');
                  }
                })
                .catch((e) => {
                  actions.setSubmitting(false);
                  if (e?.data?.data !== null && e?.status === 400) {
                    const { data } = e;
                    actions.setErrors({
                      email:
                        data?.data[0]?.field === 'email'
                          ? data?.data[0]?.message
                          : '',
                      password:
                        data?.data[0]?.field === 'password'
                          ? data?.data[0]?.message
                          : '',
                    });
                  } else {
                    toast.error(e?.data?.message);
                  }
                });
            }}
          >
            {({
              values,
              isSubmitting,
              errors,
              touched,
              validateOnChange,
              handleChange,
              handleBlur,
            }) => (
              <Form style={{ width: '100%' }}>
                <Field
                  type='email'
                  placeholder='Email'
                  name='email'
                  value={values.email}
                  validateOnChange={validateOnChange}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  component={InputText}
                  id='email'
                />

                <Field
                  component={InputText}
                  type='password'
                  placeholder='Password'
                  name='password'
                  value={values.password}
                  validateOnChange={validateOnChange}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id='password'
                />

                <Button disabled={isSubmitting}>Sign in</Button>
              </Form>
            )}
          </Formik>
        </Containers>
      </Wrapper>
    </Suspense>
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
