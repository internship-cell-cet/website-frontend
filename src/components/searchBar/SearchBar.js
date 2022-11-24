import React, { useState } from 'react';
import { Button, Col, Dropdown, DropdownButton, Row } from 'react-bootstrap';
import { sortBy } from 'underscore';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';

import backgroundImage from '../../assets/images/searchBackground.png';
import searchIcon from '../../assets/images/searchIcon.png';
import { provider } from '../../features/seeker/seekerSelectors';
import { selectSkills, selectIsLoadingSkills } from '../../features/common/skills/skillSelectors';
import { searchJobs } from '../../features/seeker/seekerSlice';
import { StyledSearchBar } from './SearchBarStyle';

export const SearchBar = () => {
  const dispatch = useDispatch();
  const [skillList, setSkillList] = useState();
  const [selectedSkillName, setSelectedSkillName] = useState();
  const [selectedCompanyName, setSelectedCompanyName] = useState();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCompanyCode, setSelectedCompanyCode] = useState();
  const [selectedSkillCode, setSelectedSkillCode] = useState();
  const skills = useSelector(selectSkills);
  const companies = useSelector(provider);
  const isLoadingSkills = useSelector(selectIsLoadingSkills);

  const searchForJobs = () => {
    const searchDetails = { providerId: selectedCompanyCode, skillCode: selectedSkillCode };
    dispatch(searchJobs(searchDetails)).then((data) => {
      const searchResult = data.payload;
      dispatch(push({
        pathname: '/seeker/search',
        state: { detail: searchResult },
      }));
      window.location.reload();
    });
  };
  return (
    <StyledSearchBar>
      <div className="search-background">
        <div className="background-container"><img className="background-image" src={backgroundImage} /></div>
        <div className="search-bar">
          <Row className="skill-search-bar">
            <Col>
              <Row>
                <Col className="category-select">
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
                </Col>

                <Col className="skill-select">
                  <DropdownButton id="skill-name" title={selectedSkillName || 'Skill Name'}>
                    {(!isLoadingSkills && skillList) && skillList.map((skill) => <Dropdown.Item
                      key={skill.skillCode}
                      onClick={() => {
                        setSelectedSkillCode(skill.skillCode);
                        setSelectedSkillName(skill.skillName);
                      }}
                      name={skill.skillName}
                    >
                      {skill.skillName}
                    </Dropdown.Item>)}
                  </DropdownButton>
                </Col>
                <Col className="company-select">
                  <DropdownButton id="company-name" title={selectedCompanyName || 'Company Name'}>

                    {(companies) && companies.map((company) => <Dropdown.Item
                      key={company.firstName}
                      onClick={() => {
                        setSelectedCompanyName(company.firstName);
                        setSelectedCompanyCode(company.userTypeId);
                      }}
                      name={company.firstName}
                    >
                      {company.firstName}
                    </Dropdown.Item>)}
                  </DropdownButton>

                </Col>

              </Row>
            </Col>
            <Button className="search-button" onClick={searchForJobs}><img className="search-button-icon" src={searchIcon} /></Button>

          </Row>
        </div>
      </div>
    </StyledSearchBar>

  );
};
