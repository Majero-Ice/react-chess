
const broadcastConnection = (ws,msg,aWss) =>{
    aWss.clients.forEach((client) =>{
        if (client.socketId === msg.socketId)
            msg.playersCount = aWss.clients.size
        client.send(JSON.stringify(msg))
    })
}

 const getEnemy = (ws,msg,aWss) =>{
    const [firstPlayer,secondPlayer] = aWss.clients
    if (aWss.clients.size === 2){
        firstPlayer.send(JSON.stringify({
            enemy:secondPlayer.playerName,
            enemyColor:secondPlayer.playerColor,
            method:'enemyPlayer'
        }))
        secondPlayer.send(JSON.stringify({
            enemy:firstPlayer.playerName,
            enemyColor:firstPlayer.playerColor,
            playerId:secondPlayer.playerId,
            method:'enemyPlayer'
        }))
    }
}

 const moveEnemyOrCheck = (ws,msg,aWss) =>{
    aWss.clients.forEach((client) =>{
        if (client.socketId === msg.socketId && client.playerId !== msg.playerId)
            client.send(JSON.stringify(msg))
    })
}

 const connectionHandler = (ws,msg,aWss) =>{
    ws.socketId = msg.socketId
    ws.playerId = msg.playerId
    ws.playerName = msg.playerName
    ws.playerColor = msg.playerColor

    broadcastConnection(ws,msg,aWss)
    getEnemy(ws,msg,aWss)
}

 const sendLoader = (ws,msg,aWss) =>{
    const [firstClient] = aWss.clients
    aWss.clients.size === 2 ? msg.loader = true : msg.loader = false
    firstClient.send(JSON.stringify(msg))




}

module.exports = {
    broadcastConnection,
    moveEnemyOrCheck,
    connectionHandler,
    sendLoader
}
