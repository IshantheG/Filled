export const ROWS = 7;
export const COLS = 8;

export function initBoard() {
  const b = Array(ROWS).fill(0).map(() => Array(COLS).fill(0));
  
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      b[i][j] = Math.floor(Math.random() * 6);
    }
  }
  
  for (let i = 0; i < ROWS; i++) {
    for (let j = 1; j < COLS; j++) {
      if (b[i][j] === b[i][j-1]) {
        const available = [0,1,2,3,4,5].filter(c => c !== b[i][j-1]);
        b[i][j] = available[Math.floor(Math.random() * available.length)];
      }
    }
  }
  
  for (let j = 0; j < COLS; j++) {
    for (let i = 1; i < ROWS; i++) {
      if (b[i][j] === b[i-1][j]) {
        const available = [0,1,2,3,4,5].filter(c => c !== b[i-1][j]);
        b[i][j] = available[Math.floor(Math.random() * available.length)];
      }
    }
  }
  
  while (b[ROWS-1][0] === b[0][COLS-1]) {
    b[0][COLS-1] = Math.floor(Math.random() * 5);
  }
  
  const p1Color = b[ROWS-1][0];
  if (ROWS > 1 && b[ROWS-2][0] === p1Color) {
    const available = [0,1,2,3,4,5].filter(c => c !== p1Color);
    b[ROWS-2][0] = available[Math.floor(Math.random() * available.length)];
  }

  if (COLS > 1 && b[ROWS-1][1] === p1Color) {
    const available = [0,1,2,3,4,5].filter(c => c !== p1Color);
    b[ROWS-1][1] = available[Math.floor(Math.random() * available.length)];
  }
  
  const p2Color = b[0][COLS-1];
  if (ROWS > 1 && b[1][COLS-1] === p2Color) {
    const available = [0,1,2,3,4,5].filter(c => c !== p2Color);
    b[1][COLS-1] = available[Math.floor(Math.random() * available.length)];
  }
  if (COLS > 1 && b[0][COLS-2] === p2Color) {
    const available = [0,1,2,3,4,5].filter(c => c !== p2Color);
    b[0][COLS-2] = available[Math.floor(Math.random() * available.length)];
  }
  
  return b;
}

export  function getSize(b, r, c) {
  const colour = b[r][c];
  let count = 0;
  const visited = new Set();
  const queue = [[r, c]];
  
  while (queue.length > 0) {
    const [rr, cc] = queue.shift();
    const key = `${rr},${cc}`;
    
    if (visited.has(key)) continue;
    if (rr < 0 || rr >= ROWS || cc < 0 || cc >= COLS) continue;
    if (b[rr][cc] !== colour) continue;
    
    visited.add(key);
    count++;
    
    queue.push([rr-1, cc], [rr+1, cc], [rr, cc-1], [rr, cc+1]);
  }
  
  return count;
}


export  function getValidMoves(b, isP1) {
  const c1 = b[ROWS-1][0];
  const c2 = b[0][COLS-1];
  const cur = isP1 ? c1 : c2;
  const opp = isP1 ? c2 : c1;
  const moves = [];
  for (let i = 0; i < 6; i++) {
    if (i !== cur && i !== opp) moves.push(i);
  }
  return moves;
}


export function applyMove(b, colour, isP1) {
  const nb = b.map(r => [...r]);
  const [startR, startC] = isP1 ? [ROWS-1, 0] : [0, COLS-1];
  const oldCol = nb[startR][startC];
  
  if (oldCol === colour) return nb;
  
  const owned = new Set();
  const queue = [[startR, startC]];
  const visited = new Set();
  
  while (queue.length > 0) {
    const [r, c] = queue.shift();
    const key = `${r},${c}`;
    
    if (visited.has(key)) continue;
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS) continue;
    if (nb[r][c] !== oldCol) continue;
    
    visited.add(key);
    owned.add(key);
    
    queue.push([r-1, c], [r+1, c], [r, c-1], [r, c+1]);
  }
  
  for (const key of owned) {
    const [r, c] = key.split(',').map(Number);
    nb[r][c] = colour;
  }
  
  for (const key of owned) {
    const [r, c] = key.split(',').map(Number);
    const neighbors = [[r-1, c], [r+1, c], [r, c-1], [r, c+1]];
    
    for (const [nr, nc] of neighbors) {
      if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
        if (!owned.has(`${nr},${nc}`) && nb[nr][nc] === colour) {
          nb[nr][nc] = colour;
        }
      }
    }
  }
  
  return nb;
}

export function isGameOver(b) {
  const s1 = getSize(b, ROWS-1, 0);
  const s2 = getSize(b, 0, COLS-1);
  return s1 + s2 === ROWS * COLS;
}

