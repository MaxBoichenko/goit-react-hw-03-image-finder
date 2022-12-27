import { Component } from 'react';
import PropTypes from 'prop-types';

import { StyledButton } from './Button.styled';

export class Button extends Component {
  render() {
    return (
      <StyledButton onClick={this.props.onClickLoadMoreBtn} type="button">
        Load more
      </StyledButton>
    );
  }
}

Button.propTypes = {
  onClickLoadMoreBtn: PropTypes.func.isRequired,
};
