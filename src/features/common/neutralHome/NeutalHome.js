import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Header from '../../../components/header/Header';
import JobCard from '../../../components/jobCard/jobCard';
import { SearchBar } from '../../../components/searchBar/SearchBar';
import { fetchProviders, recentJobs } from '../../seeker/seekerSlice';
import { getSkills } from '../skills/skillSlice';
import { StyledNeutralHome } from './NeutralHomeStyles';

const NeutalHome = () => {
  const dispatch = useDispatch();
  const [lastJobs, setLastJobs] = useState([]);
  const [loadingRecentJobs, setLoadingRecentJobs] = useState(true);

  useEffect(() => {
    dispatch(getSkills());
    dispatch(fetchProviders());

    if (lastJobs.length !== 0) {
      setLoadingRecentJobs(false);
    } else {
      dispatch(recentJobs()).then((result) => {
        setLastJobs(result.payload);
        setLoadingRecentJobs(false);
      });
    }
  }, []);

  return (
    <StyledNeutralHome>
      <Header />
      <SearchBar />

      {lastJobs.length !== 0
      && <div className="dashboard-body">
        <div className="job-category-header">RECENTLY ADDED JOBS</div>
        <div className="recent-job-list">
          <Row className="card-row">
            {(!loadingRecentJobs)
            && lastJobs.map((job) => <Col xs={12} md={6} lg={4} xl={3} key={job._id}>
              <JobCard
                job={job}
                jobsApplied={[]}
              />
            </Col>)
            }
          </Row>
        </div>
      </div>
      }
    </StyledNeutralHome>
  );
};

export default NeutalHome;
