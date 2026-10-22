import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class LinkResponseDto {
  @Expose()
  id: string;

  @Expose()
  originalLink: string;

  @Expose()
  shortLink: string;

  @Expose()
  createdBy: number
}
