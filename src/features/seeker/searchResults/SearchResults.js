import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import Header from '../../../components/header/Header';
import JobCard from '../../../components/jobCard/jobCard';
import { SearchBar } from '../../../components/searchBar/SearchBar';
import { fetchProviders } from '../seekerSlice';
import { StyledSearchResults } from './SearchResultsStyle';

export const SearchResults = () => {
  const location = useLocation();
  const [searchResult, setSearchResult] = useState(location.state.detail);
  const [loadingSearchedJobs, setLoadingSearchedJobs] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProviders());
    setSearchResult(searchResult);
    if (searchResult.length !== 0 && searchResult[0]) {
      setLoadingSearchedJobs(false);
    }
  }, []);
  return (

    <StyledSearchResults>
      <Header/>
      <SearchBar/>
      {searchResult[0] && searchResult.length !== 0
      && <div className="dashboard-body">
        <div className="job-category-header">SEARCH RESULTS</div>
        <div className="applied-job-list">
          <Row className="card-row">
            {(!loadingSearchedJobs)
              && searchResult.map((job) => (
                <Col xs={12} md={6} lg={4} xl={3} key={job._id}>
                  <JobCard

                    job={job}
                    jobsApplied={searchResult}
                  />
                </Col>))}
          </Row>
        </div>
      </div>
      }
    </StyledSearchResults>

  );
};
