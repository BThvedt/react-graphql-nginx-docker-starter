FROM node:alpine as builder
WORKDIR /app
COPY . ./
ARG API_URL
ENV REACT_APP_API_URL=$API_URL
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]