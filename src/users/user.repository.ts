import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  // getUserById: id로 user 찾기
  async getUserById(userId:number) {
    return this.findOne({where: {id: userId}})
  }

}
