export interface Preset {
  id: string;
  name: string;
  description?: string;
  category: string;
  thumbnail?: string;
  config: Record<string, unknown>;
  isDefault: boolean;
  isPublic: boolean;
  userId?: string;
  createdAt: Date;
  updatedAt: Date;
}
