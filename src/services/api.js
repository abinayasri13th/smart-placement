import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  headers: { 'Content-Type': 'application/json' }
})

export const registerUser = (data) => api.post('/auth/register', data)
export const loginUser = (data) => api.post('/auth/login', data)
export const analyzeATS = (resume_text, company) => api.post('/ats/analyze', { resume_text, company })
export const predictPlacement = (data) => api.post('/prediction/placement', data)
export const predictSalary = (data) => api.post('/prediction/salary', data)
export const getCompanyRecommendations = (skills, cgpa) => api.post('/company/recommend', { skills, cgpa })
export const analyzeSkillGap = (skills, company) => api.post('/skills/analyze', { skills, company })
export const sendChatMessage = (message) => api.post('/chatbot/message', { message })