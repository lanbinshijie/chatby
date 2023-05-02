
export function nameVerify(field: string): boolean {
    // 如果为空、空格、Tab直接返回false
    if (field === "" || field === " " || field === "\t") return false;
    // 满足条件：长度为5-20位，只能包含数字、字母和下划线
    let reg = /^[a-zA-Z0-9_]{5,20}$/;
    return reg.test(field);
}
