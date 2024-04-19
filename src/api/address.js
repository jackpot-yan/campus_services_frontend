import instance from './base.js'

export const addNewAddress = (addressInfo) => instance.post('/addNewAddress', addressInfo)

export const getAddress = (idCard) => instance.get(`/getAddress/${idCard}`)

export const getAddressEcharts = () => instance.get('/getAddressEcharts')
