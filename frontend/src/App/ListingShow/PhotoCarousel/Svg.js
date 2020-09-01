import React from 'react';
import styled from 'styled-components';

const SvgClose = styled.svg`
  height: 2em;
  width: 2em;
  display: block;
  fill: rgb(255, 255, 255);
`;

const SvgNavi = styled.svg`
  height: 4.8em;
  width: 4.8em;
  fill: rgb(255, 255, 255);
`;

const SvgHideShow = styled.svg`
  height: 10px;
  width: 10px;
  fill: currentcolor;
`;

export default {
  Close: (
    <SvgClose viewBox="0 0 24 24" role="img" aria-label="Close" focusable="false">
      <path
        d="m23.25 24c-.19 0-.38-.07-.53-.22l-10.72-10.72-10.72 10.72c-.29.29-.77.29-1.06 0s-.29-.77 0-1.06l10.72-10.72-10.72-10.72c-.29-.29-.29-.77 0-1.06s.77-.29 1.06 0l10.72 10.72 10.72-10.72c.29-.29.77-.29 1.06 0s .29.77 0 1.06l-10.72 10.72 10.72 10.72c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22"
        fillRule="evenodd"
      />
    </SvgClose>
  ),
  Left: (
    <SvgNavi viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false">
      <path
        d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z"
        fillRule="evenodd"
      />
    </SvgNavi>
  ),
  Right: (
    <SvgNavi viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false">
      <path
        d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z"
        fillRule="evenodd"
      />
    </SvgNavi>
  ),
  Hide: (
    <SvgHideShow
      viewBox="0 0 24 24"
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="m23.85 6.86-11.5 11a .5.5 0 0 1 -.69 0l-11.5-11a .5.5 0 0 1 .34-.86h23a .5.5 0 0 1 .35.86z"
        fillRule="evenodd"
      />
    </SvgHideShow>
  ),
  Show: (
    <SvgHideShow
      viewBox="0 0 24 24"
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="m23.96 17.69a.5.5 0 0 1 -.46.31h-23a .5.5 0 0 1 -.35-.86l11.5-11a .5.5 0 0 1 .69 0l11.5 11a .5.5 0 0 1 .12.55z"
        fillRule="evenodd"
      />
    </SvgHideShow>
  ),
};
