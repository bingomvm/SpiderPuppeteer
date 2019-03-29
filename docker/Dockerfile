FROM aimeetup/node-puppeteer

WORKDIR /SpiderPuppet

ADD ./build.tar /SpiderPuppet

RUN npm config set registry http://registry.npm.qiwoo.org && \
  npm config set package-lock false && npm install 

EXPOSE 8362
ENTRYPOINT [ "sh", "docker-entrypoint.sh" ]