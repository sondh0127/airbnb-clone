import React, { Component } from 'react';
import styled from 'styled-components';
import { WrapperTable, WrapperCell } from '../../shared/UI/Wrapper';

const SvgStyled = styled.svg`
  height: 18px;
  width: 18px;
  display: block;
  fill: rgb(118, 118, 118);
`;

const SvgBnb = styled.svg`
  height: 1.5em;
  width: 1.5em;
  display: block;
  fill: rgb(118, 118, 118);
`;

const svg = {
  facebook: (
    <SvgStyled
      viewBox="0 0 32 32"
      role="img"
      aria-label="Navigate to Facebook"
      focusable="false"
    >
      <path
        d="m8 14.41v-4.17c0-.42.35-.81.77-.81h2.52v-2.08c0-4.84 2.48-7.31 7.42-7.35 1.65 0 3.22.21 4.69.64.46.14.63.42.6.88l-.56 4.06c-.04.18-.14.35-.32.53-.21.11-.42.18-.63.14-.88-.25-1.78-.35-2.8-.35-1.4 0-1.61.28-1.61 1.73v1.8h4.52c.42 0 .81.42.81.88l-.35 4.17c0 .42-.35.71-.77.71h-4.21v16c0 .42-.35.81-.77.81h-5.21c-.42 0-.8-.39-.8-.81v-16h-2.52a.78.78 0 0 1 -.78-.78"
        fillRule="evenodd"
      />
    </SvgStyled>
  ),
  twitter: (
    <SvgStyled
      viewBox="0 0 32 32"
      role="img"
      aria-label="Navigate to Twitter"
      focusable="false"
    >
      <path
        d="m31 6.36c-1.16.49-2.32.82-3.55.95 1.29-.76 2.22-1.87 2.72-3.38a13.05 13.05 0 0 1 -3.91 1.51c-1.23-1.28-2.75-1.94-4.51-1.94-3.41 0-6.17 2.73-6.17 6.12 0 .49.07.95.17 1.38-4.94-.23-9.51-2.6-12.66-6.38-.56.95-.86 1.97-.86 3.09 0 2.07 1.03 3.91 2.75 5.06-1-.03-1.92-.3-2.82-.76v.07c0 2.89 2.12 5.42 4.94 5.98-.63.17-1.16.23-1.62.23-.3 0-.7-.03-1.13-.13a6.07 6.07 0 0 0 5.74 4.24c-2.22 1.74-4.78 2.63-7.66 2.63-.56 0-1.06-.03-1.43-.1 2.85 1.84 6 2.76 9.41 2.76 7.29 0 12.83-4.01 15.51-9.3 1.36-2.66 2.02-5.36 2.02-8.09v-.46c-.03-.17-.03-.3-.03-.33a12.66 12.66 0 0 0 3.09-3.16"
        fillRule="evenodd"
      />
    </SvgStyled>
  ),
  instagram: (
    <SvgStyled
      viewBox="0 0 24 24"
      role="img"
      aria-label="Navigate to Instagram"
      focusable="false"
    >
      <path
        d="m23.09.91c-.61-.61-1.33-.91-2.17-.91h-17.84c-.85 0-1.57.3-2.17.91s-.91 1.33-.91 2.17v17.84c0 .85.3 1.57.91 2.17s1.33.91 2.17.91h17.84c.85 0 1.57-.3 2.17-.91s.91-1.33.91-2.17v-17.84c0-.85-.3-1.57-.91-2.17zm-14.48 7.74c.94-.91 2.08-1.37 3.4-1.37 1.33 0 2.47.46 3.41 1.37s1.41 2.01 1.41 3.3-.47 2.39-1.41 3.3-2.08 1.37-3.41 1.37c-1.32 0-2.46-.46-3.4-1.37s-1.41-2.01-1.41-3.3.47-2.39 1.41-3.3zm12.66 11.63c0 .27-.09.5-.28.68a.92.92 0 0 1 -.67.28h-16.7a.93.93 0 0 1 -.68-.28.92.92 0 0 1 -.27-.68v-10.13h2.2a6.74 6.74 0 0 0 -.31 2.05c0 2 .73 3.71 2.19 5.12s3.21 2.12 5.27 2.12a7.5 7.5 0 0 0 3.75-.97 7.29 7.29 0 0 0 2.72-2.63 6.93 6.93 0 0 0 1-3.63c0-.71-.11-1.39-.31-2.05h2.11v10.12zm0-13.95c0 .3-.11.56-.31.77a1.05 1.05 0 0 1 -.77.31h-2.72c-.3 0-.56-.11-.77-.31a1.05 1.05 0 0 1 -.31-.77v-2.58c0-.29.11-.54.31-.76s.47-.32.77-.32h2.72c.3 0 .56.11.77.32s.31.47.31.76z"
        fillRule="evenodd"
      />
    </SvgStyled>
  ),
  airbnb: (
    <SvgBnb
      viewBox="0 0 1000 1000"
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <path d="m499.3 736.7c-51-64-81-120.1-91-168.1-10-39-6-70 11-93 18-27 45-40 80-40s62 13 80 40c17 23 21 54 11 93-11 49-41 105-91 168.1zm362.2 43c-7 47-39 86-83 105-85 37-169.1-22-241.1-102 119.1-149.1 141.1-265.1 90-340.2-30-43-73-64-128.1-64-111 0-172.1 94-148.1 203.1 14 59 51 126.1 110 201.1-37 41-72 70-103 88-24 13-47 21-69 23-101 15-180.1-83-144.1-184.1 5-13 15-37 32-74l1-2c55-120.1 122.1-256.1 199.1-407.2l2-5 22-42c17-31 24-45 51-62 13-8 29-12 47-12 36 0 64 21 76 38 6 9 13 21 22 36l21 41 3 6c77 151.1 144.1 287.1 199.1 407.2l1 1 20 46 12 29c9.2 23.1 11.2 46.1 8.2 70.1zm46-90.1c-7-22-19-48-34-79v-1c-71-151.1-137.1-287.1-200.1-409.2l-4-6c-45-92-77-147.1-170.1-147.1-92 0-131.1 64-171.1 147.1l-3 6c-63 122.1-129.1 258.1-200.1 409.2v2l-21 46c-8 19-12 29-13 32-51 140.1 54 263.1 181.1 263.1 1 0 5 0 10-1h14c66-8 134.1-50 203.1-125.1 69 75 137.1 117.1 203.1 125.1h14c5 1 9 1 10 1 127.1.1 232.1-123 181.1-263.1z" />
    </SvgBnb>
  ),
};

