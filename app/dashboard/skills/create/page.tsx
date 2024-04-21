'use client';
import styled from 'styled-components';
import { Button, DashboardLayouts, LoadingIcon, Text } from '@/components';
import InputText from '@/components/InputText';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useCreateSkillMutation } from '@/redux';
import { toast } from 'react-toastify';
import { Suspense } from 'react';

export default function CreateSkills() {
  const router = useRouter();

  const [createSkill, loadingResponse] = useCreateSkillMutation();

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    percentage: Yup.number().required('Percentage is required'),
  });
  return (
      <Container>
        <Text>Create Skills</Text>
        <Suspense fallback={<LoadingIcon className='margin-auto' />}>
        <CardContainer>
          <Formik
            initialValues={{
              title: '',
              percentage: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              createSkill({
                name: values.title,
                percent: parseInt(values.percentage),
              })
                .unwrap()
                .then((e) => {
                  if (e.success) {
                    toast.success(e.message);
                    actions.setSubmitting(false);
                    router.push('/dashboard/skills');
                  } else {
                    actions.setSubmitting(false);
                  }
                })
                .catch((e) => {
                  actions.setSubmitting(false);
                  if (e?.data?.data !== null && e?.status === 400) {
                    const { data } = e;
                    actions.setErrors({
                      title:
                        (data?.data?.name &&
                          data?.data[0].field === 'name' &&
                          data?.data[0].message) ??
                        '',
                      percentage:
                        (data?.data?.percent &&
                          data?.data[0].field === 'percent' &&
                          data?.data[0].message) ??
                        '',
                    });
                  } else {
                    toast.error(e?.data?.message);
                  }
                });
            }}
          >
            {({ values, handleChange, handleBlur, handleSubmit }) => (
              <CustomForm>
                <Field
                  component={InputText}
                  type='text'
                  name='title'
                  placeholder='Title'
                  id='title'
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Field
                  component={InputText}
                  type='number'
                  name='percentage'
                  placeholder='Percentage'
                  id='percentage'
                  value={values.percentage}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Button
                  type='submit'
                  onClick={handleSubmit}
                  disabled={loadingResponse.isLoading}
                >
                  Create Skills
                </Button>
              </CustomForm>
            )}
          </Formik>
        </CardContainer>
        </Suspense>
      </Container>
  );
}

const Container = styled.div`
  margin-top: 20px;
  padding: 20px;
  display: flex;
  justify-content: start;
  align-items: flex-start;
  width: 95%;
  height: 100%;
  flex-direction: column;
`;

const CardContainer = styled.div`
  background-color: rgb(255 255 255 / 9%);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-template-rows: 1fr;
  gap: 20px;
  margin-top: 20px;
`;

const CustomForm = styled(Form)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
`;
