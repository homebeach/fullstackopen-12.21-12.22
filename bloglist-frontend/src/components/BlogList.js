import Blog from "./Blog";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";


const BlogList = ({ blogs, createBlog, user, updateBlog, handleDelete, blogFormRef }) => (
  <>
    <Togglable id="new-blog" buttonLabel="new blog" buttonHideLabel="cancel" ref={blogFormRef}>
      <BlogForm createBlog={createBlog} user={user} />
    </Togglable>
    {blogs && blogs.map((blog) => (
      <div key={blog.id}>
        <Blog blog={blog} updateBlog={updateBlog} />
        <button onClick={() => handleDelete(blog)}>delete</button>
      </div>
    ))}
  </>
);

export default BlogList;