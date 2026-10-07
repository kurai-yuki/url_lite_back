import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

@Exclude()
export class getUserByUserNameRequestDto {
  @IsString()
  @IsNotEmpty()
  @Expose()
  username: string;
}
