const mediaMaxWidth = (width: number) => {
    return `@media (max-width: ${width}px)`;
}

const mediaMinWidth = (width: number) => {
    return `@media (min-width: ${width}px)`;
}

export const media = {
    desktop: mediaMaxWidth(3000),
    laptop: mediaMaxWidth(1100),
    tablet: mediaMaxWidth(780),
    phone: mediaMaxWidth(600),

    n: {
        desktop: '3000px', 
        laptop: '1100px', 
        tablet: '780px', 
        phone: '600px', 
    },

    px: {
        desktop: 3000,
        laptop: 1100,
        tablet: 780,
        phone: 600,
    },

    minWidth: {
        desktop: mediaMinWidth(3000),
        laptop: mediaMinWidth(1100),
        tablet: mediaMinWidth(780),
        phone: mediaMinWidth(600),
    }
}
