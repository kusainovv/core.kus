import styled from "@emotion/styled";
import { ChangeEvent, ChangeEventHandler, createRef, useEffect, useRef, useState } from "react";
import { debounce } from "../utils/debounce";

const Title = styled.div`
  margin: 0;
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0,0,0,0.15);
`;

const MonthYear = styled.p`
  margin: 0;
`;

const ScheduleItems = styled.div`
  display: grid;
  grid-template-columns: repeat(7, min-content);
  gap: 10px;
`;

const ScheduleWrapper = styled.div`
  padding-top: 10px;
`;

const Schedule = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0 10px;
  width: 100%;
  text-align: center;

  > span {
    color: rgba(0,0,0,0.5);
  }
`;

const ScheduleItem = styled.span<{ isCurrentScheduleItem: boolean }>`
  text-align: center;
  border: 1px solid white;
  padding: 4px;
  cursor: pointer;
  background-color: ${(props) => (props.isCurrentScheduleItem ? "rgba(21, 95, 168, 0.8)" : "none")};
  color: ${(props) => (props.isCurrentScheduleItem ? "white" : "black")};
  border-radius: 6px;
  font-weight: 200;
`;

const PopUpCloseZone = styled.div`
  z-index: 10;
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
`;

const Content = styled.div`
  width: fit-content;
  position: absolute;
  z-index: 10;
  padding: 20px 10px;
  border-radius: 12px;
  border: 1px solid rgba(0,0,0,0.2);
`;

const DatePickerField = styled.input`
  position: relative;
  z-index: 11;
  text-align: center;
  width: 90px;
  padding: 6px 7px;
  background: none;
  border: 1px solid #afa8a8;
  border-radius: 6px;
  cursor: pointer;
  outline: none;

  &:focus {
    border: 1px solid #155fa8;  
  }
`;

const ScheduleNavigation = styled.div`
  margin: 4px 0 10px 0;
  display: flex;
  justify-content: space-around;
