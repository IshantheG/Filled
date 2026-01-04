def get_valid_moves(board):
    list_of_moves = {0,1,2,3,4,5}
    
    list_of_moves.remove(board[0][len(board[0])-1])
    list_of_moves.remove(board[len(board)-1][0])

    return list(list_of_moves)


def get_size(board, isP1):
    colour = board[len(board)-1][0] if isP1 else board[0][len(board[0])-1]
    if isP1:
        startR, startC = len(board) - 1, 0
    else:
        startR, startC = 0, len(board[0]) - 1

    owned = set()

    queue = [(startR, startC)]

    while queue:
        r, c = queue.pop(0)
        key = f"{r},{c}"
        if key in owned:
            continue
        if r < 0 or r >= len(board) or c < 0 or c >= len(board[0]):
            continue
        if board[r][c] != colour:
            continue

        owned.add(key)
        queue.extend([(r-1, c), (r+1, c), (r, c-1), (r, c+1)])

    return len(owned)


def apply_move(board, colour, isP1):

    if isP1:
        startR, startC = len(board)-1, 0
        oldcolour = board[startR][startC]
    else:
        startR, startC = 0, len(board[0])-1
        oldcolour = board[startR][startC]

    newboard = [row[:] for row in board]

    if oldcolour == colour:
        return newboard 
    
    owned = set()
    visited = set()
    queue = [ (startR, startC) ]

    while queue:
        r, c = queue.pop(0)
        key = f"{r},{c}"
        if key in visited:
            continue
        if r < 0 or r >= len(newboard) or c < 0 or c >= len(newboard[0]):
            continue
        if newboard[r][c] != oldcolour:
            continue

        visited.add(key)
        owned.add(key)
        queue.extend([(r-1, c), (r+1, c), (r, c-1), (r, c+1)])

    for key in owned:
        r, c = map(int, key.split(","))
        newboard[r][c] = colour
    
    # Now claim all connected cells of the new colour (handles enclosed territory)
    to_process = set(owned)
    processed = set(owned)
    
    while to_process:
        new_to_process = set()
        for key in to_process:
            r, c = map(int, key.split(","))
            neighbors = [(r-1, c), (r+1, c), (r, c-1), (r, c+1)]
            for nr, nc in neighbors:
                if 0 <= nr < len(newboard) and 0 <= nc < len(newboard[0]):
                    nkey = f"{nr},{nc}"
                    if nkey not in processed and newboard[nr][nc] == colour:
                        newboard[nr][nc] = colour
                        new_to_process.add(nkey)
                        processed.add(nkey)
        to_process = new_to_process

    return newboard


def minimax(board, depth, isP1):

    if depth == 0:
        return get_size(board, True) - get_size(board, False), None
    

    valid_moves = get_valid_moves(board)

    if isP1:
        best_move = None
        best_score = float('-inf')

        for move in valid_moves:
            new_board = apply_move(board, move, isP1)
            score, _ = minimax(new_board, depth-1, isP1=False)
            

            if score > best_score:
                best_score = score
                best_move = move
        
        return best_score, best_move
    
    else:
        best_move = None
        best_score = float('inf')

        for move in valid_moves:
            new_board = apply_move(board, move, isP1)
            score, _ = minimax(new_board, depth-1, isP1=True)
            
            # Tiebreaker: prefer moves that maximize P2's territory
            if score == best_score and best_move is not None:
                new_size = get_size(new_board, False)
                best_size = get_size(apply_move(board, best_move, False), False)
                if new_size > best_size:
                    best_move = move
                    best_score = score
            elif score < best_score:
                best_score = score
                best_move = move
        
        return best_score, best_move


def get_ai_move(board):
    _, move = minimax(board, depth=7, isP1=False)
    return move

