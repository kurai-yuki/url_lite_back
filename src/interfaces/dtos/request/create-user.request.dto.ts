import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

@Exclude()
export class CreateUserRequestDto {
  @IsString()
  @IsNotEmpty()
  @Expose()
  username: string;
}
