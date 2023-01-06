import styled from '@emotion/styled';
import React, { createRef, RefObject, useEffect, useState } from 'react';
import { ResponsivePicture } from './ResponsivePicture';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const Skeleton = styled.div`
    height: 100%;
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

/**
 * @images - images for lazy loading
 * @desktopQuery - define the media query when image must resize for desktop
 * @laptopQuery - define the media query when image must resize for laptop
 * @mobileQuery - define the media query when image must resize for mobile
*/
export const LazyLoadImages = (props: LazyLoadImagesProps) => {

    const [currentImage, setCurrentImage] = useState(0);
    const viewedImages : RefObject<HTMLPictureElement | null>[] = [];


    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((imageView) => {
                setCurrentImage(
                    imageView.isIntersecting 
                      // use data-order attribute for define current slide/picture
                    ? Number(imageView.target.getAttribute("data-order"))
                    : entries[0].boundingClientRect.y > 0 ? currentImage - 1 : currentImage + 1)})
        });

        // hidde other images if they're at user view
        viewedImages.forEach(img => typeof img !== 'undefined' && img.current ? observer.observe(img.current) : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentImage]);


    // register a new picture
    const showNextPicture = () => {
        const image = createRef();
        viewedImages.push(image as RefObject<HTMLPictureElement>);
        return image as RefObject<HTMLPictureElement>;
    }

    return <Wrapper>
        {
            props.images.map((image: LazyLoadImage, key: number) => {
                return currentImage === key 
                    ? <React.Fragment key={key}>
                        <ResponsivePicture desktop={image.desktop} laptop={image.laptop} 
                            mobile={image.mobile} alt={image.alt} 
                            createRef={showNextPicture} order={key}
                            desktopQuery={props.desktopQuery}
                            laptopQuery={props.laptopQuery}
                            mobileQuery={props.mobileQuery} />
                     </React.Fragment>
                    : <Skeleton key = {key} />
            })
        }
    </Wrapper>
};

