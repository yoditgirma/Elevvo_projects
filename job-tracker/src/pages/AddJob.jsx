import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { JobContext } from '../context/JobContext'

function AddJob() {
  const navigate = useNavigate()
  const { addJob } = useContext(JobContext)
  
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    status: 'Applied',
    appliedDate: new Date().toISOString().split('T')[0],
    notes: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addJob(formData)
    navigate('/')
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Add New Job
        </h1>
        <p className="text-gray-400 mt-1">Fill in the details of your job application</p>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-gray-300 text-sm font-medium">
              Company Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              placeholder="e.g., Google, Microsoft, etc."
              className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-300 text-sm font-medium">
              Job Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g., Frontend Developer"
              className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-300 text-sm font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            >
              <option value="Applied">📝 Applied</option>
              <option value="Interviewing">🤝 Interviewing</option>
              <option value="Offer">🎉 Offer</option>
              <option value="Rejected">❌ Rejected</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-300 text-sm font-medium">Application Date</label>
            <input
              type="date"
              name="appliedDate"
              value={formData.appliedDate}
              onChange={handleChange}
              className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
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
            placeholder="Add any notes about the application, interview dates, contacts, etc."
            className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          ></textarea>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            type="submit"
            className="flex-1 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg shadow-indigo-500/20"
          >
            💾 Save Job
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-200 border border-gray-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddJob