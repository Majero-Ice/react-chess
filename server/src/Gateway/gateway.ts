import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets"
import { ObjectId } from "mongoose"
import { Server, Socket } from "socket.io"
import { BoardService } from "src/Board/board.service"
import { FigureService } from "src/Figure/figure.service"
import { PlayerService } from "src/Player/player.service"


@WebSocketGateway({
    cors:{
        origin:['https://react-chess-client.vercel.app/start-page']
    }
})
export class Gateway{

    constructor(
        private boardService:BoardService,
        private figureService:FigureService,
        private playerService:PlayerService
        ){}

    @WebSocketServer()
    server:Server


    @SubscribeMessage('join-player')
        async joinGame(
            @ConnectedSocket() client: Socket,
            @MessageBody() {gameId,username}
            ){  
                
                const player = await this.playerService.create(username,gameId)
                client.join(gameId)
                const room = this.server.sockets.adapter.rooms.get(gameId)
                this.server.emit('onJoin',room.size)
                if(player){
                    this.server.to(client.id).emit('onAddPlayer',player)
                }
    }

    
    @SubscribeMessage('add-figure')        
        async addFigure(
            @MessageBody() {playerId,figureId}
        ){
            await this.playerService.addLostFigure(playerId,figureId)
        }

    @SubscribeMessage('get-opponent')
        async getOpponent(
            @MessageBody() {userId,gameId},
            @ConnectedSocket() client:Socket
        ){

            const board = await this.boardService.getOne(gameId)
            console.log(board.players)
            const [opponentId] = board.players.filter(id => String(id) !== userId)
            console.log(String(opponentId))
            const opponent = await this.playerService.getPlayer(opponentId as ObjectId)

            this.server.to(client.id).emit('onOpponent',opponent) 
        }

    @SubscribeMessage('move')
    async move(
        @ConnectedSocket() client: Socket,
        @MessageBody() cords:any
        ){
           const moveData = await this.figureService.move(cords.id,cords.x,cords.y)
           client.broadcast.emit('onMove',moveData)
    }
}