import styled from "@emotion/styled";
import React from "react";
import { LanguageCode } from "../../../core/components/LanguageProvider";
import { ThemeMode } from "../../../core/components/ThemeProvider";
import { dictionary } from "../../dict";
import { Link, List } from "./Bio.style";


export const GithubProductionCode = (props: { theme: ThemeMode, lang: LanguageCode }) => {
    return <List>
    <li>
        <Link href="https://github.com/kusainovv" theme={props.theme} isBlock={false}>{dictionary(props.lang).common.my}Github</Link>
        <ul>
            <Prompt>
                <b>{dictionary(props.lang).githubProductionCode.why_empty}</b>
                <br />

                <span>
                    {dictionary(props.lang).githubProductionCode.why_empty_answer}
                </span>
            </Prompt>
        </ul>
    </li>

    <Prompt>
      <b> {dictionary(props.lang).githubProductionCode.whereProdCode}</b>
      <ul>
        
        <Prompt>
            {dictionary(props.lang).githubProductionCode.corePath}
            <LinkRepository href='https://github.com/kusainovv?tab=repositories' theme={props.theme} isBlock={false}>
                {dictionary(props.lang).common.thisRepository}
            </LinkRepository>
            
            <i>({dictionary(props.lang).githubProductionCode.iWroteMore})</i>
        </Prompt>

        <Prompt>
            <b>{dictionary(props.lang).common.in} core.kus</b>, {dictionary(props.lang).githubProductionCode.corePrompt}.
        </Prompt>

        <Prompt>
            <b>{dictionary(props.lang).common.in} pages/work_case</b>, {dictionary(props.lang).githubProductionCode.readProdCode}
            {dictionary(props.lang).githubProductionCode.onlySnippet}.
        </Prompt>
        
      </ul>
    </Prompt>
  </List>
}

const Prompt = styled.li`
    margin: 10px 0;
`;

const LinkRepository = styled(Link)`
    
`;