import { withTheme } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useEffect } from "react"
import { Accordion } from "../core/components/Accordion";
import { LanguageCode, useLanguage } from "../core/components/LanguageProvider";
import { ThemeButton } from "../core/components/ThemeButton"
import { ThemeMode } from "../core/components/ThemeProvider";
import { useThemeMode } from "../core/utils/useThemeMode";
import { AboutMe } from "./components/Bio/AboutMe";
import { Link } from "./components/Bio/Bio.style";
import { GithubProductionCode } from "./components/Bio/GithubProductionCode";
import { MyTechnicalSkills } from "./components/Bio/MyTechnicalSkills";
import { MyWorkExperience } from "./components/Bio/MyWorkExperience";
import { OtherProgramming } from "./components/Bio/OtherProgramming";
import { Languages } from "./components/Languages";
import { OtherProgrammingHackathons } from "./components/OtherProgrammingHackathons";
import { dictionary } from "./dict";

const Navbar = ({ switchTheme, theme, onChooseHandler, currentLang }: { switchTheme: any, currentLang: LanguageCode, theme: ThemeMode, onChooseHandler: (x: LanguageCode) => void }) => {
  return <NavbarWrapper>    
    <Row>
      <Languages.Russian onChooseHandler={onChooseHandler} currentLang={currentLang} />
      <Languages.English onChooseHandler={onChooseHandler} currentLang={currentLang} />
    </Row>
    
    <ThemeButton transition="0.3s" wrapperWidth={50} sliderWidth={22} switchHandler={switchTheme} theme={theme} />
  </NavbarWrapper>
}

export default function Home() {
  const { theme, switchTheme } = useThemeMode();
  const { lang, switchLang } = useLanguage();

  useEffect(() => {
    document.body.style.backgroundColor = theme === 'dark' ? '#19191a' : 'white';
  }, [theme]);

  return <Wrapper themeMode={theme}>
    <Navbar switchTheme={switchTheme} theme={theme} currentLang={lang} onChooseHandler={(x: LanguageCode) => { 
      switchLang(x)
    }} />

    <Profile color={theme === 'dark' ? 'black' : 'white'}>
    
      <ShortDescription>
        <Title>{dictionary(lang).titles.greeting}</Title>

        <Accordion title={dictionary(lang).titles.techSkills} theme={theme}>
          <Tab>
            <MyTechnicalSkills />
          </Tab>
        </Accordion>


        <Accordion title={dictionary(lang).titles.workExp} theme={theme}>
          <Tab>
            <MyWorkExperience theme={theme} lang={lang} />
          </Tab>
        </Accordion>


        <Accordion title={dictionary(lang).titles.aboutMe} theme={theme}>
          <Tab>
            <AboutMe lang={lang} />
          </Tab>  
        </Accordion>


        <Accordion title={dictionary(lang).titles.hackathons} theme={theme}>
          <Tab>
            <OtherProgrammingHackathons theme={theme} />
          </Tab>  
        </Accordion>


        <Accordion title={dictionary(lang).titles.otherProgramming} theme={theme}>
          <Tab>
            <OtherProgramming theme={theme} lang={lang} />
          </Tab>  
        </Accordion>

        <Accordion title={dictionary(lang).titles.otherProgramming} theme={theme}>
          <Tab>
            <GithubProductionCode theme={theme} lang={lang} />
          </Tab>  
        </Accordion>

        <Title>{dictionary(lang).titles.contactWithMe}</Title>
        <SocialLink href='https://t.me/kekw_k' target={'_blank'} rel='noreferrer noopener' theme={theme} isBlock={false}>
          <Contact>telegram (kekw_k)</Contact>
        </SocialLink>

        <SocialLink href='mailto:kusainovratmir89@gmail.com' target={'_blank'} rel='noreferrer noopener' theme={theme} isBlock={false}>
          <Contact>gmail / kusainovratmir89@gmail.com</Contact>
        </SocialLink>
      </ShortDescription>
    </Profile>
  </Wrapper>
}

const NavbarWrapper = styled.div`
  padding: 20px 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  box-shadow: 1px 0px 34px -5px rgba(0,0,0,0.75);
`;

const Wrapper = styled.div<{ themeMode: ThemeMode }>`
  color: ${ props => props.themeMode === 'dark' ? '#f6f7f8' : 'black' };
`;

const Profile = styled.div<{ color: string }>`
  margin: 50px 0;
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
  width: fit-content;
  font-weight: 600;
`;

const ShortDescription = styled.div`
  width: min(600px, 90%);
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


const SocialLink = styled(Link)`
  margin: 0;
`;