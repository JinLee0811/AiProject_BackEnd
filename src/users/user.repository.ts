import { User } from './user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { where } from '@tensorflow/tfjs-node';
import { DataSource, IsNull, Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async getAllUsers(): Promise<User[]> {
    return await this.find({
      where: { deleted_at: IsNull() },
    }); //삭제되지 않은 유저만 조회
  }

  async deleteUser(userId: number): Promise<void> {
    const user = await this.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('해당 유저를 찾을 수 없습니다.');
    }
    user.deleted_at = new Date();
    await user.save();
    // await this.remove(user); 유저 완전 삭제(hard-delete)
  }
}
