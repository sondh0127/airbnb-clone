import { connect } from 'react-redux';

import Featured from './Featured/Featured';

const mapStateToProps = (state) => ({
  destinations: state.homepageReducer.destinations,
  places: state.homepageReducer.places,
});

const mapDispatchToProps = (dispatch) => ({});

const FeaturedContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Featured);

export default FeaturedContainer;
