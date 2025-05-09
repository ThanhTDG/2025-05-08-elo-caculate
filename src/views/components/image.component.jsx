import React from 'react';
import defaultNoImage from '../../assets/no-image.png';

const noImage = {
    src: defaultNoImage,
    alt: 'No image available',
    className: 'no-image-class',
}

ImageComponent.defaultProps = noImage;
export default function ImageComponent({ src, alt, className }) {
    console.log(src);

    const addDefaultSrc = (ev) => {
        ev.target.src = defaultNoImage;
    };
    return (
        <img
            onError={addDefaultSrc}
            src={src || noImage.src}
            alt={alt || noImage.alt}
            className={className || noImage.className}
        />
    );
}
