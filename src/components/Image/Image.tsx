import React, { useState } from 'react';

interface ImageProps {
	src: string;
	fallbackSrc: string;
	alt: string;
	className?: string;
}

const Image: React.FC<ImageProps> = ({ src, fallbackSrc, alt, className }) => {
	const [imgSrc, setImgSrc] = useState(src);

	const handleError = () => {
		setImgSrc(fallbackSrc);
	};

	return <img src={imgSrc} alt={alt} onError={handleError} className={className} />;
};

export default Image;