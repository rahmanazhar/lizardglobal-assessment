import React from 'react';
import './DetailComponent.css';

interface Post {
  id: string;
  title: string;
  publishDate: string;
  author: {
    name: string;
    avatar: string;
  };
  summary: string;
  categories: {
    id: string;
    name: string;
  }[];
}

interface DetailComponentProps {
  post: Post;
}

const DetailComponent: React.FC<DetailComponentProps> = ({ post }) => {
  return (
    <div className="detail-container">
      <h3>{post.title}</h3>
      <p className="post-item-date">
        {new Date(post.publishDate).toLocaleString()}
      </p>
      <p>Author: {post.author.name}</p>
      <img src={post.author.avatar} alt={post.author.name} />
      <p>{post.summary}</p>
      <ul className="category-list">
        {post.categories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DetailComponent;
