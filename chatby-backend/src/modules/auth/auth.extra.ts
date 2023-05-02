// 这是额外的业务逻辑
// 本文件是在auth.service.ts中引用的

// 函数命名格式：调用函数_功能
// 比如：login_afterSuccess就是登录成功后的操作

async function login_afterSuccess(repo, uid){
    // 设置用户最后登录时间
    await repo.update(uid, {lastLoginTime: new Date()})
}

export { login_afterSuccess }
