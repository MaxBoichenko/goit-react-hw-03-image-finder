import { Component } from 'react';
import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import { List } from './ImageGallery.styled';

export class ImageGallery extends Component {
  render() {
    return (
      <List>
        {this.props.images.map(image => {
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

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
  onImgClick: PropTypes.func.isRequired,
};
