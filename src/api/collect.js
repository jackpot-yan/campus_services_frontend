import instance from './base.js'


export const addCollect = (payload) => instance.post('/addCollect', payload)

export const getCollect = (idCard) => instance.get(`/getCollect/${idCard}`)

export const removeCollect = (payload) => instance.post('/removeCollect', payload)
