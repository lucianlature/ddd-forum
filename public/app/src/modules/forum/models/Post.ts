
import { Comment } from "./Comment";

export type PostType = 'text' | 'link';

export interface Post {
  slug: string;
  title: string;
  createdAt: string | Date;
  postAuthor: string;
  numComments: number;
  points: number;
  type: PostType;
  text: string;
}


