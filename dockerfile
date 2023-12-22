# Stage 1: Build the application
FROM node:18-alpine3.19 as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy source files
COPY . .

RUN npx prisma generate

# Build the application
RUN yarn run build

# Stage 2: Set up the production environment
FROM node:18-alpine3.19 as production

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN yarn install --production

# Copy built assets from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma

RUN npx prisma generate

# Expose port
EXPOSE 3999

# Run the application
CMD ["node", "dist/main.js"]
