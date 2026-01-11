
import { createRoot } from 'react-dom/client'


import GamePage from './GamePage.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import ModeSelector from './ChooseMode.jsx'

const router = createBrowserRouter([{
  path: "/",
  element: <ModeSelector />
  }, 
  
  {
  path: "/twoplayer",
  element: <GamePage mode = {"two-player"} />
  }, 
  
  {
  path: "/ai",
  element: <GamePage mode = {"ai"} />
  },

  {
    path: "/room/:roomId",
    element: <GamePage mode = {"online-player"} />
  }


])

createRoot(document.getElementById('root')).render(
  
    <RouterProvider router={router}/>
  
)
