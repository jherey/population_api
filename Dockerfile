FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies. Copyboth package.json AND package-lock.json
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Expose port
EXPOSE 2300

# Start app
CMD [ "npm", "build" && "npm", "start" ]