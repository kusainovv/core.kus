import styled from "@emotion/styled";
import { ChangeEvent, ChangeEventHandler, createRef, useEffect, useRef, useState } from "react";
import { debounce } from "../utils/debounce";

const Title = styled.p`
  margin: 0;
  text-align: center;
`;

const Schedule = styled.div`
  display: grid;
  grid-template-columns: repeat(7, min-content);
  gap: 10px;
`;

const ScheduleItem = styled.span<{ isCurrentScheduleItem: boolean }>`
  font-weight: ${(props) => (props.isCurrentScheduleItem ? "700" : "200")};
  cursor: pointer;
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
  padding: 6px;
  background-color: #aeaec4;
`;

const DatePickerField = styled.input`
  position: relative;
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


const getTableSchema = (schema: any) => ({
  month: schema.month,
  year: schema.year,
  scheduleTable: schema.scheduleTable,
});

const getTableDaySchema = (schema: any) => ({
  month: schema.month,
  year: schema.year,
  day: schema.day,
  monthOrder: schema.monthOrder,
});
// const DatePickerFieldHandWriteHandler = (
//   e: ChangeEvent<HTMLInputElement>
// ) => {
//   const onlyDate = e.target.value.length
//     ? `${e.target.value.replaceAll(/\D/g, "")}`
//     : ""; // get only numbers
//   const pointsCounter = e.target.value.length - onlyDate.length;
//   try {
//     // check does user write a point e.g 20.05 is correct 2005 isn't correct
//     if (
//       (/^\d+$/g.test(e.target.value) && e.target.value.length === 3) ||
//       (/^\d+$/g.test(e.target.value) && e.target.value.length === 4) ||
//       (/^\d+$/g.test(e.target.value) && e.target.value.length === 8)
//     ) {
//       throw new Error();
//     }

//     const getScheduleByOptions = (options: {
//       isDay?: boolean;
//       isMonth?: boolean;
//       isYear?: boolean;
//     }) => {
//       const day = +`${onlyDate.slice(0, 2)}`;
//       const month = +`${onlyDate.slice(2, 4)}`;
//       const year = +`${onlyDate.slice(4, 8)}`;
//       return new Promise<{ idx: number; scheduleDay: ScheduleDay }>(
//         (resolve) => {
//           const hasUserDate = scheduleTable.findIndex(
//             (scheduleTableItem, idx) => {
//               scheduleTableItem[1].scheduleTable.filter(
//                 (scheduleDay: ScheduleDay) => {
//                   if (
//                     (options.isDay && scheduleDay.day === day) ||
//                     (options.isMonth &&
//                       scheduleDay.day === day &&
//                       getMonthName(
//                         new Date(new Date().setMonth(month - 1))
//                       ) === scheduleDay.month) ||
//                     (scheduleDay.day === day &&
//                       getMonthName(
//                         new Date(new Date().setMonth(month - 1))
//                       ) === scheduleDay.month &&
//                       year === +scheduleDay.year)
//                   ) {
//                     resolve({ scheduleDay, idx });
//                   }
//                 }
//               );
//             }
//           );

//           if (hasUserDate === -1) {
//             throw new Error();
//           }
//         }
//       );
//     };

//     if (e.target.value.length === 2 && pointsCounter === 0) {
//       getScheduleByOptions({ isDay: true }).then((r) => {
//         setCurrentDay(r.scheduleDay.day);
//         setCurrentTab(r.idx);
//         setDatepickerValue(`${e.target.value}${datepickerValue.slice(2)}`);
//       });
//     } else if (
//       e.target.value.length === 5 &&
//       +onlyDate.slice(2, 4) < 13 &&
//       pointsCounter === 1
//     ) {
//       getScheduleByOptions({ isMonth: true }).then((r) => {
//         setCurrentDay(r.scheduleDay.day);
//         setCurrentTab(r.idx);
//         setDatepickerValue(
//           `${datepickerValue.slice(0, 2)}.${e.target.value.slice(
//             3,
//             5
//           )}.${datepickerValue.slice(6, 10)}`
//         );
//       });
//     } else if (
//       e.target.value.length === 10 &&
//       +onlyDate.slice(4, 8) < props.maxYear &&
//       pointsCounter === 2
//     ) {
//       getScheduleByOptions({ isYear: true }).then((r) => {
//         setCurrentDay(r.scheduleDay.day);
//         setCurrentTab(r.idx);
//         setDatepickerValue(
//           `${datepickerValue.slice(0, 5)}.${e.target.value.slice(6, 10)}`
//         );
//       });
//     } else if (onlyDate.length === 0) {
//       throw new Error();
//     }
//   } catch {
//     setCurrentTab(0);
//     setDatepickerValue('');
//     setCurrentDay(new Date().getDate());
//   }
// };







































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


function useDatepicker() {
  const [lastYear, setLastYear] = useState(new Date().getFullYear());
  const [currentTab, setCurrentTab] = useState(0);

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
      currentDay < new Date(lastYear, currentMonth, 0, 23, 59, 59).getDate();
      ++currentDay
    ) {
      if (new Date(lastYear, currentMonth, 0).getDate() > oneFullYear[currentMonthOrder].schedule.length) {
        const nextDay = new Date(lastYear, currentMonth, currentDay);
        oneFullYear[currentMonthOrder].schedule.push(nextDay);
      }
    }
  }


  const findCloseDate = (date: string) => {
    oneFullYear = getYearSchema();
    const day = +date.slice(0, 2);
    const month = +date.slice(3, 5);
    const year = +date.slice(6, 10);
    if (day > 31 || month > 12 || year > 3000 || year < 1800) {
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
        setCurrentTab(month);
      }

      for (
        let currentDay = 1;
        currentDay < new Date(year, currentMonth, 0, 23, 59, 59).getDate();
        ++currentDay
      ) {
        if (new Date(year, currentMonth, 0).getDate() > oneFullYear[currentMonthOrder].schedule.length) {
          const nextDay = new Date(year, currentMonth, currentDay);
          oneFullYear[currentMonthOrder].schedule.push(nextDay);
        }
      }
    }
  }

  return {
    scheduleTable: oneFullYear,
    currentTab,

    findCloseDate,

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
    }
  }
}

