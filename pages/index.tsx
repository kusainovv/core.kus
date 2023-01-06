import styled from "@emotion/styled";
import React, { useEffect } from "react"
import { Accordion } from "../core/components/Accordion";
import { useLanguage } from "../core/components/LanguageProvider";
import { ThemeMode } from "../core/components/ThemeProvider";
import { useThemeMode } from "../core/utils/useThemeMode";
import { AboutMe } from "../src/components/Bio/AboutMe";
import { ContactWithMe } from "../src/components/Bio/ContactWithMe";
import { GithubProductionCode } from "../src/components/Bio/GithubProductionCode";
import { MyTechnicalSkills } from "../src/components/Bio/MyTechnicalSkills";
import { MyWorkExperience } from "../src/components/Bio/MyWorkExperience";
import { OtherProgramming } from "../src/components/Bio/OtherProgramming";
import { Navbar } from "../src/components/Navbar";
import { OtherProgrammingHackathons } from "../src/components/OtherProgrammingHackathons";
import { dictionary } from "../src/dict";
import { Title } from "../src/work_case/AllSchedules.style";

export default function Home() {
  const { theme, switchTheme } = useThemeMode();
  const { lang, switchLang } = useLanguage();

  useEffect(() => {
    document.body.style.backgroundColor = theme === 'dark' ? '#19191a' : 'white';
  }, [theme]);

  return <Wrapper themeMode={theme}>
    <Navbar switchTheme={switchTheme} theme={theme} currentLang={lang} onChooseHandler={switchLang} />

    <Profile textColor={theme === 'dark' ? 'black' : 'white'}>
    
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
            <OtherProgrammingHackathons theme={theme} lang={lang} />
          </Tab>  
        </Accordion>


        <Accordion title={dictionary(lang).titles.otherProgramming} theme={theme}>
          <Tab>
            <OtherProgramming theme={theme} lang={lang} />
          </Tab>  
        </Accordion>


        <Accordion title={dictionary(lang).titles.githubProdCode} theme={theme}>
          <Tab>
            <GithubProductionCode theme={theme} lang={lang} />
          </Tab>  
        </Accordion>

        <ContactWithMe lang={lang} theme={theme} />
      </ShortDescription>
    </Profile>
  </Wrapper>
}




const Wrapper = styled.div<{ themeMode: ThemeMode }>`
  color: ${ props => props.themeMode === 'dark' ? '#f6f7f8' : 'black' };
`;

const Profile = styled.div<{ textColor: string }>`
  margin: 50px 0;
`;

const ShortDescription = styled.div`
  width: min(600px, 90%);
  margin: auto;
`;

const Tab = styled.div`
  margin: 0 0;
  padding-left: 10px;
`;

