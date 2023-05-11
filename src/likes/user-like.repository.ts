import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserLike } from './user-like.entity';

@Injectable()
export class UserLikeRepository extends Repository<UserLike> {
  constructor(private dataSource: DataSource) {
    super(UserLike, dataSource.createEntityManager());
  }
}
