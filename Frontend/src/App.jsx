import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import React from 'react'
// Import your components (you'll create these)
import Dashboard from './components/Dashboard'
import Startups from './components/Startups'
import Mentors from './components/Mentors'
import Setup from './components/Setup'
import Applications from './components/Applications'
import Funding from './components/Funding'
import Settings from './components/Settings'
import Navigation from './components/Navigation'
import Tools from './components/Tools'
// import Auth from './components/Auth' // Removed in replacement
import Login from './components/Login'
import Signup from './components/Signup'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/startups" element={<Startups />} />
            <Route path="/mentors" element={<Mentors />} />
            <Route path="/setup" element={<Setup />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/funding" element={<Funding />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/tools/*" element={<Tools />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
