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

ENTRYPOINT ["sh", "/usr/start.sh"]