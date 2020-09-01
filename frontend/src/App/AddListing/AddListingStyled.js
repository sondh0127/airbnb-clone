import React from 'react';
import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export const S = {
  Wrapper: styled.div`
    max-width: 912px;
    position: relative;
    margin: 0px auto;
    padding-top: 100px;
  `,

  Wrapper1: styled.div`
    background-color: rgb(255, 255, 255);
    padding-bottom: 102px;
    width: ${(props) => (props.fullWidth ? `100%` : `60%`)};
  `,

  WrapperForm: styled.div`
    font-size: 19px;
    padding: 30px 30px 16px;
  `,
  WrapperHeader: styled.div`
    padding-top: 32px;
    padding-bottom: 23px;
    border-bottom: 0px;
  `,
  WrapperBody: styled.div`
    margin-top: 32px;
    margin-bottom: 40px;
  `,
  WrapperText: styled.div`
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: normal;
    color: rgb(72, 72, 72);
    margin-top: -10px;
    margin-bottom: 5px;
    padding-left: 32px;
  `,

  WrapperText1: styled.div`
    margin-top: -16px;
    margin-bottom: 18px;
  `,

  WrapperSelection1: styled.div`
    margin-bottom: 18px;
    overflow: hidden;
  `,

  WrapperSelection2: styled.div`
    min-height: 1px;
    position: relative;
    width: 66.6667%;
    float: left;
  `,
  WrapperSelection3: styled.div`
    max-width: none;
    width: 100%;
    overflow: hidden;
    padding-top: 7px;
  `,
  WrapperSelection4: styled.div`
    max-width: none;
    width: 100%;
    overflow: hidden;
  `,
  WrapperLabel: styled.div`
    padding-top: 9px;
    padding-bottom: 8px;
  `,

  WrapperLabel2: styled.div`
    padding-top: 9px;
  `,

  WrapperUploadPhoto: styled.div`
    margin-bottom: 24px;
    width: 100%;
    min-height: 1px;
  `,
  WrapperDropZone: styled.div`
    height: 400px;
    cursor: pointer;
    position: relative;
    width: 100%;
    display: table;
    border-width: 2px;
    border-style: dashed;
    border-color: rgb(187, 187, 187);
    border-image: initial;
    border-radius: 6px;
    margin: 0px;
    padding: 20px;
  `,

  WrapperDropZoneBackGround: styled.div`
    box-shadow: rgba(255, 255, 255, 0.7) 0px -20px 35px 0px inset;
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
    margin-top: 0px;
    margin-bottom: 0px;
    vertical-align: middle;
    display: table-cell;
    background-repeat: no-repeat;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAyAAAAEaBAMAAAAbIC65AAAAD1BMVEXX19cAAADT09Pb29v///9JM8lqAAAABXRSTlMmACMVAfZT8i4AAAKGSURBVHgB7dHFkZthFETRpydvzevhACRNCo5/IADDH4ApgWHGlas/07kBdFXXmX34NFWsnfXDOm++vl+xevdTXbSbv5L/MlseVrDVVOf1two2f1UXbeSv5L/0z0p2tX5Soe6tD7mS/tJTJbtaP65Q99bzVwZ86dIfFRAgAgJEQIAICBABASIgAgJEQIAICBABASIgAgJEQIAICBABASIgAgJEQIAICBABASIgAgJEQIAICBABASIgAgJEQIAICBABASIgAgJEQIAICBABASIgAgJEQIAICBABASIgAgJEQIAICBABASIgAgJEQIAICBABASIgQAREQIAICBABASIgQAREQIAICBABASIgQAREQIAICBABASIgQAREQIAICBABASIgQAREQIAICBABASIgQAREQIAICBABASIgQP6ggAiIgAARECACAkRAgAiIgAARECACAkRAgAiIgAARECACAkRAgAiIgAARECACAkRAgAiIerOSbYbZ762nrwz50m8q2dX6rELdW09fGfKl329Wrp1rkN3K1au6LH1lzJe3+qN6FkRABASIgAARECACAkRA9GL301SxdtYP67z5+n7F6t1PdVH8yogvs+VhBVtNdV5/q2DzV3XRRv5K/kv/rGRX6ycV6t56+sqQLz1Vsqv14wp1bz19ZciXLv1R/SKIgAARECACIiBABASIgAARECACIiBABASIgAARECACIiBABASIgAARECACIiBABASIgAARECACIiBABASIgAARECACIiBABASIgAARECACIiBABASIgAARECACot6sZJtZ9vvr+SsDvvSbSna1PqtM99fzVwZ86feblWvnGmS3cvWqLstfGfDlFBsFgnjT/gl9AAAAAElFTkSuQmCC');
    align-content: center;
    justify-content: center;
  `,
  DivCenter: styled.div`
    float: none;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    pointer-events: none;
  `,

  WrapperButton: styled.div`
    margin-left: 8px;
    margin-right: 8px;
  `,
  WrapperTextDrag: styled.div`
    margin-top: 12px !important;
    font-size: 17px;
  `,

  WrapperDropzoneSmall: styled.div`
    height: 179.333px;
    border: 2px dashed #bbb;
    background-color: #fff;
    border-radius: 6px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  DivAddIcon: styled.div`
    margin: auto;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(https://a0.muscache.com/airbnb/static/list_your_space/plus-large-l-grey-06817361303b0edd0f31cf4dbdd47b81.png);
    width: 28px;
    height: 28px;
  `,

  DivAddText: styled.div`
    text-align: center;
    margin-top: 12px;
    color: #767676;
  `,

  WrapperImage: styled.div`
    position: relative !important;
  `,

  DivImage: styled.div`
    height: 275px;
    backface-visibility: hidden !important;
    position: relative !important;
    vertical-align: bottom !important;
    display: block !important;
    background-color: rgb(245, 245, 245) !important;
    overflow: hidden !important;
    border-radius: 4px !important;
    text-align: center !important;
    overflow: hidden !important;
  `,

  Image: styled.img`
    vertical-align: middle !important;
    text-align: center !important;
    width: auto !important;
    height: 100% !important;
  `,

  ImageFull: styled.img`
    vertical-align: middle !important;
    text-align: center !important;
    height: auto !important;
    width: 100% !important;
    position: relative;
    top: -143.177px;
  `,

  Textarea: styled.textarea`
    font-size: 17px !important;
    resize: none !important;
    padding-left: 0px !important;
    border-width: 0px !important;
    border-style: initial !important;
    border-color: initial !important;
    border-image: initial !important;
    outline: none !important;
    padding-top: 10px;
    padding-bottom: 10px;
    padding: 8px 10px;
    width: 100%;
  `,

  DivCaption: styled.div`
    width: 100% !important;
  `,

  Svg: styled.svg`
    height: 18px;
    width: 18px;
    fill: currentcolor;
  `,

  Button: styled(Fab)`
    background-color: rgba(0, 0, 0, 0.58) !important;
    box-shadow: rgba(255, 255, 255, 0.35) 0px 0px 0px 1px !important;
    color: rgb(255, 255, 255) !important;
    padding: 8px 8px 4px !important;
    border-radius: 25px !important;
    ${(props) =>
      props.del
        ? `background-color: rgba(255, 90, 95, 0.7) !important;
    padding: 5px 10px !important;`
        : ``};
  `,
  SpanText: styled.span`
    ${(props) =>
      props.del ? `margin-left: 8px; display: inline-block;` : `display: none;`}
  `,

  SvgDel: styled.svg`
    height: 20px;
    width: 20px;
    fill: rgb(255, 255, 255);
  `,
  SvgCheck: styled.svg`
    height: 21px;
    width: 21px;
    display: block;
    fill: rgb(35, 209, 193);
  `,

  WrapperSubtitle: styled.div`
    display: block !important;
    width: 100% !important;
    margin-top: 8px;
    margin-bottom: 8px;
  `,

  FabRemove: styled(Fab)`
    background-color: transparent;
    box-shadow: none;
  `,

  ButtonAdd: styled(Button)`
    height: 56px;
    border-color: #c4c4c4;
    margin-top: 16px;
    margin-bottom: 8px;
  `,

  WrapperMap: styled.div`
    height: 280px;
    width: 100%;
    position: relative;
  `,

  WrapperButtonAdjust: styled.div`
    position: absolute !important;
    top: 10px !important;
    right: 10px !important;
  `,
  DivMap: styled.div`
    height: 100%;
    width: 100%;
    position: relative;
    overflow: hidden;
  `,
  WrapperMapContainer: styled.div`
    height: 100%;
    width: 100%;
    position: relative;
    overflow: hidden;
  `,
  DivMarker: styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
  SvgMaker: styled.svg`
    transform: translateY(-25%);
    width: 40px;
    height: 63px;
  `,

  TypographyH6: styled(Typography)`
    font-size: 19px;
  `,
};

S.DivDelButton = styled.div`
  position: absolute !important;
  top: 10px !important;
  left: 10px !important;
  ${S.WrapperImage}:hover & {
    z-index: 1;
  }
`;

export const Svg = {
  upload: (
    <S.Svg viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false">
      <path
        d="m24 14.5c0 3.12-2.55 5.5-5.5 5.5h-4a .5.5 0 0 1 0-1h4c2.41 0 4.5-1.95 4.5-4.5 0-1.17-.41-2.08-1.1-2.77a3.98 3.98 0 0 0 -.76-.6 2.54 2.54 0 0 0 -.32-.17l-.31-.13v-.33c0-3.95-2.96-6.5-7-6.5-1.62 0-3.01.61-4.17 1.63-.41.36-.76.75-1.06 1.13-.17.23-.29.4-.34.49l-.28.49-.46-.34a2.83 2.83 0 0 0 -.5-.28c-.96-.43-1.95-.43-2.9.28-.45.34-.74.74-.9 1.21-.2.59-.19 1.24-.04 1.86.04.17.08.29.1.35l.17.43-.41.21c-.2.1-.52.33-.85.7-.54.6-.87 1.38-.87 2.34 0 2.83 1.91 4.5 5.5 4.5h2a .5.5 0 1 1 0 1h-2c-4.12 0-6.5-2.08-6.5-5.5 0-1.22.42-2.23 1.13-3.02.27-.31.54-.53.78-.7-.01-.03-.01-.05-.02-.08-.19-.79-.21-1.62.06-2.42a3.5 3.5 0 0 1 1.25-1.68c1.28-.96 2.65-.96 3.91-.39.09.04.16.08.23.12.04-.06.08-.11.13-.18.33-.44.73-.87 1.19-1.28 1.35-1.16 2.96-1.87 4.84-1.87 4.45 0 7.82 2.83 7.98 7.18.33.18.73.45 1.12.85.87.87 1.4 2.03 1.4 3.48zm-9.15-.65a.5.5 0 0 0 0-.71l-2.96-2.96a.56.56 0 0 0 -.79 0l-2.96 2.96a.5.5 0 1 0 .71.71l2.15-2.14v11.79a.5.5 0 0 0 1 0v-11.79l2.15 2.15a.5.5 0 0 0 .71 0z"
        fillRule="evenodd"
      />
    </S.Svg>
  ),
  del: (
    <S.SvgDel viewBox="0 0 24 24" role="img" aria-label="Delete" focusable="false">
      <path
        d="m21.5 3h-4.5v-1.5c0-.83-.67-1.5-1.49-1.5h-8.01c-.82 0-1.5.67-1.5 1.5v1.5h-4.5a.5.5 0 1 0 0 1h1.5v18.51c0 .82.68 1.49 1.5 1.49h14c .83 0 1.5-.67 1.5-1.49v-18.51h1.5a.5.5 0 0 0 0-1zm-14.5-1.5c0-.27.23-.5.5-.5h8.01c.28 0 .5.22.5.5v1.5h-9.01zm12 21.01a.49.49 0 0 1 -.5.49h-14a .5.5 0 0 1 -.5-.49v-18.51h15zm-11-16.01v14a .5.5 0 0 1 -1 0v-14a .5.5 0 1 1 1 0zm4 0v14a .5.5 0 0 1 -1 0v-14a .5.5 0 1 1 1 0zm4 0v14a .5.5 0 0 1 -1 0v-14a .5.5 0 1 1 1 0z"
        fillRule="evenodd"
      />
    </S.SvgDel>
  ),
  check: (
    <S.SvgCheck
      viewBox="0 0 24 24"
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="m1.29 11.98c-.29-.3-.76-.31-1.06-.02s-.31.76-.02 1.06l6.75 7c .29.3.78.31 1.07.01l15.75-16c .29-.3.29-.77-.01-1.06s-.77-.29-1.06.01l-15.21 15.45z"
        fillRule="evenodd"
      />
    </S.SvgCheck>
  ),
  marker: (
    <S.SvgMaker
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 63"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <clipPath id="animationMask_zSCSxCnSCV">
          <rect width="40" height="63" x="0" y="0" />
        </clipPath>
      </defs>
      <g clipPath="url(#animationMask_zSCSxCnSCV)">
        <g />
        <g
          transform="matrix(0.9183,0,0,0.9896,3.4771,10.368)"
          opacity="1"
          style={{ userSelect: 'none' }}
        >
          <g opacity="1" transform="matrix(1,0,0,1,18,45)">
            <path
              fill="rgb(0,132,137)"
              fillOpacity="1"
              d="M0 0 M0,3 C1.657,3 3,1.657 3,0 C3,-1.657 1.657,-3 0,-3 C-1.657,-3 -3,-1.657 -3,0 C-3,1.657 -1.657,3 0,3z"
            />
          </g>
        </g>
        <g
          transform="matrix(0.9896,0,0,0.9896,2.0053,3.6688)"
          opacity="1"
          style={{ userSelect: 'none' }}
        >
          <g opacity="1" transform="matrix(1,0,0,1,18.198,21.725)">
            <path
              fill="rgb(0,132,137)"
              fillOpacity="1"
              d="M0 0 M-18,-4.597 C-18,-13.955000000000002 -9.652,-21.64 0,-21.64 C9.652,-21.64 18,-14.873999999999999 18,-4.597 C18,5.410999999999999 11.822000000000001,11.093999999999998 1.864,20.644 C0.8260000000000001,21.639999999999997 -0.915,21.555999999999997 -2,20.644 C-11.921,11.074999999999998 -18,5.397999999999999 -18,-4.597z"
            />
          </g>
        </g>
        <g
          transform="matrix(0.9896,0,0,0.9896,2.0053,3.6688)"
          opacity="1"
          style={{ userSelect: 'none' }}
        >
          <g opacity="1" transform="matrix(1,0,0,1,18,16.992)">
            <path
              fill="rgb(255,255,255)"
              fillOpacity="1"
              d="M0 0 M-2.481,0.865 C-3.165,0.865 -3.719,0.31100000000000005 -3.719,-0.372 C-3.719,-1.056 -3.165,-1.611 -2.481,-1.611 C-1.7979999999999998,-1.611 -1.243,-1.056 -1.243,-0.372 C-1.243,0.31100000000000005 -1.7979999999999998,0.865 -2.481,0.865zM0 0 M7.63,-3.499 C7.63,-3.499 0.148,-7.944 0.148,-7.944 C0.06,-8.008 -0.06,-8.008 -0.148,-7.944 C-0.148,-7.944 -7.63,-3.499 -7.63,-3.499 C-8.031,-3.209 -8.119,-2.649 -7.829,-2.249 C-7.654,-2.0060000000000002 -7.382000000000001,-1.878 -7.105,-1.878 C-7.105,-1.878 -5.806,-1.878 -5.806,-1.878 C-5.806,-1.878 -5.806,7.749 -5.806,7.749 C-5.806,7.8919999999999995 -5.69,8.008 -5.546,8.008 C-5.546,8.008 -0.387,8.008 -0.387,8.008 C-0.276,8.008 -0.187,7.919 -0.187,7.808 C-0.187,7.808 -0.187,3.632 -0.187,3.632 C-0.187,2.911 0.5950000000000001,2.326 1.316,2.326 C2.037,2.326 2.87,2.911 2.87,3.632 C2.87,3.632 2.87,7.808 2.87,7.808 C2.87,7.919 2.96,8.008 3.07,8.008 C3.07,8.008 5.547,8.008 5.547,8.008 C5.6899999999999995,8.008 5.807,7.8919999999999995 5.807,7.749 C5.807,7.749 5.807,-1.878 5.807,-1.878 C5.807,-1.878 7.123,-1.878 7.123,-1.878 C7.393000000000001,-1.878 7.6579999999999995,-2.012 7.829,-2.249 C8.119,-2.649 8.03,-3.209 7.63,-3.499z"
            />
          </g>
        </g>
      </g>
    </S.SvgMaker>
  ),
};
