# Use an official Node.js runtime as a base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies using npm ci for a clean, consistent install (requires package-lock.json)
RUN npm ci

# Install development dependencies globally for tools like nodemon and eslint
RUN npm install -g cross-env nodemon eslint prettier husky

# Copy the source code into the container
COPY . .

# Expose the port your application runs on (e.g., 3000 for Express)
EXPOSE 3000

# Set environment variables for development mode
ENV NODE_ENV=development

# Run the application in development mode using nodemon for hot reloading
CMD ["npm", "run", "dev"]
