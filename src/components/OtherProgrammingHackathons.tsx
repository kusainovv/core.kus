import React from "react";
import { LanguageCode } from "../../core/components/LanguageProvider";
import { ThemeMode } from "../../core/components/ThemeProvider";
import { dictionary } from "../dict";
import { Link, List } from "./Bio/Bio.style";


export const OtherProgrammingHackathons = (props: { theme: ThemeMode, lang: LanguageCode }) => {
    return <List>
      <li>
        Worldskills:
        <ul>
          <li>  
            <Link href='https://www.sgu.ru/structure/yablkol/news/2022-09-08/final-v-nacionalnogo-mezhvuzovskogo-chempionata' theme={props.theme}>
              {`The final of the V National Interuniversity Championship "Young professionals"`}
            </Link>
            <b>/2 {dictionary(props.lang).common.place}</b>
            </li>

          <li>
            <Link href='https://www.sgu.ru/news/2021-06-08/podvedeny-itogi-iv-chempionata-molodye-professionaly' theme={props.theme}>
              {`The final of the IV championship "Young professionals" according to the standards of "Worldskills"`}
            </Link>
            <b>/1 {dictionary(props.lang).common.place}</b>
          </li>
        </ul>
      </li>
      <li>ICPC</li>
  </List>
}