`;

const CreateNavigationArrow = ({
  direction,
  switchNavigation,
}: {
  direction: string;
  switchNavigation: Function;
}) => {
  return (
    <svg
      onClick={() => switchNavigation()}
      width="30px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={direction}
        stroke="#155fa8"
        stroke-width="1.3"
        stroke-linecap="butt"
        stroke-linejoin="round"
      />
    </svg>
  );
};

























const months = [
  "январь",
  "февраль",
  "март",
  "апрель",
  "май",
  "июнь",
  "июль",
  "август",
  "сентябрь",
  "октябрь",
  "ноябрь",
  "декабрь",
];

const zeroPrefix = (date: number) => `${date}`.length === 1 ? `0${date}` : `${date}`;

function useDatepicker() {
  const [datepickerValue, setDatepickerValue] = useState<string>(`${zeroPrefix(new Date().getDate())}.${zeroPrefix(new Date().getMonth() + 1)}.${new Date().getFullYear()}`);
  const [lastYear, setLastYear] = useState(new Date().getFullYear());
  const [currentDay, setCurrentDay] = useState<Date>(new Date());
  const [currentTab, setCurrentTab] = useState(new Date().getMonth());

  const isDisabledPrevious = lastYear === 1800;
  const isDisabledNext = lastYear === 3000;

  const getYearSchema = () => Array.from({ length: Math.abs(12) }).map(() => ({ month: '', schedule: [] as Date[], year: '' }));
  let oneFullYear = getYearSchema();

  for (let currentMonthOrder = 0, currentMonth = 0; currentMonthOrder < 12; ++currentMonthOrder, ++currentMonth) {
    if (oneFullYear[currentMonthOrder].month === '') {
      oneFullYear[currentMonthOrder].month = months[currentMonth];
      oneFullYear[currentMonthOrder].year = `${lastYear}`;
    }
    for (
      let currentDay = 1;
      currentDay <= new Date(lastYear, currentMonth + 1, 0, 23, 59, 59).getDate();
      ++currentDay
    ) {
      if (new Date(lastYear, currentMonth, 0).getDate() > oneFullYear[currentMonthOrder].schedule.length) {
        const nextDay = new Date(lastYear, currentMonth, currentDay);
        oneFullYear[currentMonthOrder].schedule.push(nextDay);
      }
    }
  }

  const findCloseDate = (date: string) => {
    setDatepickerValue(date);
    
    oneFullYear = getYearSchema();
    const day = +date.slice(0, 2);
    const month = +date.slice(3, 5);
    const year = +date.slice(6, 10);
    if (
      day > 31 || month > 12 
      || year > 3000 || year < 1800 
      || (date.replace(/\D/g,'').length !== date.length - 2) && !date.replace(/\D/g,'').length) {
      return null;
    }

    for (let currentMonthOrder = 0, currentMonth = 0; currentMonthOrder < 12; ++currentMonthOrder, ++currentMonth) {
      if (currentMonth % 11 === 0 && currentMonth !== 0) {
        setLastYear(new Date(year, currentMonth, 0, 0, 0, 0).getFullYear());
        currentMonth = 0;
      }

      if (oneFullYear[currentMonthOrder].month === '') {
        oneFullYear[currentMonthOrder].month = months[month - 1];
        oneFullYear[currentMonthOrder].year = `${year}`;
      }

      if (currentMonth === 10) {
        setCurrentTab(month - 1);
      }

      for (
        let currentDay = 1;
        currentDay < new Date(year, currentMonth + 1, 0, 23, 59, 59).getDate();
        ++currentDay
      ) {
        if (new Date(year, currentMonth, 0).getDate() > oneFullYear[currentMonthOrder].schedule.length) {
          const nextDay = new Date(year, currentMonth, currentDay);
          oneFullYear[currentMonthOrder].schedule.push(nextDay);
        }
      }
    }

    setCurrentDay(new Date(year, month - 1, day));
  }

  return {
    scheduleTable: oneFullYear,
    currentTab,

    findCloseDate,
    datepickerValue,
    currentDay,

    changeCurrentDay: (day: Date) => {
      setCurrentDay(day);
    },

    previousMonth: () => {
      if (isDisabledPrevious) {
        return null;
      }
    
      if (Math.abs(currentTab) - 1 === -1) {
        setLastYear(prev => prev - 1);
        setCurrentTab(11);
      } else {
        setCurrentTab(Math.abs(currentTab) - 1);
      }
    
      if (
        oneFullYear[currentTab].month === months[currentDay?.getMonth()]
        && +oneFullYear[currentTab].year === currentDay?.getFullYear()
      ) {
        setCurrentDay(currentDay);
      }
    },

    updateDatepickerValue: (datepickerValue: string) => {
      setDatepickerValue(datepickerValue);
    },

    nextMonth: () => {
      if (isDisabledNext) {
        return null;
      }

      if (currentTab + 1 === 12) {
        setLastYear(prev => prev + 1);
        setCurrentTab(0);
      } else {
        setCurrentTab(currentTab + 1);
      }

      if (
        oneFullYear[currentTab].month === months[currentDay?.getMonth()]
        && +oneFullYear[currentTab].year === currentDay?.getFullYear()
      ) {
        setCurrentDay(currentDay);
      }
    }
  }
}

export const Datepicker = () => {
  const [isShowPopup, setPopup] = useState(false);

  const { scheduleTable, datepickerValue, findCloseDate, currentDay, changeCurrentDay, currentTab, updateDatepickerValue, previousMonth, nextMonth } = useDatepicker();
  const datePickerField = useRef<HTMLInputElement | null>(null);

  return (  
    <>
      <DatePickerField
        ref={datePickerField}
        type="text"
        value={datepickerValue}
        aria-label="Выбрать время"
        role={"search"}
        onChange={(e) => {
          findCloseDate(e.target.value);
        }}
        onClick={(e) => {
          setPopup(true);
          datePickerField.current?.focus();
        }}
        placeholder="дд.мм.гггг"
      ></DatePickerField>
      
      {isShowPopup && (
        <>
          <PopUpCloseZone
            onClick={() => {
              datePickerField.current?.blur();
              setPopup(false);
            }}
          />

          <Content onClick={() => {
            datePickerField.current?.focus();
          }}>
            <Title>
              <CreateNavigationArrow
                direction="M4 12L20 12M4 12L10 6M4 12L10 18"
                switchNavigation={previousMonth}
              />

              <MonthYear>
                {`${scheduleTable[currentTab].month[0].toUpperCase() + scheduleTable[currentTab].month.slice(1)}` +
                  ", " +
                  scheduleTable[currentTab].year}
              </MonthYear>

              <CreateNavigationArrow
                direction="M20 12L4 12M20 12L14 18M20 12L14 6"
                switchNavigation={nextMonth}
              />
            </Title>

            <ScheduleWrapper>
              <Schedule>
                <span>пн</span>
                <span>вт</span>
                <span>ср</span>
                <span>чт</span>
                <span>пт</span>
                <span>сб</span>
                <span>вс</span>

              </Schedule>
              
              <ScheduleItems>
                {scheduleTable[currentTab].schedule.map(
                  (day: any, key: number) => {
                    return (
                      <ScheduleItem
                        key={key}
                        onClick={() => {
                          changeCurrentDay(day);
                          updateDatepickerValue(`${zeroPrefix(day.getDate())}.${zeroPrefix(day.getMonth() + 1)}.${day.getFullYear()}`)
                        }}
                        isCurrentScheduleItem={
                          day.getDate() === currentDay?.getDate()
                          && day.getMonth() === currentDay?.getMonth()
                          && day.getFullYear() === currentDay?.getFullYear()
                        }>
                        {day.getDate()}
                      </ScheduleItem>
                    );
                  }
                )}
              </ScheduleItems>
            </ScheduleWrapper>
          </Content>
        </>
      )}
    </>
  );
};
