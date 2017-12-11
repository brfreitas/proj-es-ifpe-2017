FROM node:8.4
RUN apt-get update && apt-get install default-jdk -y
WORKDIR /code
EXPOSE 8080
CMD ./run.sh
