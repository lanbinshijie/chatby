import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class TokenGuardMiddleware implements NestMiddleware {
  // constructor(private readonly authService: AuthService) {}

  use(req: any, res: any, next: () => void) {
    // console.log(req.headers);
    
    next();
  }
}
