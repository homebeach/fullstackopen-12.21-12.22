import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

const BlogForm = ({ createBlog, user }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();

    const blogObject = {
      title: title,
      author: author,
      url: url,
      user: user.id,
    };

    createBlog(blogObject);
  };

  return (
    <form onSubmit={addBlog}>
      <TextField
        id="title"
        label="Title"
        value={title}
        onChange={handleTitleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        id="author"
        label="Author"
        value={author}
        onChange={handleAuthorChange}
        fullWidth
        margin="normal"
      />
      <TextField
        id="url"
        label="URL"
        value={url}
        onChange={handleUrlChange}
        fullWidth
        margin="normal"
      />
      <Button id="create-button" type="submit" variant="contained" color="primary">
        Create
      </Button>
    </form>
  );
};

export default BlogForm;
