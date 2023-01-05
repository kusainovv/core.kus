import styled from "@emotion/styled";
import React from "react";
import { LanguageCode } from "../../../core/components/LanguageProvider";
import { ThemeMode } from "../../../core/components/ThemeProvider";
import { dictionary } from "../../dict";
import { Link, List } from "./Bio.style";


export const OtherProgramming = (props: { theme: ThemeMode, lang: LanguageCode }) => {
    return <List>
      <ListItem>
        {dictionary(props.lang).otherProgramming.article}
        <ul>
          <li>
          <Link href='https://medium.com/@kusainovv' theme={props.theme} isBlock={false}>
            Medium
          </Link>
          </li>
        </ul>
      </ListItem>

      <ListItem>
        {dictionary(props.lang).otherProgramming.codeWars}
        <ul>
          <li>
          <Link href='https://www.codewars.com/users/kusainovv' theme={props.theme} isBlock={false}>
            CodeWars
          </Link>
          </li>
        </ul>
      </ListItem>
  </List>
}


const ListItem = styled.li`
  margin-bottom: 20px;

  &:last-child {
    margin: 0;
  }
`;