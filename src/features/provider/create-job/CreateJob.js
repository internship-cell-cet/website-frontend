import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Form, Row, Col, DropdownButton, Dropdown, Button } from 'react-bootstrap';
import { Multiselect } from 'multiselect-react-dropdown';
import { sortBy } from 'underscore';
import { push } from 'connected-react-router';

import Header from '../../../components/header/Header';
import postJobIcon from '../../../assets/images/postJobIcon.png';
import { StyledJobForm } from './CreateJobStyle';
import { getSkills } from '../../common/skills/skillSlice';
import { selectIsLoadingSkills, selectSkills } from '../../common/skills/skillSelectors';
import { createJob } from '../providerSlice';
import { UNKNOWN_ERROR_MSG } from '../../../app/constants';
import { showAppToast } from '../../../appSlice';

const validate = ({
  description, designation, salary, experience, location, requiredSkills, type,
}) => {
  const validateErrors = {};
  if (!designation.trim()) {
    validateErrors.designation = 'Designation is missing';
  }

  if (!description.trim()) {
    validateErrors.description = 'Description is missing';
  } else if (description.length > 1000) {
    validateErrors.description = 'Description should be less than 1000 characters';
  }

  if (salary.minSalary === 0) {
    validateErrors.minSalary = 'Minimum salary is missing';
  }

  if (salary.maxSalary === 0) {
    validateErrors.maxSalary = 'Maximum salary is missing';
  } else if (parseInt(salary.maxSalary, 10) < parseInt(salary.minSalary, 10)) {
    validateErrors.maxSalary = 'Maximum salary should be greater';
  }

  if (!location.trim()) {
    validateErrors.location = 'Location is missing';
  }

  if (experience.minYears === 0) {
    validateErrors.minExperience = 'Minimum experience is missing';
  }

  if (experience.maxYears === 0) {
    validateErrors.maxExperience = 'Maximum experience is missing';
  } else if (parseInt(experience.maxYears, 10) < parseInt(experience.minYears, 10)) {
    validateErrors.maxExperience = 'Maximum experience should be greater';
  }

  if (requiredSkills.length === 0) {
    validateErrors.skills = 'Skills are not selected';
  }

  if (type === '') {
    validateErrors.type = 'Job Type is not selected';
  }

  return validateErrors;
};

const CreateJob = () => {
  const [description, setDescription] = useState('');
  const [designation, setDesignation] = useState('');
  const [location, setLocation] = useState('');
  const [skillList, setSkillList] = useState([]);
  const [selectedSkillCodes, setSelectedSkillCodes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [type, setType] = useState('');
  const [error, setError] = useState({});
  const [salary, setSalary] = useState({
    minSalary: 0,
    maxSalary: 0,
  });
  const [experience, setExperience] = useState({
    minYears: 0,
    maxYears: 0,
  });

  const dispatch = useDispatch();
  const isLoadingSkills = useSelector(selectIsLoadingSkills);
  const skills = useSelector(selectSkills);

  useEffect(() => {
    dispatch(getSkills());
  }, []);

  const skillHandler = (selectedList) => {
    const selectedSkillList = [];
    selectedList.forEach((skill) => {
      selectedSkillList.push(skill.skillCode);
    });
    setSelectedSkillCodes(selectedSkillList);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const jobInputs = {
      description,
      designation,
      salary,
      experience,
      location,
      requiredSkills: selectedSkillCodes,
      type,
    };
    const validatedErrors = validate(jobInputs);
    setError(validatedErrors);

    if (Object.keys(validatedErrors).length !== 0) {
      return;
    }

    dispatch(createJob(jobInputs)).then(({ meta, payload }) => {
      if (meta.requestStatus === 'rejected') {
        setError({ responseError: (payload && payload.message) || UNKNOWN_ERROR_MSG });
        return;
      }

      dispatch(push('/provider/dashboard'));
      dispatch(showAppToast('Job Succesfully created!'));
    });
  };

  return (
    <div>
      <Header />
      <StyledJobForm>
        <div className="background">
          <Form>
            <div className="card-head">
              <b>
                POST JOB
                <span className="post-icon">
                  <img src={postJobIcon} />
                </span>
              </b>
            </div>
            <Container>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Control
                      name="jobDesignation"
                      placeholder="Job Designation"
                      onChange={(e) => setDesignation(e.target.value)}
                      isInvalid={error.designation}
                    >
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {error.designation}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="jobDescription"
                      placeholder="Job Description"
                      onChange={(e) => setDescription(e.target.value)}
                      isInvalid={error.description}
                    >
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {error.description}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group>
                    <Form.Control
                      type="number"
                      name="minSalary"
                      placeholder="Minimum Salary"
                      onChange={(e) => setSalary(
                        (prev) => ({ ...prev, minSalary: e.target.value }),
                      )}
                      isInvalid={error.minSalary}

                    >
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {error.minSalary}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group>
                    <Form.Control
                      type="number"
                      name="maxSalary"
                      placeholder="Maximum Salary"
                      onChange={(e) => setSalary(
                        (prev) => ({ ...prev, maxSalary: e.target.value }),
                      )}
                      isInvalid={error.maxSalary}
                    >
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {error.maxSalary}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group>
                    <Form.Control
                      name="location"
                      placeholder="Location"
                      onChange={(e) => setLocation(e.target.value)}
                      isInvalid={error.location}
                    >
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {error.location}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group>
                    <Form.Control
                      name="minExperience"
                      placeholder="Minimum experience"
                      onChange={(e) => setExperience(
                        (prev) => ({ ...prev, minYears: e.target.value }),
                      )}
                      isInvalid={error.minExperience}
                    >
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {error.minExperience}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group>
                    <Form.Control
                      name="maxExperience"
                      placeholder="Maximum experience"
                      onChange={(e) => setExperience(
                        (prev) => ({ ...prev, maxYears: e.target.value }),
                      )}
                      isInvalid={error.maxExperience}
                    >
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {error.maxExperience}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="skill-section">
                    <DropdownButton id="dropdown-basic-button" title={type || 'Select Job Type'}>
                      <Dropdown.Item onClick={() => setType('Internship')}>
                        Internship
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setType('Part Time')}>
                        Part Time
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setType('Full Time')}>
                        Full Time
                      </Dropdown.Item>
                    </DropdownButton>
                    <div className="invalid-message">
                      {error.type}
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="skill-section">
                    <DropdownButton id="dropdown-basic-button" title={selectedCategory || 'Skill Category'}>
                      {(!isLoadingSkills && skills) && skills.map((skill) => <Dropdown.Item
                        key={skill._id}
                        onClick={(e) => {
                          const sortedSkillList = sortBy(skill.skills, 'skillName');
                          setSkillList(sortedSkillList);
                          setSelectedCategory(e.target.name);
                        }}
                        name={skill.category}
                      >
                        {skill.category}
                      </Dropdown.Item>)}
                    </DropdownButton>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Multiselect
                      placeholder="Select Skills"
                      disable={!selectedCategory}
                      options={skillList}
                      onSelect={skillHandler}
                      onRemove={skillHandler}
                      displayValue="skillName"

                    />
                    <div className="invalid-message">
                      {error.skills}
                    </div>
                  </Form.Group>
                </Col>
              </Row>
            </Container>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Create Job
            </Button>
          </Form>
        </div>
      </StyledJobForm>
    </div>
  );
};

export default CreateJob;
