FROM nginx:latest

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY dist/containerize-angular-app/browser /usr/share/nginx/html/containerize-angular-app

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
