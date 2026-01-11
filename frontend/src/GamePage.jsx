import TwoPlayerGame from "./TwoPlayerGame";  
import { Users} from "lucide-react";  
import AIPlayer from "./Ai.jsx";  
import OnlineGameSession from "./OnlineGameSession.jsx";  
import { Link } from "react-router-dom";

export default function GamePage({ mode }) {

    return (

        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">

            <div className="max-w-2xl w-full">
                <div className="flex items-center justify-center gap-3 mb-6">
                    <Users className="text-white" size={32} />
                    <Link to="/" className="text-white hover:underline">
                    <h1 className="text-5xl font-bold text-white">Filler</h1>
                    </Link>
                </div>

                {mode === "ai" ? <p className="text-purple-200 text-center mb-6">AI Mode</p> : ( mode === "two-player" ? <p className="text-purple-200 text-center mb-6">Two Player Mode</p> : <p className="text-purple-200 text-center mb-6">Online</p> )}

            
            </div>

            
            {mode === "ai" ? <AIPlayer /> : (mode === "two-player" ? <TwoPlayerGame /> : <OnlineGameSession />)} 


            


        </div>
    );
}