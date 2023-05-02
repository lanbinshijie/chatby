// 可以使用class-validator进行验证

import { IsIn, IsNotEmpty } from "class-validator";

export class DeviceDto {
    @IsIn(["PC", "IOS", "Android", "Web", "Other"])
    deviceType: string; // PC IOS Android Web

    // 非空
    @IsNotEmpty()
    deviceId: string; // 设备唯一标识（用Localstorage存储）

    @IsNotEmpty()
    ip: string; // IP地址，格式为：xxx.xxx.xxx.xxx
}

export class AuthRegisteryDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    nickname: string;
}

export class AuthLoginDto {
    @IsNotEmpty()
    username: string;
    
    @IsNotEmpty()
    password: string;
    
    @IsNotEmpty()
    device: DeviceDto;
}

