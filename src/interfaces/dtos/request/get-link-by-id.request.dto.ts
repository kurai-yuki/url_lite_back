import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

@Exclude()
export class GetLinkByIdRequestDto {
  @IsString()
  @IsNotEmpty()
  @Expose()
  id: string;
}
