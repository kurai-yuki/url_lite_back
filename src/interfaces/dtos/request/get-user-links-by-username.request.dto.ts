import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

@Exclude()
export class GetUserLinksByUsernameRequestDto {
  @IsString()
  @IsNotEmpty()
  @Expose()
  username: string;
}
