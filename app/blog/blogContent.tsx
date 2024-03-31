'use client';
import {
  BottomNavBar,
  NavBar,
  Text,
  Image,
  BlogCard,
  CommentCard,
  Button,
  Skeletons,
  LoadingIcon,
} from '../components';
import { BlogType } from '@/types';
import { themes } from '@/utils/theme';
import styled from 'styled-components';
import { BiSolidMessageRounded } from 'react-icons/bi';
import { IoIosThumbsUp } from 'react-icons/io';
import InputText from '../components/InputText';
import { Field, Form, Formik } from 'formik';
import moment from 'moment';
import { useEffect, useState } from 'react';
import {
  useGetBlogQuery,
  useGetCommentsQuery,
  useCreateCommentMutation,
  useGetLikesQuery,
  useLikeMutation,
  useGetRelatesBlogsQuery,
} from '@/redux';
import { useSelector } from '@/hooks/useActions';
import { isAuth as AuthChecking } from '@/utils';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

type Props = {
  slug: string;
};

export const BlogContents = (props: Props) => {
  const { slug } = props;
  const { data, isLoading } = useGetBlogQuery({ slug: slug });
  useGetCommentsQuery({ slug: slug });
  useGetLikesQuery({ slug: slug });
  const { data: relates, isLoading: isLoadingRelated } =
    useGetRelatesBlogsQuery({ slug: slug });
  const { loading, data: comments } = useSelector((state) => state.comments);
  const { data: likes } = useSelector((state) => state.likes);
  const blog: BlogType | undefined = data?.data;

  useEffect(() => {
    if (document !== undefined) {
      document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
      });
    }
  }, []);

  const [addLikeBlog, loadingAddLikeBlog] = useLikeMutation();
  const handleAddLike = ({ slug }: { slug: string }) => {
    if (loadingAddLikeBlog.isLoading) return;
    addLikeBlog({ slug: slug })
      .unwrap()
      .then((e) => {
        if (e.success) {
          toast.success(e.message);
        } else {
          toast.error(e.message);
        }
      })
      .catch((e) => {
        toast.error(e?.data?.message);
      })
      .finally(() => {
        console.log('finally');
      });
  };

  return (
    <Main>
      <NavBar ignore={true} />
      <BottomNavBar />
      <BlogSection>
        {isLoading ? (
          <LoadingIcon />
        ) : (
          blog && (
            <BlogContent>
              <Text
                className='title'
                transformed='capitalize'
              >
                {blog?.title}
              </Text>
              <ImageContainer>
                <Image
                  src={blog?.image}
                  alt={blog?.title}
                  layout='responsive'
                  objectFit='contain'
                  width={900}
                  height={900}
                />
              </ImageContainer>

              <p
                className='blog_contents'
                dangerouslySetInnerHTML={{
                  __html: blog?.content,
                }}
              ></p>
              <StatisticsContainer>
                <div className='comments_Likes'>
                  <div className='likes'>
                    <BiSolidMessageRounded size='1.5rem' />
                    <span>{blog.comments?.length}</span>
                  </div>
                  <div
                    className='comments'
                    onClick={() => handleAddLike({ slug: slug })}
                  >
                    <IoIosThumbsUp size='1.5rem' />
                    <span>{likes.data.length}</span>
                  </div>
                </div>
                <div className='date'>
                  <span>
                    Published on:{' '}
                    {moment(blog.createdAt).format('MMMM Do YYYY')}
                  </span>
                </div>
              </StatisticsContainer>
            </BlogContent>
          )
        )}

        <RelatedComments>
          <Text
            className='title'
            transformed='capitalize'
          >
            Recent Comments
          </Text>
          <CommentContainer>
            {loading ? (
              <Skeletons />
            ) : comments.data.length <= 0 ? (
              <Text
                className='title'
                transformed='capitalize'
              >
                No comments yet
              </Text>
            ) : (
              comments?.data?.map((comment) => (
                <CommentCard
                  key={comment._id}
                  {...comment}
                />
              ))
            )}
          </CommentContainer>
        </RelatedComments>
        <CommentSectionForm slug={slug} />
        <Text
          className='title left'
          transformed='capitalize'
        >
          Related Blogs
        </Text>

        <BlogRelated>
          {isLoadingRelated
            ? [1, 2, 3, 4].map((_, index) => <Skeletons key={index} />)
            : relates?.data?.map((blog, index) => (
                <BlogCard
                  key={index}
                  {...blog}
                />
              ))}
          {/* {myBlogs.slice(0, 3).map((blog, index) => (
            <BlogCard
              key={index}
              {...blog}
            />
          ))} */}
        </BlogRelated>
      </BlogSection>
    </Main>
  );
};

