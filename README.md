# WebSocket Chat Room

原本的目標是要使用 Node.js 接收虛擬貨幣交易所的 WebSocket API，如：
[Binance](https://binance-docs.github.io/apidocs/)、
[BitoPro](https://github.com/bitoex/bitopro-offical-api-docs)，
但在使用 Postman 或是 [websocket-tester](https://www.piesocket.com/websocket-tester)
的時候一直連接不上，發生 `error Error: ETIMEDOUT, Connection timed out` ，雖然有找到一些解決方發 [Github issues](https://github.com/jaggedsoft/node-binance-api/issues/48#issuecomment-356762732)，但不如先自己用 WebSocket 寫個聊天室試試。

無意間發現 Node.js 一直都沒有 Websocket support to core \
https://stackoverflow.com/questions/52995152/does-node-have-built-in-support-for-websockets

https://github.com/nodejs/node/issues/19308

Node.js v16.6.1 documentation ([TLS](https://nodejs.org/dist/latest-v16.x/docs/api/tls.html)、[Net](https://nodejs.org/dist/latest-v16.x/docs/api/net.html#net_socket_connect))

## Demo

![WebSocket Chat Room](https://raw.githubusercontent.com/ORdinarycas/websocket-chat-room/main/demo/websocket-chat-room.gif)

## Usage

```powershell
npm install
npm run dev

Go to localhost:3000
```

## Notes

參考的影片([連結](https://www.youtube.com/watch?v=jD7FnbI76Hg))

## Digression

在創建 github repository 的時候查到的命名習慣 \
https://stackoverflow.com/questions/11947587/is-there-a-naming-convention-for-git-repositories
