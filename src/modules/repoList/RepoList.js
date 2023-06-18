// src/RepoList.js

import React, { useEffect, useState } from 'react';
import Repo from '../repo/Repo';
import styles from './RepoList.module.css';

const RepoList = () => {
  const [repos, setRepos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRepos, setTotalRepos] = useState(0);
  const [error, setError] = useState(null);
  const reposPerPage = 10;

  useEffect(() => {
    fetch(`https://api.github.com/user/repos?per_page=100`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.length);
        setTotalRepos(data.length);
      }).catch(error => {
        setError(error);
      });
  }, []);

  useEffect(() => {
    console.log("current page is: "+currentPage);
    fetch(`https://api.github.com/user/repos?sort=updated&page=${currentPage}&per_page=${reposPerPage}`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setRepos(data);
      }).catch(error => {
        setError(error);
      });
  }, [currentPage]);

  // Calculate number of pages
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalRepos / reposPerPage); i++) {
    pageNumbers.push(i);
  }

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  if(error) return <div className={styles.repoList}>Error: {error.message}</div>;
  return (
    <div className={styles.repoList}>
      <h1>Benaya Trabelsi</h1>
      <p className={styles.intro}>I'm a backend developer with experience in a variety of backend and devops technologies including Spring Boot, spring batch, Python, Go, JavaScript, Docker, Kubernetes, and more. Here are some of my GitHub projects:</p>
      <p><a href="https://docs.google.com/document/u/0/export?format=docx&id=1l1zTQJjsqzQjdjwy4k1IP6pW1-RYUatT&token=AC4w5VhVJ8L-QJIRoJtw8FvwL401e7lUyw%3A1687020960535&ouid=117831390792107525900&includes_info_params=true&usp=download&cros_files=false" target="_blank" rel="noopener noreferrer">Download my CV</a></p>
      <p><a href="https://www.linkedin.com/in/benaya-trabelsi-11409257/" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a></p>
      <p><a href="mailto:benaya7@gmail.com">email me</a></p>
      {repos.map(repo => <Repo key={repo.id} repo={repo} />)}
      <div className={styles.pagination}>
        {pageNumbers.map(number => (
          <button key={number} onClick={() => paginate(number)}>
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RepoList;