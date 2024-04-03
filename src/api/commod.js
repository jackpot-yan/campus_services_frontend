import instance from './base.js'


export const addCommod = (param) => instance.post('/addCommod', param)

export const getSell = (idCard) => instance.get(`/getSell/${idCard}`)

export const getAllSell = () => instance.get('/getAllSell')

export const changeSell = (body) => instance.post('/changeSell', body)

