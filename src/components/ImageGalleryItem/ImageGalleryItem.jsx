import { Component } from 'react';

import { Item, Img } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  render() {
    return (
      <Item onClick={() => this.props.onImgClick(this.props.image)}>
        <Img src={this.props.image.webformatURL} alt={this.props.image.tags} />
      </Item>
    );
  }
}
