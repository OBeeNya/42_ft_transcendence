# Use the official Node.js base image
FROM node:18

WORKDIR /usr/backend

# COPY ./bin/sh/entrypoint.sh /usr/bin/entrypoint.sh
COPY . .

# Install dependencies
RUN apt-get update -y
RUN npm install -g npm@latest
RUN npm install -g @nestjs/cli

# ENTRYPOINT [ "/usr/bin/entrypoint.sh" ]

# ENTRYPOINT npm run start
CMD npm run start
# CMD echo "test"
# CMD pwd

# Expose the desired port for the application to listen on
EXPOSE 3000