class Footer extends Component {
  render() {
    return (
      <Divr9jh7g>
        <Divcfvh61>
          <Divazosq83>
            <footer>
              <Div121z06r2>
                <Div2h22gn>
                  <div style={{ overflow: 'auto' }}>
                    <Div1t9ulrox>
                      <section>
                        <H414i3z6h>
                          <Ditw4pe52>Airbnb</Ditw4pe52>
                        </H414i3z6h>
                        <Ulll34wp>
                          <Lio2jk4c>
                            <A1jrx6hxv href="/careers">Careers</A1jrx6hxv>
                          </Lio2jk4c>
                          <Lio2jk4c>
                            <A1jrx6hxv href="/press/news">Press</A1jrx6hxv>
                          </Lio2jk4c>
                          <Lio2jk4c>
                            <A1jrx6hxv href="/policies">Policies</A1jrx6hxv>
                          </Lio2jk4c>
                          <Lio2jk4c>
                            <A1jrx6hxv href="/help?from=footer">Help</A1jrx6hxv>
                          </Lio2jk4c>
                          <Lio2jk4c>
                            <A1jrx6hxv href="/diversity">
                              Diversity &amp; Belonging
                            </A1jrx6hxv>
                          </Lio2jk4c>
                        </Ulll34wp>
                      </section>
                    </Div1t9ulrox>
                    <Div1jl220aq>
                      <section>
                        <H414i3z6h>
                          <Ditw4pe52>Discover</Ditw4pe52>
                        </H414i3z6h>
                        <Ulll34wp>
                          <Lio2jk4c>
                            <A1jrx6hxv href="/trust">Trust &amp; Safety</A1jrx6hxv>
                          </Lio2jk4c>
                          <Lio2jk4c>
                            <A1jrx6hxv href="/invite?r=6">Travel Credit</A1jrx6hxv>
                          </Lio2jk4c>
                          <Lio2jk4c>
                            <A1jrx6hxv href="/gift?s=footer">Gift Cards</A1jrx6hxv>
                          </Lio2jk4c>
                          <Lio2jk4c>
                            <A1jrx6hxv
                              href="https://www.airbnbcitizen.com?utm_source=airbnb&amp;utm_medium=footer&amp;utm_campaign=product"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Airbnb Citizen
                            </A1jrx6hxv>
                          </Lio2jk4c>
                          <Lio2jk4c>
                            <A1jrx6hxv
                              href="https://www.airbnbforwork.com?utm_source=airbnb&amp;utm_medium=footer&amp;utm_campaign=product"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Business Travel
                            </A1jrx6hxv>
                          </Lio2jk4c>
                          <Lio2jk4c>
                            <A1jrx6hxv href="/things-to-do">Guidebooks</A1jrx6hxv>
                          </Lio2jk4c>
                          <Lio2jk4c>
                            <A1jrx6hxv href="https://airbnbmag.com">Airbnbmag</A1jrx6hxv>
                          </Lio2jk4c>
                          <Lio2jk4c>
                            <A1jrx6hxv href="/events">
                              <span>Events</span>
                            </A1jrx6hxv>
                            <Span146g3kk>
                              <Spandphve5f>New</Spandphve5f>
                            </Span146g3kk>
                          </Lio2jk4c>
                        </Ulll34wp>
                      </section>
                    </Div1jl220aq>
                    <Div1jl220aq>
                      <section>
                        <H414i3z6h>
                          <Ditw4pe52>Hosting</Ditw4pe52>
                        </H414i3z6h>
                        <Ulll34wp>
                          <Lio2jk4c>
                            <A1jrx6hxv href="/host/homes?from_footer=1">
                              Why Host
                            </A1jrx6hxv>
                          </Lio2jk4c>
                          <Lio2jk4c>
                            <A1jrx6hxv href="/hospitality">Hospitality</A1jrx6hxv>
                          </Lio2jk4c>
                          <Lio2jk4c>
                            <A1jrx6hxv href="/help/responsible-hosting">
                              Responsible Hosting
                            </A1jrx6hxv>
                          </Lio2jk4c>
                          <Lio2jk4c>
                            <A1jrx6hxv href="/help/community?s=footer">
                              Community Center
                            </A1jrx6hxv>
                          </Lio2jk4c>
                          <Lio2jk4c>
                            <A1jrx6hxv
                              href="/host/experiences?from_footer=1"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Host an Experience
                            </A1jrx6hxv>
                            <Span146g3kk>
                              <Spandphve5f>New</Spandphve5f>
                            </Span146g3kk>
                          </Lio2jk4c>
                          <Lio2jk4c>
                            <A1jrx6hxv href="/openhomes?from_footer=1">
                              Open Homes
                            </A1jrx6hxv>
                            <Span146g3kk>
                              <Spandphve5f>New</Spandphve5f>
                            </Span146g3kk>
                          </Lio2jk4c>
                        </Ulll34wp>
                      </section>
                    </Div1jl220aq>
                    <Div1jl220aq>
                      <section>
                        <Ulll34wp>
                          <Lify9czq>
                            <Span1oznos1>
                              <A1rp5252
                                href="https://www.facebook.com/airbnb"
                                target="_blank"
                                aria-busy="false"
                              >
                                {svg.facebook}
                              </A1rp5252>
                            </Span1oznos1>
                            <Span1oznos1>
                              <A1rp5252
                                href="https://twitter.com/airbnb"
                                target="_blank"
                                aria-busy="false"
                              >
                                {svg.twitter}
                              </A1rp5252>
                            </Span1oznos1>
                            <Span1oznos1>
                              <A1rp5252
                                href="https://instagram.com/airbnb"
                                target="_blank"
                                aria-busy="false"
                              >
                                {svg.instagram}
                              </A1rp5252>
                            </Span1oznos1>
                          </Lify9czq>
                          <DivMargin>
                            <Lio2jk4c>
                              <A1jrx6hxv href="/terms">Terms</A1jrx6hxv>
                            </Lio2jk4c>
                            <Lio2jk4c>
                              <A1jrx6hxv href="/terms/privacy_policy">Privacy</A1jrx6hxv>
                            </Lio2jk4c>
                            <Lio2jk4c>
                              <A1jrx6hxv href="/sitemaps/v2">Site Map</A1jrx6hxv>
                            </Lio2jk4c>
                          </DivMargin>
                        </Ulll34wp>
                      </section>
                    </Div1jl220aq>
                  </div>
                  <div>
                    <div style={{ marginTop: '16px', marginBottom: '16px' }}>
                      <Div7qp4lh />
                    </div>
                    <Divdjxl322>
                      <Divni9axhe>
                        <div>
                          <WrapperTable>
                            <WrapperCell>
                              <div style={{ marginRight: '8px' }}>{svg.airbnb}</div>
                            </WrapperCell>
                            <WrapperCell>
                              <Div1rbmiub1>© Airbnb, Inc.</Div1rbmiub1>
                            </WrapperCell>
                          </WrapperTable>
                        </div>
                      </Divni9axhe>
                      <Divni9axhe>
                        <Div107ja4p>
                          <Div1ojkieb8>
                            <Div36rlri>
                              <Div1ib6v7sz>
                                <WrapperTable>
                                  <WrapperCell>
                                    <Div1rbmiub1>English</Div1rbmiub1>
                                  </WrapperCell>
                                </WrapperTable>
                              </Div1ib6v7sz>
                            </Div36rlri>
                          </Div1ojkieb8>
                          <Div36rlri>
                            <Div1ib6v7sz>
                              <WrapperTable>
                                <WrapperCell>
                                  <Div1rbmiub1>VND</Div1rbmiub1>
                                </WrapperCell>
                              </WrapperTable>
                            </Div1ib6v7sz>
                          </Div36rlri>
                        </Div107ja4p>
                      </Divni9axhe>
                    </Divdjxl322>
                  </div>
                </Div2h22gn>
              </Div121z06r2>
            </footer>
          </Divazosq83>
        </Divcfvh61>
      </Divr9jh7g>
    );
  }
}
const Divr9jh7g = styled.div`
  background-color: rgb(255, 255, 255) !important;
  color: rgb(72, 72, 72) !important;
  border-top: 1px solid rgb(235, 235, 235) !important;
  border-top-width: 1px !important;
  border-top-style: solid !important;
  border-top-color: rgb(235, 235, 235) !important;
`;

