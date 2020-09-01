import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { S } from './AddListingStyled';
import ProgressBar from './ProgressBar';
import NavigationBar from './NavigationBar';

import PageRoom from './Step1Pages/PageRoom';
import PageBedrooms from './Step1Pages/PageBedrooms';
import PageBathRooms from './Step1Pages/PageBathRooms';
import PageAddresses from './Step1Pages/PageAddresses';
import PageLocation from './Step1Pages/PageLocation';
import PageAmenities from './Step1Pages/PageAmenities';
import PageSpaces from './Step1Pages/PageSpaces';

import PagePhoto from './Step2Pages/PagePhoto';
import PageDescription from './Step2Pages/PageDescription';
import PageTitle from './Step2Pages/PageTitle';

import PageGuestRequirements from './Step3Pages/PageGuestRequirements';
import PageHouseRules from './Step3Pages/PageHouseRules';
import PageAvailabilitySettings3 from './Step3Pages/PageAvailabilitySettings3';
import PageCalendar from './Step3Pages/PageCalendar';
import PagePrice from './Step3Pages/PagePrice';
import { connect } from 'react-redux';
import {
  fetchListing,
  createListing,
  updateListing,
} from '../../store/actions/ListingActions';

const STEPS = {
  step1: {
    title: 'Step 1: Start with the basics',
    pages: [
      { path: 'room', label: 'Place type', component: PageRoom },
      { path: 'bedrooms', label: 'Bedrooms', component: PageBedrooms },
      { path: 'bathrooms', label: 'Baths', component: PageBathRooms },
      { path: 'location', label: 'Location', component: PageAddresses },
      { path: 'location', label: 'Location', component: PageLocation },
      { path: 'amenities', label: 'Amenities', component: PageAmenities },
      { path: 'spaces', label: 'Share Spaces', component: PageSpaces },
    ],
  },
  step2: {
    title: 'Step 2: Set the scene',
    pages: [
      { path: 'photos', label: 'Photos', component: PagePhoto, fullWidth: true },
      { path: 'description', label: 'Description', component: PageDescription },
      { path: 'title', label: 'Title', component: PageTitle },
    ],
  },
  step3: {
    title: 'Step 3: Get ready for guests',
    pages: [
      {
        path: 'guest_requirements',
        label: 'Guest Requirements',
        component: PageGuestRequirements,
      },
      { path: 'house_rules', label: 'House Rules', component: PageHouseRules },
      {
        path: 'availability',
        label: 'Availability',
        component: PageAvailabilitySettings3,
      },
      { path: 'calendar', label: 'Calendar', component: PageCalendar, fullWidth: true },
      { path: 'price', label: 'Price', component: PagePrice },
    ],
  },
};
export class AddListing extends Component {
  static propTypes = {
    listing: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      stepKey: 'step1',
      isUpdate: false,
      title: '',
      pages: [],
      pageIndex: 0,
      multipleIndex: -1,
      loadMultiple: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { match } = props;
    const pagePath = match.params.page;
    const isUpdate = !!match.params.listingId;
    const stepKey = Object.keys(STEPS).find((key) =>
      STEPS[key].pages.map((p) => p.path).includes(pagePath)
    );

    const { title, pages } = STEPS[stepKey];
    const firstIndex = pages.slice().findIndex((page) => page.path === pagePath);
    let lastIndex = pages
      .slice()
      .reverse()
      .findIndex((page) => page.path === pagePath);
    lastIndex = lastIndex >= 0 ? pages.length - 1 - lastIndex : lastIndex;

    let multipleIndex, loadMultiple;

    if (lastIndex !== firstIndex) {
      loadMultiple = true;
      multipleIndex =
        state.loadMultiple && state.multipleIndex >= 0
          ? state.multipleIndex
          : lastIndex - firstIndex;
    } else {
      // reset
      multipleIndex = -1;
      loadMultiple = false;
    }

    const pageIndex = isUpdate
      ? firstIndex + (multipleIndex >= 0 ? multipleIndex : 0)
      : firstIndex;

    return {
      ...state,
      isUpdate,
      title,
      pages,
      pageIndex,
      multipleIndex,
      loadMultiple,
      stepKey,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    if (match.params.listingId) {
      this.props.fetchListing(match.params.listingId);
    }
  }

  nextPage = (formikProps) => {
    const { pages, pageIndex, isUpdate, multipleIndex, stepKey } = this.state;
    const { completed } = formikProps.values;
    const page = pages[Math.max(pageIndex + multipleIndex, 0)];

    if (multipleIndex >= 0) {
      this.setState({ multipleIndex: multipleIndex + 1 });
    }
    if (page.path === 'location' && !isUpdate) {
      this.setState({ multipleIndex: -1 });
      formikProps.handleSubmit();
    } else {
      // Update completed
      const newCompleted = Math.ceil(
        Math.max(((pageIndex + 1) / pages.length) * 100, completed[stepKey])
      );

      formikProps.setFieldValue(`completed.${stepKey}`, newCompleted);
      if (pages.length === pageIndex + 1) {
        this.props.updateListing({
          ...formikProps.values,
          completed: {
            ...formikProps.values.completed,
            [stepKey]: newCompleted,
          },
        });
      }
    }
  };

  prevPage = () => {
    const { multipleIndex } = this.state;
    if (multipleIndex >= 0) {
      this.setState({ multipleIndex: multipleIndex - 1 });
    }
  };

  getFullPath = (newIndex) => {
    const { pages, pageIndex } = this.state;
    const { match } = this.props;
    return match.url.replace(
      `/${pages[pageIndex].path}`,
      pages[newIndex] ? `/${pages[newIndex].path}` : ''
    );
  };
  handleUpdate = (formikProps) => {
    const { updateListing, history, match } = this.props;
    const { pages, pageIndex } = this.state;
    updateListing(formikProps.values);
    history.push(match.url.replace(`/${pages[pageIndex].path}`, ''));
  };

  render() {
    const { listing, history, createListing } = this.props;
    const { title, pages, pageIndex, isUpdate, stepKey } = this.state;

    const page = pages[pageIndex];

    const PageRenderComponent = page.component;
    const fullWidth = page.fullWidth ? true : false;

    const nextPath = this.getFullPath(pageIndex + 1);
    const prevPath = this.getFullPath(pageIndex - 1);

    return (
      <div>
        <Formik
          enableReinitialize
          initialValues={listing}
          validationSchema={Yup.object({
            room_type: Yup.string().required('Room type is a required field'),
            country: Yup.string().required('Country is a required field'),
            street: Yup.string().required('Street is a required field'),
            city: Yup.string().required('City is a required field'),
          })}
          validate={(values) => {
            let errors = {};
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            const id = await createListing(values);
            history.push(`/become-a-host/${id}/location`);
            setSubmitting(false);
          }}
          render={(formikProps) => {
            return (
              <>
                <ProgressBar
                  completed={formikProps.values.completed[stepKey]}
                  title={title}
                  handleSubmit={() => this.handleUpdate(formikProps)}
                  history={history}
                  isUpdate={isUpdate}
                  pages={pages}
                />
                <Form autoComplete="off">
                  <S.Wrapper>
                    <S.Wrapper1 fullWidth={fullWidth}>
                      <S.WrapperForm>
                        <PageRenderComponent {...formikProps} />
                      </S.WrapperForm>
                    </S.Wrapper1>
                  </S.Wrapper>
                </Form>
                <NavigationBar
                  nextPath={nextPath}
                  prevPath={prevPath}
                  fullWidth={fullWidth}
                  nextPage={() => this.nextPage(formikProps)}
                  prevPage={this.prevPage}
                  nextText={pageIndex === pages.length - 1 ? `Finish` : `Next`}
                />
              </>
            );
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  listing: state.ListingReducer.listing,
});

const mapDispatchToProps = {
  fetchListing,
  createListing,
  updateListing,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddListing)
);