export const Datepicker = () => {
  const [datepickerValue, setDatepickerValue] = useState<string>("");
  const [isShowPopup, setPopup] = useState(false);
  const [currentDay, setCurrentDay] = useState(new Date().getDate());

  const { scheduleTable, findCloseDate, currentTab, previousMonth, nextMonth } = useDatepicker();
  
  const datePickerField = useRef<HTMLInputElement | null>(null);

  return (  
    <>
      <DatePickerField
        ref={datePickerField}
        type="text"
        aria-label="Выбрать время"
        role={"search"}
        onChange={(e) => findCloseDate(e.target.value)}
        onClick={() => setPopup(true)}
        placeholder="дд.мм.гггг"
      ></DatePickerField>
      
      {isShowPopup && (
        <>
          <PopUpCloseZone
            onClick={() => {
              datePickerField.current?.blur();
            }}
          />

          <Content onClick={() => {
            datePickerField.current?.focus();
          }}>
            <Title>
              {scheduleTable[currentTab === 0 ? 0 : currentTab - 1].month +
                ", " +
                scheduleTable[currentTab].year}
            </Title>

            <ScheduleNavigation>
              <CreateNavigationArrow
                direction="M4 12L20 12M4 12L10 6M4 12L10 18"
                switchNavigation={previousMonth}
              />

              <CreateNavigationArrow
                direction="M20 12L4 12M20 12L14 18M20 12L14 6"
                switchNavigation={nextMonth}
              />
            </ScheduleNavigation>

            <Schedule>
              {scheduleTable[currentTab].schedule.map(
                (day: any, key: number) => {
                  return (
                    <ScheduleItem
                      key={key}
                      isCurrentScheduleItem={day.day === currentDay}>
                      {day.getDate()}
                    </ScheduleItem>
                  );
                }
              )}
            </Schedule>
          </Content>
        </>
      )}
    </>
  );
};
