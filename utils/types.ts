import { Timestamp } from 'firebase/firestore';

export type PostType = {
  id: string;
  image: string;
  profilePic: string;
  text: string;
  timestamp: Timestamp;
  username: string;
};

export type CommentType = {
  id: string;
  username: string;
  profilePic: string;
  comment: string;
  image?: string;
  timestamp: Timestamp;
};
