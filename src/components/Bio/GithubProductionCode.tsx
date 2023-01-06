import styled from "@emotion/styled";
import React from "react";
import { LanguageCode } from "../../../core/components/LanguageProvider";
import { ThemeMode } from "../../../core/components/ThemeProvider";
import { dictionary } from "../../dict";
import { Link, List } from "./Bio.style";

interface GithubProductionCodeProps {
    theme: ThemeMode, 
    lang: LanguageCode
}

export const GithubProductionCode = (props: GithubProductionCodeProps) => {
    return <List>
        <li>
            <Link href="https://github.com/kusainovv" theme={props.theme}>{dictionary(props.lang).common.my}Github</Link>
            <ul>
                <ListItem>
                    <b>{dictionary(props.lang).githubProductionCode.why_empty}</b>
                    <br />
                    {dictionary(props.lang).githubProductionCode.why_empty_answer}
                </ListItem>
            </ul>
        </li>

    <ListItem>
      <b>{dictionary(props.lang).githubProductionCode.whereProdCode}</b>
      
      <ul>  
        <ListItem>
            {dictionary(props.lang).githubProductionCode.corePath}
            <LinkRepository href='https://github.com/kusainovv?tab=repositories' theme={props.theme}>
                {dictionary(props.lang).common.thisRepository}
            </LinkRepository>
            
            <i>({dictionary(props.lang).githubProductionCode.iWroteMore})</i>
        </ListItem>

        <ListItem>
            <b>{dictionary(props.lang).common.in} core.kus</b>, {dictionary(props.lang).githubProductionCode.corePrompt}.
        </ListItem>

        <ListItem>
            <b>{dictionary(props.lang).common.in} pages/work_case, </b> 
            {dictionary(props.lang).githubProductionCode.readProdCode}.
            <br />
            ({dictionary(props.lang).githubProductionCode.onlySnippet})
        </ListItem>
      </ul>
    </ListItem>
  </List>
}

const ListItem = styled.li`
    margin: 10px 0;
`;

const LinkRepository = styled(Link)`
    
`;