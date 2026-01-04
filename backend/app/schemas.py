from pydantic import BaseModel
from typing import List


class BoardRequest(BaseModel):
    board: List[List[int]]


class MoveResponse(BaseModel):
    colour: int
