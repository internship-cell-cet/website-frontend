import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';

import { Col, Row } from 'react-bootstrap';
import addIcon from '../../../assets/images/addIcon.png';
import Header from '../../../components/header/Header';
import JobCard from '../../../components/jobCard/jobCard';
import { providedJobs } from '../providerSlice';
import { StyledProviderDashboard } from './ProviderDashboardStyle';
import { user } from '../../user/userSelectors';

const ProviderDashboard = () => {
  const [jobsProvided, setJobsProvided] = useState(['no Job']);
  const [loading, setLoading] = useState(true);

  const currentUser = useSelector(user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(providedJobs()).then((result) => {
      setJobsProvided(result.payload);
      setLoading(false);
    });
  }, []);
  const handleClick = () => {
    dispatch(push('/provider/create'));
  };
  return (
    <StyledProviderDashboard>
      <Header />

      <div className="dashboard-body">
        <Row>
          <Col className="provider-details">
            <div className="company-description-header">
              Description
            </div>
            <div className="company-description-content">
              {currentUser.description}
            </div>
          </Col>
          <Col className="provider-details-image">
            <img className="provider-image" src={currentUser.image} />
          </Col>
        </Row>
      </div>

      {jobsProvided[0] !== 'no Job' && jobsProvided.length !== 0
        && <div className="dashboard-body">
          <div className="job-category-header">
            <span>CREATED JOBS</span>
            <span>
              <img className="add-icon" src={addIcon} onClick={handleClick}/>
            </span>
          </div>
          <div className="provided-job-list">
            <Row className="card-row">
              {(!loading)
              && jobsProvided.map((job) => <Col xs={12} md={6} lg={4} xl={3} key={job._id}>
                <JobCard
                  job={job}
                  jobsApplied={jobsProvided}
                /></Col>)}
            </Row>
          </div>
        </div>
      }

      {jobsProvided.length === 0
        && <div className="dashboard-body">
          <div className="job-category-header">
            <span>CREATED JOBS</span>
            <span>
              <img className="add-icon" src={addIcon} onClick={handleClick}/>
            </span>
          </div>
          <div className="jobs-not-created">
            <span className="not-created-text">
              You have not created any jobs yet!
            </span>
          </div>
        </div>
      }

    </StyledProviderDashboard>
  );
};
export default ProviderDashboard;
