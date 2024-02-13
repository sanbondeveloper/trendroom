// 서버
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// 데이터베이스
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

server.use(middlewares);

// 커스텀 라우터 구현

server.use(router);

server.listen(3001, () => {
  console.log('JSON Server is running');
});
