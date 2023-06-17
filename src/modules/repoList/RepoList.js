// src/RepoList.js

import React, { useEffect, useState } from 'react';
import Repo from '../repo/Repo';
import styles from './RepoList.module.css';

const RepoList = () => {
  const [repos, setRepos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const reposPerPage = 5;
  useEffect(() => {
    console.log(process.env.REACT_APP_ACCESS_TOKEN);
    fetch(`https://api.github.com/user/repos?per_page=100`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`
      }
    })
      .then(response => response.json())
      .then(data => {
        const sortedRepos = data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        setRepos(sortedRepos);
      });
  }, []);

  // Get current repos
  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = repos.slice(indexOfFirstRepo, indexOfLastRepo);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className={styles.repoList}>
      <h1>Benaya Trabelsi</h1>
      <p className={styles.intro}>I'm a backend developer with experience in a variety of backend and devops technologies including Spring Boot, spring batch, Python, Go, JavaScript, Docker, Kubernetes, and more. Here are some of my GitHub projects:</p>
      <p><a href="https://docs.google.com/document/u/0/export?format=docx&id=1l1zTQJjsqzQjdjwy4k1IP6pW1-RYUatT&token=AC4w5VhVJ8L-QJIRoJtw8FvwL401e7lUyw%3A1687020960535&ouid=117831390792107525900&includes_info_params=true&usp=download&cros_files=false" target="_blank" rel="noopener noreferrer">Download my CV</a></p>
      <p><a href="https://www.linkedin.com/in/benaya-trabelsi-11409257/" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a></p>
      {currentRepos.map(repo => <Repo key={repo.id} repo={repo} />)}
      <div className={styles.pagination}>
        {[...Array(Math.ceil(repos.length / reposPerPage)).keys()].map(number => (
          <button key={number + 1} onClick={() => paginate(number + 1)}>
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RepoList;
