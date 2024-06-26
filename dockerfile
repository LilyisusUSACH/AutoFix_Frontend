FROM nginx:stable-alpine
COPY dist /usr/share/nginx/html
COPY ./conf.d/default.conf /etc/nginx/conf.d/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]