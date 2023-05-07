import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { hash, compare } from 'bcrypt';

import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenService } from './token.service';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    @Inject(RefreshTokenService)
    private readonly refreshTokenService: RefreshTokenService,
    private readonly jwtService: JwtService,
  ) {}
  //회원가입
  async signUp(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, nickname } = createUserDto;

    // email 중복 체크
    const email_check = await this.userRepository.findOne({ where: { email } });
    if (email_check) {
      throw new BadRequestException('이미 가입된 이메일입니다.');
    }
    //닉네임 중복 체크
    const nickname_check = await this.userRepository.findOne({
      where: { nickname },
    });
    if (nickname_check) {
      throw new BadRequestException('사용중인 닉네임입니다.');
    }
    // 비밀번호 검증
    if (password !== createUserDto.passwordConfirm) {
      throw new BadRequestException('비밀번호 값이 일치하지 않습니다.');
    }

    // 비밀번호 암호화
    const hashedPassword = await hash(password, 10);

    // 회원가입
    const newUser = new User();
    newUser.email = email;
    newUser.password = hashedPassword;
    newUser.nickname = nickname;
    newUser.is_admin = false;

    try {
      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new InternalServerErrorException('회원가입 실패');
    }
  }
  //로그인
  async login(
    loginUserDto: LoginUserDto,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const { email, password } = loginUserDto;
    // 이메일로 유저 조회, 비밀번호 확인
    const user = await this.userRepository.findOne({
      where: {
        email: loginUserDto.email,
      },
    });

    const isPasswordValid = await compare(password, user.password);
    if (!user || !isPasswordValid) {
      throw new Error('유저를 찾을 수 없거나 비밀번호가 일치하지 않습니다.');
    }

    // Access Token 발급
    const payload = { sub: user.id };
    const access_token = this.jwtService.sign(payload);

    // Refresh Token 생성 및 저장
    const refresh_token = await this.refreshTokenService.createRefreshToken(
      user,
    );

    // Access Token과 Refresh Token 반환
    return {
      access_token,
      refresh_token: refresh_token.refresh_token,
    };
  }

  //acess token(AT) 만료시 새로운 AT발급
  async refreshAccessToken(refreshToken: string): Promise<string> {
    // Refresh Token 검증
    const decodedToken = this.jwtService.verify(refreshToken);
    const userId = decodedToken.sub;

    // 사용자 조회
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new UnauthorizedException('사용자를 찾을 수 없습니다.');
    }

    // 새로운 Access Token 발급
    const payload = { sub: user.id };

    const accessToken = this.jwtService.sign(payload);

    return accessToken;
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && (await compare(password, user.password))) {
      // password 필드를 제외한 user 객체 전체를 반환합니다.
      const { password, ...result } = user;
      return user;
    }
    return null;
  }
}
