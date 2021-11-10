FROM node:12.16-buster-slim as react-build

WORKDIR /react
COPY client .

RUN npm install --no-optional && \
    npm cache clean --force && \
    npm run build && \
    rm -rf node_modules

FROM nginx:1.21.3

COPY nginx/nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=react-build /react/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
