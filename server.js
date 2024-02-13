const jsonServer = require('json-server');
const auth = require('json-server-auth');
const low = require('lowdb');
const jwt = require('jsonwebtoken');

require('dotenv').config();

// 서버
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// 데이터베이스
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

server.db = router.db; // Bind the router db to the app

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(auth);

// 커스텀 라우터 구현
// server.post('/login', (req, res) => {
//   const { email, password } = req.body;
//   console.log(email, password);

//   const user = db.get('users').find({ email }).value();

//   if (!user || user.password !== password) return res.status(401).send({ message: '유저가 존재하지 않습니다.' });

//   delete user.password;
//   const token = jwt.sign({ ...user }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

//   console.log(token);

//   return res.status(200).send(token);
// });

server.use(router);

server.listen(3001, () => {
  console.log('JSON Server is running');
});
