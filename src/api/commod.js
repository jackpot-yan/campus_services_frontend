import instance from './base.js'


export const addCommod = (param) => instance.post('/addCommod', param)

export const getSell = (idCard) => instance.get(`/getSell/${idCard}`)

export const getAllSell = () => instance.get('/getAllSell')

export const changeSell = (body) => instance.post('/changeSell', body)

export const writeBase = (body) => instance.post('/writeBaseCommod', body)

export const getHistoryData = (body) => instance.post('/getHistoryData', body)

export const getHomeData = () => instance.get('/getHomeData')
