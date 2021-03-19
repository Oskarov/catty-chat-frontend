# Catty chat - Frontend
## Чат - frontend приложение на React

---

Personal project of [Dmitriy Oskarov](http://frontendfrontier.com/)

---

Technology stack:

* React
* Apollo
* GraphQL

---

### Description (Описание)

EN:

A simple chat where you can register,
and then chat with any registered user,
instantly receiving new messages and as an added bonus
you can react to messages with emoji (almost like in slack)

RU:

Простой чат, в котором можно зарегистрироваться, 
а затем общаться с любым зарегистрированным пользователем, 
мгновенно получая новые сообщения и в качестве дополнительной плюшки
можно реагировать на сообщения при помощи эмоджи (почти как в slack)

---

### Installing (Установка)

1. clone
2. npm install
3. run server with Atlas cluster on [catty-chat-server](https://github.com/Oskarov/catty-chat-server)
4. place .env file and fill in the following information:
   ```
   PORT=***** #port of react app
   SERVER=http://localhost:****/ #url of server app
   SUBSCRIPRIONS='ws://localhost:****/graphql #url for sockets
   ```
5. npm run start

---

thanks [Classsed](https://www.patreon.com/classsed) for lessons and inspiration