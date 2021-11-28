FROM node:16-alpine
EXPOSE 8080
WORKDIR /opt/app
COPY . .
RUN npm install
ENTRYPOINT ["npm", "run"]
CMD ["start"]