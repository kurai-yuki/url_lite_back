import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

@Exclude()
export class getLinkByIdRequestDto {
  @IsString()
  @IsNotEmpty()
  @Expose()
  id: string;
}
