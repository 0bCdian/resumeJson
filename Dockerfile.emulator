FROM node:23.5-alpine

ENV FIRESTORE_PROJECT_ID="test"

WORKDIR /src

COPY ./firebase.json .

RUN apk update && \
  apk add --no-cache openjdk11 && \
  apk add curl \
  rm -rf /var/cache/apk/*

HEALTHCHECK --interval=30s --timeout=10s --start-period=20s --retries=3 CMD \
  curl -s http://localhost:4000 || \
  curl -s http://localhost:8080 || \
  curl -s http://localhost:9099 || exit 1


RUN npm i -g firebase-tools && firebase --version
EXPOSE 4000 4400 4500 8080 9099 9150
CMD ["/bin/sh", "-c", "firebase emulators:start --project $FIRESTORE_PROJECT_ID"]
