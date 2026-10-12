import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreateUserLinkRequestDto {
  @Expose()
  username: string;

  @Expose()
  linkId: string;
}
