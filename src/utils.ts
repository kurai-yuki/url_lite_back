import { EnvConfigService } from '@/configs/env-config.service';

export function generateRandomLinkId(): string {
  const linkCharLength = EnvConfigService.getNumber('LINK_LENGTH') ?? 3;
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomId = '';

  for (let i = 0; i < linkCharLength; i++) {
    const index = Math.floor(Math.random() * chars.length);
    const randomChar = chars.charAt(index);

    randomId += randomChar;
  }

  return randomId;
}
