
// 操作本地sessionStorage 数据
const KEY = 'UESR_INFO'

// 添加数据

export function setUser(userinfo){
    sessionStorage.setItem(KEY, JSON.stringify(userinfo || {}))
}

// 查询数据

export function getUser(){
   var str =  sessionStorage.getItem(KEY)
   return JSON.parse(str || '{}')
}

// 删除数据

export function removeUser () {
    sessionStorage.removeItem(KEY)
}