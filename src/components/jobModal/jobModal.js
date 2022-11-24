import React, { useEffect, useState } from 'react';
import { Button, Col, Image, Modal, Row, Spinner, Tab, Tabs } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { selectSkills } from '../../features/common/skills/skillSelectors';
import { fetchApplicants } from '../../features/provider/providerSlice';
import { user } from '../../features/user/userSelectors';
import { applyJob } from '../../features/user/userSlice';
import ApplicantDetails from '../applicantDetails/ApplicantDetails';
import './modalStyle.css';

const JobModal = (job) => {
  const {
    _id, designation, description, location, salary, type,
    experience, requiredSkills, applicants, hired, selected,
  } = job.job.job;

  const appliedUsers = applicants.concat(hired, selected);
  const [appliedSeekers, setAppliedSeekers] = useState([]);
  const [selectedSeekers, setSelectedSeekers] = useState([]);
  const [hiredSeekers, setHiredSeekers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchApplicants(appliedUsers))
      .then((result) => {
        setAppliedSeekers((prevApplied) => [
          ...prevApplied,
          applicants.map((seekerId) => result.payload
            .find((seeker) => seeker.userTypeId === seekerId))]);

        setSelectedSeekers((prevSelected) => [
          ...prevSelected,
          selected.map((seekerId) => result.payload
            .find((seeker) => seeker.userTypeId === seekerId))]);

        setHiredSeekers((prevHired) => [
          ...prevHired,
          hired.map((seekerId) => result.payload
            .find((seeker) => seeker.userTypeId === seekerId))]);
      });
  }, []);

  const jobSkill = [];

  const currentUser = useSelector(user);
  const skills = useSelector(selectSkills);

  if (skills) {
    const required = requiredSkills
      .map((reqSkill) => skills
        .map((category) => category.skills
          .find((skill) => skill.skillCode === reqSkill)));

    required.map((skill) => skill.map((selectedSkill) => {
      if (selectedSkill) {
        jobSkill.push(selectedSkill.skillName);
      }
      return null;
    }));
  }
  const applyAction = () => {
    dispatch(applyJob({ jobId: _id }));
    window.location.reload();
  };

  return (
    <div>
      <Modal
        show={job.show}
        onHide={() => job.setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            <div className="modal-header-text">{designation}</div>
            {
              job.jobProvider ? <Image className="user-image" src={job.jobProvider.image} roundedCircle />
                : <Spinner animation="border" />
            }
          </Modal.Title>
        </Modal.Header>
        <Tabs
          defaultActiveKey="details"
          transition={false}
          id="noanim-tab-example"
          className="tabs"
        >
          <Tab eventKey="details" title="Details">
            <Modal.Body>
              {job.jobProvider && skills
                ? <div>
                  <Row >
                    <Col sm={12} md={6}>
                      <div className="job-details">
                        <span className="content-headers">Company &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; : </span>{job.jobProvider.firstName} {job.jobProvider.lastName}
                      </div>
                    </Col>
                    <Col>
                      <div className="job-details"><span className="content-headers">Location &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : </span>{location}</div>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12} md={6}>
                      <div className="job-details"><span className="content-headers">Salary &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : </span>₹{salary.minSalary} - ₹{salary.maxSalary}</div>
                    </Col>
                    <Col>
                      <div className="job-details"><span className="content-headers">Experience &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : </span>{experience.minYears} - {experience.maxYears} years</div>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12} md={6}>
                      <div className="job-details"><span className="content-headers">Job Type &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; : </span>{type}</div>
                    </Col>
                    <Col>
                      <div className="job-details"><span className="content-headers">Skills Required : </span>{jobSkill.map((reqSkill) => `${reqSkill}  `)}</div>
                    </Col>
                  </Row>
                  <div className="job-details"><div className="content-headers">Description : </div><div className="description">{description}</div></div>
                </div> : <Spinner animation="border" />}
            </Modal.Body>
          </Tab>
          { currentUser?.userType === 'provider'
            && <Tab eventKey="applicants" title="Applicants">
              <Modal.Body>
                {appliedSeekers[0] && appliedSeekers[0].map((applicant) => <ApplicantDetails
                  key={applicant._id}
                  applicant={applicant}
                  currentJobId={_id}
                  status="applied"
                />)}
              </Modal.Body>
            </Tab>
          }
          {currentUser?.userType === 'provider'
            && <Tab eventKey="selected" title="Selected">
              <Modal.Body>
                {selectedSeekers[0] && selectedSeekers[0].map((applicant) => <ApplicantDetails
                  key={applicant._id}
                  applicant={applicant}
                  currentJobId={_id}
                  status="selected"
                />)}
              </Modal.Body>
            </Tab>
          }
          {currentUser?.userType === 'provider'
            && <Tab eventKey="hired" title="Hired">
              <Modal.Body>
                {hiredSeekers[0] && hiredSeekers[0].map((applicant) => <ApplicantDetails
                  key={applicant._id}
                  applicant={applicant}
                  currentJobId={_id}
                  status="hired"
                />)}
              </Modal.Body>
            </Tab>
          }
        </Tabs>
        {
          currentUser?.userType === 'seeker'
            && !currentUser?.jobs.find((jobId) => jobId === _id)
            && <Modal.Footer>
              <Button variant="primary" onClick={applyAction}>
                Apply
              </Button>
            </Modal.Footer>
        }
      </Modal>
    </div>
  );
};

export default JobModal;
