// 创建一个异步宏任务
setTimeout(() => {
    console.log('MacroTask', 'aaa')
}, 0)

// 测试Promise.resolve().then()
// Promise.resolve() 会创建一个异步微任务
Promise.resolve('Success').then(res => {
    console.log('res', res)
})
Promise.resolve('Fail').then(res => {
    console.log('res', res)
})
// sync excute code
console.log('SUCESS')