'use strict';
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const _ = require('lodash');

// タイムゾーンを設定する
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('Asia/Tokyo');

const app = express();

// CORSを許可する
app.use(cors());

// POSTパラメータをJSONで取得できるようにする
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// public以下に配置したファイルは直リンクで見れるようにする
app.use(express.static(path.resolve(__dirname, 'public')));

// サーバーの動作確認
app.get('/time', (req, res) => {
  res.send(moment().format('YYYY/MM/DD HH:mm:ss'));
});

// サーバーを起動する
const server = app.listen(process.env.PORT || 4000, '0.0.0.0', () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`START SERVER http://${host}:${port}`);
});

// socketサーバーを立ち上げる
const io = require('socket.io')(server, { origins: '*:*' });

const messages = [];
const participants = [];
const serverId = _.uniqueId();
const systemMessage = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
};

// socketイベントの設定
io.on('connection', (socket) => {
  initialize(socket);

  // 切断時
  socket.on('disconnect', () => {
    _.remove(participants, (participant) => {
      return participant.user === socket.id;
    });
    io.emit('updateParticipants', participants);
    createSystemMessage(systemMessage.DISCONNECT);
  });

  // ユーザの参加
  socket.on('send', (message) => {
    messages.push({
      ...message,
      id: _.uniqueId(),
    });
    if (messages.length > 50) messages.shift();
    io.emit('loadMessages', messages);
  });
});

const initialize = (socket) => {
  createSystemMessage(systemMessage.CONNECT);
  io.to(socket.id).emit('loadMessages', messages);
  io.to(socket.id).emit('loadUserId', socket.id);

  participants.push({
    user: socket.id,
    id: _.uniqueId(),
  });
  io.emit('updateParticipants', participants);
};

const createSystemMessage = (type) => {
  const message = {
    name: 'SERVER',
    time: moment().format('YYYY/MM/DD HH:mm:ss'),
    userId: serverId,
    id: _.uniqueId(),
  };
  switch (type) {
    case systemMessage.CONNECT:
      message.text = 'ユーザが参加しました。';
      break;
    case systemMessage.DISCONNECT:
      message.text = 'ユーザが退去しました。';
      break;
    default:
      return;
  }
  messages.push(message);
  io.emit('loadMessages', messages);
};
