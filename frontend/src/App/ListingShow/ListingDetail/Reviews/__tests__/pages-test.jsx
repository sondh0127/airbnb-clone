import React from 'react';
import { shallow, mount } from 'enzyme';
import Pages from '../pages';

describe('Pages Component', () => {
  const wrapper = mount(
    <Pages
      handleNextClick={() => {}}
      handlePrevClick={() => {}}
      currentPage={0}
      handlePageClick={() => {}}
      numberOfPages={10}
    />
  );

  it('should render without throwing an error', () => {
    expect(wrapper.find('#pages').exists()).toBe(true);
  });

  it('should not render a prev button if current page is zero', () => {
    expect(wrapper.instance().prev()).toBe(null);
  });

  it('should render a prev button if current page is not zero', () => {
    const wrapperPrev = mount(
      <Pages
        handleNextClick={() => {}}
        handlePrevClick={() => {}}
        currentPage={1}
        handlePageClick={() => {}}
        numberOfPages={10}
      />
    );
    expect(wrapperPrev.instance().prev()).toBeTruthy();
  });

  it('should not render a next button if current page is same as total pages', () => {
    const wrapperNext = mount(
      <Pages
        handleNextClick={() => {}}
        handlePrevClick={() => {}}
        currentPage={10}
        handlePageClick={() => {}}
        numberOfPages={10}
      />
    );
    expect(wrapperNext.instance().next()).toBe(null);
  });

  it('should render a next button if current page is not the same as total pages', () => {
    expect(wrapper.instance().next()).toBeTruthy();
  });

  it('should not render beginning dots', () => {
    expect(wrapper.instance().renderBeginningDots()).toBe(null);
  });

  it('should render beginning dots', () => {
    const wrapperBegginingDots = mount(
      <Pages
        handleNextClick={() => {}}
        handlePrevClick={() => {}}
        currentPage={10}
        handlePageClick={() => {}}
        numberOfPages={10}
      />
    );
    expect(wrapperBegginingDots.instance().renderBeginningDots()).toBeTruthy();
  });

  it('should not render ending dots', () => {
    const wrapperEndingDots = mount(
      <Pages
        handleNextClick={() => {}}
        handlePrevClick={() => {}}
        currentPage={10}
        handlePageClick={() => {}}
        numberOfPages={10}
      />
    );
    expect(wrapperEndingDots.instance().renderEndingDots()).toBe(null);
  });

  it('should render ending dots', () => {
    expect(wrapper.instance().renderEndingDots()).toBeTruthy();
  });

  it('should render 3 pages', () => {
    const current = wrapper.instance().props.currentPage;
    expect(wrapper.instance().loop(current, current + 2).length).toBe(3);
  });
});
