import {Injectable, NotFoundException} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Solution } from "../entities/solution.entity";
import {UserProblem} from "../entities/user-problem.entity";
import {CreateUsersolutionDto} from "../dto/create-Usersolution.dto";

@Injectable()
export class UserProblemRepository extends Repository<UserProblem> {
    constructor(private dataSource: DataSource) {
        super(UserProblem, dataSource.createEntityManager());
    }

    // createSolutions: (마이페이지) 해결책 자장
    async  createUserSolution(userId:number, createUserSolutionDto: CreateUsersolutionDto) {
        // user_problem 테이블 저장
        const {solution_id, image, resolved_at, probability} = createUserSolutionDto
        const userSolution = await this.create({
            user_id: userId,
            solution_id,
            image,
            resolved_at,
            probability
        })
        await this.save(userSolution)
        return userSolution
    }


    // getSolutions: (마이페이지) 해결책 조회
    async getUserSolutions(user_id:number) {
        // user_problem, solution 테이블 조인
        const userSolutions = await this.createQueryBuilder('userProblem')
            .leftJoinAndSelect("userProblem.solution", "solution")
            .where("userProblem.user_id = :user_id", {user_id})
            .select(['userProblem.id', 'userProblem.image', 'userProblem.created_at', 'userProblem.resolved_at', 'userProblem.probability', 'solution'])
            .getMany()

        return userSolutions

    }

    // getSolutionById: (마이페이지) 해결책 상세 조회
    async getUserSolutionById(user_id: number, id: number) {
        const userSolution = await this.createQueryBuilder('userProblem')
            .leftJoinAndSelect("userProblem.solution", "solution")
            .where("userProblem.user_id = :user_id", {user_id})
            .andWhere("userProblem.id = :id", {id})
            .select(['userProblem.id', 'userProblem.image', 'userProblem.created_at', 'userProblem.resolved_at', 'userProblem.probability', 'solution'])
            .getOne()

        return userSolution
    }

    // deleteSolutionsById: (마이페이지) 해결책 삭제
    async deleteUserSolutionById(userSolutionId:number) {
        // user_problem 테이블
        const result = await this.delete({id: userSolutionId})
        if (result.affected === 0) {
            throw new NotFoundException((`Can't find user solution with Id ${userSolutionId}`))
        }
        return {"message" : "Success"}
    }


}
