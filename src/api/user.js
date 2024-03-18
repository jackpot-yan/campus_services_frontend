import instance from './base.js'

export const register = (register) => instance.post('/register', register)

export const login = (login) => instance.post('/login', login)
