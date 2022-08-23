import { PostType } from '../Feed/Feed';
import styles from './Post.module.css';

type Post = {
  post: PostType;
};

const Post = ({ post }: Post) => {
  return <div>Post</div>;
};

export default Post;
