import instance from './base.js'


export const addPart = (body) => instance.post('/addPart', body)

export const getPart = (id) => instance.get(`/getPart/${id}`)

export const changePart = (body) => instance.post('/changePart', body)

export const getPartInfo = (idCard) => instance.get(`/getPartInfo/${idCard}`)

export const accept = (body) => instance.post('/accept', body)

export const getAccept = (idCard) => instance.get(`/getAcceptInfo/${idCard}`)
