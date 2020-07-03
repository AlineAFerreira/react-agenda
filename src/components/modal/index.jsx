import React from "react";
import Modal from 'react-modal';
import './modal.css';

Modal.setAppElement('#root');
export default class AgendaModal extends React.PureComponent {

  afterOpenModal = () => {
    if (this.props.afterOpenModal) {
        this.props.afterOpenModal();
    }
  }

  closeModal = () => {
    if (this.props.onRequestClose) {
        this.props.onRequestClose();
    }
  }

  render() {

    return (
        <Modal
          setAppElement={'#yourAppElement'}
          isOpen={this.props.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          className="modal-agenda"
          overlayClassName="modal-overlay"
          style={{ zIndex: 99999 }}
          contentLabel="Example Modal"
        >
          {this.props.children}
        </Modal>

    )
  }
}