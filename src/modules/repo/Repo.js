// src/Repo.js

import React from 'react';
import styles from './Repo.module.css';

const Repo = ({ repo }) => (
    <div className={styles.repo}>
      <h2><a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a></h2>
      <p>{repo.description}</p>
      {repo.homepage && <a href={repo.homepage} target="_blank" rel="noopener noreferrer" title='link to medium article'>Medium Article</a>}
      <p>Language: {repo.language}</p>
      {repo.topics.length>0 && <p>Topics: {repo.topics.join(', ')}</p>}
      {repo.stargazers_count>0 && <p>Stars: {repo.stargazers_count}</p>}
      {repo.watchers_count>0 && <p>Watchers: {repo.watchers_count}</p>}
    </div>
  );
  
  export default Repo;
