# Use an official Node runtime as a parent image
FROM node:latest

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json if they exist
COPY server/package*.json ./

# If there's no package.json, initialize a Node.js project
RUN if [ ! -f package.json ]; then npm init -y; fi

# Install http-server and mysql package globally
RUN npm install -g http-server mysql

# Bundle app source
COPY . .

# Your app runs on port 8080
EXPOSE 8080

# Define command to run the app
CMD [ "http-server", "public", "-p 8080" ]
