import React from 'react';
import styled from 'styled-components';

const DivTable = styled.div`
  display: table !important;
  position: relative !important;
  height: 100% !important;
  width: 100% !important;
`;

const DivTableCell = styled.div`
  display: table-cell !important;
  vertical-align: ${(props) => props.align} !important;
`;

const DivWrapTable = (props) => (
  <DivTable>
    <DivTableCell align={props.align}>{props.children}</DivTableCell>
  </DivTable>
);

export default DivWrapTable;
