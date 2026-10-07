import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class getLinkByIdResponseDto {
  @Expose()
  id: string;

  @Expose()
  originalLink: string;
}
