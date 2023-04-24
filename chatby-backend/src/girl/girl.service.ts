import { Injectable } from '@nestjs/common';
import { Repository, Like } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Girl } from './entities/girl.entities'

@Injectable()
export class GirlService {
    constructor(@InjectRepository(Girl) private readonly girl: Repository<Girl>){}
    
    addGirl(){
        const data = new Girl()
        data.name = '黄黄'
        data.age = 33
        data.skill = '啊啊,技能'
        return this.girl.save(data)
    }

    delGirl(id: number) {
        return this.girl.delete(id)
    }

    updateGirl(id: number) {
        let data = new Girl()
        data.name = "王绿绿"
        data.age = 19
        return this.girl.update(id, data)
    }

    getAllGirls() {
        return this.girl.find();
    }

    getGirlByName(name: string) {
        return this.girl.find({
            where: {
                name: Like(`%${name}%`)
            }
        })
    }
}
