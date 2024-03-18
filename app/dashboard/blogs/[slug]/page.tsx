'use client';

import {
  Button,
  DashboardLayouts,
  Text,
  Editor,
  Upload,
  Image,
} from '@/components';
import InputText from '@/components/InputText';
import styled from 'styled-components';
import { Formik, Form, Field, FormikProps } from 'formik';
import { useEffect, useState, useRef } from 'react';
import { useUpdateBlogMutation } from '@/redux';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useGetBlogQuery } from '@/redux';

export default function EditBlog({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { data, isLoading } = useGetBlogQuery({ slug: slug });
  const [UpdateBlog, loadingResponse] = useUpdateBlogMutation();
  const [content, setContent] = useState(data?.data?.content);
  const [image, setImage] = useState();
  const [startEdit, setStartEdit] = useState<boolean>(true);
  const router = useRouter();

  const formikRef = useRef<FormikProps<any>>(null);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Preview is required').max(200),
  });

  useEffect(() => {
    if (slug === undefined) {
      router.push('/dashboard/blogs');
    }

    if (formikRef?.current) {
      formikRef.current?.setFieldValue('title', data?.data?.title);
      formikRef.current?.setFieldValue('description', data?.data?.preview);
      setContent(data?.data?.content);
    }
    if (!startEdit && loadingResponse.isSuccess) {
      router.push('/dashboard/blogs');
    }
  }, [data, loadingResponse]);
  return (
    <DashboardLayouts>
      <Container>
        <CardHeader>
          <Text>Edit this Blog</Text>
          <Button onClick={() => router.push('/dashboard/blogs')}>Back</Button>
        </CardHeader>
        {startEdit && (
          <Button
            onClick={() => setStartEdit(false)}
            type='button'
          >
            Start Edit
          </Button>
        )}
        <CardContainer>
          <Formik
            innerRef={formikRef}
            initialValues={{
              title: '',
              description: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              actions.setSubmitting(false);
              if (startEdit) return;
              else if (content === undefined || content === '') {
                toast.error('Content is required');
              } else {
                if (!startEdit) {
                  actions.setSubmitting(true);
                  UpdateBlog({
                    title: values.title ?? data?.data?.title,
                    description: values.description ?? data?.data?.preview,
                    content: content,
                    image: image && image[0] ? image[0] : undefined,
                    slug: slug,
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
                      } else if (e?.status === 500) {
                        toast.error(e.data.message);
                      } else {
                        toast.error(e?.data?.message);
                      }
                    });
                }
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
                  disabled={startEdit}
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
                  onBlur={handleBlur}
                  disabled={startEdit}
                />
                <Editor
                  editorState={content}
                  setEditorState={(state) => setContent(state)}
                  disabled={startEdit}
                />
                {!isLoading && data?.data?.image && (
                  <ImagePreview>
                    <Image
                      src={data?.data?.image}
                      alt={data?.data?.title}
                      objectFit='contain'
                      layout='responsive'
                      height={900}
                      width={1600}
                    />
                  </ImagePreview>
                )}

                <Upload
                  files={image}
                  setFiles={setImage}
                  label='Upload Image'
                  disabled={startEdit}
                />

                {!startEdit && (
                  <Button
                    type='submit'
                    disabled={loadingResponse.isLoading}
                  >
                    Update Blog
                  </Button>
                )}
              </CustomForm>
            )}
          </Formik>
        </CardContainer>
      </Container>
    </DashboardLayouts>
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

  button {
    width: 20%;
    align-self: center;
  }
`;

const ImagePreview = styled.div`
  width: 200px;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`;
