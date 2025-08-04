import { DivideIcon as LucideIcon } from 'lucide-react';

export interface CardInterface {
  id: string | number;
  title: string;
  description: string;
  imageUrl: string;
  icon: typeof LucideIcon;
  route:string;
  tags?: string[];
  link?: string;
  agent_code: string;
}