const Divcfvh61 = styled.div`
  display: inherit !important;
`;

const Divazosq83 = styled.div`
  padding-top: 48px !important;
  padding-bottom: 48px !important;
  position: relative !important;
  margin: 0px auto !important;
  padding-left: 24px !important;
  padding-right: 24px !important;
  max-width: 1080px !important;
`;

const Div121z06r2 = styled.div`
  margin: 0px !important;
  word-wrap: break-word !important;
    sans-serif !important;
  font-size: 14px !important;
  font-weight: 600 !important;
  line-height: 1.2857142857142858em !important;
  color: #484848 !important;
`;

const Div2h22gn = styled.div`
  margin-left: -8px !important;
  margin-right: -8px !important;
`;

const Div1t9ulrox = styled.div`
  width: 16.6667% !important;
  float: left !important;
  padding-left: 8px !important;
  padding-right: 8px !important;
  min-height: 1px !important;
  position: relative !important;
`;

const Div1jl220aq = styled.div`
  width: 16.6667% !important;
  float: left !important;
  margin-left: 8.33333% !important;
  padding-left: 8px !important;
  padding-right: 8px !important;
  min-height: 1px !important;
  position: relative !important;
`;

const H414i3z6h = styled.h4`
  color: inherit !important;
  font-size: 1em !important;
  font-weight: inherit !important;
  line-height: inherit !important;
  margin: 0px !important;
  padding: 0px !important;
`;

