# Step 1: Use an official Node.js runtime as a base image
FROM node:20-slim

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install all dependencies (including dev dependencies)
RUN npm install

# Copy the source code into the container
COPY . .

# Expose the port your application runs on (e.g., 3001 for your backend)
EXPOSE 3001

# Set environment variables for production mode
ENV NODE_ENV=production

# Run the application in production mode
CMD ["npm", "start"]
