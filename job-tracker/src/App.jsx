import React from 'react'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import {JobProvider} from './context/JobContext'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import AddJob from './pages/AddJob' 
import JobDetails from './pages/JobDetails'


function App() {
  return (
    
    <JobProvider>
      <BrowserRouter>
      <div className='min-h-screen bg-linear-to-br from-gray-900 via-[#0a0a0f] to-gray-900'> 
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/add' element={<AddJob/>}/>
            <Route path='/job/:id' element={<JobDetails/>}/>
          </Routes>
        </main>
      </div>
      </BrowserRouter>
    </JobProvider>
  )
}

export default App