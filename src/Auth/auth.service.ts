import { Injectable } from '@nestjs/common';
import { AuthRepository } from './repositories/auth.repository'
import { AuthCredentialsDto } from '../dto/auth-credential.dto';


@Injectable()
export class AuthService {
    constructor(
        private userRepository : AuthRepository,
    ) {}

    async signUp(authCredentialsDto : AuthCredentialsDto) : Promise<void> {
        return this.userRepository.signUp(authCredentialsDto);
    }

    async signIn(authCredentialsDto : AuthCredentialsDto) : Promise<{accessToken : string}> {
        return this.userRepository.signIn(authCredentialsDto);
    }

    async signOut(authCredentialsDto : AuthCredentialsDto) : Promise<void> {
        return this.userRepository.signOut(authCredentialsDto);
    }
}
