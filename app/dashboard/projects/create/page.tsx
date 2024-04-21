'use client';

import {
  Button,
  DashboardLayouts,
  LoadingIcon,
  Text,
  Upload,
} from '@/components';
import InputText, { Select } from '@/components/InputText';
import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { useGetCategoriesQuery, useCreateProjectMutation } from '@/redux';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';

export default function CreateProject() {
  const router = useRouter();

  const [image, setImage] = useState();

  const createProjectSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    url: Yup.string().required('Url is required'),
    category: Yup.string().required('Category is required'),
  });

  const { data: categories, isLoading } = useGetCategoriesQuery({
    status: true,
  });

  const [createProject, createStates] = useCreateProjectMutation();

  return (
    <Container>
      <Text>Create Blog</Text>
      <Suspense fallback={<LoadingIcon className='margin-auto' />}>
        <CardContainer>
          <Formik
            initialValues={{
              title: '',
              description: '',
              url: '',
              category: '',
            }}
            validationSchema={createProjectSchema}
            onSubmit={(values, action) => {
              if (!image) {
                toast.error('Image is required');
              } else
                createProject({
                  body: {
                    title: values.title,
                    description: values.description,
                    url: values.url,
                    category: values.category,
                    image: image[0],
                  },
                })
                  .unwrap()
                  .then((e) => {
                    if (e.success) {
                      toast.success(e.message);
                      action.setSubmitting(false);
                      action.resetForm();
                      router.push('/dashboard/projects');
                    } else {
                      toast.error(e.message);
                      action.setSubmitting(false);
                    }
                  })
                  .catch((e) => {
                    action.setSubmitting(false);
                    if (e?.data?.data !== null && e?.status === 400) {
                      const { data } = e;
                      action.setErrors({
                        title:
                          data?.data[0]?.field === 'title'
                            ? data?.data[0]?.message
                            : '',
                        description:
                          data?.data[0]?.field === 'description'
                            ? data?.data[0]?.message
                            : '',
                        url:
                          data?.data[0]?.field === 'url'
                            ? data?.data[0]?.message
                            : '',
                        category:
                          data?.data[0]?.field === 'category'
                            ? data?.data[0]?.message
                            : '',
                      });
                    } else {
                      toast.error(e?.data?.message);
                    }
                  });
            }}
          >
            {({ values, handleBlur, handleChange, handleSubmit }) => (
              <CustomForm>
                <Field
                  component={Select}
                  name='category'
                  placeholder='Category'
                  value={values.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id='category'
                >
                  <option
                    value=''
                    disabled
                  >
                    Select Category
                  </option>
                  {!isLoading &&
                    categories?.data &&
                    categories?.data?.map((category, index) => (
                      <option
                        value={category._id}
                        key={index}
                      >
                        {category.name}
                      </option>
                    ))}
                </Field>
                <Field
                  component={InputText}
                  type='text'
                  name='title'
                  placeholder='Title'
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id='title'
                />
                <Field
                  component={InputText}
                  type='url'
                  name='url'
                  placeholder='Url'
                  value={values.url}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id='url'
                />

                <Field
                  component={InputText}
                  type='textarea'
                  name='description'
                  placeholder='Description'
                  cols={1}
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id='description'
                />

                <Upload
                  files={image}
                  setFiles={setImage}
                  label='Upload Image'
                />
                <Button
                  type='submit'
                  disabled={createStates.isLoading}
                  onClick={handleSubmit}
                >
                  Create Project
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
