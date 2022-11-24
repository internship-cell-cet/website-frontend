import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image, Spinner } from 'react-bootstrap';
import { provider } from '../../features/seeker/seekerSelectors';
import { StyledJobCard } from './jobCardStyle';
import { displayEllipsis } from '../../helpers/utils';
import { getSkills } from '../../features/common/skills/skillSlice';
import JobModal from '../jobModal/jobModal';
import { user } from '../../features/user/userSelectors';

const JobCard = (job) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSkills());
  }, []);

  const { designation, description } = job.job;
  const currentUser = useSelector(user);
  let jobProvider;
  if (currentUser?.userType === 'provider') {
    jobProvider = currentUser;
  } else {
    const providers = useSelector(provider);
    jobProvider = providers?.filter((obj) => obj.userTypeId === job.job.providerId)[0];
  }
  const [show, setShow] = useState(false);

  return (
    <>
      <StyledJobCard onClick={() => setShow(true)}>
        <div className="company-image">
          {
            jobProvider ? <Image className="user-image" src={jobProvider.image} roundedCircle />
              : <Spinner animation="border" />
          }
        </div>
        <div className="radio-card-header">
          {designation}
        </div>
        <div className="job-description">
          <div className="description-header">Job description :  </div>
          {displayEllipsis(description, 70)}
        </div>
      </StyledJobCard>
      <JobModal job={job} jobProvider={jobProvider} show={show} setShow={setShow} />
    </>
  );
};

export default JobCard;
