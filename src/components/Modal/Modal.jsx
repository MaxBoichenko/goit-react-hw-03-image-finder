import { Component } from 'react';
import PropTypes from 'prop-types';

import { Overlay, ModalContainer } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onEsc);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEsc);
  }

  onEsc = event => {
    if (event.key === 'Escape') {
      this.props.imageReset();
    }
  };
  onOverlayClick = event => {
    if (event.target.getAttribute('name') === 'overlay') {
      this.props.imageReset();
    }
  };

  render() {
    return (
      <Overlay onClick={this.onOverlayClick} name="overlay">
        <ModalContainer>
          <img
            src={this.props.image.largeImageURL}
            alt={this.props.image.tags}
          />
        </ModalContainer>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,

  imageReset: PropTypes.func.isRequired,
};
