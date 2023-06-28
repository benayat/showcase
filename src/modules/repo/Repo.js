// src/Repo.js

import React from 'react';
import styles from './Repo.module.css';

const Repo = ({ repo }) => (
    <div className={styles.repo}>
      <h2><a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a></h2>
      <p>{repo.description}</p>
      {repo.homepage && <a href='link to medium article}'>{repo.homepage}</a>}
      <p>Language: {repo.language}</p>
      {repo.stargazers_count>0 && <p>Stars: {repo.stargazers_count}</p>}
      {repo.watchers_count>0 && <p>Watchers: {repo.watchers_count}</p>}
    </div>
  );
  
  export default Repo;
