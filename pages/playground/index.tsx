import styled from "@emotion/styled";
import React from "react";
import { Datepicker } from "../../core/ui/Datepicker";

const Wrapper = styled.div`
    margin: 10px;
`;

const Playground = () => {
    return <Wrapper>
        <Datepicker />
    </Wrapper>
}



export default Playground;