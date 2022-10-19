FROM node:latest
EXPOSE 15227/tcp
COPY . /app/
RUN npm install
ENTRYPOINT ["npm", "start"]