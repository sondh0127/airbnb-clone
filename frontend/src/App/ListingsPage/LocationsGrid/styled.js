import styled from 'styled-components';
import { sizes } from '../../theme';

export const S = {
  WrapperInfo: styled.div`
    position: relative !important;
    width: 100% !important;
    z-index: 0 !important;

    @media (min-width: ${sizes.phone}) {
      min-width: 697px !important;
    }
    @media (min-width: ${sizes.laptop}) {
      ${(props) =>
        props.mapShowing
          ? `width: 66% !important;`
          : `padding-left: 80px !important;
    padding-right: 80px !important;`};
    }
    @media (min-width: ${sizes.desktop}) {
      ${(props) => (props.mapShowing ? `width: 848px !important;` : null)};
    }
  `,
  DivInfo: styled.div`
    background-color: transparent;
    min-height: 400px;
    padding-left: 24px !important;
    padding-right: 24px !important;
    max-width: none !important;
    padding-bottom: 24px !important;
    overflow-anchor: none !important;

    @media (min-width: ${sizes.phone}) {
      padding-bottom: 48px !important;
    }
    @media (min-width: ${sizes.laptop}) {
      margin: 0 auto !important;
      position: relative !important;
    }
  `,
  DivMargin: styled.div`
    margin-top: 24px;
  `,
  DivInfoBody: styled.div`
    @media (min-width: ${sizes.phone}) {
      margin-left: -8px !important;
      margin-right: -8px !important;
      padding: 0px !important;
    }
  `,
  DivTotalHomes: styled.div`
    width: 100% !important;
    margin-bottom: 8px !important;
  `,
  // Map

  DivMap: styled.div`
    top: 48px;
    @media (min-width: ${sizes.laptop}) {
      position: absolute !important;
      display: block !important;
      right: 0 !important;
      height: calc(100vh - 128px) !important;
      width: 34% !important;
    }

    @media (min-width: ${sizes.desktop}) {
      width: calc(100% - 848px) !important;
    }
  `,
  DivMapInner: styled.div`
    z-index: 1;
    transform: translate3d(0px, 128px, 0px);
    position: fixed;
    top: 0px;
    width: 1057px;
  `,

  DivMapInner2: styled.div`
    @media (min-width: ${sizes.tablet}) {
      height: calc(100vh - 128px) !important;
      width: 100% !important;
    }
    top: 0px !important;
    height: calc(100vh - 64px) !important;
    width: 100% !important;
  `,
};
