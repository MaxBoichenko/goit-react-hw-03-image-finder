import { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Searchbar,
  Form,
  Button,
  ButtonLabel,
  Input,
} from './Searchbar.styled';

export class SearchBar extends Component {
  state = {
    value: '',
  };

  handleInput = event => {
    this.setState({
      value: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.value) {
      this.props.onSubmit(this.state.value.toLowerCase().trim());
      this.resetForm();
    }
  };

  resetForm = () => {
    this.setState({
      value: '',
    });
  };

  render() {
    return (
      <Searchbar>
        <Form onSubmit={this.handleSubmit}>
          <Button type="submit">
            <ButtonLabel>Search</ButtonLabel>
          </Button>

          <Input
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInput}
            value={this.state.value}
          />
        </Form>
      </Searchbar>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
