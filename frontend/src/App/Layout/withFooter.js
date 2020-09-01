import React from 'react';
import Footer from './Footer';
import styled from 'styled-components';

const S = {
  MainContainer: styled.div`
    width: 100%;
    padding: 24px 24px 0;
    margin: 24px auto 48px;
  `,
  WrapperMain: styled.div`
    width: 568px;
    margin: 0 auto;
    border: 1px solid #dce0e0;
    background-color: #fff;
    border-radius: 0;
    min-width: 450px;
  `,
  DivPadding: styled.div`
    padding: 32px 32px 16px 32px;
  `,
};

export default (WrappedComponent) => {
  return (props) => {
    return (
      <div>
        <S.MainContainer>
          <S.WrapperMain>
            <S.DivPadding>
              <WrappedComponent {...props} />
            </S.DivPadding>
          </S.WrapperMain>
        </S.MainContainer>
        <Footer />
      </div>
    );
  };
};
