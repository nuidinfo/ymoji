// src/components/AIIntegration.js
import React, { useState } from 'react';
import axios from 'axios';

const AIIntegration = () => {
  const [content, setContent] = useState('');
  const [summary, setSummary] = useState('');

  const summarizeArticle = () => {
    axios
      .post('http://localhost:5000/summarize', { content })
      .then((response) => setSummary(response.data.summary))
      .catch((error) => console.error('Error summarizing:', error));
  };

  return (
    <div my={6}>
      <h2 className='text-2xl font-semibold'>
        AI Summary for Ocean Pollution Articles
      </h2>
      <textarea
        placeholder='Paste your article here'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className='my-4'
      />
      <button onClick={summarizeArticle} colorScheme='teal'>
        Summarize
      </button>
      {summary && (
        <div className='my-4'>
          <h3 className='font-semibold'>Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default AIIntegration;
