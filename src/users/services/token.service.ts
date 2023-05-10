import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshToken } from '../entities/token.entity';
import { User } from '../entities/user.entity';
import * as crypto from 'crypto';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  async createRefreshToken(
    user: User,
  ): Promise<{ refresh_token: string; expire_at: Date }> {
    // Refresh Token 생성
    // const refresh_token =
    //   crypto.randomBytes(32).toString('hex') +
    //   crypto.randomBytes(32).toString('ascii');
    //---------------------------------------------------

    // Refresh Token 생성
    const generateRandomString = (length: number): string => {
      const buffer = crypto.randomBytes(length);
      const randomString = buffer.toString('hex');
      const specialChars = '!@#$%^&*()_+-={}[]';
      //randomString 문자열을 받아서 새로운 배열 생성
      let mixedString = Array.from(randomString)
        // 50%의 확률로 대소문자를 변경
        .map((char) =>
          Math.random() < 0.5 ? char.toLowerCase() : char.toUpperCase(),
        )
        .join('');
      const numSpecialChars = Math.floor(Math.random() * 10) + 1; //0에서 10 정수 반환
      //Math.random() 0 이상 1 미만의 랜덤한 실수를 반환, 특수문자 삽입
      //Math.floor() 소수점 아래를 버리고 0에서 9 사이의 정수를 반환

      for (let i = 0; i < numSpecialChars; i++) {
        const randomIndex = Math.floor(Math.random() * specialChars.length);

        const randomPosition = Math.floor(
          Math.random() * (mixedString.length + 1), //문자열 길이
        ); // 문자열 중간에 랜덤하게 삽입

        mixedString =
          mixedString.slice(0, randomPosition) +
          //mixedString의 첫 인덱스부터 randomPosition 직전까지의 문자열
          specialChars[randomIndex] +
          //randomIndex 로 얻어낸 특수문자
          mixedString.slice(randomPosition);
        //randomPosition 인덱스부터 끝까지의 문자열
      }
      return mixedString;
    };

    const refresh_token = generateRandomString(32); //길이 32

    // Refresh Token 저장
    const refreshTokenEntity = new RefreshToken();
    refreshTokenEntity.user = user;
    refreshTokenEntity.refresh_token = refresh_token;

    const expiresIn = 60 * 60 * 24 * 7; // 7일
    refreshTokenEntity.expire_at = new Date(Date.now() + expiresIn * 1000);
    await this.refreshTokenRepository.save(refreshTokenEntity);

    return { refresh_token, expire_at: refreshTokenEntity.expire_at };
  }
}
