import React from 'react'
import BookPage from './components/bookPage'
import Forms from './components/Form'
import { BrowserRouter } from 'react-router-dom'
import Routers from './AllRouter'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routers/>
    </BrowserRouter>
    </>
  )
}

export default App