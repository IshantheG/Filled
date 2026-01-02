import React, { useState, useEffect } from 'react';
import { RotateCcw, Users, Trophy, Sparkles } from 'lucide-react';
import "./index.css";

const ROWS = 7;
const COLS = 8;
const COLORS = ['#FF6B6B', '#2bd154ff', '#0d88e7ff', '#fffa72ff', '#474444', '#841cd9ff'];

function initBoard() {
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

function getSize(b, r, c) {
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


function getValidMoves(b, isP1) {
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


function applyMove(b, colour, isP1) {
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

function isGameOver(b) {
  const s1 = getSize(b, ROWS-1, 0);
  const s2 = getSize(b, 0, COLS-1);
  return s1 + s2 === ROWS * COLS;
}

export default function Game() {
  const [b, setB] = useState(initBoard);
  const [over, setOver] = useState(false);
  const [isP1Turn, setIsP1Turn] = useState(true);
  const [rotation, setRotation] = useState(0);
  const [showWinner, setShowWinner] = useState(false);

  const s1 = getSize(b, ROWS-1, 0);
  const s2 = getSize(b, 0, COLS-1);
  const c1 = b[ROWS-1][0];
  const c2 = b[0][COLS-1];
  const vms = getValidMoves(b, isP1Turn);

  useEffect(() => {
    if (isGameOver(b)) {
      setOver(true);
      setTimeout(() => setShowWinner(true), 300);
    }
  }, [b]);

  function play(colour) {
    if (over || !vms.includes(colour)) return;
    
    const nb = applyMove(b, colour, isP1Turn);
    setB(nb);
    
    if (!isGameOver(nb)) {
      setRotation(rotation + 180);
      setIsP1Turn(!isP1Turn);
    }
  }

  function reset() {
    setB(initBoard());
    setOver(false);
    setIsP1Turn(true);
    setRotation(0);
    setShowWinner(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 flex items-center justify-center p-4 relative overflow-hidden">
      {showWinner && (
        <div className="absolute inset-0 flex items-center justify-center z-50 animate-fadeIn">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"/>
          <div className="relative bg-white rounded-3xl p-12 shadow-2xl animate-scaleIn">
            <div className="text-center">
              <Trophy className="w-24 h-24 mx-auto mb-4 text-yellow-500 animate-bounce"/>
              <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {s1 > s2 ? 'Player 1 Wins!' : s1 < s2 ? 'Player 2 Wins!' : "It's a Tie!"}
              </h2>
              <div className="text-3xl font-bold text-gray-700 mb-6">
                {s1} - {s2}
              </div>
              <Sparkles className="w-12 h-12 mx-auto mb-6 text-yellow-400 animate-pulse"/>
              <button
                onClick={reset}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-medium shadow-lg transition-all hover:shadow-xl flex items-center gap-2 mx-auto"
              >
                <RotateCcw size={20}/>
                Play Again
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-2xl w-full">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Users className="text-white" size={32}/>
          <h1 className="text-5xl font-bold text-white">Filler</h1>
        </div>
        <p className="text-purple-200 text-center mb-6">Two Player Mode</p>
        
        <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-6">
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-3 rounded-xl">
              <div 
                className="w-8 h-8 rounded-lg shadow-md transition-all"
                style={{backgroundColor: COLORS[isP1Turn ? c1 : c2]}}
              />
              <span className="font-bold text-gray-800 text-lg">
                Player {isP1Turn ? '1' : '2'}'s Turn
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg shadow-md" style={{backgroundColor: COLORS[c1]}}/>
              <div>
                <div className="text-sm text-gray-500 font-medium">Player 1</div>
                <div className="text-2xl font-bold text-gray-800">{s1}</div>
              </div>
            </div>
            
            <div className="text-gray-400 font-bold text-xl">VS</div>
            
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm text-gray-500 font-medium">Player 2</div>
                <div className="text-2xl font-bold text-gray-800">{s2}</div>
              </div>
              <div className="w-10 h-10 rounded-lg shadow-md" style={{backgroundColor: COLORS[c2]}}/>
            </div>
          </div>

          <div className="flex justify-center mb-6">
            <div 
              className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-xl shadow-inner transition-transform duration-700 ease-in-out"
              style={{transform: `rotate(${rotation}deg)`}}
            >
              {b.map((row, i) => (
                <div key={i} className="flex">
                  {row.map((colour, j) => (
                    <div
                      key={j}
                      className="w-10 h-10 shadow-sm transition-colourors duration-300 border-0"
                      style={{backgroundColor: COLORS[colour]}}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {!over ? (
            <div className="mb-4">
              <div className="text-sm text-gray-600 font-medium mb-3">Choose a colouror:</div>
              <div className="flex gap-3">
                {COLORS.map((colour, i) => (
                  <button
                    key={i}
                    onClick={() => play(i)}
                    disabled={!vms.includes(i)}
                    className="w-16 h-16 rounded-xl shadow-lg border-4 transition-all disabled:opacity-20 disabled:cursor-not-allowed hover:scale-110 hover:shadow-xl active:scale-95"
                    style={{
                      backgroundColor: colour,
                      borderColor: vms.includes(i) ? '#1f2937' : '#d1d5db'
                    }}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="h-24"/>
          )}

          <button
            onClick={reset}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-medium shadow-lg transition-all hover:shadow-xl"
          >
            <RotateCcw size={20}/>
            New Game
          </button>
        </div>
        
        <p className="text-purple-200 text-center mt-4 text-sm">
          Board rotates after each turn • Capture all squares to win!
        </p>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}