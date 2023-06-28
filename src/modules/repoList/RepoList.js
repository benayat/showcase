// src/RepoList.js
import React, { useEffect, useState } from 'react';
import Repo from '../repo/Repo';
import styles from './RepoList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileDownload, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faMediumM } from '@fortawesome/free-brands-svg-icons';

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
        // console.log(data.length);
        setTotalRepos(data.length);
      }).catch(error => {
        setError(error);
      });
  }, []);

  useEffect(() => {
    // console.log("current page is: "+currentPage);
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
      <div className={styles.linksContainer}>
        <a href="https://medium.com/@benaya7" target="_blank" rel="noopener noreferrer" title="Medium Profile">
          <FontAwesomeIcon icon={faMediumM} />
        </a>
        <a href="https://drive.google.com/uc?export=download&id=1-hZO43yHcpxf2AuPr0wllSEZGzUKRiJO" target="_blank" rel="noopener noreferrer" title='Download my CV'>
            <FontAwesomeIcon icon={faFileDownload} />
        </a>
        <a href="https://www.linkedin.com/in/benaya-trabelsi-11409257/" target="_blank" rel="noopener noreferrer" title="LinkedIn Profile">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
        <a href="mailto:benaya7@gmail.com" title="Email me">
          <FontAwesomeIcon icon={faEnvelope} />
        </a>
      </div>
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