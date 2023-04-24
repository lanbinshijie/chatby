import { Module, Global, DynamicModule } from "@nestjs/common";

@Global()
@Module({
    providers: [{
        provide: "Config",
        useValue: {
            shopName: "Lanbin的小窝"
        }
    }],
    exports: [{
        provide: "Config",
        useValue: {
            shopName: "Lanbin的小窝"
        }
    }]
})

@Global()
@Module({})
export class ConfigModule {
    static forRoot(option: string) :DynamicModule {
        return {
            module: ConfigModule,
            providers: [{
                provide: "Config",
                useValue: {
                    shopName: "Lanbin的小窝"+option
                }
            }],
            exports: [{
                provide: "Config",
                useValue: {
                    shopName: "Lanbin的小窝"+option
                }
            }]
        }
    }
}


