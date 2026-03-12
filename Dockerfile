FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source
COPY . .

# If client exists and needs building, ensure build step is handled outside or modify Dockerfile
# Expose port
EXPOSE 5000

# Start the app
CMD ["node", "server.js"]
