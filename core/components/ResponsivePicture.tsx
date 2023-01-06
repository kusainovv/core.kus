import styled from "@emotion/styled";
import React from "react";
import { ResponsivePictureProps } from "./typing";

const Picture = styled.picture`
    height: 1601px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
`;

/**
 * @desktop src for desktop
 * @laptop src for laptop
 * @mobile src for mobile
 * @alt native attribute alt
 * @order number of picture
 * @createRef function for registr a ref
 * @desktopQuery media query when size changed and src changed in desktop
 * @laptopQuery media query when size changed and src changed in laptop
 * @mobileQuery media query when size changed and src changed in mobile
 */
export const ResponsivePicture = (props: ResponsivePictureProps) => {
    return <Picture { ...props.extraProps } ref={props.createRef} data-order={props.order}>
        <source srcSet={props.desktop} media={`(min-width: ${props.desktopQuery})`} type='image/webp' />
        <source srcSet={props.laptop} media={`(min-width: ${props.laptopQuery})`} type='image/webp' />
        <source srcSet={props.mobile} media={`(min-width: ${props.mobileQuery})`} type='image/webp' />
        <Image alt={props.alt} src={props.desktop} />
    </Picture>
}