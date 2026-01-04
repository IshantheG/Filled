import { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';
import WinnerWindow from './WinnerWindow';
import "./index.css";
const COLORS = ['#FF6B6B', '#2bd154ff', '#0d88e7ff', '#fffa72ff', '#474444', '#841cd9ff'];
import { initBoard, getSize, getValidMoves, applyMove, isGameOver, ROWS, COLS } from './GameLogic.js';


export default function AIPlayer() {

    const [b, setB] = useState(initBoard);
    const [over, setOver] = useState(false);
    const [isP1Turn, setIsP1Turn] = useState(true);
    const [rotation, setRotation] = useState(0);
    const [showWinner, setShowWinner] = useState(false);
    const [isAIThinking, setIsAIThinking] = useState(false);

    const s1 = getSize(b, ROWS - 1, 0);
    const s2 = getSize(b, 0, COLS - 1);
    const c1 = b[ROWS - 1][0];
    const c2 = b[0][COLS - 1];
    const vms = getValidMoves(b, isP1Turn);

    useEffect(() => {
        if (isGameOver(b)) {
            setOver(true);
            setTimeout(() => setShowWinner(true), 300);
        }
    }, [b]);

    useEffect(() => {
        // AI (P2) makes a move when it's their turn
        if (!isP1Turn && !over && !isAIThinking) {
            setIsAIThinking(true);
            
            // Call backend API to get AI move
            fetch('http://127.0.0.1:8000/api/ai-move', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ board: b })
            })
            .then(res => res.json())
            .then(data => {
                const aiMove = data.colour;
                const nb = applyMove(b, aiMove, false); // false = P2
                setB(nb);
                
                if (!isGameOver(nb)) {
                    setRotation(rotation + 180);
                    setIsP1Turn(true);
                }
                setIsAIThinking(false);
            })
            .catch(err => {
                console.error('AI request failed:', err);
                setIsAIThinking(false);
            });
        }
    }, [isP1Turn, over, b, rotation, isAIThinking]);

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
        setIsAIThinking(false);
    }

    return (
        <>

            {showWinner && (<WinnerWindow s1={s1} s2={s2} reset={reset} />)}

            <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-6">
                <div className="text-center mb-4">
                    <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-3 rounded-xl">
                        <div
                            className="w-8 h-8 rounded-lg shadow-md transition-all"
                            style={{ backgroundColor: COLORS[isP1Turn ? c1 : c2] }}
                        />
                        <span className="font-bold text-gray-800 text-lg">
                            Player {isP1Turn ? '1' : '2'}'s Turn
                        </span>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg shadow-md" style={{ backgroundColor: COLORS[c1] }} />
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
                                        className="w-10 h-10 shadow-sm transition-colours duration-300 border-0"
                                        style={{ backgroundColor: COLORS[colour] }}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {!over ? (
                    <div className="mb-4">
                        {isAIThinking ? (
                            <div className="text-center text-gray-600 font-medium py-4">
                                <span>AI is thinking...</span>
                            </div>
                        ) : isP1Turn ? (
                            <>
                                <div className="text-sm text-gray-600 font-medium mb-3">Choose a colour:</div>
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
                            </>
                        ) : null}
                    </div>
                ) : (
                    <div className="h-24" />
                )}

                <button
                    onClick={reset}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-medium shadow-lg transition-all hover:shadow-xl"
                >
                    <RotateCcw size={20} />
                    New Game
                </button>
            </div>
        </>
    )

}