'use client';
import { Button, DashboardLayouts, LoadingIcon, Table } from '../../components';
import styled from 'styled-components';
import { Text } from '../../components';
import { DeleteModal } from '../../components/DeleteModal';
import InputText from '../../components/InputText';
import { Formik, Form, Field, FormikProps } from 'formik';
import { useRouter } from 'next/navigation';
import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryVisibilityMutation,
} from '@/redux';
import { useSelector } from '@/hooks/useActions';
import {  Suspense, useEffect, useRef, useState } from 'react';
import { CategoryType } from '@/types';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

export default function Categories() {
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryType | null>();

  useGetCategoriesQuery({});
  const { data } = useSelector((state) => state.categories);

  const [deleteCategory, loadingState] = useDeleteCategoryMutation();
  const handleDelete = (id: string) => {
    deleteCategory(id)
      .unwrap()
      .then((e) => {
        if (e.success) {
          toast.success(e.message);
          setShowDeleteModal(false);
        } else {
          toast.error(e.message);
        }
      })
      .catch((e) => {
        toast.error(e.data.message);
      });
  };

  const [handleUpdateVisibility] = useUpdateCategoryVisibilityMutation();
  return (
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

          <Button onClick={() => setShowCreateModal(true)}>
            Create Category
          </Button>
        </HeaderContent>
        <Suspense fallback={<LoadingIcon className='margin-auto' />}>
        <Content>
          <Table tdHeaders={['#', 'Title', 'Percentage', 'Action']}>
            <tbody>
              {data?.data?.map((category, index) => (
                <tr key={category._id}>
                  <td>{index + 1}</td>
                  <td>{category?.name}</td>
                  <td>
                    <Status
                      status={category?.status ? 'active' : 'inactive'}
                      onClick={() => {
                        handleUpdateVisibility({
                          id: category?._id as string,
                          body: { status: !category?.status },
                        });
                      }}
                    >
                      {category?.status ? 'active' : 'inactive'}
                    </Status>
                  </td>
                  <td className='actions'>
                    <Button
                      onClick={() => {
                        setShowEditModal(true);
                        setSelectedCategory(category);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => {
                        setShowDeleteModal(true);
                        setSelectedCategory(category);
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

        {showDeleteModal && (
          <DeleteModal
            title='Delete Category'
            message='Are you sure you want to delete this Category?'
            handleClose={() => setShowDeleteModal(false)}
            handleDelete={() => handleDelete(selectedCategory?._id as string)}
            show={showDeleteModal}
          />
        )}

        {showCreateModal && (
          <CreateModal
            show={showCreateModal}
            handleClose={() => setShowCreateModal(false)}
          />
        )}
        {showEditModal && (
          <EditModal
            show={showEditModal}
            handleClose={() => setShowEditModal(false)}
            category={selectedCategory}
          />
        )}
      </Container>
  );
}

interface CreateProps {
  show: boolean;
  handleClose: () => void;
  category?: CategoryType | null;
}
const CreateModal = ({
  show = false,
  handleClose,
}: CreateProps): JSX.Element | boolean => {
  const modalRef = useRef<HTMLDivElement>(null);

  const [createCategory, createStates] = useCreateCategoryMutation();

  return (
    show && (
      <ModalContainer>
        <div
          ref={modalRef}
          onClick={(e) => {
            if (e.target === modalRef.current) {
              handleClose();
            }
          }}
        >
          <h3
            className='title'
            style={{ color: 'white' }}
          >
            Create Skills
          </h3>
          <Formik
            initialValues={{ name: '' }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required('Name is required'),
              status: Yup.boolean()
                .required('Status is required')
                .default(false),
            })}
            onSubmit={(values, actions) => {
              createCategory({
                name: values.name,
              })
                .unwrap()
                .then((e) => {
                  if (e.success) {
                    toast.success(e.message);
                    actions.setSubmitting(false);
                    handleClose();
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
                      name:
                        data?.data[0]?.field === 'name'
                          ? data?.data[0]?.message
                          : '',
                    });
                  } else {
                    toast.error(e.data.message);
                  }
                });
            }}
          >
            {({ values, handleBlur, handleChange, handleSubmit }) => (
              <CustomForm>
                <Field
                  name='name'
                  label='Name'
                  component={InputText}
                  placeholder='Enter skill name'
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id='name'
                />
                <div className='actions'>
                  <Button
                    onClick={() => {
                      handleSubmit();
                    }}
                    disabled={createStates.isLoading}
                  >
                    Create Category
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
            )}
          </Formik>
        </div>
      </ModalContainer>
    )
  );
};
const EditModal = ({ show, handleClose, category }: CreateProps) => {
  const [updateCategory, updateStates] = useUpdateCategoryMutation();
  const formRef = useRef<FormikProps<any>>(null);
  useEffect(() => {
    if (show && category) {
      formRef.current?.setFieldValue('name', category?.name);
    }
  }, [show]);

  const modalRef = useRef<HTMLDivElement>(null);

  return (
    <ModalContainer>
      <div
        ref={modalRef}
        onClick={(e) => {
          if (e.target === modalRef.current) {
            handleClose();
          }
        }}
      >
        <h3 style={{ color: 'white' }}>Edit Skill</h3>
        <Formik
          innerRef={formRef}
          initialValues={{ name: '' }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required('Name is required'),
          })}
          onSubmit={() => {
            updateCategory({
              id: category?._id as string,
              body: {
                name: formRef.current?.values.name,
              },
            })
              .unwrap()
              .then((e) => {
                if (e.success) {
                  toast.success(e.message);
                  handleClose();
                } else {
                  toast.error(e.message);
                }
              })
              .catch((e) => {
                if (e?.data?.data !== null && e?.status === 400) {
                  const { data } = e;
                  formRef.current?.setErrors({
                    name:
                      data?.data[0]?.field === 'name'
                        ? data?.data[0]?.message
                        : '',
                  });
                } else {
                  toast.error(e.data.message);
                }
              });
          }}
        >
          {({ values, handleBlur, handleChange, handleSubmit }) => (
            <CustomForm>
              <Field
                name='name'
                label='Name'
                component={InputText}
                placeholder='Enter skill name'
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                id='name'
              />
              <div className='actions'>
                <Button
                  onClick={() => handleSubmit}
                  disabled={updateStates.isLoading}
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
          )}
        </Formik>
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
  color: white;
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
    width: 200px;
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

  .actions {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    flex-direction: row;
  }
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
