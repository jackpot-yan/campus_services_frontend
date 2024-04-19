import instance from './base.js'

export const register = (register) => instance.post('/register', register)

export const login = (login) => instance.post('/login', login)

export const addHistroy = (historyInfo) => instance.post('/addHistory', historyInfo)

export const getBaseInfo = (idCard) => instance.get(`/users/${idCard}`)

export const createAdmin = () => instance.get('/createAdmin')

export const modifyUserInfo = (payload) => instance.post('/modifyInfo', payload)

export const getUserEachrts = () => instance.get('/getuserHistoryEcharts')
