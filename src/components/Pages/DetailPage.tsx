import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DetailComponent from '../Detail/DetailComponent';

import translations from '../../common/translations/translations';

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

const DetailPage: React.FC = () => {
  const { appTitle, postListTitle, footerText } = translations.en;

  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = await response.json();
        setPost(data.post);
      } catch (error:any) {
        setError(error.message);
      }
    };

    fetchPost();
  }, [id]);

  if (error) {
    return <p>An error occurred: {error}</p>;
  }

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="app-title">{appTitle}</h1>
      </header>
      <main className="main-content">
        <DetailComponent post={post} />
      </main>
      <footer className="footer">
        <p>{footerText}</p>
      </footer>
    </div>
  );
};

export default DetailPage;