const CommentSectionForm = ({ slug }: { slug: string }) => {
  const [isAuth, setIsAuth] = useState(false);

  async function checkAuth() {
    setIsAuth(await AuthChecking());
  }
  useEffect(() => {
    checkAuth();
  }, []);

  const handleValidationSchema = Yup.object().shape({
    name: Yup.string().test(
      isAuth ? 'name' : 'required',
      'Name is required',
      (value) => {
        return isAuth ? true : !!value;
      },
    ),
    email: Yup.string()
      .test(isAuth ? 'email' : 'required', 'Email is required', (value) => {
        return isAuth ? true : !!value;
      })
      .test(isAuth ? 'email' : 'email', 'Invalid email', (value) => {
        return isAuth ? true : !!value;
      })
      .when('isAuth', {
        is: false,
        then: (schema) => schema.email('Email is invalid'),
      }),
    comment: Yup.string()
      .required('Comment is required')
      .min(10, 'your meessage is Too short'),
  });
  const [sendComment, loadingStates] = useCreateCommentMutation();

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        comment: '',
      }}
      validationSchema={handleValidationSchema}
      onSubmit={(values, actions) => {
        sendComment({
          slug: slug,
          body: {
            name: values.name,
            email: values.email,
            comment: values.comment,
            isAuth: isAuth,
          },
        })
          .unwrap()
          .then((e) => {
            if (e.success) {
              actions.resetForm();
              toast.success(e.message);
            } else {
              toast.error(e.message);
              actions.setSubmitting(false);
            }
          })
          .catch((e) => {
            if (e.data?.data !== null && e?.status == 400) {
              const { data } = e;
              actions.setErrors({
                email:
                  data?.data[0]?.field === 'email'
                    ? data?.data[0]?.message
                    : '',
                name:
                  data?.data[0]?.field === 'name' ? data?.data[0]?.message : '',
                comment:
                  data?.data[0]?.field === 'comment'
                    ? data?.data[0]?.message
                    : '',
              });
            } else {
              toast.error(e?.data?.message);
            }
          });
      }}
    >
      {({ values, handleBlur, handleChange }) => (
        <CommentForm>
          {!isAuth && (
            <Field
              component={InputText}
              type='text'
              placeholder='Write A Name'
              name='name'
              id='name'
              value={values.name}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          )}
          {!isAuth && (
            <Field
              component={InputText}
              type='email'
              placeholder='Write an email'
              name='email'
              id='email'
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          )}

          <Field
            component={InputText}
            type='textarea'
            placeholder='Write a comment'
            name='comment'
            id='comment'
            value={values.comment}
            onBlur={handleBlur}
            onChange={handleChange}
          />

          <Button disabled={loadingStates.isLoading}>Send Comment</Button>
        </CommentForm>
      )}
    </Formik>
  );
};

const Main = styled.main``;

const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const BlogSection = styled.section`
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  @media (max-width: 768px) {
    padding: 1rem 0;
  }

  .left {
    text-align: left;
  }
`;

const BlogContent = styled.div`
  padding: 2rem 8rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;

  .title {
    font-size: 2rem;
    font-weight: bold;
  }

  .blog_contents {
    font-size: 1.2rem;
    line-height: 1.5;
    text-align: justify;
    color: ${themes.tertiary};
    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }

  @media (max-width: 768px) {
    padding: 2rem 2rem;

    .title {
      font-size: 1.5rem;
    }
  }

  @media (max-width: 480px) {
    padding: 2rem 1rem;

    .title {
      font-size: 1rem;
    }
  }
`;

const StatisticsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  border-top: 1px solid ${themes.tertiary};
  border-bottom: 1px solid ${themes.tertiary};
  padding: 1rem 0;

  .comments_Likes {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    .likes,
    .comments {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      color: ${themes.tertiary};

      span {
        font-size: 1rem;
        color: ${themes.tertiary};
      }

      &:hover {
        cursor: pointer;
      }
    }
  }

  .date {
    span {
      font-size: 1rem;
      color: ${themes.tertiary};
    }
  }
`;

const BlogRelated = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr;
  justify-content: center;

  gap: 1rem;
  padding: 2rem 8rem;
  @media (max-width: 768px) {
    padding: 2rem 2rem;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 1rem;
  }
  @media (max-width: 480px) {
    padding: 2rem 1rem;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(4, 1fr);
  }
`;

const RelatedComments = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 2rem 8rem;
  gap: 1rem;

  .title {
    font-size: 1.2rem;
    font-weight: 800;
  }

  @media (max-width: 768px) {
    padding: 2rem 2rem;

    .title {
      font-size: 1rem;
    }
  }

  @media (max-width: 480px) {
    padding: 2rem 1rem;

    .title {
      font-size: 0.8rem;
    }
  }
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const CommentForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  padding: 2rem 8rem;
  @media (max-width: 768px) {
    padding: 2rem 2rem;
  }
  @media (max-width: 480px) {
    padding: 2rem 1rem;
  }
`;
