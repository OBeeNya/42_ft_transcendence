FROM alpine:3.16


# update && upgrade packages
# install nginx and openssl
RUN apk update && apk upgrade && apk add --no-cache nginx openssl

COPY ./nginx.conf /etc/nginx/http.d/

RUN openssl req -new -newkey rsa:4096 -x509 -sha256 -days 365 -nodes \
        -out ssl/transcendence.pem \
        -keyout ssl/transcendence.key \
        -subj "/C=FR/ST=France/L=Paris/O=42/OU=student/CN=localhost"\
        && chmod 600 ssl/transcendence.pem ssl/transcendence.key

#set entrypoint on the port 443
EXPOSE 443

#launch the webserver
ENTRYPOINT ["nginx"]

#to dont exec nginx on background
CMD ["-g", "daemon off;"]