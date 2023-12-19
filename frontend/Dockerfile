# The build
FROM node:18-alpine AS build
#RUN npm cache clean --force
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY "${CI_PROJECT_DIR}"/frontend/package*.json ./
RUN npm install -g npm@10.2.0
RUN npm install -g typescript
RUN npm install -g react-scripts@5.0.1
RUN npm fund
COPY "${CI_PROJECT_DIR}"/frontend/ ./
RUN npm install
RUN react-scripts build

# The prod
FROM nginx:stable-alpine
COPY "${CI_PROJECT_DIR}"/frontend/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
WORKDIR /app
COPY --from=build /app/node_modules /app/node_modules
COPY "${CI_PROJECT_DIR}"/frontend/ /app
EXPOSE 3001
CMD ["nginx", "-g", "daemon off;"]
