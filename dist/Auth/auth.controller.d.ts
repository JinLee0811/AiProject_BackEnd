import { AuthCredentialsDto } from '../dto/auth-credential.dto';
import { AuthService } from './auth.service';
export declare class SignController {
    private authService;
    constructor(authService: AuthService);
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    signIn(authCredentialsDto: AuthCredentialsDto): Promise<{
        accessToken: string;
    }>;
    signOut(authCredentialsDto: AuthCredentialsDto): Promise<void>;
}
