import * as Yup from 'yup';
import {
  withFormik,
  FormikProps,
  FormikErrors,
  Form,
  Field,
  Formik,
} from 'formik';
import InputText from '@/components/InputText';
import styled from 'styled-components';
import { Button } from '@/components';

interface FormValues {
  email: string;
  name: string;
  message: string;
}

const InnerForm = (props: FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting } = props;
  const validationSchema = Yup.object<FormValues>().shape({
    name:Yup.string().required('Name is required'),
    email:Yup.string().email("Invalid Email").required('Email is required'),
    message:Yup.string().required("Message is required")
  });
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        message: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {}}
    >
      {({ values, handleBlur, handleChange }) => (
        <Form>
          <Field
            type='text'
            name='name'
            placeholder='Name'
            id='name'
            component={InputText}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.name}
          />

          <Field
            type='email'
            name='email'
            placeholder='Email'
            id='email'
            component={InputText}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
          />

          <Field
            type='textarea'
            name='message'
            placeholder='Message'
            id='email'
            component={InputText}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.message}
          />

          <Button
            type='submit'
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default InnerForm;

const Error = styled.div`
  color: red;
  font-size: 0.8rem;
  margin-top: 0.2rem;
  margin-bottom: 0.8rem;
`;
