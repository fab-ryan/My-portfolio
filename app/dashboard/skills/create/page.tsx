'use client';
import styled from 'styled-components';
import { Button, DashboardLayouts, Text } from '@/components';
import InputText from '@/components/InputText';
import { Formik, Form } from 'formik';

export default function CreateSkills() {
  return (
    <DashboardLayouts>
      <Container>
        <Text>Create Skills</Text>
        <CardContainer>
          <Formik
            initialValues={{
              title: '',
              percentage: '',
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
                type='number'
                name='percentage'
                placeholder='Percentage'
              />

              <Button type='submit'>Create Skills</Button>
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
