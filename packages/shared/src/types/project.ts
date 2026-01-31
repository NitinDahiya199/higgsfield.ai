export interface Project {
  id: string;
  name: string;
  thumbnail?: string;
  userId: string;
  organizationId?: string;
  createdAt: Date;
  updatedAt: Date;
}
