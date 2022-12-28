import { Component } from 'react';

import { SearchBar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Modal } from 'components/Modal/Modal';
import { LoaderDNA } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { fetchImages } from '../../services/Api.js';

import { Container } from './App.styled';

export class App extends Component {
  state = {
    searchValue: '',
    image: '',

    images: [],
    page: 1,
    perPage: 12,
    error: '',
    totalImg: 0,

    isLoading: false,
    showLoadMoreBtn: false,
    isEmpty: true,
  };

  componentDidUpdate(_, prevState) {
    if (
      this.state.searchValue !== prevState.searchValue ||
      this.state.page !== prevState.page
    ) {
      this.isLoadingToggle();

      fetchImages(this.state.searchValue, this.state.page, this.state.perPage)
        .then(images => {
          this.showLoadMoreBtn(images.total);

          return this.setState(prevState => {
            return {
              images: [...prevState.images, ...images.hits],
              totalImg: images.totalHits,
            };
          });
        })
        .catch(error => this.setState({ error }))
        .finally(() => {
          this.isLoadingToggle();

          this.setState({
            isEmpty: false,
          });
        });
    }
  }

  increasePage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
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

  showLoadMoreBtn = totalImages => {
    if (
      Math.ceil(totalImages / this.state.perPage) === this.state.page ||
      Math.ceil(totalImages / this.state.perPage) === 0
    ) {
      this.setState({
        showLoadMoreBtn: false,
      });
      return;
    }

    this.setState({
      showLoadMoreBtn: true,
    });
  };

  onHandleSubmit = value => {
    if (this.state.searchValue === value) {
      return;
    }

    this.setState({
      searchValue: value,
      page: 1,
      images: [],
    });
  };

  render() {
    return (
      <Container>
        <SearchBar onSubmit={this.onHandleSubmit} />

        {this.state.isEmpty && !this.state.isLoading && <p>Введите что-то</p>}

        {!this.state.isEmpty &&
          !this.state.isLoading &&
          this.state.images.length === 0 && (
            <p>По результату поиска {this.props.value} не найдено</p>
          )}

        {this.state.images.length > 0 && (
          <ImageGallery
            images={this.state.images}
            onImgClick={this.onImgClick}
          />
        )}

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
