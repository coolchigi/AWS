export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  coverImage?: string;
  // Posts that belong to a series show inside that series' card instead of on their own
  series?: string;
}

export interface Post extends PostMeta {
  content: string;
}
