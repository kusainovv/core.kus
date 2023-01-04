export const visibility = {

    hidde: () => {
        return `
            visibility: hidden;
            opacity: 0;
        `
    },


    show: () => {
        return `
            visibility: visible;
            opacity: 1;
        ` 
    }

}