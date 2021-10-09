#Using pre-defined node base image
FROM node:14.0.0

WORKDIR /src

# Copy package.json. To take advantage of cached Docker layer
COPY package.json /src

RUN npm install
RUN npm install -g nodemon


COPY . /src

# Expose web service
EXPOSE 3400

CMD [ "npm", "run", "start:dev" ]