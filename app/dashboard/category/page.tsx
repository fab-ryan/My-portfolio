'use client';
import { Button, DashboardLayouts, Table } from '@/components';
import styled from 'styled-components';
import { Text } from '@/components';
import { DeleteModal } from '@/components/DeleteModal';
import InputText from '@/components/InputText';
import { Formik, Form, Field, FormikProps } from 'formik';
import { useRouter } from 'next/navigation';
import {
  useGetCategoriesQuery,
  useDeleteSkillMutation,
  useUpdateSkillMutation,
} from '@/redux';
import { useSelector } from '@/hooks/useActions';
import { useEffect, useRef, useState } from 'react';
import { SkillType } from '@/types';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

export default function Catgories() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const router = useRouter();
  useGetCategoriesQuery({});
  const { data } = useSelector((state) => state.categories);
  return (
    <DashboardLayouts>
      <Container>
        <HeaderContent>
          <div className='titles'>
            <Text transformed='capitalize'>Skills</Text>
            <Text
              className='sm'
              transformed='capitalize'
            >
              Manage your Categories
            </Text>
          </div>

          <Button onClick={() => router.push('/dashboard/category/create')}>
            Create Category
          </Button>
        </HeaderContent>
        <Content>
          <Table tdHeaders={['#', 'Title', 'Percentage', 'Action']}>
            <tbody>
              {data?.data?.map((skill, index) => (
                <tr key={skill._id}>
                  <td>{index + 1}</td>
                  <td>{skill?.name}</td>
                  <td>
                    <Status status={skill?.status ? 'active' : 'inactive'}>
                      {skill?.status ? 'active' : 'inactive'}
                    </Status>
                  </td>
                  <td className='actions'>
                    <Button onClick={() => {}}>Edit</Button>
                    <Button onClick={() => {}}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Content>

        {/* {showModal && (
          <DeleteModal
            title='Delete Skill'
            message='Are you sure you want to delete this skill?'
            handleClose={() => setShowModal(false)}
            handleDelete={() => handleDelete(skillId)}
            show={showModal}
          />
        )}
        {showEditModal && (
          <EditModal
            show={showEditModal}
            handleClose={() => setShowEditModal(false)}
            skill={selectedSkill}
          />
        )} */}
      </Container>
    </DashboardLayouts>
  );
}

interface CreateProps {}
const CreateModal = ({}: CreateProps): JSX.Element => {
  return <div></div>;
};
const EditModal = ({ show, handleClose, skill }: any) => {
  const [updateSkill] = useUpdateSkillMutation();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [skillId, setSkillId] = useState<string>('');
  const [selectedSkill, setSelectedSkill] = useState<SkillType | null>(null);
  const formRef = useRef<FormikProps<any>>(null);
  useEffect(() => {
    if (show) {
      setSelectedSkill(skill);
      setShowModal(true);
      formRef.current?.setFieldValue('name', skill.name);
    }
  }, [show]);
  
  const handleDelete = async (id: string) => {};
  return (
    <ModalContainer>
      <div>
        <h3>Edit Skill</h3>
        <CustomForm
          innerRef={formRef}
          initialValues={{ name: '' }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required('Name is required'),
          })}
          onSubmit={() => {}}
        >
          <Field
            name='name'
            label='Name'
            component={InputText}
            placeholder='Enter skill name'
          />
          <Field
            name='status'
            label='Status'
            component={InputText}
            placeholder='Enter skill status'
          />
          <div className='actions'>
            <Button
              onClick={() => {
                formRef.current?.submitForm();
              }}
            >
              Update
            </Button>
            <Button
              onClick={() => {
                handleClose();
              }}
            >
              Cancel
            </Button>
          </div>
        </CustomForm>
      </div>
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  div {
    background: #0e202c;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    transition: 0.3s;
    animation: slideUp 0.3s ease;
    width: 400px;

    @keyframes slideUp {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
`;

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

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  width: 100%;
  .titles {
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 1rem !important;
  }
  .sm {
    font-size: 0.8rem !important;
  }
  button {
    width: 150px;
    align-self: center;
    margin-top: 2rem;
  }
  @media (max-width: 414px) {
    font-size: 1.5rem;
  }
  @media (max-width: 767px) {
    padding: 2rem 0rem;
    order: 2;
  }
`;

const Content = styled.div`
  width: 100%;
  display: grid;
  .actions {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
  }
  .status {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;

    &:hover {
      cursor: pointer;
    }
  }
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

const Status = styled.span<{ status: string }>`
  font-weight: 700;
  text-transform: capitalize;
  display: flex;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 5px;
  background-color: ${({ status }) => (status === 'active' ? 'green' : 'red')};
  color: white;
  font-size: 12px;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;
