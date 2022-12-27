import { Component } from 'react';
import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import { List } from './ImageGallery.styled';

export class ImageGallery extends Component {
  state = {
    images: [],
    error: '',
    status: 'idle',
    totalImg: 0,
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.value !== prevProps.value ||
      this.props.page !== prevProps.page
    ) {
      this.props.isLoadingToggle();

      if (this.props.value !== prevProps.value) {
        this.setState({
          images: [],
          status: '',
        });
      }

      fetch(
        `https://pixabay.com/api/?q=${this.props.value}&page=${this.props.page}&key=32379374-a9b345354aebc47310028ca20&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => {
          if (res.ok) {
            return res.json();
          }

          return Promise.reject(new Error('Ой, что-то пошло не так :('));
        })
        .then(images => {
          this.props.showLoadMoreBtn();

          if (
            Math.ceil(images.total / 12) === this.props.page ||
            Math.ceil(images.total / 12) === 0
          ) {
            this.props.hideLoadMoreBtn();
          }

          return this.setState(prevState => {
            if ([...prevState.images, ...images.hits].length === 0) {
              return {
                images: [...prevState.images, ...images.hits],
                status: 'empty',
                totalImg: images.total,
              };
            }
            return {
              images: [...prevState.images, ...images.hits],
              status: 'resolved',
              totalImg: images.total,
            };
          });
        })
        .catch(error => this.setState({ error, status: 'rejected' }))
        .finally(() => {
          this.props.isLoadingToggle();
        });
    }
  }

  render() {
    if (this.state.status === 'idle') {
      return <p>Введите что-то</p>;
    }

    if (this.state.status === 'rejected') {
      return <p>{this.state.error.message}</p>;
    }
    if (this.state.status === 'empty') {
      return <p>По результату поиска {this.props.value} не найдено</p>;
    }

    if (this.state.status === 'resolved') {
      return (
        <List>
          {this.state.images.length > 0 &&
            this.state.images.map(image => {
              return (
                <ImageGalleryItem
                  key={image.id}
                  image={image}
                  onImgClick={this.props.onImgClick}
                />
              );
            })}
        </List>
      );
    }
  }
}

ImageGallery.propTypes = {
  value: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  onImgClick: PropTypes.func.isRequired,
  isLoadingToggle: PropTypes.func.isRequired,
  showLoadMoreBtn: PropTypes.func.isRequired,
  hideLoadMoreBtn: PropTypes.func.isRequired,
};
