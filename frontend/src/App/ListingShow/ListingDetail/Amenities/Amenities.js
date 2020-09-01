import React from 'react';
import styled from 'styled-components';
import { SVG } from '../styled';
import { ALL_AMENITIES, AMENITIES, SAFE_AMENITIES, SPACES } from '../../ultis';

const Div2h22gn = styled.div`
  margin-left: -8px !important;
  margin-right: -8px !important;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
`;
const Diviq8x9is = styled.div`
  padding-left: 8px !important;
  padding-right: 8px !important;
  min-height: 1px !important;
  position: relative !important;
  width: 50% !important;
  float: left !important;
  display: block;
  box-sizing: border-box;
`;
const Divqtix31 = styled.div`
  display: table !important;
  box-sizing: border-box;
`;
const Div1wt9k7hn = styled.div`
  color: #484848 !important;
  margin: 0px !important;
  word-wrap: break-word !important;
  font-size: 16px !important;
  line-height: 22px !important;
  letter-spacing: normal !important;
  font-weight: bold;
`;
const Divni9axhe = styled.div`
  display: table-cell !important;
  vertical-align: middle !important;
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
const Div157yfd15 = styled.div`
  font-weight: 600 !important;
  color: #484848 !important;
  margin: 0px !important;
  word-wrap: break-word !important;
  font-size: 16px !important;
  line-height: 22px !important;
  letter-spacing: normal !important;
`;
const H21xu9tpch = styled.h2`
  color: inherit !important;
  font-size: 1em !important;
  font-weight: inherit !important;
  line-height: inherit !important;
  margin: 0px !important;
  padding: 0px !important;
  display: inline !important;
`;
const Buttonb82bweu = styled.button`
  color: #008489 !important;
  font: inherit !important;
  text-decoration: none !important;
  -webkit-appearance: none !important;
  -webkit-font-smoothing: antialiased;
  background: transparent !important;
  border: 0px !important;
  cursor: pointer !important;
  margin: 0px !important;
  padding: 0px !important;
  user-select: auto !important;
  text-align: left !important;
`;

const Amenities = ({ amenities, spaces }) => {
  let spacesShow = Object.keys(SPACES).filter((item) => spaces[item]);
  let amenitiesShow = Object.keys(AMENITIES).filter((item) => amenities[item]);
  let safetyAmenities = Object.keys(SAFE_AMENITIES)
    .filter((item) => !amenities[item])
    .slice(0, 2);

  if (spacesShow.length < 2 && amenitiesShow.length > 2) {
    spacesShow = [...spacesShow, ...amenitiesShow.slice(2, 4 - spacesShow.length)];
    amenitiesShow = amenitiesShow.slice(0, 2);
  } else if (amenitiesShow.length < 2 && spacesShow.length > 2) {
    amenitiesShow = [...amenitiesShow, ...spacesShow.slice(2, 4 - amenitiesShow.length)];
    spacesShow = spacesShow.slice(0, 2);
  }

  return (
    <div style={{ marginBottom: '0px' }}>
      <section>
        <div style={{ marginBottom: '16px' }}>
          <H21xu9tpch>
            <Div1wt9k7hn>
              <span>Amenities</span>
            </Div1wt9k7hn>
          </H21xu9tpch>
        </div>
        <Div2h22gn>
          <Diviq8x9is>
            <div style={{ marginBottom: '16px' }}>
              <Divqtix31>
                <Divni9axhe>
                  <div style={{ marginRight: '8px' }}>{SVG[spacesShow[0]]}</div>
                </Divni9axhe>
                <Divni9axhe>
                  <Div1fcn46ls>{ALL_AMENITIES[spacesShow[0]]}</Div1fcn46ls>
                </Divni9axhe>
              </Divqtix31>
            </div>
            {/* end of first amenity */}
            <div style={{ marginBottom: '16px' }}>
              <Divqtix31>
                <Divni9axhe>
                  <div style={{ marginRight: '8px' }}>{SVG[amenitiesShow[0]]}</div>
                </Divni9axhe>
                <Divni9axhe>
                  <Div1fcn46ls>{ALL_AMENITIES[amenitiesShow[0]]}</Div1fcn46ls>
                </Divni9axhe>
              </Divqtix31>
            </div>
            {/* end of second amenity */}
            <div style={{ marginBottom: '16px' }}>
              <Divqtix31>
                <Divni9axhe>
                  <div style={{ marginRight: '8px' }}>{SVG[safetyAmenities[0]]}</div>
                </Divni9axhe>
                <Divni9axhe>
                  <Div1fcn46ls>
                    <del>{SAFE_AMENITIES[safetyAmenities[0]]}</del>
                  </Div1fcn46ls>
                </Divni9axhe>
              </Divqtix31>
            </div>
          </Diviq8x9is>
          <Diviq8x9is>
            <div style={{ marginBottom: '16px' }}>
              <Divqtix31>
                <Divni9axhe>
                  <div style={{ marginRight: '8px' }}>{SVG[spacesShow[1]]}</div>
                </Divni9axhe>
                <Divni9axhe>
                  <Div1fcn46ls>{ALL_AMENITIES[spacesShow[1]]}</Div1fcn46ls>
                </Divni9axhe>
              </Divqtix31>
            </div>
            {/* end of fourth amenity */}
            <div style={{ marginBottom: '16px' }}>
              <Divqtix31>
                <Divni9axhe>
                  <div style={{ marginRight: '8px' }}>{SVG[amenitiesShow[1]]}</div>
                </Divni9axhe>
                <Divni9axhe>
                  <Div1fcn46ls>{ALL_AMENITIES[amenitiesShow[1]]}</Div1fcn46ls>
                </Divni9axhe>
              </Divqtix31>
            </div>
            {/* end of fifth amenity */}
            <div style={{ marginBottom: '16px' }}>
              <Divqtix31>
                <Divni9axhe>
                  <div style={{ marginRight: '8px' }}>{SVG[safetyAmenities[1]]}</div>
                </Divni9axhe>
                <Divni9axhe>
                  <Div1fcn46ls>
                    <del>{SAFE_AMENITIES[safetyAmenities[1]]}</del>
                  </Div1fcn46ls>
                </Divni9axhe>
              </Divqtix31>
            </div>
          </Diviq8x9is>
          {/* end of sixth amenity */}
        </Div2h22gn>
        <div style={{ marginTop: '8px' }}>
          <Div157yfd15>
            <Buttonb82bweu>
              <span>Show all 30 amenities</span>
            </Buttonb82bweu>
          </Div157yfd15>
        </div>
      </section>
    </div>
  );
};

export default Amenities;
