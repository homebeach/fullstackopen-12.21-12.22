# Step 1: Use an official Node.js image as the base
FROM node:20

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock) to the container
COPY package*.json ./

# Step 4: Install dependencies (using npm install)
RUN npm install

# Step 5: Install development dependencies globally (for tools like eslint, prettier, etc.)
RUN npm install -g eslint prettier husky lint-staged

# Step 6: Copy the rest of the application code into the container
COPY . .

# Step 7: Expose the port your React app will run on (default is 3000)
EXPOSE 3000

# Step 8: Set environment variables (for development)
ENV NODE_ENV=development

# Step 9: Run the app using `npm start` (via react-scripts)
CMD ["npm", "start"]
