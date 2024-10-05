FROM nginx:1.27.0

COPY ./nginx-include-gzip.conf /etc/nginx/templates/gzip.conf.inc.template
COPY ./nginx.conf /etc/nginx/templates/default.conf.template

COPY ./public /var/www/html
