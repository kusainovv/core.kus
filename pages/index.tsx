import { withTheme } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useEffect } from "react"
import { Accordion } from "../core/components/Accordion";
import { LanguageCode, useLanguage } from "../core/components/LanguageProvider";
import { ThemeButton } from "../core/components/ThemeButton"
import { ThemeMode } from "../core/components/ThemeProvider";
import { useThemeMode } from "../core/utils/useThemeMode";
import { AboutMe } from "./components/Bio/AboutMe";
import { GithubProductionCode } from "./components/Bio/GithubProductionCode";
import { MyTechnicalSkills } from "./components/Bio/MyTechnicalSkills";
import { MyWorkExperience } from "./components/Bio/MyWorkExperience";
import { OtherProgramming } from "./components/Bio/OtherProgramming";
import { Languages } from "./components/Languages";
import { OtherProgrammingHackathons } from "./components/OtherProgrammingHackathons";

const Navbar = ({ switchTheme, theme, onChooseHandler }: { switchTheme: any, theme: ThemeMode, onChooseHandler: (x: LanguageCode) => void }) => {
  return <NavbarWrapper>    
    <Row>
      <Languages.Russian onChooseHandler={onChooseHandler} />
      <Languages.English onChooseHandler={onChooseHandler} />
    </Row>
    
    <ThemeButton transition="0.3s" wrapperWidth={50} sliderWidth={22} switchHandler={switchTheme} theme={theme} />
  </NavbarWrapper>
}

const Home = () => {
  const { theme, switchTheme } = useThemeMode();
  const { lang, switchLang } = useLanguage();

  useEffect(() => {
    document.body.style.backgroundColor = theme === 'dark' ? '#19191a' : 'white';
  }, [theme]);

  return <Wrapper themeMode={theme}>
    <Navbar switchTheme={switchTheme} theme={theme} onChooseHandler={(x: LanguageCode) => {switchLang(x)}} />

    <Profile color={theme === 'dark' ? 'black' : 'white'}>
    
      <ShortDescription>
        <Title>{`Hello, I'm Ratmir Kusainov`}</Title>

        <Accordion title="My tech skills">
          <Tab>
            <MyTechnicalSkills />
          </Tab>
        </Accordion>


        <Accordion title="My work experience">
          <Tab>
            <MyWorkExperience />
          </Tab>
        </Accordion>


        <Accordion title="About me">
          <Tab>
            <AboutMe />
          </Tab>  
        </Accordion>


        <Accordion title="Other programming and hackathons">
          <Tab>
            <OtherProgrammingHackathons />
          </Tab>  
        </Accordion>


        <Accordion title="Other programming (Medium & CodeWars)">
          <Tab>
            <OtherProgramming />
          </Tab>  
        </Accordion>

        <Accordion title="Github and production code">
          <Tab>
            <GithubProductionCode />
          </Tab>  
        </Accordion>

        <Title>contact_with_me()</Title>
        <Link href='https://t.me/kekw_k' target={'_blank'} rel='noreferrer noopener'>
          <Contact>telegram (kekw_k)</Contact>
        </Link>

        <Link href='mailto:kusainovratmir89@gmail.com'>
          <Contact>gmail / kusainovratmir89@gmail.com</Contact>
        </Link>
      </ShortDescription>
    </Profile>
  </Wrapper>
}


export default withTheme(Home);



const NavbarWrapper = styled.div`
  padding: 20px 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  box-shadow: 1px 0px 34px -5px rgba(0,0,0,0.75);
`;

const Wrapper = styled.div<{ themeMode: ThemeMode }>`
  color: ${ props => props.themeMode === 'dark' ? 'white' : '#19191a' };
`;

const Profile = styled.div<{ color: string }>`
  margin: 50px 0;
`;

const Link = styled.a`
  font-size: 18px;
  font-weight: 600;
  color: #941eff;
`;

const Title = styled.h1`
  margin: 50px 0 10px 0;
  text-decoration: underline;
`;

const Row = styled.div`
  display: flex;
`;

const Contact = styled.h3`
  margin: 0;
`;

const ShortDescription = styled.div`
  width: 600px;
  margin: auto;

  > h3 {
    margin: 0;
  }

  > ul > li {
    margin: 2px 0;
    
    > p {
      margin: 0;
    }
  }
`;


const Tab = styled.div`
  margin: 0 0;
  padding-left: 10px;
`;