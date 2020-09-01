import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { sizes } from '../theme';
export const S = {
  UlTable: styled.ul`
    @media (min-width: ${sizes.phone}) {
      display: none;
    }
    color: inherit;
    display: table !important;
    height: 64px !important;
    list-style: none !important;
    padding: 0px 16px !important;
    margin: 0px !important;
  `,

  LiCell: styled.li`
    display: table-cell !important;
  `,

  LinkContent: styled.div`
    height: 100% !important;
    vertical-align: middle !important;
    box-sizing: border-box !important;
    &:hover {
      border-bottom: 2px solid ${(props) => (props.transparent ? `#fff` : `#484848`)} !important;
    }
    border-bottom: 2px solid transparent !important;
  `,

  LinkText: styled.div`
    font-weight: 400;
    display: inline-block !important;
    vertical-align: middle !important;
    line-height: 1 !important;
    padding: 8px !important;
    border-bottom: 2px solid transparent !important;
  `,

  LiContent: styled.div`
    @media (min-width: 744px) {
      height: 80px !important;
      line-height: 80px !important;
    }
    cursor: pointer;
    color: inherit !important;
    display: inline-block !important;
    position: relative !important;
    white-space: nowrap !important;
    background: transparent !important;
    border-width: initial !important;
    border-style: none !important;
    border-color: initial !important;
    border-image: initial !important;
    text-decoration: none !important;
    margin: 0px !important;
    padding: 0px 8px !important;
  `,
  StyledLink: styled(Link)`
    text-decoration: none;
    color: inherit;
    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
      text-decoration: none;
    }
  `,

  DivSearch: styled.div`
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
    position: relative;
    border-radius: 4px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(235, 235, 235);
    width: 100%;
    @media (min-width: 744px) {
      margin-left: 20px;
      width: auto;
    }
  `,
  DivSearchIcon: styled.div`
    width: 50px;
    height: 100%;
    position: absolute;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
};
