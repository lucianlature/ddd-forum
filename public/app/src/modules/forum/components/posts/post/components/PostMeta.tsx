
import React from 'react'
import moment from 'moment';
import { Link } from "react-router-dom";
import { Post } from '../../../../models/Post'

interface PostMetaProps extends Post {
  includeLink?: boolean;
}

const PostMeta: React.FC<PostMetaProps> = (props) => (
  <div className="post-row-content">
    {props.includeLink === false ? '' : <Link to={`/discuss/${props.slug}`} className="title">"{props.title}"</Link> }
    <div className="post-row-meta">
      {moment(props.createdAt).fromNow()} | {`by `} <Link to={`/author/${props.postAuthor}`}>{props.postAuthor}</Link> | {`${props.numComments} comments`}
    </div>
  </div>
)

export default PostMeta;