FROM node:20-slim

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that the React app will run on
EXPOSE 3000

# Start the development server
CMD ["npm", "start"]