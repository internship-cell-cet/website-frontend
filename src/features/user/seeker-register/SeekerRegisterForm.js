import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Multiselect } from "multiselect-react-dropdown";
import { push } from "connected-react-router";
import {
  Form,
  Button,
  Dropdown,
  DropdownButton,
  Col,
  Row,
} from "react-bootstrap";
import { sortBy } from "underscore";

import { StyledSeekerRegister } from "./SeekerRegisterFormStyle";
import userSlice, {
  registerSeeker,
  imageUpload,
  resumeUpload,
} from "../userSlice";
import { getSkills } from "../../common/skills/skillSlice";
import { isValidMobileNumber } from "../../../helpers/utils";
import {
  selectSkills,
  selectIsLoadingSkills,
} from "../../common/skills/skillSelectors";
import { StyledBackground } from "../UserStyle";
import { showAppToast } from "../../../appSlice";
import { UNKNOWN_ERROR_MSG } from "../../../app/constants";
import { user } from "../userSelectors";
import uploadIcon from "../../../assets/images/uploadIcon.png";
import { ReactReduxContext } from "react-redux";

const validate = ({ mobileNum, dob, image, resume }) => {
  const validateErrors = {};
  if (!mobileNum) {
    validateErrors.mobileNum = "Mobile number is missing";
  } else if (!isValidMobileNumber(mobileNum)) {
    validateErrors.mobileNum = "Enter a valid mobile number";
  }

  if (!image) {
    validateErrors.image = "Upload a profile picture";
  }

  if (!resume) {
    validateErrors.resume = "Upload resume";
  }

  if (!dob) {
    validateErrors.dob = "Date of Birth is missing";
  } else {
    const currentDate = new Date();
    const year16YearsAgo = currentDate.getFullYear() - 16;
    const dateLimit = new Date(
      `${year16YearsAgo}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`
    );
    const d = new Date(dob);
    if (dateLimit < d) {
      validateErrors.dob = "You must be atleast 16";
    }
  }

  return validateErrors;
};

const SeekerRegisterForm = () => {
  const [dob, setDate] = useState();
  const [dateFieldType, setDateFieldType] = useState("text");
  const [mobileNum, setMobileNum] = useState("");
  const [error, setError] = useState({});
  const [id, setid] = useState("");
  const [skillList, setSkillList] = useState([]);
  const [selectedSkillCodes, setSelectedSkillCodes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [image, setImage] = useState("");
  const [resume, setResume] = useState("");
  const { store } = useContext(ReactReduxContext);

  const dispatch = useDispatch();
  const { firstName } = useSelector(user);
  const isLoadingSkills = useSelector(selectIsLoadingSkills);
  const skills = useSelector(selectSkills);

  useEffect(() => {
    dispatch(getSkills());
    setid(store.getState().users.user.id);
  }, []);

  const skillHandler = (selectedList) => {
    const selectedSkillList = [];
    selectedList.forEach((skill) => {
      selectedSkillList.push(skill.skillCode);
    });
    setSelectedSkillCodes(selectedSkillList);
  };

  const handleImage = (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    setImage(formData);
  };

  const handleResume = (e) => {
    const formData = new FormData();
    formData.append("resume", e.target.files[0]);
    setResume(formData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const registerInputs = {
      mobileNum,
      dob,
      skills: selectedSkillCodes,
      image,
      resume,
      id,
    };
    console.log("regiser inputs !!!!!", registerInputs);
    const validatedErrors = validate(registerInputs);
    setError(validatedErrors);

    if (Object.keys(validatedErrors).length !== 0) {
      return;
    }

    dispatch(registerSeeker(registerInputs)).then(({ meta, payload }) => {
      if (meta.requestStatus === "rejected") {
        alert("err rejected");
        console.log(meta);
        console.log(payload);
        setError({
          responseError: (payload && payload.message) || UNKNOWN_ERROR_MSG,
        });
      } else {
        dispatch(imageUpload(image))
          .then(() => {
            dispatch(resumeUpload(resume))
              .then(() => {
                dispatch(push("/seeker/dashboard"));
                dispatch(
                  showAppToast(
                    `Hello ${firstName}! You have Successfully Registered`
                  )
                );
              })
              .catch((err) => console.log("uploadres ", err));
          })
          .catch((err) => console.log("uploadimg ", err));
      }
    });
  };

  return (
    <StyledSeekerRegister>
      <StyledBackground>
        <Form className="registration-details">
          <div className="register-head-container">
            <span className="register-head">Register</span>
          </div>
          <div className="register-details">
            <Form.Group>
              <Form.Control
                type="number"
                placeholder="Mobile Number"
                name="mobileNum"
                onChange={(e) => setMobileNum(e.target.value)}
                isInvalid={error.mobileNum}
              />
              <Form.Control.Feedback type="invalid">
                {error.mobileNum}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Control
                type={dateFieldType}
                placeholder="Date of Birth"
                name="dateOfBirth"
                onFocus={() => setDateFieldType("date")}
                onBlur={() => setDateFieldType("text")}
                onChange={(e) => setDate(e.target.value)}
                isInvalid={error.dob}
              />
              <Form.Control.Feedback type="invalid">
                {error.dob}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="skill-section">
              <DropdownButton
                id="dropdown-basic-button"
                title={selectedCategory || "Skill Category"}
              >
                {!isLoadingSkills &&
                  skills &&
                  skills.map((skill) => (
                    <Dropdown.Item
                      key={skill._id}
                      onClick={(e) => {
                        const sortedSkillList = sortBy(
                          skill.skills,
                          "skillName"
                        );
                        setSkillList(sortedSkillList);
                        setSelectedCategory(e.target.name);
                      }}
                      name={skill.category}
                    >
                      {skill.category}
                    </Dropdown.Item>
                  ))}
              </DropdownButton>
            </Form.Group>

            <Form.Group>
              <Multiselect
                placeholder="Select Skills"
                disable={!selectedCategory}
                options={skillList}
                onSelect={skillHandler}
                onRemove={skillHandler}
                displayValue="skillName"
              />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <span className="btn btn-primary btn-file">
                    <img className="upload-icon" src={uploadIcon} />
                    Upload Picture{" "}
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      multiple={false}
                      onChange={handleImage}
                    />
                  </span>
                  <div className="invalid-message">{error.image}</div>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <span className="btn btn-primary btn-file">
                    <img className="upload-icon" src={uploadIcon} />
                    Upload Resume{" "}
                    <input
                      type="file"
                      accept="application/pdf"
                      multiple={false}
                      onChange={handleResume}
                    />
                  </span>
                  <div className="invalid-message">{error.resume}</div>
                </Form.Group>
              </Col>
            </Row>

            <div className="error">{error.responseError}</div>
            <Button
              className="register-button"
              id="register-button"
              variant="primary"
              type="submit"
              onClick={handleSubmit}
            >
              Register
            </Button>
          </div>
        </Form>
      </StyledBackground>
    </StyledSeekerRegister>
  );
};

export default SeekerRegisterForm;
