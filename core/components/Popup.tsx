import styled from "@emotion/styled";
import React, { MouseEventHandler, ReactNode } from "react";
import { visibility } from "../utils/visibility";
import { ZIndex } from "./ZIndex";

const PopUpContent = styled.div<{ backgroundContent: string }>`
    z-index: 101;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: auto;
    height: auto;
    
    position: absolute;
    background-color: ${ props => props.backgroundContent };
`;

const CloseZone = styled.div<{ backgroundColorCloseZone: string }>`
    z-index: 100;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: ${ props => props.backgroundColorCloseZone };
`;

const PopUpVisibility = styled.div<{ isOpened: boolean, transition: string }>`
    ${ props => props.isOpened ? visibility.show() : visibility.hidde() }
    transition: ${ props => props.transition };
`;

interface PopupProps {
    backgroundColorCloseZone: string,
    isOpened: boolean,
    children: ReactNode,
    onCloseHandler: MouseEventHandler<HTMLDivElement>,
    transition: string,
    backgroundContent: string,
    chooseOnly: boolean,
}

/**
 * @backgroundCloseZone background for close zone
 * @isOpened is show pop up
 * @onCloseHandler function for close zone handler
 * @transition transition for hidde pop up
 * @backgroundContent background for pop up content
 * @chooseOnly disable close zone and close pop up only when chooseOnly was called
*/
export const Popup : React.FC<PopupProps> = (props) => {
    return <ZIndex>
        <PopUpVisibility isOpened={props.isOpened} transition={props.transition}>
            <PopUpContent backgroundContent={props.backgroundContent}>
                {props.children}
            </PopUpContent>

            <CloseZone backgroundColorCloseZone={props.backgroundColorCloseZone} onClick={ props.chooseOnly ? () => {} : props.onCloseHandler} />
        </PopUpVisibility>
    </ZIndex>
}