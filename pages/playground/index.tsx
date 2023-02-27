import styled from "@emotion/styled";
import React from "react";
import { Datepicker } from "../../core/ui/Datepicker";
import { Pagination } from "../../core/ui/Pagination";

const Wrapper = styled.div`
    margin: 10px;
`;

const Playground = () => {
    const allItems = Array.from({ length: 100 }).map((_, idx) => ++idx);
    return <Wrapper>
        <Datepicker />
        <Pagination items={allItems} visibleItems={7} />
    </Wrapper>
}



export default Playground;