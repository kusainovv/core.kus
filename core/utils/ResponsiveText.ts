export interface ResponsiveTextProps {
    min_font_size: number,
    max_font_size: number,
    max_screen_width: string,
    min_screen_width: string,
    max_layout_width: number,
    min_layout_width: number
}

export const ResponsiveText = ({
    min_font_size,
    max_font_size,
    max_screen_width = '100vw',
    min_screen_width,
    max_layout_width,
    min_layout_width} : ResponsiveTextProps) => {
    return `font-size: calc(${min_font_size} + (${max_font_size} - ${min_font_size}) * ((${max_screen_width} - ${min_screen_width}) / (${max_layout_width} - ${min_layout_width})))`;
}