import { boardActions } from "../../entries/Board/slice/boardSlice";
import { cellActions } from "../../entries/Cell/slice/cellSlice";
import { figureActions } from "../../entries/Figures/slice/figureSlice";
import { playerActions } from "../../entries/Player/slice/playerSlice";
import { socketActions } from "../../entries/Socket/slice/socketSlice";


export default{
    ...boardActions,
    ...cellActions,
    ...figureActions,
    ...playerActions,
    ...socketActions
}