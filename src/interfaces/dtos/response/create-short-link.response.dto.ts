import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreateShortLinkResponseDto {
  @Expose()
  originalLink: string;

  @Expose()
  shortLink: string;
}
