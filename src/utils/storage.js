const setSession = (key, value) => sessionStorage.setItem(key, JSON.stringify(value))
const getSession = (key) => JSON.parse(sessionStorage.getItem(key))
const removeSession = (key) => sessionStorage.removeItem(key)
const isExistSession = (key) => sessionStorage.getItem(key) !== null

export const SessionStore = {
   set: setSession,
   get: getSession,
   remove: removeSession,
   isExits: isExistSession
}