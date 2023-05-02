import fetch from "../api/axios";
import { UserAuthDeviceDto } from "../dtos/login.dto";

export async function TgetDevice(): Promise<UserAuthDeviceDto> {
    // 获取设备类型
    let deviceType = "Web";
    // 获取设备唯一标识
    let deviceId: string | null = localStorage.getItem("deviceId");
    // 获取IP地址
    let ip = await get_ip();
    const device: UserAuthDeviceDto = {
        deviceType: deviceType,
        deviceId: deviceId!,
        ip: ip,
    }
    return device;
    
}

async function get_ip() {
    // 获取IP地址
    const res = fetch('/auth/ip', {
        method: "GET",
    })
    if((await res).data.code == 200) {
        return (await res).data.ip;
    } else {
        return "";
    }
}