const Ditw4pe52 = styled.div`
  overflow-wrap: break-word !important;
  font-size: 14px !important;
  font-weight: bold;

  line-height: 1.28571em !important;
  color: rgb(72, 72, 72) !important;
  margin: 0px !important;
`;

const Ulll34wp = styled.ul`
  margin-bottom: 0px !important;
  margin-top: 16px !important;
  padding-left: 0px !important;
  list-style: none !important;
`;

const Lio2jk4c = styled.li`
  margin-bottom: 4px !important;
`;

const A1jrx6hxv = styled.a`
  color: #767676 !important;
  text-decoration: none;
`;

const Span146g3kk = styled.span`
  display: inline-block !important;
  margin-left: 8px !important;
  margin-right: -20px !important;
  line-height: 1 !important;
`;

const Spandphve5f = styled.span`
  display: inline-block !important;
  background-color: rgb(0, 106, 112) !important;
  border-width: 1px !important;
  border-style: solid !important;
  border-color: transparent !important;
  border-image: initial !important;
  border-radius: 4px !important;
  padding: 0px 4px !important;
  overflow-wrap: break-word !important;
  font-size: 12px !important;
  font-weight: 600 !important;
  line-height: 1.33333em !important;
  color: rgb(255, 255, 255) !important;
  margin: 0px !important;
`;

