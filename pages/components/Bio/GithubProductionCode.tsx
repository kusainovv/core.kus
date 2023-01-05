import styled from "@emotion/styled";
import React from "react";
import { Link, List } from "./Bio.style";


export const GithubProductionCode = () => {
    return <List>
    <li>
        <Link href="https://github.com/kusainovv">My Github</Link>
        <ul>
            <Prompt>
                <b>Why empty?</b>
                <br />

                <span> Because i hidde all repositories </span>
            </Prompt>
        </ul>
    </li>

    <Prompt>
      <b>Where can i see production code?</b>
      <ul>
        
        <Prompt>
            Check my own core where you can find code that i wrote for production in
            <Link href='https://github.com/kusainovv?tab=repositories'> this repository</Link>
            <i>(of course, i wrote more code)</i>
        </Prompt>

        <Prompt>
            <b>In core.kus</b>, look at core folder where you can see my own written code.
        </Prompt>

        <Prompt>
            <b>In pages/work_case</b>, you can see the real production code
            this isn't the best code that i wrote for all time, this is just code snippet.
        </Prompt>
        
      </ul>
    </Prompt>
  </List>
}

const Prompt = styled.li`
    margin: 10px 0;
`;