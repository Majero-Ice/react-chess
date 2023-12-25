import { Cell } from "../Cell";


export interface CellState{
    cells:Cell[][],
    selected:Cell | null
}