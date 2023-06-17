// src/Repo.js

import React from 'react';
import styles from './Repo.module.css';

const Repo = ({ repo }) => (
    <div className={styles.repo}>
      <h2><a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a></h2>
      <p>{repo.description}</p>
      <p>Language: {repo.language}</p>
      <p>Stars: {repo.stargazers_count}</p>
    </div>
  );
  
  export default Repo;
