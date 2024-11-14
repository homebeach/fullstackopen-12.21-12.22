import { useQuery } from "react-query";
import axios from "axios";

const baseUrl = "http://localhost:8080/api/users";
const userQueryKey = "users";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAllUsers = () => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.get(baseUrl, config);
  return request.then((response) => response.data);
};

const getSingleUser = (userId) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.get(`${baseUrl}/${userId}`, config);
  return request.then((response) => response.data);
};

// Custom hook for fetching all users
export const useGetAllUsers = () => {
  return useQuery(userQueryKey, getAllUsers);
};

// Custom hook for fetching a single user by ID
export const useGetSingleUser = (userId) => {
  return useQuery(["user", userId], () => getSingleUser(userId));
};

export default { getAllUsers, setToken, useGetAllUsers, useGetSingleUser };
