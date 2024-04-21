'use client';

import { Button, DashboardLayouts, Text, Editor, Upload, LoadingIcon } from '@/components';
import InputText from '@/components/InputText';
import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';
import { Suspense, useEffect, useState } from 'react';
import { useCreateBlogMutation } from '@/redux';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function CreateBlog() {
  const [content, setContent] = useState();
  const [image, setImage] = useState();
  const [CreateBlog, loadingResponse] = useCreateBlogMutation();
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Preview is required').max(200),
  });

  useEffect(() => {
    if(loadingResponse.isSuccess){
     router.push('/dashboard/blogs')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[loadingResponse.isSuccess])
  return (
      <Container>
        <Text>Create Blog</Text>
        <Suspense fallback={<LoadingIcon className='margin-auto' />}>
        <CardContainer>
          <Formik
            initialValues={{
              title: '',
              description: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              if (content === undefined || content === '') {
                toast.error('Content is required');
              } else if (image === undefined || image === '') {
                toast.error('Image is required');
              } else {
                CreateBlog({
                  title: values.title,
                  description: values.description,
                  content: content,
                  image: image[0],
                })
                  .unwrap()
                  .then((e) => {
                    if (e.success) {
                      toast.success(e.message);
                      actions.setSubmitting(false);
                    } else {
                      toast.error(e.message);
                      actions.setSubmitting(false);
                    }
                  })
                  .catch((e) => {
                    actions.setSubmitting(false);
                    if (e?.data?.data !== null && e?.status === 400) {
                      const { data } = e;
                      actions.setErrors({
                        title:
                          data?.data[0]?.field === 'title'
                            ? data?.data[0]?.message
                            : '',
                        description:
                          data?.data[0]?.field === 'preview'
                            ? data?.data[0]?.message
                            : '',
                      });
                    }  else if(e?.status === 500){
                      toast.error(e.data.message);
                    }
                    else{
                      toast.error(e?.data?.message);
                    }
                  });
              }
            }}
          >
            {({ values, handleChange, handleBlur }) => (
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
                  type='textarea'
                  name='description'
                  placeholder='Description'
                  cols={2}
                  id='description'
                  value={values.description}
                  onChange={handleChange}
                />
                <Editor
                  editorState={content}
                  setEditorState={(state) => setContent(state)}
                />
                <Upload
                  files={image}
                  setFiles={setImage}
                  label='Upload Image'
                />

                <Button
                  type='submit'
                  disabled={loadingResponse.isLoading}
                >
                  Create Blog
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
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-template-rows: 1fr;
  gap: 20px;
  margin-bottom: 10px;
`;

const CustomForm = styled(Form)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;

  button{
    width: 20%;
    align-self: center;
  }
`;
