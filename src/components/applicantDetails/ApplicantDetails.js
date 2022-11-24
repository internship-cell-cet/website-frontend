import React from 'react';
import PropTypes from 'prop-types';
import { Button, Image } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { StyledApplicantDetails } from './ApplicantDetailsStyles';
import { selectApplicant, hireApplicant } from '../../features/provider/providerSlice';
import hiredLogo from '../../assets/images/hired.png';

const ApplicantDetails = ({ applicant, currentJobId, status }) => {
  const dispatch = useDispatch();

  const handleClick = (resume) => {
    let updatedResume = resume.substring(0, resume.length - 3);
    updatedResume += 'jpg';
    window.open(updatedResume, '_blank');
  };

  const handleSelect = (seekerId, jobId) => {
    const details = { seekerId, jobId };
    dispatch(selectApplicant(details));
    window.location.reload();
  };

  const handleHire = (seekerId, jobId) => {
    const details = { seekerId, jobId };
    dispatch(hireApplicant(details));
    window.location.reload();
  };

  return (
    <StyledApplicantDetails>
      <div className="applicant-detail">
        <div className="applicant-detail-image">
          <Image className="applicant-detail-image" src={applicant.image} roundedCircle />
        </div>
        <div className="applicant-detail-name">
          {applicant.firstName} {applicant.lastName}
        </div>
        <div className="applicant-detail-resume">
          <Button className="resume" onClick={() => handleClick(applicant.resume)}>Resume</Button>
        </div>
        { (status === 'applied' || status === 'selected')
          && <div className="applicant-detail-select">
            {status === 'applied'
              ? <Button onClick={() => handleSelect(applicant.userTypeId, currentJobId)}>
                  Select
              </Button>
              : <Button onClick={() => handleHire(applicant.userTypeId, currentJobId)}>
                Hire
              </Button>
            }
          </div>
        }
        { (status === 'hired')
          && <div className="applicant-detail-select">
            <Image className="hired-logo" src={hiredLogo}></Image>
          </div>
        }

      </div>
    </StyledApplicantDetails>
  );
};

ApplicantDetails.propTypes = {
  applicant: PropTypes.object,
  currentJobId: PropTypes.string,
  status: PropTypes.string,
};

export default ApplicantDetails;
