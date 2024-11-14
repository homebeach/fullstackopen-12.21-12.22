import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

const blogUser = {
  username: "testuser",
  name: "testuser",
};

test("creating a new blog", async () => {
  const mockHandler = jest.fn();
  const user = userEvent.setup();
  render(<BlogForm createBlog={mockHandler} user={blogUser} />);

  const titleInput = screen.getByRole("textbox", { name: "title" });
  const authorInput = screen.getByRole("textbox", { name: "author" });
  const urlInput = screen.getByRole("textbox", { name: "url" });
  const sendButton = screen.getByRole("button", { name: "create" });

  await user.type(titleInput, "Test title");
  await user.type(authorInput, "Test author");
  await user.type(urlInput, "Test url");
  await user.click(sendButton);

  expect(mockHandler.mock.calls).toHaveLength(1);
  expect(mockHandler.mock.calls[0][0].title).toBe("Test title");
  expect(mockHandler.mock.calls[0][0].author).toBe("Test author");
  expect(mockHandler.mock.calls[0][0].url).toBe("Test url");
});
