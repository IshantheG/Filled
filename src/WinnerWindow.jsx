
import { Trophy, Sparkles, RotateCcw } from 'lucide-react';


export default function WinnerWindow({ s1, s2, reset }) {
    
    return (


    //WIndow
    <div className="absolute inset-0 flex items-center justify-center z-50 animate-fadeIn">
        
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="relative bg-white rounded-3xl p-12 shadow-2xl animate-scaleIn">
            <div className="text-center">
                <Trophy className="w-24 h-24 mx-auto mb-4 text-yellow-500 animate-bounce" />
                <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {s1 > s2 ? 'Player 1 Wins!' : s1 < s2 ? 'Player 2 Wins!' : "It's a Tie!"}
                </h2>
                <div className="text-3xl font-bold text-gray-700 mb-6">
                    {s1} - {s2}
                </div>
                <Sparkles className="w-12 h-12 mx-auto mb-6 text-yellow-400 animate-pulse" />
                <button
                    onClick={reset}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-medium shadow-lg transition-all hover:shadow-xl flex items-center gap-2 mx-auto"
                >
                    <RotateCcw size={20} />
                    Play Again
                </button>
            </div>
        </div>
    </div>
    );
}
