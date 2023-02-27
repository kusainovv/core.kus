import styled from '@emotion/styled';
import React, { useState } from 'react';


const Content = styled.div`
    display: flex;
    align-items: center;
`;
const Wrapper = styled.div`
    display: flex;
    align-items: center;
`;
const OrderItem = styled.span<{ isActive: boolean }>`
    margin: 0 12px;
    min-width: 15px;
    min-height: 15px;
    font-weight: ${ props => props.isActive ? '800' : '300' };
    cursor: pointer;
    text-align: center;
`;


// TODO: когда будет мержить возьми ровну эту же функцию из datepicker(экспортируй)
const CreateNavigationArrow = ({
    direction,
    switchNavigation,
    isDisabled
}: {
    direction: string;
    switchNavigation: Function;
    isDisabled: boolean;
}) => {
    return (
        <svg
            onClick={() => switchNavigation()}
            width="30px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d={direction}
                stroke={isDisabled ? "#968c8c" : "#000000"}
                stroke-width="1.3"
                stroke-linecap="butt"
                stroke-linejoin="round"
            />
        </svg>
    );
};

function usePagination<T>(allItems: T[], visibleItems: number) {  
    const allItemsLength = Math.ceil(allItems.length / visibleItems);

    const [paginationOrder, setOrder] = useState<(null | number)[]>([1, 2, 3, 4, 5, null, allItemsLength]);
    const [currentOrderItem, setCurrentOrderItem] = useState(1);
    
    const updateCurrentOrderItem = (orderItem: number) => {
        const selectedItem = Number(paginationOrder[paginationOrder.indexOf(Number(orderItem))]);
        if (selectedItem === allItemsLength - 3 || selectedItem === allItemsLength - 2 || selectedItem === allItemsLength - 1 || selectedItem === allItemsLength) {
            setOrder([1, null, allItemsLength - 4, allItemsLength - 3, allItemsLength - 2, allItemsLength - 1, allItemsLength])
        } else if (selectedItem === 1 || selectedItem === 2 || selectedItem === 3 || selectedItem === 4) {
            setOrder([1, 2, 3, 4, 5, null, allItemsLength])
        } else {
            setOrder([1, null, selectedItem - 1, selectedItem, selectedItem + 1, null, allItemsLength])
        }
        
        setCurrentOrderItem(orderItem);
    }

    const isDisabledNextOrderItem = currentOrderItem === allItemsLength;
    const isDisabledPreviousOrderItem = currentOrderItem - 1 === 0;

    return {
        paginationOrder,
        content: allItems.slice((currentOrderItem - 1) * visibleItems, ((currentOrderItem - 1) * visibleItems) + visibleItems),
        currentOrderItem,
        isDisabledNextOrderItem,
        isDisabledPreviousOrderItem,
        setNextOrderItem: () => {
            if (!isDisabledNextOrderItem) {
                updateCurrentOrderItem(currentOrderItem + 1);
            }
        },
        setPreviousOrderItem: () => {
            if (!isDisabledPreviousOrderItem) {
                updateCurrentOrderItem(currentOrderItem - 1);
            }
        },
        updateCurrentOrderItem
    }
}

export const Pagination = <T, >({ items, visibleItems }: { items: T[], visibleItems: number }) => {
    const {paginationOrder, currentOrderItem, updateCurrentOrderItem, isDisabledNextOrderItem, isDisabledPreviousOrderItem, setNextOrderItem, setPreviousOrderItem} = usePagination<T>(items, visibleItems);
    return <Wrapper>
        <CreateNavigationArrow
            direction="M4 12L20 12M4 12L10 6M4 12L10 18"
            switchNavigation={setPreviousOrderItem}
            isDisabled={isDisabledPreviousOrderItem}
        />

        <Content>
            {paginationOrder.map((item, idx: number) => <OrderItem key={idx} onClick={() => {
                if (item !== null) {
                    updateCurrentOrderItem(item);
                }
            }} isActive={currentOrderItem === item}>{item === null ? '...' : item}</OrderItem>)}
        </Content>

        <CreateNavigationArrow
            direction="M20 12L4 12M20 12L14 18M20 12L14 6"
            switchNavigation={setNextOrderItem}
            isDisabled={isDisabledNextOrderItem}
        />
    </Wrapper>
}