import styled from "@emotion/styled";
import Link from "next/link";
import React from "react";
import { LanguageCode } from "../../core/components/LanguageProvider";
import { ThemeButton } from "../../core/components/ThemeButton";
import { ThemeMode } from "../../core/components/ThemeProvider";
import { Languages } from "./Languages";

interface NavbarProps {
  switchTheme: () => void, 
  currentLang: LanguageCode, 
  theme: ThemeMode, 
  onChooseHandler: (x: LanguageCode) => void 
}

export const Navbar = ({ switchTheme, theme, onChooseHandler, currentLang }: NavbarProps) => {
    return <NavbarWrapper>    
      <Row>
        <Languages.Russian onChooseHandler={onChooseHandler} currentLang={currentLang} />
        <Languages.English onChooseHandler={onChooseHandler} currentLang={currentLang} />
      </Row>
      
      <ThemeButton transition="0.3s" wrapperWidth={50} sliderWidth={22} switchHandler={switchTheme} theme={theme} />
      
      <PlaygroundLink href={'/playground'}>Go to playground</PlaygroundLink>
    </NavbarWrapper>
}



const PlaygroundLink = styled(Link)`
  text-decoration: none;
  font-size: 24px;
`;

const Row = styled.div`
  display: flex;
`;

const NavbarWrapper = styled.div`
  padding: 20px 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  box-shadow: 1px 0px 34px -5px rgba(0,0,0,0.75);
`;