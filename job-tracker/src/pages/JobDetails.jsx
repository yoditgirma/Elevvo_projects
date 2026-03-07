import React, { useContext, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { JobContext } from '../context/JobContext'

function JobDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { jobs, updateJob, deleteJob } = useContext(JobContext)
  
  const job = jobs.find(j => j.id === Number(id))
  
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(job || {})

  if (!job) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold text-gray-300 mb-2">Job Not Found</h2>
        <p className="text-gray-500 mb-6">The job you're looking for doesn't exist</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
        >
          ← Back to Dashboard
        </button>
      </div>
    )
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    updateJob(job.id, formData)
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      deleteJob(job.id)
      navigate('/')
    }
  }

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
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          ← Back to Dashboard
        </button>
        <div className="flex gap-3">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-200 flex items-center gap-2 border border-gray-700"
          >
            {isEditing ? '✕ Cancel' : '✏️ Edit'}
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 hover:text-red-300 transition-all duration-200 border border-red-500/30 flex items-center gap-2"
          >
            🗑️ Delete
          </button>
        </div>
      </div>

      {isEditing ? (
        <form onSubmit={handleUpdate} className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Edit Job</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-gray-300 text-sm font-medium">Company</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-gray-300 text-sm font-medium">Job Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-gray-300 text-sm font-medium">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Applied">📝 Applied</option>
                <option value="Interviewing">🤝 Interviewing</option>
                <option value="Offer">🎉 Offer</option>
                <option value="Rejected">❌ Rejected</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-gray-300 text-sm font-medium">Applied Date</label>
              <input
                type="date"
                name="appliedDate"
                value={formData.appliedDate}
                onChange={handleChange}
                className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <label className="block text-gray-300 text-sm font-medium">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="5"
              className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
            ></textarea>
          </div>

          <div className="flex gap-4 mt-8">
            <button
              type="submit"
              className="flex-1 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
            >
              💾 Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-6 py-3 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-200 border border-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{statusIcons[job.status]}</span>
                <h1 className="text-3xl font-bold text-white">{job.company}</h1>
              </div>
              <p className="text-xl text-gray-400 ml-12">{job.title}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
              <p className="text-gray-400 text-sm mb-1">Status</p>
              <span className={`inline-block px-3 py-1 rounded-full text-sm ${statusColors[job.status]}`}>
                {job.status}
              </span>
            </div>
            <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
              <p className="text-gray-400 text-sm mb-1">Applied Date</p>
              <p className="text-white">📅 {job.appliedDate}</p>
            </div>
          </div>

          {job.notes && (
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
              <p className="text-gray-400 text-sm mb-3">Notes</p>
              <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{job.notes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default JobDetails