const loadash = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => {
    return total + blog.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((maxLikedBlog, currentBlog) => {
    if (currentBlog.likes > maxLikedBlog.likes) {
      return currentBlog;
    }
    return maxLikedBlog;
  });
};

const mostBlogs = (blogs) => {
  const authorBlogs = loadash.groupBy(blogs, "author");

  const authorWithMostBlogs = loadash.maxBy(
    loadash.keys(authorBlogs),
    (author) => {
      return authorBlogs[author].length;
    },
  );

  const result = {
    author: authorWithMostBlogs,
    blogs: authorBlogs[authorWithMostBlogs].length,
  };

  return result;
};

const mostLikes = (blogs) => {
  const authorLikes = loadash.groupBy(blogs, "author");

  const authorWithMostLikes = loadash.maxBy(
    loadash.keys(authorLikes),
    (author) => {
      return loadash.sumBy(authorLikes[author], "likes");
    },
  );

  const result = {
    author: authorWithMostLikes,
    likes: loadash.sumBy(authorLikes[authorWithMostLikes], "likes"),
  };

  return result;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
