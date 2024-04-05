import instance from './base.js'

export const addNewBuy = (body) => instance.post('/addBuyHistory', body)

export const getBuyHistory = (id) => instance.get(`/getBuyHistory/${id}`)

export const deleteBuyHistory = (id) => instance.get(`/deleteHistory/${id}`)