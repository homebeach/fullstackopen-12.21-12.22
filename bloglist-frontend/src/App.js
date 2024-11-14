import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BlogList from "./components/BlogList";
import BlogInfo from "./components/BlogInfo";
import User from "./components/User";
import UserList from "./components/UserList";
import Menu from "./components/Menu";
import { useGetAllBlogs, useCreateBlog, useUpdateBlog, useDeleteBlog } from "./services/blogs";
import { useGetAllUsers } from "./services/users";
import { useAuth } from "./AuthContext";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import { Container, Alert } from "@mui/material";
import "./index.css";

const App = () => {
  const blogFormRef = useRef();
  const { user, setUser, clearUser } = useAuth();
  const { data: users } = useGetAllUsers();
  const { data: blogs, isError, error } = useGetAllBlogs();
  const createBlogMutation = useCreateBlog();
  const updateBlogMutation = useUpdateBlog();
  const deleteBlogMutation = useDeleteBlog();

  const [note, setNote] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  function displayNoteWithTimeout(message) {
    setNote(
      <Alert severity="info" onClose={() => setNote("")}>
        {message}
      </Alert>
    );
    setTimeout(() => setNote(""), 5000);
  }

  function displayErrorWithTimeout(message) {
    setErrorMessage(
      <Alert severity="error" onClose={() => setErrorMessage("")}>
        {message}
      </Alert>
    );
    setTimeout(() => setErrorMessage(""), 5000);
  }

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
      displayNoteWithTimeout("Welcome " + username);
    } catch (exception) {
      displayErrorWithTimeout("wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = async () => {
    try {
      blogService.setToken(null);
      window.localStorage.clear();
      clearUser();
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(exception);
      setErrorMessage("logout failed");
    }
  };

  const createBlog = async (blogObject) => {
    try {
      await createBlogMutation.mutateAsync(blogObject);
      displayNoteWithTimeout(`A blog named ${blogObject.title} added.`);
    } catch (error) {
      displayErrorWithTimeout("Failed to create a blog");
    }
  };

  const updateBlog = async (blogObject) => {
    try {
      await updateBlogMutation.mutate({ id: blogObject.id, newObject: blogObject });
      displayNoteWithTimeout(`A blog named ${blogObject.title} updated.`);
    } catch (error) {
      displayErrorWithTimeout("Failed to update the blog");
    }
  };

  const handleDelete = async (blogObject) => {
    try {
      await deleteBlogMutation.mutateAsync(blogObject.id);
      displayNoteWithTimeout(`A blog named ${blogObject.title} deleted.`);
    } catch (error) {
      displayErrorWithTimeout("Failed to delete the blog");
    }
  };

  return (
    <Container>
      <Router>
        <div>
          {user && <Menu user={user} handleLogout={handleLogout} />} {/* Show menu only if user is logged in */}
          {isError && <div className="error">{error.message}</div>}
          {note}
          <h2>blogs</h2>
          <Notification message={errorMessage} />
          {!user && (
            <Togglable buttonLabel="log in">
              <LoginForm
                username={username}
                password={password}
                handleUsernameChange={({ target }) => setUsername(target.value)}
                handlePasswordChange={({ target }) => setPassword(target.value)}
                handleSubmit={handleLogin}
              />
            </Togglable>
          )}
          {user && (
            <div>
              <p>{user.name} logged in</p>
              <div>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <>
                      </>
                    }
                  />
                  <Route path="/users" element={<UserList users={users} />} />
                  <Route path="/user/:id" element={<User />} />
                  <Route path="/blogs" element={<BlogList
                    blogs={blogs}
                    createBlog={createBlog}
                    user={user}
                    updateBlog={updateBlog}
                    handleDelete={handleDelete}
                    blogFormRef={blogFormRef}
                  />} />
                  <Route path="/blog/:id" element={<BlogInfo />} />
                </Routes>
              </div>
            </div>
          )}
        </div>
      </Router>
    </Container>
  );
};

export default App;
