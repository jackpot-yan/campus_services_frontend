import instance from './base.js'

export const addReport = (payload) => instance.post('/addReport', payload)

export const getReport = () => instance.get('/getReport')

export const closeReport = (payload) => instance.post('/closeReport', payload)

export const getUserReport = (idCard) => instance.get(`/getUserReport/${idCard}`)
