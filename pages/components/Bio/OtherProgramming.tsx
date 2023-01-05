import React from "react";
import { ThemeMode } from "../../../core/components/ThemeProvider";
import { Link, List } from "./Bio.style";


export const OtherProgramming = (props: { theme: ThemeMode }) => {
    return <List>
    <li>
      I often write article and read other 
      <ul>
        <li>
        <Link href='https://medium.com/@kusainovv' theme={props.theme}>
          Medium
        </Link>
        </li>
      </ul>
    </li>

    <li>
      Just solve tasks in CodeWars and improve my algorithmic thinking
      <ul>
        <li>
        <Link href='https://www.codewars.com/users/kusainovv' theme={props.theme}>
          CodeWars
        </Link>
        </li>
      </ul>
    </li>
  </List>
}