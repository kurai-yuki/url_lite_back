import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreateShortLinkResponseDto {
  @Expose()
  id: string;

  @Expose()
  originalLink: string;

  @Expose()
  shortLink: string;
}
