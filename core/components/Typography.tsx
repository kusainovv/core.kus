import React, { ReactNode } from "react";
import styled from '@emotion/styled';
import { ResponsiveText, ResponsiveTextProps } from "../utils/ResponsiveText";

export const Typography = () => {
    return <></>
}


// config for responsive text
const ResponsiveTextConfig = {
    max_screen_width: '1600px',
    min_screen_width: '320px',
    max_layout_width: 1600, 
    min_layout_width: 320
}


const Paragraph = styled.p<{ fontSize: string }>`
    margin: 0;
    ${ props => props.fontSize }
`;




interface FlexTextProps extends ResponsiveTextProps {
    nativeTag: TextVariant,
    text: string | ReactNode,
    role: TextVariant
}
/**
 * @param nativeTag - native tag which define the text behaviour
*/
const FlexText : React.FC<FlexTextProps> = (props) => {
    const { min_font_size, max_font_size, max_screen_width, min_screen_width, max_layout_width, min_layout_width } = props;
    return <Paragraph fontSize={ResponsiveText({ min_font_size, max_font_size, max_screen_width, min_screen_width, max_layout_width, min_layout_width })} role={props.role}>
        {props.text}
    </Paragraph>
}




type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
interface TitleProps {
    type: TextVariant,
    text: string
}
/**
 * @param type - type for h* tag (e.g. h1) 
 * @returns h* tag or empty tag with error
 */
const Title : React.FC<TitleProps> = (props) => {
    switch(props.type) {
        case 'h1':
            return <FlexText nativeTag='h1' min_font_size={14} max_font_size={32} {...ResponsiveTextConfig} text={props.text} role={'h1'} />
        case 'h2':
            return <FlexText nativeTag='h2' min_font_size={11} max_font_size={26} {...ResponsiveTextConfig} text={props.text} role={'h2'} />
        case 'h3':
            return <FlexText nativeTag='h3' min_font_size={11} max_font_size={24} {...ResponsiveTextConfig} text={props.text} role={'h3'} />
        case 'h4':
            return <FlexText nativeTag='h4' min_font_size={9} max_font_size={22} {...ResponsiveTextConfig} text={props.text} role={'h4'} />
        case 'h5':
            return <FlexText nativeTag='h5' min_font_size={9} max_font_size={20} {...ResponsiveTextConfig} text={props.text} role={'h5'} />
        case 'h6':
            return <FlexText nativeTag='h6' min_font_size={9} max_font_size={18} {...ResponsiveTextConfig} text={props.text} role={'h6'} />
        default:
            new Error('No existing type for title');
            return <></>
    }
}


const Text : React.FC<{ text: ReactNode | string }> = (props) => {
    return <FlexText nativeTag='p' text={props.text} min_font_size={11} max_font_size={18} {...ResponsiveTextConfig} role={'p'} />
}




Typography.Title = Title;
Typography.Text = Text;