const Lify9czq = styled.li`
  display: inline !important;
  margin-left: -6px !important;
  white-space: nowrap !important;
  vertical-align: middle !important;
`;

const Span1oznos1 = styled.span`
  display: inline-block !important;
  padding-left: 8px !important;
  padding-right: 8px !important;
  vertical-align: middle !important;
`;

const A1rp5252 = styled.a`
  cursor: pointer !important;
  background-color: transparent !important;
  color: buttontext !important;
  display: block !important;
  border-width: 0px !important;
  border-style: initial !important;
  border-color: initial !important;
  border-image: initial !important;
  padding: 0px;
  margin: 0px;
`;

const DivMargin = styled.div`
  margin-top: 16px;
`;

const Div7qp4lh = styled.div`
  border-bottom-width: 1px !important;
  border-bottom-color: #ebebeb !important;
  border-bottom-style: solid !important;
`;

const Divdjxl322 = styled.div`
  display: table !important;
  position: relative !important;
  height: 100% !important;
  width: 100% !important;
`;

const Divni9axhe = styled.div`
  display: table-cell !important;
  vertical-align: middle !important;
`;

const Div7fuu8q = styled.div`
  padding-top: 1px !important;
  white-space: nowrap !important;
`;

const Div1rbmiub1 = styled.div`
  overflow-wrap: break-word !important;
  font-size: 14px !important;
  font-weight: 600 !important;
  line-height: 1.28571em !important;
  color: rgb(118, 118, 118) !important;
  margin: 0px !important;
`;

const Div107ja4p = styled.div`
  float: right !important;
`;

const Div1ojkieb8 = styled.div`
  display: inline-block !important;
  margin-right: 12px !important;
`;

const Div36rlri = styled.div`
  display: inline-block !important;
`;

const Div1ib6v7sz = styled.div`
  display: block !important;
  width: 100% !important;
  cursor: pointer !important;
  position: relative !important;
  border-radius: 3px !important;
  border-width: 1px !important;
  border-style: solid !important;
  border-color: rgb(242, 242, 242) !important;
  border-image: initial !important;
  padding: 8px 12px !important;
`;

export default Footer;
