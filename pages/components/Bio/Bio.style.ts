import styled from "@emotion/styled";
import { ThemeMode } from "../../../core/components/ThemeProvider";

export const Tab = styled.div`
  margin: 0;
  padding-left: 10px;
`;


export const SubTitle = styled.p`
  margin: 0;
  font-size: 22px;
  font-weight: 600;
`;


export const List = styled.ul`
  margin: 0;
  padding: 0;
`;


export const Link = styled.a<{ theme: ThemeMode }>`
  display: block;
  width: fit-content;
  font-size: 18px;
  font-weight: 600;
  color: ${ props => props.theme === 'dark' ? 'rgb(255, 167, 196)' : '#c13f6a' };
`;