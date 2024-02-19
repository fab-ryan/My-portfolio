import * as Yup from 'yup';
import { withFormik, FormikProps, FormikErrors, Form, Field } from 'formik';
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
  return (
    <Form>
      <InputText
        type='text'
        name='name'
        placeholder='Name'
      />
      {touched.name && errors.name && <Error>{errors.name}</Error>}

      <InputText
        type='email'
        name='email'
        placeholder='Email'
      />
      {touched.email && errors.email && <Error>{errors.email}</Error>}

      <InputText
        type='textarea'
        name='message'
        placeholder='Message'
      />
      {touched.message && errors.message && <Error>{errors.message}</Error>}

      <Button
        type='submit'
        disabled={isSubmitting}
      >
        Submit
      </Button>
    </Form>
  );
};

// The type of props MyForm receives
interface MyFormProps {
  initialEmail?: string;
  message: string;
  name: string;
}
const isValidEmail = (email: string) => {
  return Yup.string().email().isValidSync(email);
};

const validateName = (name: string) => {
  return Yup.string().min(3).isValidSync(name);
};

const MyForm = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: (props) => {
    return {
      email: props.initialEmail || '',
      name: props.name || '',
      message: props.message || '',
    };
  },

  validate: (values: FormValues) => {
    let errors: FormikErrors<FormValues> = {};
    if (!values.email) {
      errors.email = 'Email Required';
    } else if (!isValidEmail(values.email)) {
      errors.email = 'Invalid email address';
    }
    if (!validateName(values.name)) {
      errors.name = 'Name Required';
    }
    if (!values.message) {
      errors.message = 'Required';
    }
    return errors;
  },

  handleSubmit: (values) => {
    // do submitting things
  },
})(InnerForm);

export default MyForm;


const Error = styled.div`
    color: red;
    font-size: 0.8rem;
    margin-top: 0.2rem;
    margin-bottom: 0.8rem;
`