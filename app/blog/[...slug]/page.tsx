import { myBlogs } from '@/utils';
import { BlogContents } from '../blogContent';

export async function generateStaticParams() {
  return myBlogs.map((blog) => ({
    params: { slug: blog.slug },
  }));
}

const SingleBlogPage = ({ params }: any) => {
  const { slug } = params;

  const blog = myBlogs.find((blog) => blog.slug === slug[0]);
  return <BlogContents blog={blog} />;
};
export default SingleBlogPage;
