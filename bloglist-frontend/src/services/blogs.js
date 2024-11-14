import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

const baseUrl = "http://localhost:8080/api/blogs";

const blogQueryKey = "blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getSingleBlog = async (blogId) => {


  console.log("Hello!");
  const config = {
    headers: { Authorization: token },
  };
  console.log(`${baseUrl}/${blogId}`);

  const request = axios.get(`${baseUrl}/${blogId}`, config);
  const response = await request;
  return response.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = ({ id, newObject }) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.delete(`${baseUrl}/${id}`, config);
  return request.then((response) => response.data);
};

// Custom hook for fetching all blogs
export const useGetAllBlogs = () => {
  return useQuery(blogQueryKey, getAll);
};

// Custom hook for fetching a single blog by ID
export const useGetSingleBlog = async (blogId) => {
  console.log("useGetSingleBlog - blogId:", blogId);

  try {
    const data = await getSingleBlog(blogId);
    return data;
  } catch (error) {
    console.error("Error fetching single blog:", error);
    throw error;
  }
};

// Custom hook for creating a blog
export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation(create, {
    onSuccess: () => {
      queryClient.invalidateQueries(blogQueryKey);
    },
  });
};

// Custom hook for updating a blog
export const useUpdateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation(update, {
    onSuccess: () => {
      queryClient.invalidateQueries(blogQueryKey);
    },
  });
};

// Custom hook for deleting a blog
export const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  return useMutation(remove, {
    onSuccess: () => {
      queryClient.invalidateQueries(blogQueryKey);
    },
  });
};

export default {
  getAll,
  getSingleBlog,
  setToken,
  create,
  update,
  remove,
  useGetAllBlogs,
  useGetSingleBlog,
  useCreateBlog,
  useUpdateBlog,
  useDeleteBlog,
};
