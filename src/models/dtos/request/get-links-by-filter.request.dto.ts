import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GetLinksByFilterRequestDto {
  @Expose()
  userId: number;
}
