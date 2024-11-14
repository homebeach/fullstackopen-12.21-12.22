const express = require("express");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.use(express.json());

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
  try {
    const blogId = request.params.id;
    const blog = await Blog.findById(blogId).populate('user', {
      username: 1,
      name: 1,
    });

    if (!blog) {
      return response.status(404).json({ error: 'Blog not found' });
    }

    response.json(blog);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

blogsRouter.post("/", async (request, response) => {
  try {
    const { title, author, url, likes } = request.body;
    const user = request.user;

    if (!title || !url) {
      return response.status(400).json({ error: "Title and URL are required" });
    }

    const blog = new Blog({
      title,
      author,
      url,
      likes: likes || 0,
      user: user._id,
    });

    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    const populatedBlog = await Blog.findById(savedBlog._id).populate("user", [
      "username",
      "name",
      "blogs",
    ]);

    response.status(201).json(populatedBlog);
  } catch (error) {
    if (error.name === "ValidationError") {
      response.status(400).json({ error: error.message });
    } else {
      response.status(500).json({ error: error.message });
    }
  }
});

blogsRouter.post("/:id/comments", async (request, response) => {
  try {
    const blogId = request.params.id;
    const { text } = request.body;

    if (!text) {
      return response.status(400).json({ error: "Comment text is required" });
    }

    const blog = await Blog.findById(blogId);

    console.log(blog);
    if (!blog) {
      return response.status(404).json({ error: "Blog not found" });
    }

    // Assuming you have a 'comments' field in your blog schema
    blog.comments.push({
      text,
    });
    console.log("savedBlog");

    const savedBlog = await blog.save();
    console.log(savedBlog);

    // You may choose to populate the user field in the comment as well
    const populatedBlog = await Blog.findById(savedBlog._id).populate("user", [
      "username",
      "name",
      "blogs",
    ]);

    response.status(201).json(populatedBlog);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});


blogsRouter.delete("/:id", async (request, response) => {
  try {
    const user = request.user;
    const blogId = request.params.id;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return response.status(404).json({ error: "blog not found" });
    }
    if (blog.user.toString() === user._id.toString()) {
      user.blogs = user.blogs.filter((blog) => blog.toString() !== blogId);
      await user.save();
      await Blog.findByIdAndRemove(blogId);

      response.status(204).end();
    } else {
      response.status(403).json({ error: "forbidden" });
    }
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      response.status(400).json({ error: "token missing or invalid" });
    } else {
      response.status(500).json({ error: error.message });
    }
  }
});

blogsRouter.put("/:id", (request, response, next) => {
  const { title, author, url, __v, likes } = request.body;

  if (!title || !url) {
    return response.status(400).json({ error: "Title and URL are required" });
  }

  const blog = {
    title,
    author,
    url,
    __v,
    likes: likes || 0,
  };

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then((updatedBlog) => {
      response.status(204).json(updatedBlog);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = blogsRouter;
