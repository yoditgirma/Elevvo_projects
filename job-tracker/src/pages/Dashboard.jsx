import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { JobContext } from '../context/JobContext'

function Dashboard() {
  const { jobs, exportToJson, importFromJson } = useContext(JobContext)

  const statusColors = {
    Applied: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    Interviewing: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
    Offer: 'bg-green-500/20 text-green-400 border border-green-500/30',
    Rejected: 'bg-red-500/20 text-red-400 border border-red-500/30'
  }

  const statusIcons = {
    Applied: '📝',
    Interviewing: '🤝',
    Offer: '🎉',
    Rejected: '❌'
  }

  return (
    <div>
      {/* Header with actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Job Applications
          </h1>
          <p className="text-gray-400 mt-1">Track and manage your job search</p>
        </div>
        
        <div className="flex gap-3">
          {/* Export Button */}
          <button
            onClick={exportToJson}
            className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-200 flex items-center gap-2 border border-gray-700"
          >
            <span>📥</span> Export
          </button>
          
          {/* Import Button */}
          <label className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-200 flex items-center gap-2 border border-gray-700 cursor-pointer">
            <span>📤</span> Import
            <input
              type="file"
              accept=".json"
              onChange={importFromJson}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Jobs Grid */}
      {jobs.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📋</div>
          <h2 className="text-2xl font-semibold text-gray-300 mb-2">No jobs yet</h2>
          <p className="text-gray-500 mb-6">Start by adding your first job application</p>
          <Link 
            to="/add" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-indigo-500/20"
          >
            <span>+</span> Add Your First Job
          </Link>
        </div>
      ) : (
        <>
          {/* Stats Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <p className="text-gray-400 text-sm">Total</p>
              <p className="text-2xl font-bold text-white">{jobs.length}</p>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <p className="text-gray-400 text-sm">Applied</p>
              <p className="text-2xl font-bold text-blue-400">{jobs.filter(j => j.status === 'Applied').length}</p>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <p className="text-gray-400 text-sm">Interviewing</p>
              <p className="text-2xl font-bold text-yellow-400">{jobs.filter(j => j.status === 'Interviewing').length}</p>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <p className="text-gray-400 text-sm">Offers</p>
              <p className="text-2xl font-bold text-green-400">{jobs.filter(j => j.status === 'Offer').length}</p>
            </div>
          </div>

          {/* Jobs Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map(job => (
              <Link to={`/job/${job.id}`} key={job.id}>
                <div className="group bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-semibold text-white group-hover:text-indigo-400 transition-colors">
                        {job.company}
                      </h2>
                      <p className="text-gray-400 text-sm mt-1">{job.title}</p>
                    </div>
                    <span className="text-2xl">{statusIcons[job.status]}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className={`px-3 py-1 rounded-full text-sm ${statusColors[job.status]}`}>
                      {job.status}
                    </span>
                    <span className="text-sm text-gray-500">
                      📅 {job.appliedDate}
                    </span>
                  </div>

                  {job.notes && (
                    <p className="mt-4 text-sm text-gray-400 line-clamp-2 border-t border-gray-700 pt-4">
                      {job.notes}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Dashboard