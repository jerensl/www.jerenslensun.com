# Dockerfile

# Use node alpine as it's a small node image
FROM node:alpine3.18@sha256:6703b2a0d195b1fdec810a6a0e951f444bab44cb8bc0f77cc95ebc75e83f1f42

# Create the directory on the node image 
# where our Next.js app will live
RUN mkdir -p /app

# Set /app as the working directory
WORKDIR /app

# Copy package.json and package-lock.json
# to the /app working directory
COPY package*.json /app

# Install dependencies in /app
RUN yarn install

# Copy the rest of our Next.js folder into /app
COPY . /app

# Ensure port 3000 is accessible to our system
EXPOSE 3000

# Run yarn dev, as we would via the command line 
CMD ["yarn", "dev"]