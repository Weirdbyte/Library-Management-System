import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-600 p-4">
        Welcome to BOOKNEST
      </h1>
      <p className="px-4 py-2">
        This is a test to verify Tailwind is working.
      </p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4 mt-2">
        Click Me
      </button>
    </div>
  )
}

export default App