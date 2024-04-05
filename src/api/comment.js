import instance from './base.js'


export const addComment = (payload) => instance.post('/addComment', payload)

export const getComment = (partId) => instance.get(`/getComment/${partId}`)

