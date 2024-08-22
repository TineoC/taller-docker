# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=22

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as base

# Set working directory for all build stages.
WORKDIR /usr/src/app

################################################################################
# Create a stage for installing production dependecies.
FROM base as deps


COPY package.json package-lock.json ./

# Leverage a cache mount to /root/.npm to speed up subsequent builds.
RUN --mount=type=cache,target=/root/.npm \
    npm install
    
    ################################################################################
# Create a stage for building the application.
FROM deps as build

# Copy the rest of the source files into the image.
COPY . .

# Run the build script.
RUN npm run build

# Base image for serving the application
FROM nginx:stable-alpine as production

COPY --from=build /usr/src/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]