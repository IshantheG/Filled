import { StrictMode } from 'react'
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
  }

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
