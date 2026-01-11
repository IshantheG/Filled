from typing import Dict, List, Any
import random

ROWS = 7
COLS = 8
def init_board():
    """Initialize a 13x13 game board with randomized colors"""
    # Create board with random colors
    board = [[random.randint(0, 5) for _ in range(COLS)] for _ in range(ROWS)]
    
    # Ensure no horizontal adjacencies
    for i in range(ROWS):
        for j in range(1, COLS):
            if board[i][j] == board[i][j-1]:
                available = [c for c in range(6) if c != board[i][j-1]]
                board[i][j] = random.choice(available)
    
    # Ensure no vertical adjacencies
    for j in range(COLS):
        for i in range(1, ROWS):
            if board[i][j] == board[i-1][j]:
                available = [c for c in range(6) if c != board[i-1][j]]
                board[i][j] = random.choice(available)
    
    # Ensure player corners are different colors
    while board[ROWS-1][0] == board[0][COLS-1]:
        board[0][COLS-1] = random.randint(0, 4)
    
    # Ensure Player 1 corner neighbors are different
    p1_color = board[ROWS-1][0]
    if ROWS > 1 and board[ROWS-2][0] == p1_color:
        available = [c for c in range(6) if c != p1_color]
        board[ROWS-2][0] = random.choice(available)
    
    if COLS > 1 and board[ROWS-1][1] == p1_color:
        available = [c for c in range(6) if c != p1_color]
        board[ROWS-1][1] = random.choice(available)
    
    # Ensure Player 2 corner neighbors are different
    p2_color = board[0][COLS-1]
    if ROWS > 1 and board[1][COLS-1] == p2_color:
        available = [c for c in range(6) if c != p2_color]
        board[1][COLS-1] = random.choice(available)
    
    if COLS > 1 and board[0][COLS-2] == p2_color:
        available = [c for c in range(6) if c != p2_color]
        board[0][COLS-2] = random.choice(available)
    
    return board

def apply_move_to_board(board, colour, is_player_one):
    """Apply a color move to the board using flood fill"""
    rows, cols = len(board), len(board[0])
    start_r, start_c = (rows - 1, 0) if is_player_one else (0, cols - 1)
    old_colour = board[start_r][start_c]
    
    if old_colour == colour:
        return board
    
    # Create a copy of the board
    new_board = [row[:] for row in board]
    
    # Flood fill
    stack = [(start_r, start_c)]
    visited = set()
    
    while stack:
        r, c = stack.pop()
        if (r, c) in visited:
            continue
        if r < 0 or r >= rows or c < 0 or c >= cols:
            continue
        if new_board[r][c] != old_colour:
            continue
            
        visited.add((r, c))
        new_board[r][c] = colour
        
        # Add neighbors
        stack.extend([(r+1, c), (r-1, c), (r, c+1), (r, c-1)])
    
    return new_board

class GameRoom:
    def __init__(self, room_id: str):
        self.room_id = room_id
        self.players: List[Any] = []
        self.turn: int = 0
        self.board = init_board()

    def add_player(self, ws):
        self.players.append(ws)
        return len(self.players) - 1

    def remove_player(self, ws):
        if ws in self.players:
            self.players.remove(ws)

    def is_player_turn(self, player_id: int) -> bool:
        return self.turn == player_id

    def apply_move(self, colour: int):
        """Apply a move and switch turns"""
        is_player_one = self.turn == 0
        self.board = apply_move_to_board(self.board, colour, is_player_one)
        self.turn = 1 - self.turn

    def state(self) -> Dict:
        """Return current game state"""
        return {
            "board": self.board,
            "turn": self.turn
        }

    def reset(self):
        """Reset the game"""
        self.board = init_board()
        self.turn = 0