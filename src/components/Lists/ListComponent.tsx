import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import './ListComponent.css'; // Import the CSS file for component-specific styles

import { Link } from 'react-router-dom';

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

interface ListComponentProps {
  endpoint: string;
  title: string;
}

const ListComponent: React.FC<ListComponentProps> = ({ endpoint, title }) => {
  const [postData, setPostData] = useState<Post[]>([]);
  const [error, setError] = useState<string | any>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        console.log('data', data);
        if (!Array.isArray(data.posts)) {
          throw new Error('Invalid data format');
        }
        setPostData(data.posts);
      } catch (error:any ) {
        setError(error.message);
      }
    };

    fetchData();
  }, [endpoint]);

  if (error) {
    return <p>An error occurred: {error}</p>;
  }

  const filteredPosts = selectedCategory
    ? postData.filter((post) =>
        post.categories.some((category) => category.id === selectedCategory)
      )
    : postData;

  const categories = Array.from(
    new Set(postData.flatMap((post) => post.categories))
  );

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1); // Reset to the first page when the category is changed
  };

  // Pagination
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1 className="post-title">{title}</h1>
      <div>
        <label htmlFor="category-filter">Filter by Category  <select
          id="category-filter"
          className="category-filter"
          value={selectedCategory || ''}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select></label>
       
      </div>
      <ul className="post-list">
        {currentPosts.map((post) => (
          <li key={post.id} className="post-item">
            <div className="post-item-content">
              <div className="post-item-image">
                <img src={post.author.avatar} alt={post.author.name} />
              </div>
              <div className="post-item-details">
                <h2>{post.title}</h2>
                <p  className="post-item-date">{new Date(post.publishDate).toLocaleString()}</p>
                <p>Author: {post.author.name}</p>
                <p>{post.summary}</p>
                <ul className="category-list">
                  {post.categories.map((category) => (
                    <li key={category.id}>{category.name}</li>
                  ))}
                </ul>
              </div>
            </div>
            <hr />
            <button
              className="details-btn"
              onClick={() => history.push(`/detail/${post.id}`)}
            >
              View Details
            </button>
          </li>
        ))}
      </ul>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={currentPage === index + 1 ? 'active' : ''}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ListComponent;
