import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import Modal from '@material-ui/core/Modal';

import { S, Svg } from './styled';
import Signup from './Signup';
import Login from './Login';
import Password from './Password';
import {
  MODAL_CONTENT,
  setModalContent,
  toggleLoginSignupModal,
} from '../../store/actions/NavActions';

const WrappedModal = ({
  modalContent,
  setModalContent,
  open,
  toggleLoginSignupModal,
}) => {
  const modal = () => {
    switch (modalContent) {
      case MODAL_CONTENT.SIGN_UP:
        return <Signup setLogin={() => setModalContent(MODAL_CONTENT.LOGIN)} />;
      case MODAL_CONTENT.LOGIN:
        return (
          <Login
            setSignUp={() => setModalContent(MODAL_CONTENT.SIGN_UP)}
            setPassword={() => setModalContent(MODAL_CONTENT.PASSWORD)}
          />
        );
      case MODAL_CONTENT.PASSWORD:
        return <Password setLogin={() => setModalContent(MODAL_CONTENT.LOGIN)} />;
      default:
        return null;
    }
  };

  return (
    <Modal
      aria-labelledby="login-modal"
      aria-describedby="login-modal-description"
      open={open}
      onClose={toggleLoginSignupModal}
    >
      <S.Modal>
        <S.DivPaper>
          <S.DivCloseButton>
            <S.Fab onClick={toggleLoginSignupModal}>{Svg.close}</S.Fab>
          </S.DivCloseButton>
          {modal()}
          <Divider />
        </S.DivPaper>
      </S.Modal>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  open: state.NavReducer.modalOpen,
  modalContent: state.NavReducer.modalContent,
});

const mapDispatchToProps = {
  setModalContent: (modal) => setModalContent(modal),
  toggleLoginSignupModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedModal);

WrappedModal.propTypes = {
  modalContent: PropTypes.string,
  open: PropTypes.bool.isRequired,
  setModalContent: PropTypes.func.isRequired,
  toggleLoginSignupModal: PropTypes.func.isRequired,
};
