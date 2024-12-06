// src/components/PostArticle.js
import React, { useState } from 'react';
import axios from 'axios';

const PostArticle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/posts', { title, content })
      .then((response) => {
        alert(response.data.message);
        setTitle('');
        setContent('');
      })
      .catch((error) => {
        console.error('Error posting article:', error);
      });
  };

  return (
    <div className='my-6'>
      <h2 className='text-2xl font-semibold'>
        Post an Article about Ocean Pollution
      </h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input
          type='text'
          placeholder='Article Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder='Write your article here...'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type='submit' colorScheme='teal'>
          Post Article
        </button>
      </form>
    </div>
  );
};

export default PostArticle;
