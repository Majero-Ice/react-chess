const express = require('express')
const {connectionHandler, moveEnemyOrCheck, broadcastConnection, sendLoader} = require("./utils");
const app = express()
const WSServer = require('express-ws')(app)
const aWSS = WSServer.getWss()
const PORT = process.env.PORT || 5000

app.ws('/',(ws,req) =>{

    ws.on('message',(msg) =>{
        console.log('Successful connection');
        msg =  JSON.parse(msg)

        console.log(msg);

        switch (msg.method) {
            case 'connection':
                connectionHandler(ws,msg,aWSS)

                break

            case 'enemyMove':
                moveEnemyOrCheck(ws,msg,aWSS)
                break
            case 'changeColor':
                broadcastConnection(ws,msg,aWSS)
                break
            case 'waitForOpponent':

                sendLoader(ws,msg,aWSS)
                break

            case 'check':
                moveEnemyOrCheck(ws,msg,aWSS)
                break
            case 'restart':
                broadcastConnection(ws,msg,aWSS)
                break
            case 'endGame':
                broadcastConnection(ws,msg,aWSS)
        }
    })
})


app.listen(PORT,() =>{
    console.log(`Server started on ${PORT}`);
})








