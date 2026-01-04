from fastapi import APIRouter
from ..schemas import BoardRequest, MoveResponse
from ..ai.bot import get_ai_move

router = APIRouter()

@router.post("/ai-move", response_model=MoveResponse)
def ai_move(request: BoardRequest):
    board = request.board
    ai_move = get_ai_move(board)
    return MoveResponse(colour = ai_move)
