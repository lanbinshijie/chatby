import { Injectable } from '@nestjs/common';

@Injectable()
export class GirlService {
    getGirls() {
        return {
            code: 0,
            data: ['小美', '小红', '翠花'],
            msg: "请求女孩列表成功"
        }
    }

    addGirl(body: any) {
        let name: string = body.name;
        let age: number = body.age;
        return {
            code: 200,
            data: {id: 4, name: name, age:age},
            msg: "添加女孩成功"
        }
    }

    getGirlById(id: number) {
        let name: any = ""
        switch (id) {
            case 1:
                name = "小美"
                break;
            case 2:
                name = "小红"
                break;
            case 3:
                name = "翠花"
                break;
            default:
                name = "未知"
                break;
        }
                
        return {
            code: 200,
            data: {id: id, name: name, age: id*8},
            msg: "获取女孩成功"
        }
    }
}
