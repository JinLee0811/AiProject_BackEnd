import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshToken } from './toeken.entity';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
    private readonly jwtService: JwtService,
  ) {}

  async createRefreshToken(
    user: User,
  ): Promise<{ refresh_token: string; expired_at: Date }> {
    // Refresh Token 생성
    const refresh_token = this.jwtService.sign(
      { sub: user.id },
      { expiresIn: '7d' },
    );
    // Refresh Token 저장
    const refreshToken = new RefreshToken();
    refreshToken.user = user;
    refreshToken.refresh_token = refresh_token;

    const expiresIn = 60 * 60 * 24 * 7; // 7일
    refreshToken.expired_at = new Date(Date.now() + expiresIn * 1000);
    await this.refreshTokenRepository.save(refreshToken);

    return { refresh_token, expired_at: refreshToken.expired_at };
  }
}
