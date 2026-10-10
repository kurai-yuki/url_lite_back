import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserLinkDto {
  @Expose()
  id: number;

  @Expose()
  linkId: string;

  @Expose()
  userId: number;
}
