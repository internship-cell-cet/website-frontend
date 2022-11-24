import styled from 'styled-components';

export const StyledApplicantDetails = styled.div`

border: 3px solid transparent;
box-shadow: 0 0 10px #a8a7a7;
margin-bottom: 10px;

    .applicant-detail{
        padding: 5px;
        display: flex;
    }

    .applicant-detail-image {
        width: 50px;
        height: 50px;
    }

    .applicant-detail-name {
        margin-top: auto;
        margin-bottom: auto;
        margin-left: 3%;
    }

    .applicant-detail-resume {
        margin: auto;
        margin-right: 2%;
    }

    .applicant-detail-select {
        margin: auto;
        margin-right: 2%;
        margin-left: 2%;
    }

    .hired-logo {
        width:50px;
    }

    .resume{
        background-color: #343a40;
        border-color: #343a40;
    }
`;
