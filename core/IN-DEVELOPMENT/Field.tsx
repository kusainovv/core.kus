/**
 * 
 * Everything that u see in this file
 * only for me
 * these components in development now
 * (accept this, as isn't the example of BEST code)
 */

import styled from "@emotion/styled";

export type Style = { [x: string]: string };
 
type MakeStylesForFieldDataOutput = { customElements: Style[], customStylesForShadowDOM: Style[]  } | string | Style[];

type StyleForField = <T, R = unknown>( type: HTMLInputElement['type'], customElements: T extends Style[] ? Style[] : undefined, customStylesForShadowDOM: R extends undefined ? undefined : Style[]) => MakeStylesForFieldDataOutput;

export const makeStylesForField : StyleForField = (type, customElements, customStylesForShadowDOM) => {
    if (typeof customElements !== 'undefined' && typeof customStylesForShadowDOM !== 'undefined') {
        console.warn(
            `
            &[type="${type}"] {
                ${ customElements.map(c => `${Object.keys(c)[0]}: ${Object.values(c)[0]};`) }
                ${ 
                    type === 'file' 
                    ? `
                        ::-webkit-file-upload-button {
                            ${ customStylesForShadowDOM.map(c => c) }
                        }    
                    ` 
                    : ''
                }
            }
        `
        )
        return `
            &[type="${type}"] {
                ${ customElements.map(c => `${Object.keys(c)[0]}: ${Object.values(c)[0]};`) }
                ${ 
                    type === 'file' 
                    ? `
                        ::-webkit-file-upload-button {
                            ${ customStylesForShadowDOM.map(c => c) }
                        }    
                    ` 
                    : ''
                }
            }
        `;
    }

    const style = customElements ?? customStylesForShadowDOM;

    return style === undefined ? '' : style;
}

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    customStylesForShadowDOM: Style[],
    customStyles: Style[],
}

const Input = styled.input<{ type: HTMLInputElement['type'], customStyles?: Style[], customStylesForShadowDOM?: Style[] }>`
    ${ (props) => makeStylesForField<typeof props.customStyles, typeof props.customStylesForShadowDOM>(props.type, props.customStyles, props.customStylesForShadowDOM) }
`;


export const Field = (props: FieldProps) => {
    switch(props.type) {
        case 'file':
            return <Input type='file' customStyles={props.customStyles} customStylesForShadowDOM={props.customStylesForShadowDOM} />
        default:
            return <Input type='text' />
    }
}