
import { Injectable, NotFoundException } from "@nestjs/common";
import { DataSource, Repository } from 'typeorm';
import { Tonic } from "../entities/tonic.entity";
import { CreateTonicDto } from "../../admin/dto/create-tonic.dto";
import { UpdateTonicDto } from "../../admin/dto/update-tonic.dto";


@Injectable()
export class TonicRepository extends Repository<Tonic> {
  constructor(private dataSource: DataSource) {
    super(Tonic, dataSource.createEntityManager());
  }
  // getTonics: 영양제 전체 조회
  async getTonics() {
    // tonic 테이블 조회
    const tonics = await this.createQueryBuilder('tonic')
        .leftJoinAndSelect('tonic.categories', 'category')   // 첫 번째 인자로는 조인할 엔티티의 프로퍼티 이름, 두 번째 인자로는 조인한 엔티티에 대한 별칭
        .getMany();
    return tonics
  }

  // getTonicById: 영양제 상세 조회
  async getTonicById(tonic_id: number) {
    const tonic = await this.createQueryBuilder('tonic')
        .leftJoinAndSelect("tonic.categories", "category")
        .where('tonic.id = :tonic_id', {tonic_id})
        .getOne()
    return tonic;
  }


  // getTonicsByCategory: 카테고리 별 영양제 조회
  async getTonicsByCategory(category_id: number) {
    const tonics = await this.createQueryBuilder('tonic')
        .leftJoinAndSelect('tonic.categories', 'category') // 첫 번째 인자로는 조인할 엔티티의 프로퍼티 이름, 두 번째 인자로는 조인한 엔티티에 대한 별칭
        .leftJoinAndSelect('tonic.tonicCategories', 'tonicCategory')
        .leftJoinAndSelect('tonicCategory.category', 'category2')
        .where('tonicCategory.tonicId = tonic.id')
        .andWhere('category2.id = :category_id', { category_id })
        .getMany();

    return tonics
  }

  // createTonic: 영양제 추가
  async createTonic(image, createTonicDto: CreateTonicDto) {
    const {name, description, short_description} = createTonicDto
    const tonic = this.create({
      name,
      description,
      short_description,
      image
    })
    await this.save(tonic)
    return tonic
  }


  // updateTonic: 영양제 수정
  async updateTonic(tonicId, tonicImg: string, updateTonicDto: UpdateTonicDto) {

    // 영양제 조회
    const tonic = await this.findOne({ where: { id: tonicId } })

    // 수정할 때 이미지 재첨부를 하지 않을 시 이미지 값이 들어오는지 안 들어오는지 확인하기
    const {name, description, short_description} = updateTonicDto

    tonic.name = name
    tonic.description = description
    tonic.short_description = short_description
    tonic.image = tonicImg

    await this.save(tonic)

    return tonic
  }


  // deleteTonic: 영양제 삭제
  async deleteTonic(tonicId) {
    const result = await this.delete({id: tonicId})
    if (result.affected === 0)  {
      throw new NotFoundException(`Can't find Tonic with id ${tonicId}`)
    }
    return {"message": "Success"}
  }

}
