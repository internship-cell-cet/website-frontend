import styled from 'styled-components';
import { Toast } from 'react-bootstrap';

export const StyledAppToast = styled(Toast)`
  position: absolute;
  min-width: 25%;
  top: 3%;
  left: 3%;
  z-index: 1000;
`;
