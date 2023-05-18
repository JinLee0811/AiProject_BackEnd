import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRepository } from '../repositories/user.repository';
import { hash, compare } from 'bcrypt';

import { LoginUserDto } from '../dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenService } from './token.service';
import { RefreshTokenRepository } from '../repositories/token.repository';
import { UpdateNicknameDto } from '../dto/update-nickname.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import * as bcrypt from 'bcrypt';
import { IsNull } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private refreshTokenRepository: RefreshTokenRepository,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly jwtService: JwtService,
  ) {}
  //--------------------------------------회원가입--------------------------------------
  async signUp(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, nickname } = createUserDto;

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
  //--------------------------------------로그인--------------------------------------
  async login(
    loginUserDto: LoginUserDto,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const { email, password } = loginUserDto;
    if (!email || !password) {
      throw new BadRequestException('이메일과 비밀번호를 모두 입력해주세요.');
    }
    // 이메일로 유저 조회, 비밀번호 확인
    const user = await this.userRepository.findOne({
      where: {
        email: loginUserDto.email,
        deleted_at: IsNull(),
      },
    });
    // 유저가 존재하지 않는 경우
    if (!user) {
      throw new UnauthorizedException('유저를 찾을 수 없습니다.');
    }

    const isPasswordValid = await compare(password, user.password);
    if (!user || !isPasswordValid) {
      throw new UnauthorizedException(
        '유저를 찾을 수 없거나 비밀번호가 일치하지 않습니다.',
      );
    }

    // Access Token 발급
    const payload = { sub: user.id, isAdmin: user.is_admin };
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
  //--------------------------------------AT 재발급--------------------------------------
  //acess token(AT) 만료시 새로운 AT발급
  async refreshAccessToken(refreshToken: string): Promise<string> {
    // Refresh Token 검증
    const refreshTokenEntity = await this.refreshTokenRepository.findOne({
      where: { refresh_token: refreshToken },
      relations: ['user'],
    });

    if (!refreshTokenEntity) {
      throw new UnauthorizedException('리프레시 토큰이 유효하지 않습니다.');
    }

    if (refreshTokenEntity.expire_at.getTime() < Date.now()) {
      throw new UnauthorizedException('리프레시 토큰이 만료되었습니다.');
    }
    // 사용자 조회
    const user = refreshTokenEntity.user;
    if (!user) {
      throw new UnauthorizedException('사용자를 찾을 수 없습니다.');
    }

    // 새로운 Access Token 발급
    const payload = { sub: user.id };

    const accessToken = this.jwtService.sign(payload);

    return accessToken;
  }
  //--------------------------------------로그아웃--------------------------------------
  async signOut(userId: number): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('사용자를 찾을 수 없습니다.');
    }
    const refreshToken = await this.refreshTokenRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!refreshToken) {
      throw new UnauthorizedException('리프레시 토큰이 유효하지 않습니다.');
    }

    await this.refreshTokenRepository.remove(refreshToken);

    return { message: '로그아웃되었습니다.' };
  }

  //--------------------------------------나의 정보 조회--------------------------------------
  async getUserById(userId: number) {
    const query = this.userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.nickname', 'user.email', 'user.is_admin'])
      .where('user.id = :userId', { userId });

    return await query.getOne();
  }
  //--------------------------------------나의 정보 수정--------------------------------------
  //비밀번호 수정
  async updatePassword(userId: number, updatePasswordDto: UpdatePasswordDto) {
    const { password, passwordConfirm } = updatePasswordDto;
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (password !== passwordConfirm) {
      throw new BadRequestException(`비밀번호 값이 일치하지 않습니다.`);
    }

    const hashedPassword = await hash(password, 10);
    user.password = hashedPassword;

    return await this.userRepository.save(user);
  }

  //닉네임수정
  async updateUserNickname(
    userId: number,
    UpdateNicknameDto: UpdateNicknameDto,
  ) {
    const { nickname } = UpdateNicknameDto;
    const user = await this.userRepository.findOne({ where: { id: userId } });
    //닉네임 중복 체크
    const nickname_check = await this.userRepository.findOne({
      where: { nickname },
    });
    if (nickname_check) {
      throw new BadRequestException('사용중인 닉네임입니다.');
    }
    user.nickname = nickname;

    return await this.userRepository.save(user);
  }

  //--------------------------------------회원탈퇴--------------------------------------
  async deleteUser(userId: number, password: string): Promise<void> {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });

      if (!user) {
        throw new NotFoundException('해당 유저를 찾을 수 없습니다.');
      }

      const passwordMatches = await this.comparePasswords(
        password,
        user.password,
      );

      if (!passwordMatches) {
        throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
      }

      user.deleted_at = new Date();
      user.nickname = null;
      user.password = null; //탈퇴시
      await user.save();
    } catch (error) {
      throw new Error('회원 탈퇴에 실패했습니다. ' + error.message);
    }
  }
  //비밀번호 인증
  async comparePasswords(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    // return await bcrypt.compare(plainTextPassword, hashedPassword);
    const passwordMatches = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (typeof passwordMatches !== 'boolean') {
      throw new Error('잘못된 반환 값 (bcrypt.compare)');
    }

    return passwordMatches;
  }
}
