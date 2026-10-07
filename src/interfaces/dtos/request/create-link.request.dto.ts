import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

@Exclude()
export class CreateLinkRequestDto {
  @IsString()
  @IsNotEmpty()
  @Expose()
  longLink: string;
}
