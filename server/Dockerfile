# Use an official Node.js image as the base image
FROM node:19-alpine

# Set the working directory inside the container
WORKDIR /usr/src/altametrics

# Copy the rest of the application code
COPY . .

COPY package*.json ./

# Install dependencies
RUN ["npm", "ci"]

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start"]