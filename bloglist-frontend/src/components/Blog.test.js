import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Blog from "./Blog";

const blogUser = {
  username: "testuser",
  name: "testuser",
};

const blog = {
  title: "Test",
  author: "Testauthor",
  url: "www.google.com",
  user: blogUser,
};

const updateBlog = (blogObject) => {};

test("renders content", () => {
  render(<Blog blog={blog} />);

  const element = screen.getByText("Test");
  expect(element).toBeDefined();
});

test("renders additional content", async () => {
  const mockHandler = jest.fn();

  const user = userEvent.setup();

  render(<Blog blog={blog} />);

  const button = screen.getByText("view");
  await user.click(button);

  const element1 = screen.getByText("Test");
  expect(element1).toBeDefined();

  const authorRegex = /Testauthor/; // Use a regular expression to match the text
  const element2 = screen.getByText(authorRegex);
  expect(element2).toBeDefined();

  const urlRegex = /www.google.com/;
  const element3 = screen.getByText(urlRegex);
  expect(element3).toBeDefined();

  const likesRegex = /like/;
  const element4 = screen.getByText(likesRegex);
  expect(element4).toBeDefined();

  const userRegex = /testuser/;
  const element5 = screen.getByText(userRegex);
  expect(element5).toBeDefined();
});

test("pressing like", async () => {
  const mockHandler = jest.fn();
  const user = userEvent.setup();
  render(<Blog blog={blog} updateBlog={mockHandler} />);

  const viewButton = screen.getByText("view");
  await user.click(viewButton);

  const likeButton = screen.getByText("like");
  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
