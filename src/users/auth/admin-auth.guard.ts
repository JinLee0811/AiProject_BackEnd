import {ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AdminAuthGuard extends AuthGuard('jwt') {
    async canActivate(context: ExecutionContext) {
        const canActivate = await super.canActivate(context); // AuthGuard의 canActivate 함수를 먼저 실행
        if (!canActivate) {
            return false;
        }
        // 요청 객체에서 추출한 user 객체에 어드민 권한이 있는지 확인하고, 권한이 없는 경우 false를 반환
        const request = await context.switchToHttp().getRequest();
        const user = request.user;
        if (!user) {
            throw new UnauthorizedException();
        }

        return user && user.is_admin

    }
}