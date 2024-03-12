FROM node:20.11.1-bullseye-slim

# Install Git (necessary for some npm packages)
# RUN apk add --no-cache git
# Install a specific version of npm compatible with Node.js 12
RUN npm install -g npm

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm i -g @angular/cli@17.1.0
RUN npm install
COPY . /app
CMD ng serve --host 0.0.0.0 --poll 2000 --disable-host-check
