import React from "react";
import { useGetSingleUser } from "../services/users";
import { useParams } from "react-router-dom";
import { Typography, List, ListItem, ListItemText, CircularProgress, Alert } from "@mui/material";

const User = () => {
  const { id } = useParams(); // Extract userId from URL parameter

  const { data: user, isLoading, isError } = useGetSingleUser(id);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Alert severity="error">Error fetching user data</Alert>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {user.name}
      </Typography>
      <Typography variant="h5">Blogs created:</Typography>
      <List>
        {user.blogs.map((blog) => (
          <ListItem key={blog.id}>
            <ListItemText primary={blog.title} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default User;
