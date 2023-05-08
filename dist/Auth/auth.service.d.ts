import { AuthRepository } from './repositories/auth.repository';
import { AuthCredentialsDto } from '../dto/auth-credential.dto';
export declare class AuthService {
    private userRepository;
    constructor(userRepository: AuthRepository);
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    signIn(authCredentialsDto: AuthCredentialsDto): Promise<{
        accessToken: string;
    }>;
    signOut(authCredentialsDto: AuthCredentialsDto): Promise<void>;
}
