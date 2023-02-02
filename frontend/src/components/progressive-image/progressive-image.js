import { useState, useEffect } from "react";
import { Image as BootstrapImage } from "react-bootstrap";

const ProgressiveImage = ({ placeholderImage, src, alt='', width='', className='' }) => {
  const [imgSrc, setImgSrc] = useState(placeholderImage || src);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
    };
  }, [src]);

  return (
    <BootstrapImage
      src={imgSrc}
      alt={alt}
      width= {width}
      className={className}
    />
  );
};
export default ProgressiveImage;
