import React from "react";
import { Link, List } from "./Bio.style";


export const OtherProgramming = () => {
    return <List>
    <li>
      I often write article and read other 
      <ul>
        <li>
        <Link href='https://medium.com/@kusainovv'>
          Medium
        </Link>
        </li>
      </ul>
    </li>

    <li>
      Just solve tasks in CodeWars and improve my algorithmic thinking
      <ul>
        <li>
        <Link href='https://www.codewars.com/users/kusainovv'>
          CodeWars
        </Link>
        </li>
      </ul>
    </li>
  </List>
}