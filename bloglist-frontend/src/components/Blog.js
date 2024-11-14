import React, { useRef } from "react";
import { Link } from "react-router-dom";
import Togglable from "./Togglable";
import { Paper, TableContainer, Table, TableBody, TableRow, TableCell } from "@mui/material";

const Blog = ({ blog, updateBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const blogFormRef = useRef();

  const handleLike = (event) => {
    event.preventDefault();
    blog.likes = blog.likes + 1;
    updateBlog(blog);
  };

  return (
    <div className="blog-container" style={blogStyle}>
      <Link to={`/blog/${blog.id}`}>
        <div>{blog.title}</div>
      </Link>

      <Togglable buttonLabel="view" buttonHideLabel="hide" ref={blogFormRef}>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>{blog.author}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{blog.url}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  {blog.likes}{" "}
                  <button id="like" onClick={handleLike}>
                    like
                  </button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{blog.user && blog.user.name}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Togglable>
    </div>
  );
};

export default Blog;
