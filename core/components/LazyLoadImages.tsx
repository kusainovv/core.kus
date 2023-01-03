import styled from '@emotion/styled';
import React, { createRef, RefObject, useEffect, useState } from 'react';
import { ResponsivePicture } from './ResponsivePicture';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const Skeleton = styled.div`
    height: 1601px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

interface LazyLoadImage {
    desktop: string,
    laptop: string,
    mobile: string,
    alt: string,
}

interface LazyLoadImagesProps {
    images: LazyLoadImage[],

    desktopQuery: string,
    laptopQuery: string,
    mobileQuery: string
}

export const LazyLoadImages = (props: LazyLoadImagesProps) => {

    const [currentImage, setCurrentImage] = useState(0);
    const viewedImages : RefObject<HTMLPictureElement | null>[] = [];


    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((imageView) => {
                setCurrentImage(
                    imageView.isIntersecting 
                    ? Number(imageView.target.getAttribute("data-order"))
                    : entries[0].boundingClientRect.y > 0 ? currentImage - 1 : currentImage + 1)})
        });

        viewedImages.forEach(img => typeof img !== 'undefined' && img.current ? observer.observe(img.current) : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentImage]);


    const showNextPicture = () => {
        const image = createRef();
        viewedImages.push(image as RefObject<HTMLPictureElement>);
        return image as RefObject<HTMLPictureElement>;
    }

    return  <Wrapper>
        {
            props.images.map((image: LazyLoadImage, key: number) => {
                if (currentImage === key) {
                    return <React.Fragment key={key}>
                        <ResponsivePicture desktop={image.desktop} laptop={image.laptop} 
                            mobile={image.mobile} alt={image.alt} 
                            createRef={showNextPicture} order={key}
                            desktopQuery={props.desktopQuery}
                            laptopQuery={props.laptopQuery}
                            mobileQuery={props.mobileQuery}               
                        />
                     </React.Fragment>}
                 return <Skeleton key = {key} />
            })
        }
    </Wrapper>
};

