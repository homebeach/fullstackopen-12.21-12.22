import { Link } from "react-router-dom";
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const UserList = ({ users }) => (
  <>
    <Typography variant="h1" gutterBottom>Users</Typography>
    {users && users.length > 0 ? (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Blogs Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/user/${user.id}`}>
                    {user.username}
                  </Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    ) : (
      <Typography variant="body1">No users available</Typography>
    )}
  </>
);

export default UserList;