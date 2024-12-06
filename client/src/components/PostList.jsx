// src/components/PostList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHeart, FaFire, FaExclamationTriangle } from 'react-icons/fa';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/posts')
      .then((response) => setPosts(response.data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  const handleReact = (id, emoji) => {
    axios
      .post(`http://localhost:5000/posts/${id}/reactions`, { emoji })
      .then((response) => alert(response.data.message))
      .catch((error) => console.error('Error reacting:', error));
  };

  return (
    <div className='my-6'>
      <h2 className='text-2xl font-semibold'>Posts about Ocean Pollution</h2>
      {posts.map((post) => (
        <div key={post.id} p={5} borderWidth={1} borderRadius='lg' my={4}>
          <h3 className='text-xl font-bold'>{post.title}</h3>
          <p className='my-3'>{post.content}</p>
          <p>Reactions: {post.emoji_reactions}</p>
          <div className='flex space-x-3'>
            <button onClick={() => handleReact(post.id, '❤️')}>
              <FaHeart />
            </button>
            <button onClick={() => handleReact(post.id, '🔥')}>
              <FaFire />
            </button>
            <button onClick={() => handleReact(post.id, '😱')}>
              <FaExclamationTriangle />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
