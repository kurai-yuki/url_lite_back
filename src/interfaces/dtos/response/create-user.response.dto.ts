import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreateUserResponseDto {
  @Expose()
  id: string;

  @Expose()
  username: string;
}
