import { connect } from 'react-redux';
import Footer from '../../components/Splash/Footer';

import { toggleFooter } from '../../store/actions/actions';

const mapStateToProps = (state) => ({
  isFooterVisible: state.homepageReducer.isFooterVisible,
});

const mapDispatchToProps = (dispatch) => ({
  toggleFooter: () => dispatch(toggleFooter()),
});

const FooterContainter = connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);

export default FooterContainter;
