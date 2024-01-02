import { IsIn, IsNumber, IsOptional } from 'class-validator'

export class PaginatePostDto {
  /*** 이전 마지막 데이터의 ID
   * 이 프로퍼티에 입력된 ID보다 높은 ID부터 값을 가져오기
   */
  @IsNumber()
  @IsOptional()
  where__id_more_than?: number

  /*** 정렬
   * createAt : 생성된 시간의 내림차/오름차 순으로 정렬
   */
  @IsIn(['ASC']) // 리스트에 있는 값들만 허용
  @IsOptional()
  // eslint-disable-next-line @typescript-eslint/prefer-as-const
  order__createAt: 'ASC' = 'ASC'

  /*** 갖고올 데이터 개수
   * 몇 개의 데이터를 응답으로 받을지
   */
  @IsNumber()
  @IsOptional()
  take: number = 20
}