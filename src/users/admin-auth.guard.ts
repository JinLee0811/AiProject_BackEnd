import {ExecutionContext, Injectable} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AdminAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        // 요청 객체에서 추출한 user 객체에 어드민 권한이 있는지 확인하고, 권한이 없는 경우 false를 반환
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        return user && user.isAdmin;
    }
}