FROM node:10.13 AS build-stage

WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . ./
ENV REACT_APP_API_HOST=""
RUN npm run build

FROM nginx:1.12-alpine
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
