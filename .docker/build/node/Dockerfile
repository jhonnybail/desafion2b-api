FROM node:8.10
LABEL Name="App Test"
LABEL Version=1.0.0

USER root
RUN yarn global add serverless

WORKDIR /usr
COPY ./test.sh ./
COPY ./start.sh ./
COPY ./deploy.sh ./

WORKDIR /usr/src/app

EXPOSE 80 8080 8081 8082

ENTRYPOINT ["sh", "/usr/start.sh"]