# Stage 1: Build the application
FROM node:14-alpine as build

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY . .

# Build the application
RUN npm run build

# Stage 2: Set up the production environment
FROM node:14-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy built assets from the build stage
COPY --from=build /usr/src/app/dist ./dist

# Expose port
EXPOSE 3999

# Run the application
CMD ["node", "dist/main"]
