FROM mcr.microsoft.com/devcontainers/javascript-node:22
WORKDIR /workspace
COPY package*.json ./
RUN npm install -g npm@latest
CMD ["npm", "run", "dev"]
