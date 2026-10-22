export interface Link {
  id: string;
  originalLink: string;
  shortLink: string;
  createdBy: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}
