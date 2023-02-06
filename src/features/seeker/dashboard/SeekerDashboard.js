import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";

import Header from "../../../components/header/Header";
import JobCard from "../../../components/jobCard/jobCard";
import { SearchBar } from "../../../components/searchBar/SearchBar";

import { appliedJobs, fetchProviders, recentJobs } from "../seekerSlice";
import { StyledSeekerDashboard } from "./SeekerDashboardStyle";

const SeekerDashboard = () => {
  const dispatch = useDispatch();
  const [lastJobs, setLastJobs] = useState([]);
  const [jobsApplied, setJobsApplied] = useState(["no Job"]);
  const [loadingRecentJobs, setLoadingRecentJobs] = useState(true);
  const [loadingAppliedJobs, setLoadingAppliedJobs] = useState(true);

  useEffect(() => {
    dispatch(fetchProviders());

    if (lastJobs.length !== 0) {
      setLoadingRecentJobs(false);
    } else {
      dispatch(recentJobs()).then((result) => {
        setLastJobs(result.payload);
        setLoadingRecentJobs(false);
      });
    }

    console.log(jobsApplied);
    if (jobsApplied.length !== 1 && jobsApplied[0] === "no Job") {
      setLoadingAppliedJobs(false);
    } else {
      // TEMP(commented)
      // dispatch(appliedJobs()).then((result) => {
      //   setJobsApplied(result.payload);
      //   setLoadingAppliedJobs(false);
      // });
    }
  }, []);

  return (
    <StyledSeekerDashboard>
      <Header />
      <SearchBar />

      {jobsApplied[0] !== "no Job" && jobsApplied.length !== 0 && (
        <div className="dashboard-body">
          <div className="job-category-header">APPLIED JOBS</div>
          <div className="applied-job-list">
            <Row className="card-row">
              {!loadingAppliedJobs &&
                jobsApplied.map((job) => (
                  <Col xs={12} md={6} lg={4} xl={3} key={job._id}>
                    <JobCard job={job} jobsApplied={jobsApplied} />
                  </Col>
                ))}
            </Row>
          </div>
        </div>
      )}

      {lastJobs.length !== 0 && (
        <div className="dashboard-body">
          <div className="job-category-header">RECENTLY ADDED JOBS</div>
          <div className="recent-job-list">
            <Row className="card-row">
              {!loadingRecentJobs &&
                lastJobs.map((job) => (
                  <Col xs={12} md={6} lg={4} xl={3} key={job._id}>
                    <JobCard job={job} jobsApplied={jobsApplied} />
                  </Col>
                ))}
            </Row>
          </div>
        </div>
      )}
    </StyledSeekerDashboard>
  );
};

export default SeekerDashboard;
