import React from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import StyledLink from '../../../../shared/StyledLink';

const Div2h22gn = styled.div`
  margin-left: -8px !important;
  margin-right: -8px !important;
  box-sizing: border-box;
`;
const Div1fcn46ls = styled.div`
  color: #484848 !important;
  margin: 0px !important;
  word-wrap: break-word !important;
  font-size: 16px !important;
  line-height: 22px !important;
  letter-spacing: normal !important;
  font-weight: normal !important;
`;
const Div10pi7ah2 = styled.div`
  width: 16.6666% !important;
  float: left !important;
  padding-left: 8px !important;
  padding-right: 8px !important;
  min-height: 1px !important;
  position: relative !important;
  box-sizing: border-box;
`;
const Div1hpgssa1 = styled.div`
  width: 83.3333% !important;
  float: left !important;
  padding-left: 8px !important;
  padding-right: 8px !important;
  min-height: 1px !important;
  position: relative !important;
  box-sizing: border-box;
`;
const DivTextCenterMuted = styled.div`
  color: #767676;
  text-align: center;
`;
const Div1ij6gln6 = styled.div`
  position: relative !important;
  margin: 0 auto !important;
`;
const Divqtix31 = styled.div`
  display: table !important;
  box-sizing: border-box;
`;
const Div36rlri = styled.div`
  display: inline-block !important;
  box-sizing: border-box;
`;
const Div1thk0tsb = styled.div`
  display: table-cell !important;
  vertical-align: top !important;
  box-sizing: border-box;
  font-size: 14px;
  line-height: 1.43;
  color: #484848;
  background-color: #fff;
  -webkit-font-smoothing: antialiased;
`;
const Div4efw5a = styled.div`
  text-transform: uppercase !important;
`;
const Button110nrr2 = styled.button`
  -webkit-appearance: none !important;
  background: transparent !important;
  border: 0px !important;
  cursor: pointer !important;
  margin: 0px !important;
  padding: 0px !important;
  user-select: auto !important;
  text-decoration: none !important;
`;
const Spanmvzifm4 = styled.span`
  margin: 0px !important;
  word-wrap: break-word !important;
  font-size: 12px !important;
  line-height: 16px !important;
  letter-spacing: normal !important;
  padding-top: 0px !important;
  padding-bottom: 0px !important;
  color: #484848 !important;
  font-weight: bold;
  display: inline !important;
`;
const Spanamsa32j = styled.span`
  font-weight: bold;
  margin: 0px !important;
  word-wrap: break-word !important;
  font-size: 32px !important;
  line-height: 36px !important;
  letter-spacing: normal !important;
  padding-top: 6px !important;
  padding-bottom: 6px !important;
  color: #484848 !important;
`;
const Spanokqgdgp = styled.span`
  font-weight: 600 !important;
  color: #484848 !important;
  margin: 0px !important;
  word-wrap: break-word !important;
  font-size: 16px !important;
  line-height: 22px !important;
  letter-spacing: normal !important;
  display: inline !important;
  box-sizing: border-box;
`;
const Span1r3plqb = styled.span``;
const Spanjz15f0c = styled.span`
  color: #484848 !important;
  margin: 0px !important;
  word-wrap: break-word !important;
  font-size: 16px !important;
  line-height: 22px !important;
  letter-spacing: normal !important;
  font-weight: normal !important;
  display: inline !important;
`;
const H11xu9tpch = styled.h1`
  color: inherit !important;
  font-size: 1em !important;
  font-weight: inherit !important;
  line-height: inherit !important;
  margin: 0px !important;
  padding: 0px !important;
  display: inline !important;
`;
const Img12r18es = styled.img`
  background: #d8d8d8 !important;
  border-radius: 50% !important;
  border: 2px solid #ffffff !important;
  overflow: hidden !important;
  vertical-align: middle;
`;
const ListName = styled.div`
  color: #484848 !important;
  font-size: 1em !important;
  font-weight: inherit !important;
  line-height: 1.43 !important;
  margin: 0px !important;
  padding: 0px !important;
  display: inline !important;
  background-color: #fff;
  -webkit-font-smoothing: antialiased;
`;
const Summary = ({ listing }) => {
  const {
    id,
    host_id,
    listing_title,
    room_type,
    street,
    num_bedrooms,
    num_beds,
    num_bathrooms,
    num_guests,
  } = listing;
  const isHost = localStorage.getItem('userId') == host_id;

  return (
    <div id="summary">
      <div>
        <div style={{ marginTop: '24px', marginBottom: '24px' }}>
          <Div4efw5a className="4efw5a">
            <Spanmvzifm4 className="mvzifm4">
              <span style={{ color: '#231341' }}>{room_type}</span>
            </Spanmvzifm4>
          </Div4efw5a>
          <Div2h22gn className="2h22gn">
            <Div1hpgssa1 className="1hpgssa1">
              <div style={{ marginBottom: '6px' }}>
                <ListName itemProp="name">
                  <Spanamsa32j className="amsa32j">
                    <H11xu9tpch className="1xu9tpch">{listing_title}</H11xu9tpch>
                  </Spanamsa32j>
                  {isHost && (
                    <Box
                      color="primary.main"
                      fontSize="h6.fontSize"
                      component={'span'}
                      ml={1}
                    >
                      <StyledLink to={`/become-a-host/${id}`}>
                        (Edit listing)
                      </StyledLink>
                    </Box>
                  )}
                </ListName>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <div>
                  <div>
                    <Div1fcn46ls className="1fcn46ls">{street}</Div1fcn46ls>
                  </div>
                </div>
              </div>
            </Div1hpgssa1>
            <Div10pi7ah2 className="10pi7ah2">
              <div style={{ marginTop: '12px' }}>
                <DivTextCenterMuted>
                  <div style={{ marginBottom: '6px' }}>
                    <Div1ij6gln6
                      style={{ height: '64px', width: '64px', display: 'block' }}
                    >
                      {/* // TODO:Add Link to User Profile*/}
                      <Button110nrr2 ariaLabel="Laskarina User Profile" ariaBusy="false">
                        <Img12r18es
                          className="12r18es"
                          src="https://a0.muscache.com/im/pictures/32e97880-2cfb-430c-9ec0-faeb28be8612.jpg?akipolicy=profilexmedium"
                          height="64"
                          width="64"
                          alt="Laskarina User Profile"
                          title="Laskarina User Profile"
                        />
                      </Button110nrr2>
                    </Div1ij6gln6>
                  </div>
                </DivTextCenterMuted>
              </div>
            </Div10pi7ah2>
          </Div2h22gn>
          {/* here is where the name of the location and user profile tag end */}
          {/* here is where the numbers start */}
          <Div36rlri className="36rlri" style={{ marginRight: '16px' }}>
            <Divqtix31 className="qtix31">
              <Div1thk0tsb className="1thk0tsb">
                <div style={{ marginRight: '8px' }}>
                  <Spanokqgdgp className="okqgdgp">
                    <Span1r3plqb className="1r3plqb" ariaHidden="true">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        id="Capa1"
                        x="0px"
                        y="0px"
                        width="15"
                        height="15"
                        viewBox="0 0 549.907 549.908"
                        style={{ enableBackground: 'new 0 0 549.907 549.908' }}
                        xmlSpace="preserve"
                        className=""
                      >
                        <g>
                          <g transform="matrix(-1 0 0 1 549.907 0)">
                            <g>
                              <path
                                d="M110.534,220.962c0-49.027,39.741-88.768,88.768-88.768s88.768,39.741,88.768,88.768c0,49.026-39.741,88.768-88.768,88.768   S110.534,269.989,110.534,220.962z M236.968,315.783h-75.327c-62.668,0-113.655,50.986-113.655,113.646v92.143l0.236,1.437   l6.36,1.985c59.796,18.679,111.764,24.914,154.531,24.914c83.531,0,131.94-23.82,134.938-25.333l5.94-3.015l0.626,0.006v-92.137   C350.617,366.769,299.631,315.783,236.968,315.783z M350.617,177.533c49.024,0,88.768-39.741,88.768-88.768   C439.385,39.741,399.642,0,350.617,0c-49.023,0-88.768,39.741-88.768,88.765C261.85,137.792,301.594,177.533,350.617,177.533z    M388.28,183.585h-75.326c-1.797,0-3.547,0.189-5.32,0.275c6.81,14.295,10.74,30.225,10.74,47.094   c0,31.129-13.057,59.205-33.922,79.23c48.823,14.523,86.144,55.986,94.638,107.08c71.999-3.145,113.504-23.49,116.265-24.885   l5.94-3.015l0.626,0.012v-92.137C501.933,234.575,450.946,183.585,388.28,183.585z"
                                data-original="#000000"
                                className="active-path"
                                style={{ fill: '#484848' }}
                                data-old-color="#000000"
                              />
                            </g>
                          </g>
                        </g>
                      </svg>
                    </Span1r3plqb>
                  </Spanokqgdgp>
                </div>
              </Div1thk0tsb>
              <Div1thk0tsb className="1thk0tsb">
                <Spanjz15f0c className="jz15f0c">{num_guests} guests</Spanjz15f0c>
              </Div1thk0tsb>
            </Divqtix31>
          </Div36rlri>
          <Div36rlri className="36rlri" style={{ marginRight: '16px' }}>
            <Divqtix31 className="qtix31">
              <Div1thk0tsb className="1thk0tsb">
                <div style={{ marginRight: '8px' }}>
                  <Spanokqgdgp className="okqgdgp">
                    <Span1r3plqb className="1r3plqb" ariaHidden="true">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        id="Capa1"
                        x="0px"
                        y="0px"
                        width="15"
                        height="15"
                        viewBox="0 0 492.5 492.5"
                        style={{ enableBackground: 'new 0 0 492.5 492.5' }}
                        xmlSpace="preserve"
                        className=""
                      >
                        <g>
                          <g transform="matrix(-1 0 0 1 492.5 0)">
                            <g>
                              <path
                                d="M184.646,0v21.72H99.704v433.358h31.403V53.123h53.539V492.5l208.15-37.422v-61.235V37.5L184.646,0z M222.938,263.129   c-6.997,0-12.67-7.381-12.67-16.486c0-9.104,5.673-16.485,12.67-16.485s12.67,7.381,12.67,16.485   C235.608,255.748,229.935,263.129,222.938,263.129z"
                                data-original="#000000"
                                className="active-path"
                                style={{ fill: '#484848' }}
                                data-old-color="#000000"
                              />
                            </g>
                          </g>
                        </g>
                      </svg>
                    </Span1r3plqb>
                  </Spanokqgdgp>
                </div>
              </Div1thk0tsb>
              <Div1thk0tsb className="1thk0tsb">
                <Spanjz15f0c className="jz15f0c">{num_bedrooms} bedrooms</Spanjz15f0c>
              </Div1thk0tsb>
            </Divqtix31>
          </Div36rlri>
          {/* </Pane> */}
          {/* <Pane className="iq8x9is"> */}
          <Div36rlri className="36rlri" style={{ marginRight: '16px' }}>
            <Divqtix31 className="qtix31">
              <Div1thk0tsb className="1thk0tsb">
                <div style={{ marginRight: '8px' }}>
                  <Spanokqgdgp className="okqgdgp">
                    <Span1r3plqb className="1r3plqb" aria-hidden="true">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        id="Layer1"
                        x="0px"
                        y="0px"
                        viewBox="0 0 512 512"
                        style={{ enableBackground: 'new 0 0 512 512' }}
                        xmlSpace="preserve"
                        width="15px"
                        height="15px"
                      >
                        <path
                          d="M53.333,202.667h53.333c-3.285,0-6.379-1.515-8.405-4.096c-2.027-2.581-2.731-5.952-1.941-9.152l6.635-26.517     c3.563-14.272,16.341-24.235,31.04-24.235h68.672c17.643,0,32,14.357,32,32V192c0,5.888-4.779,10.667-10.667,10.667h64     c-5.888,0-10.667-4.779-10.667-10.667v-21.333c0-17.643,14.357-32,32-32h68.672c14.699,0,27.477,9.963,31.04,24.235l6.635,26.517     c0.811,3.179,0.085,6.571-1.941,9.152c-2.027,2.581-5.12,4.096-8.405,4.096h53.333c5.888,0,10.667-4.779,10.667-10.667v-64     c0-29.397-23.936-53.333-53.333-53.333H96c-29.397,0-53.333,23.936-53.333,53.333v64     C42.667,197.888,47.445,202.667,53.333,202.667z"
                          fill="#484848"
                        />
                        <path
                          d="M458.667,224H53.333C23.936,224,0,247.936,0,277.333v149.333c0,5.888,4.779,10.667,10.667,10.667     s10.667-4.779,10.667-10.667v-32h469.333v32c0,5.888,4.779,10.667,10.667,10.667c5.888,0,10.667-4.779,10.667-10.667V277.333     C512,247.936,488.064,224,458.667,224z M490.667,373.333H21.333V352h469.333V373.333z"
                          fill="#484848"
                        />
                      </svg>
                    </Span1r3plqb>
                  </Spanokqgdgp>
                </div>
              </Div1thk0tsb>
              <Div1thk0tsb className="1thk0tsb">
                <Spanjz15f0c className="jz15f0c">{num_beds} beds</Spanjz15f0c>
              </Div1thk0tsb>
            </Divqtix31>
          </Div36rlri>
          <Div36rlri className="36rlri" style={{ marginRight: '16px' }}>
            <Divqtix31 className="qtix31">
              <Div1thk0tsb className="1thk0tsb">
                <div style={{ marginRight: '8px' }}>
                  <Spanokqgdgp className="okqgdgp">
                    <Span1r3plqb className="1r3plqb" aria-hidden="true">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        id="Layer1"
                        x="0px"
                        y="0px"
                        viewBox="0 0 512 512"
                        style={{ enableBackground: 'new 0 0 512 512' }}
                        xmlSpace="preserve"
                        width="15px"
                        height="15px"
                      >
                        <path
                          d="M57.122,266.166V68.137c0-17.601,14.319-31.921,31.921-31.921c15.019,0,27.64,10.429,31.024,24.423    c-13.723,8.525-24.149,21.291-29.759,36.708c-6.625,18.202-5.766,37.892,2.421,55.446l7.056,15.133l131.438-61.291l-7.056-15.132    c-8.185-17.554-22.718-30.87-40.919-37.495c-10.243-3.73-20.96-5.087-31.5-4.102c-7.912-27.166-33.017-47.082-62.704-47.082    c-36.014,0-65.312,29.299-65.312,65.312v198.029H0v33.391h24.168c1.83,34.981,9.574,63.856,23.549,87.873    c12.414,21.335,29.568,38.088,50.985,49.794c4.843,2.647,9.921,5.028,15.209,7.16l-31.218,46.052l27.639,18.737l37.421-55.201    c12.927,2.334,26.759,3.526,41.465,3.526h133.565c14.707,0,28.538-1.192,41.465-3.526l37.421,55.201l27.639-18.737l-31.218-46.052    c5.289-2.133,10.366-4.512,15.209-7.16c21.417-11.707,38.571-28.459,50.985-49.794c13.974-24.016,21.719-52.892,23.549-87.873H512    v-33.392H57.122z"
                          data-original="#000000"
                          className="active-path"
                          data-old-color="#000000"
                          fill="#484848"
                        />
                      </svg>
                    </Span1r3plqb>
                  </Spanokqgdgp>
                </div>
              </Div1thk0tsb>
              <Div1thk0tsb className="1thk0tsb">
                <Spanjz15f0c className="jz15f0c">{num_bathrooms} bath</Spanjz15f0c>
              </Div1thk0tsb>
            </Divqtix31>
          </Div36rlri>
        </div>
      </div>
    </div>
  );
};

export default Summary;
