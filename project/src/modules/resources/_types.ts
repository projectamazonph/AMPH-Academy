export type ResourceCategory = 'template' | 'checklist' | 'guide' | 'framework';

export interface ResourceMeta {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  filename: string;
  moduleNumber?: number;
  downloads: number;
  tags: string[];
}

export interface ResourceCardData {
  meta: ResourceMeta;
  downloadUrl: string;
}
