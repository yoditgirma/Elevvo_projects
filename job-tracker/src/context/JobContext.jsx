import React, { createContext, useState, useEffect } from 'react'
import AddJob from '../pages/AddJob'

export const JobContext = createContext()


// load jobs from localstorage or start with empty array(no jobs)
export const JobProvider = ({ children }) => {
    const [jobs, setJobs] = useState(() => {
        const savedJobs = localStorage.getItem('jobs')
        return savedJobs ? JSON.parse(savedJobs) : []
    })

    // when jobs changed save to local storage
    useEffect(() => {
        localStorage.setItem('jobs', JSON.stringify(jobs))
    }, [jobs])

    // adding a new job
    const addJob = (job) => {
        const newJob = {
            ...job,
            id: Date.now(),
            appliedDate: job.appliedDate || new Date().toISOString().split('T')[0]
        }
        setJobs([...jobs, newJob])
    }

    // deleting job
    const deleteJob = (id) => {
        setJobs(jobs.filter(job => job.id !== id))
    }

    // updating a job
    const updateJob = (id, updatedJob) => {
        setJobs(jobs.map(job => job.id === id ? { ...job, ...updatedJob } : job))
    }


    // get one job by id
    const getJob = (id) => {
        return jobs.find(job => job.id === id)
    }

    const exportToJson = () => {
        const dataStr = JSON.stringify(jobs, null, 2)
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)

        const exportFileDefaultName = `job-applications-${new Date().toISOString().split('T')[0]}.json`

        const linkElement = document.createElement('a')
        linkElement.setAttribute('href', dataUri)
        linkElement.setAttribute('download', exportFileDefaultName)
        linkElement.click()
    }

    const importFromJson = (event) => {
        const file = event.target.files[0]
        if(!file) return

        const reader = new FileReader()
        reader.onload = (e) => {
            try {
                const importedJobs = JSON.parse(e.target.result)
                setJobs(importedJobs)
            } catch (error) {
                alert('Invalid JSON file')
            }
        }
        reader.readAsText(file)
    }

    return (
        <JobContext.Provider value={{ jobs, addJob, deleteJob, updateJob, getJob, exportToJson, importFromJson }}>{children}</JobContext.Provider>
    )

}

export default JobContext


