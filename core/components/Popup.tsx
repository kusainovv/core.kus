import styled from "@emotion/styled";
import React, { MouseEventHandler, ReactNode } from "react";
import { visibility } from "../utils/visibility";
import { ZIndex } from "./ZIndex";

const PopUpContent = styled.div`
    z-index: 101;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: auto;
    height: auto;
    
    position: absolute;
    background-color: blue;
`;

const CloseZone = styled.div<{ backgroundCloseZone: string }>`
    z-index: 100;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: ${ props => props.backgroundCloseZone };
`;

const PopUpVisibility = styled.div<{ isOpened: boolean, transition: string }>`
    ${ props => props.isOpened ? visibility.show() : visibility.hidde() }
    transition: ${ props => props.transition };
`;


interface PopupProps {
    backgroundCloseZone: string,
    isOpened: boolean,
    children: ReactNode,
    onCloseHandler: MouseEventHandler<HTMLDivElement>,
    transition: string
}

export const Popup : React.FC<PopupProps> = ({ children, isOpened, backgroundCloseZone, onCloseHandler, transition }) => {
    return <ZIndex>
        <PopUpVisibility isOpened={isOpened} transition={transition}>
            <PopUpContent>
                {children}
            </PopUpContent>

            <CloseZone backgroundCloseZone={backgroundCloseZone} onClick={onCloseHandler} />
        </PopUpVisibility>
    </ZIndex>
}