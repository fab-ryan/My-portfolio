'use client';
import { Button, DashboardLayouts, LoadingIcon, Table } from '@/components';
import styled from 'styled-components';
import { Text } from '@/components';
import { DeleteModal } from '@/components/DeleteModal';
import InputText from '@/components/InputText';
import { Formik, Form, Field, FormikProps } from 'formik';
import { useRouter } from 'next/navigation';
import {
  useGetSkillsQuery,
  useDeleteSkillMutation,
  useUpdateSkillMutation,
} from '@/redux';
import { useSelector } from '@/hooks/useActions';
import { useEffect, useRef, useState } from 'react';
import { SkillType } from '@/types';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Suspense } from 'react';

export default function SKills() {
  const router = useRouter();
  useGetSkillsQuery();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const [skillId, setSkillId] = useState<string>('');
  const [selectedSkill, setSelectedSkill] = useState<SkillType | null>(null);

  const [deleteSkill, loadingDelete] = useDeleteSkillMutation();

  const { data } = useSelector((state) => state.skills);
  useEffect(() => {
    if (loadingDelete.isLoading) return;
    if (loadingDelete.isSuccess) {
      setShowModal(false);
    }
  }, [loadingDelete.isLoading, loadingDelete.isSuccess]);

  const handleDelete = (id: string) => {
    if (loadingDelete.isLoading) return;
    deleteSkill(id);
  };

  return (
    <Container>
      <HeaderContent>
        <div className='titles'>
          <Text transformed='capitalize'>Skills</Text>
          <Text
            className='sm'
            transformed='capitalize'
          >
            Manage your skills
          </Text>
        </div>

        <Button onClick={() => router.push('/dashboard/skills/create')}>
          Create Blog
        </Button>
      </HeaderContent>
      <Suspense fallback={<LoadingIcon className='margin-auto' />}>
        <Content>
          <Table tdHeaders={['#', 'Title', 'Percentage', 'Action']}>
            <tbody>
              {data?.data?.map((skill, index) => (
                <tr key={skill._id}>
                  <td>{index + 1}</td>
                  <td>{skill?.name}</td>
                  <td>{skill?.percent} %</td>
                  <td className='actions'>
                    <Button
                      onClick={() => {
                        setSelectedSkill(skill);
                        setShowEditModal(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => {
                        setSkillId(skill._id);
                        setShowModal(true);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Content>
      </Suspense>

      {showModal && (
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
      )}
    </Container>
  );
}
interface EditModalProps {
  show: boolean;
  handleClose: () => void;
  skill: SkillType | null;
}

const EditModal = (props: EditModalProps) => {
  const { show, handleClose } = props;
  const modalRef = useRef<HTMLDivElement>(null);
  const formikRef = useRef<FormikProps<any>>(null);
  const { skill } = props;
  const [updateSkill] = useUpdateSkillMutation();
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    percentage: Yup.number().required('Percentage is required'),
  });

  useEffect(() => {
    if (skill) {
      formikRef.current?.setFieldValue('title', skill?.name);
      formikRef.current?.setFieldValue('percentage', skill?.percent);
    }
  }, [skill]);

  return (
    show && (
      <ModalContainer
        ref={modalRef}
        onClick={(e) => {
          if (e.target === modalRef.current) {
            handleClose();
          }
        }}
      >
        <CardContainer>
          <Formik
            innerRef={formikRef}
            initialValues={{
              title: '',
              percentage: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              updateSkill({
                name: values.title,
                percent: parseInt(values.percentage),
                _id: skill?._id ?? '',
              })
                .unwrap()
                .then((e) => {
                  if (e.success) {
                    toast.success(e.message);
                    actions.setSubmitting(false);
                    handleClose();
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
                          data?.data[0].field === 'percentage' &&
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
                >
                  Update Skill
                </Button>
              </CustomForm>
            )}
          </Formik>
        </CardContainer>
      </ModalContainer>
    )
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
