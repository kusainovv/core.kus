import styled from '@emotion/styled'
import { media } from '../../core/utils/media';

export const AllSchedulesContainer = styled.div`
    display: grid;
    grid-template-columns: 70px repeat(6, 1fr);
    gap: 8px;
    margin-top: 20px;

    &:not(:last-child) {
        margin-bottom: 80px;
    }
`;

export const Block = styled.div<{light?: boolean}>`
    display: flex;
    justify-content: ${({light}) => light? 'space-between' : 'center'};
    align-items: ${({light}) => light? 'flex-start' : 'center'};
    flex-flow: column nowrap;

    background: ${({light}) => light? 'rgba(161, 182, 204, 0.19)' : 'rgba(224, 224, 224, 0.6)'}; 
    padding: 10px;

    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    text-align: ${({light}) => light? 'left' : 'center'};

    color: rgba(0, 0, 0, 0.6);

    & .text-black {
        color: #202020;
        font-weight: 500;
    }

    ${media.laptop} {
        font-size: 12px;
    }

    ${media.tablet} {
        font-size: 10px;
    }
`;

export const Title = styled.a`
    font-style: normal;
    font-weight: bold;
    text-decoration: none;
`;

export const Tutor = styled.div`
    font-style: italic;
    font-weight: normal;
    line-height: 121%;

`;

export const ShortTitle = styled.div`
    margin-top: 25px;

    font-style: normal;
    font-weight: bold;
`;

export const ScheduleBlock = styled.div`
    display: grid;
    grid-template-rows: 1fr max-content;
    grid-auto-flow: column;
    gap: 2px;
`;

export const AddToCalendarButton = styled.div`
    background: rgba(161, 182, 204, 0.19); 

    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 187.6%;

    text-align: center;
    text-transform: uppercase;

    padding: 7px;
    cursor: pointer;
`;
