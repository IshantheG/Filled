import { Link, useNavigate } from 'react-router-dom';

export default function ModeSelector() {
  const navigate = useNavigate();

  function startOnlineGame() {
    const roomId = crypto.randomUUID().slice(0, 8);
    navigate(`/room/${roomId}`);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-5xl font-bold text-purple-800 mb-6">Filler</h1>
        <p className="text-purple-600 mb-8">Choose a game mode to start playing!</p>

        <div className="flex flex-col gap-4">
          <Link to="/twoplayer">
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg transition-all hover:shadow-xl">
              Two Player Mode
            </button>
          </Link>

          <Link to="/ai">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg transition-all hover:shadow-xl">
              AI Mode
            </button>
          </Link>

          <button
            onClick={startOnlineGame}
            className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg transition-all hover:shadow-xl"
          >
            Online Mode
          </button>
        </div>
      </div>
    </div>
  );
}