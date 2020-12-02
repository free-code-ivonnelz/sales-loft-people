### STAGE 1: Build ###

FROM node:10 AS ui-build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 4600

CMD ["npm", "start"]

