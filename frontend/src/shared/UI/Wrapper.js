import React from 'react';
import styled from 'styled-components';

const S = {
  WrapperTable: styled.div`
    display: table !important;
    ${(props) => (props.fullWidth ? `width: 100%;` : '')};
    ${(props) => (props.fullHeight ? `height: 100%;` : '')};
    border-spacing: 0px !important;
  `,

  WrapperCell: styled.div`
    display: table-cell !important;
    text-align: ${(props) => props.textAlign} !important;
    vertical-align: ${(props) => props.align} !important;
    ${(props) => (props.fullWidth ? `width: 100%;` : '')};
  `,

  WrapperCol: styled.div`
    display: table-cell !important;
    text-align: ${(props) => props.align} !important;
    ${(props) => (props.fullWidth ? `width: 100%;` : '')};
  `,

  WrapperBeforeAfter: styled.div`
    &::before {
      content: ' ' !important;
      display: table !important;
    }
    &::after {
      content: ' ' !important;
      display: table !important;
      clear: both !important;
    }
  `,
};

export const WrapperTable = (props) => {
  return (
    <S.WrapperTable
      style={props.style}
      fullWidth={props.fullWidth}
      fullHeight={props.fullHeight}
    >
      {props.children}
    </S.WrapperTable>
  );
};

export const WrapperCell = (props) => {
  return (
    <S.WrapperCell
      style={props.style}
      align={props.align ? props.align : 'middle'}
      textAlign={props.textAlign ? props.textAlign : 'left'}
      fullWidth={props.fullWidth}
    >
      {props.children}
    </S.WrapperCell>
  );
};

export const WrapperCol = (props) => {
  return (
    <S.WrapperCol
      style={props.style}
      align={props.align ? props.align : 'center'}
      fullWidth={props.fullWidth}
    >
      {props.children}
    </S.WrapperCol>
  );
};

export const WrapperBeforeAfter = (props) => {
  return <S.WrapperBeforeAfter {...props}>{props.children}</S.WrapperBeforeAfter>;
};
