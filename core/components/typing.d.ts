export interface ResponsivePictureProps {
    desktop: string,
    laptop: string,
    mobile: string,
    alt: string,
    order: number,
    createRef: () => void,
    extraProps?: Record<string, any>,

    desktopQuery: string,
    laptopQuery: string,
    mobileQuery: string
}