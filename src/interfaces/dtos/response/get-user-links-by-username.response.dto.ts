import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GetUserLinksByUsernameResponseDto {
  @Expose()
  id: string;

  @Expose()
  originalLink: string;

  @Expose()
  shortLink: string;
}
