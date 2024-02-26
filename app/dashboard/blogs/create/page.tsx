'use client';

import { Button, DashboardLayouts, Text, Editor, Upload } from '@/components';
import InputText from '@/components/InputText';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import { useState } from 'react';

export default function CreateBlog() {
  const [content, setContent] = useState();
  const [image, setImage] = useState();
  return (
    <DashboardLayouts>
      <Container>
        <Text>Create Blog</Text>
        <CardContainer>
          <Formik
            initialValues={{
              title: '',
              description: '',
              content: '',
            }}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            <CustomForm>
              <InputText
                type='text'
                name='title'
                placeholder='Title'
              />
              <InputText
                type='textarea'
                name='description'
                placeholder='Description'
                cols={2}
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
              <Button type='submit'>Create Blog</Button>
            </CustomForm>
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
`;

const CustomForm = styled(Form)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
`;
