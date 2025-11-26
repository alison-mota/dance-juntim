export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: 'fitness' | 'nutrition' | 'spiritual';
}

export interface BlogPost {
  id: number;
  title: string;
  date: string;
  image: string;
  excerpt: string;
}