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
import { useCreateQueryMutation } from '@/redux';
import { toast } from 'react-toastify';

interface FormValues {
  email: string;
  name: string;
  message: string;
}

const InnerForm = () => {
  const validationSchema = Yup.object<FormValues>().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid Email').required('Email is required'),
    message: Yup.string().required('Message is required'),
  });
  const [createQuery, creatingStates] = useCreateQueryMutation();
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        message: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        createQuery({ body: values })
          .unwrap()
          .then((e) => {
            if (e.success) {
              actions.setSubmitting(false);
              actions.resetForm();
              toast.success(e.message);
            } else {
              actions.setSubmitting(false);
              actions.resetForm();
              toast.error(e.message);
            }
          })
          .catch((e) => {
            if (e?.data?.data !== null && e?.status === 400) {
              const { data } = e;
              actions.setErrors({
                email:
                  data?.data[0]?.field === 'email'
                    ? data?.data[0]?.message
                    : '',
                name:
                  data?.data[0]?.field === 'name' ? data?.data[0]?.message : '',
                message:
                  data?.data[0]?.field === 'message'
                    ? data?.data[0]?.message
                    : '',
              });
            } else {
              toast.error('Something went wrong');
            }
            actions.setSubmitting(false);
          });
      }}
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
            id='message'
            component={InputText}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.message}
          />

          <Button
            type='submit'
            disabled={creatingStates.isLoading}
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
