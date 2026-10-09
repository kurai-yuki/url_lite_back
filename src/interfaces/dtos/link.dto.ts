import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class LinkDto {
  @Expose()
  id: string;

  @Expose()
  originalLink: string;

  @Expose()
  shortLink: string;
}
