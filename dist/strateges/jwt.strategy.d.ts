import { AuthRepository } from '../Auth/repositories/auth.repository';
import { Strategy } from 'passport-jwt';
import { User } from '../entities/user.entity';
declare const JwtStategy_base: new (...args: any[]) => Strategy;
export declare class JwtStategy extends JwtStategy_base {
    private userRepository;
    constructor(userRepository: AuthRepository);
    validate(payload: any): Promise<User>;
}
export {};
