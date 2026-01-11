import { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';
import WinnerWindow from './WinnerWindow';
import "./index.css";

import {
    initBoard,
    getSize,
    getValidMoves,
    isGameOver,
    ROWS,
    COLS
} from './GameLogic.js';

const COLORS = [
    '#FF6B6B',
    '#2bd154ff',
    '#0d88e7ff',
    '#fffa72ff',
    '#474444',
    '#841cd9ff'
];

export default function OnlineGame({ socket, playerId, gameState }) {
    const [showWinner, setShowWinner] = useState(false);
    const [rotation, setRotation] = useState(180);

    // Use gameState from props, fallback to init board
    const b = gameState?.board ?? initBoard();
    const turn = gameState?.turn ?? 0;
    const isMyTurn = playerId === turn;

    const s1 = getSize(b, ROWS - 1, 0);
    const s2 = getSize(b, 0, COLS - 1);
    const c1 = b[ROWS - 1][0];
    const c2 = b[0][COLS - 1];

    const validMoves = getValidMoves(b, turn === 0);

    // Game over detection
    useEffect(() => {
        if (gameState && isGameOver(b)) {
            setTimeout(() => setShowWinner(true), 300);
        }
    }, [b, gameState]);

    useEffect(() => {
    if (gameState) {
        setRotation(gameState.turn * 180);
    }
}, [gameState?.turn]);

    function play(colour) {
        if (!socket) return;
        if (!isMyTurn) return;
        if (!validMoves.includes(colour)) return;


        socket.send(JSON.stringify({
            type: "move",
            move: colour
        }));
    }

    function reset() {
        setShowWinner(false);
        setRotation(0);
        socket?.send(JSON.stringify({ type: "reset" }));
    }

    return (
        <>
            {showWinner && (
                <WinnerWindow s1={s1} s2={s2} reset={reset} />
            )}

            <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-6">
                <div className="text-center mb-4">
                    <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-3 rounded-xl">
                        <div
                            className="w-8 h-8 rounded-lg shadow-md"
                            style={{ backgroundColor: COLORS[turn === 0 ? c1 : c2] }}
                        />
                        <span className="font-bold text-gray-800 text-lg">
                            {isMyTurn ? "Your Turn" : "Opponent's Turn"}
                        </span>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg shadow-md" style={{ backgroundColor: COLORS[c1] }} />
                        <div>
                            <div className="text-sm text-gray-500 font-medium">
                                Player 1 {playerId === 0 && "(You)"}
                            </div>
                            <div className="text-2xl font-bold text-gray-800">{s1}</div>
                        </div>
                    </div>

                    <div className="text-gray-400 font-bold text-xl">VS</div>

                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <div className="text-sm text-gray-500 font-medium">
                                Player 2 {playerId === 1 && "(You)"}
                            </div>
                            <div className="text-2xl font-bold text-gray-800">{s2}</div>
                        </div>
                        <div className="w-10 h-10 rounded-lg shadow-md" style={{ backgroundColor: COLORS[c2] }} />
                    </div>
                </div>

                <div className="flex justify-center mb-6">
                    <div
                        className="p-3 rounded-xl shadow-inner transition-transform duration-700 ease-in-out"
                        style={{ transform: `rotate(${rotation}deg)` }}
                    >
                        {b.map((row, i) => (
                            <div key={i} className="flex">
                                {row.map((colour, j) => (
                                    <div
                                        key={j}
                                        className="w-10 h-10 shadow-sm"
                                        style={{ backgroundColor: COLORS[colour] }}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {!showWinner && (
                    <div className="mb-4">
                        <div className="text-sm text-gray-600 font-medium mb-3">
                            {isMyTurn ? "Choose a colour:" : "Waiting for opponent..."}
                        </div>

                        <div className="flex gap-3">
                            {COLORS.map((colour, i) => (
                                <button
                                    key={i}
                                    onClick={() => play(i)}
                                    disabled={!isMyTurn || !validMoves.includes(i)}
                                    className="w-16 h-16 rounded-xl shadow-lg border-4 transition-all disabled:opacity-20 disabled:cursor-not-allowed hover:scale-110"
                                    style={{
                                        backgroundColor: colour,
                                        borderColor: validMoves.includes(i) ? '#1f2937' : '#d1d5db'
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                )}

                <button
                    onClick={reset}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-medium shadow-lg"
                >
                    <RotateCcw size={20} />
                    New Game
                </button>
            </div>
        </>
    );
}