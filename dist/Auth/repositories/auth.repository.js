"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../entities/user.entity");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
const exceptions_1 = require("@nestjs/common/exceptions");
let AuthRepository = class AuthRepository extends typeorm_2.Repository {
    constructor(dataSource, jwtSevice) {
        super(user_entity_1.User, dataSource.manager);
        this.dataSource = dataSource;
        this.jwtSevice = jwtSevice;
    }
    async signUp(authCredentialsDto) {
        const { user_id, email, name, nick_name, password, user_img, role } = authCredentialsDto;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.create({ user_id, email, name, nick_name, password: hashedPassword, user_img, role });
        try {
            await this.save(user);
        }
        catch (error) {
            if (error.code === '23505') {
                throw new exceptions_1.ConflictException('Existing username');
            }
            console.log('error', error);
        }
    }
    async signIn(authCredentialsDto) {
        const { user_id, password } = authCredentialsDto;
        const user = await this.findOne({ where: { user_id } });
        if (user && (await bcrypt.compare(password, user.password))) {
            const payload = { user_id };
            const accessToken = await this.jwtSevice.sign(payload);
            console.log('login success');
            return { accessToken };
        }
        else {
            throw new exceptions_1.UnauthorizedException('login failed');
        }
    }
    async signOut(authCredentialsDto) {
    }
};
AuthRepository = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        jwt_1.JwtService])
], AuthRepository);
exports.AuthRepository = AuthRepository;
//# sourceMappingURL=auth.repository.js.map