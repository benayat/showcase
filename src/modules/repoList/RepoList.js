// src/RepoList.js

import React, { useEffect, useState } from 'react';
import Repo from '../repo/Repo';
import styles from './RepoList.module.css';
// import dotenv from 'dotenv';

const RepoList = () => {
//   dotenv.config();
  const [repos, setRepos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const reposPerPage = 5;
  console.log(process.env.REACT_APP_ACCESS_TOKEN);

  useEffect(() => {
    fetch(`https://api.github.com/user/repos?per_page=100`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`
      }
    })
      .then(response => response.json())
      .then(data => {
        const sortedRepos = data.sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));
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
      <p className={styles.intro}>I'm a backend developer with experience in a variety of technologies including Spring Boot, Python, Go, JavaScript, Docker, Kubernetes, and more. Here are some of my GitHub projects:</p>
      <p><a href="https://docs.google.com/document/d/1l1zTQJjsqzQjdjwy4k1IP6pW1-RYUatT/edit?usp=sharing&ouid=117831390792107525900&rtpof=true&sd=true" target="_blank" rel="noopener noreferrer">View my CV</a></p>
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
