
export interface UserAuthDto {
    id: number;
    username: string;
    nickname?: string;
    password?: string;
    avatar: string;
    email: string;
    isBanned?: boolean;
    isVerifyMail?: boolean;
    role?: string;
    regTime?: string;
    lastLoginTime?: string;
}

export interface UserTokenDto {
    uid?: number;
    deviceId?: string;
    deviceType?: string;
    ip?: string;
    token: string;
    lastLoginTime?: string;
    expireTime?: string;
}

export interface UserAuthDeviceDto {
    deviceType: string; // PC IOS Android Web
    deviceId: string; // 设备唯一标识（用Localstorage存储）
    ip: string; // IP地址，格式为：xxx.xxx.xxx.xxx
}

export interface UserAuthIpDto {
    ip: string; 
}

// 大一点的DTO（如业务返回的原始数据）
export interface UserLoginRDto {
    /**
     * 用户登录返回的DTO
     * （名称中含有R的都是Axios请求返回的DTO）
     */
    token: UserTokenDto;
    user: UserAuthDto;
}
