import { Component } from 'react';

import { SearchBar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Modal } from 'components/Modal/Modal';
import { LoaderDNA } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';

import { Container } from './App.styled';

export class App extends Component {
  state = {
    searchValue: '',
    image: '',
    isLoading: false,
    showLoadMoreBtn: false,
    page: 1,
  };

  increasePage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onHandleSubmit = value => {
    this.setState(prevState => {
      if (prevState.searchValue !== value) {
        return {
          searchValue: value,
          page: 1,
        };
      }
    });
  };

  onImgClick = image => {
    this.setState({
      image: image,
    });
  };

  imageReset = () => {
    this.setState({
      image: '',
    });
  };

  isLoadingToggle = () => {
    this.setState(prevState => ({
      isLoading: !prevState.isLoading,
    }));
  };

  showLoadMoreBtn = () => {
    this.setState({
      showLoadMoreBtn: true,
    });
  };

  hideLoadMoreBtn = () => {
    this.setState({
      showLoadMoreBtn: false,
    });
  };

  render() {
    return (
      <Container>
        <SearchBar onSubmit={this.onHandleSubmit} />

        <ImageGallery
          value={this.state.searchValue}
          page={this.state.page}
          onImgClick={this.onImgClick}
          isLoadingToggle={this.isLoadingToggle}
          showLoadMoreBtn={this.showLoadMoreBtn}
          hideLoadMoreBtn={this.hideLoadMoreBtn}
        />
        {this.state.image && (
          <Modal image={this.state.image} imageReset={this.imageReset} />
        )}

        {this.state.showLoadMoreBtn && !this.state.isLoading && (
          <Button onClickLoadMoreBtn={this.increasePage} />
        )}
        {this.state.isLoading && <LoaderDNA />}
      </Container>
    );
  }
}
