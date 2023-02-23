import styled from "@emotion/styled";
import { ChangeEvent, ChangeEventHandler, useState } from "react";

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





interface ScheduleTableSchemaDay {
  day: number;
  month: string;
  monthOrder: number;
  year: number;
}
interface DatePickerProps {
  maxYear: number;
}
type ScheduleDay = {
  day: number;
  month: string;
  monthOrder: string;
  year: string;
};
type ScheduleTableSchema = {
  month: string;
  year: number;
  scheduleTable: ScheduleDay[];
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

const formatSingleDate = (date: string | number) => {
  // get[month|date]() returns date without first zero e.g. -> new Date(23-02-2023).getMonth() = 2
  return `${date}`.length === 1 ? `0${date}` : `${date}`;
};
const getMonthName = (date: Date) => months[date.getMonth()];
const getMonthForReference = (month: Date) => month.getMonth();
const getMonthForUI = (month: Date) => month.getMonth() + 1;

const getTableSchema = (schema: ScheduleTableSchema) => ({
  month: schema.month,
  year: schema.year,
  scheduleTable: schema.scheduleTable,
});

const getTableDaySchema = (schema: ScheduleTableSchemaDay) => ({
  month: schema.month,
  year: schema.year,
  day: schema.day,
  monthOrder: schema.monthOrder,
});

function getDaysInMonth(year: number) {
  const startDateMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );

  const nd = new Date();
  const scheduleTable = new Map();

  const endScheduleDate = new Date(
    `${year}-${nd.getMonth() + 1}-${new Date(
      year,
      getMonthForUI(startDateMonth),
      0
    ).getDate()}`
  );

  const lastMonthDay = new Date(
    startDateMonth.getFullYear(),
    getMonthForUI(startDateMonth),
    0
  );

  for (
    let monthIndex = 0;
    startDateMonth.getTime() !== endScheduleDate.getTime();

  ) {
    const uniqScheduleKey = `${monthIndex}_${
      months[getMonthForReference(startDateMonth)]
    }`;

    const newScheduleDay = getTableDaySchema({
      day: startDateMonth.getDate(),
      month: getMonthName(startDateMonth),
      monthOrder: getMonthForUI(startDateMonth),
      year: startDateMonth.getFullYear(),
    });

    if (scheduleTable.get(uniqScheduleKey)) {
      scheduleTable.set(
        uniqScheduleKey,
        getTableSchema({
          month: getMonthName(startDateMonth),
          year: startDateMonth.getFullYear(),
          scheduleTable: [
            ...Array.from(scheduleTable.get(uniqScheduleKey).scheduleTable),
            newScheduleDay,
          ] as ScheduleDay[],
        })
      );
    } else {
      scheduleTable.set(uniqScheduleKey, {
        scheduleTable: [newScheduleDay],
      });
    }

    if (
      `${months[getMonthForUI(lastMonthDay)] + lastMonthDay.getDate()}` ===
      `${months[getMonthForUI(startDateMonth)] + startDateMonth.getDate()}`
    ) {
      ++monthIndex;
    }

    startDateMonth.setDate(startDateMonth.getDate() + 1);
  }

  return {
    scheduleTable: Array.from(scheduleTable),
  };
}

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

export const Datepicker = (props: DatePickerProps) => {
  const { scheduleTable } = getDaysInMonth(props.maxYear);
  const [datepickerValue, setDatepickerValue] = useState<string>("");
  const [isShowPopup, setPopup] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [currentDay, setCurrentDay] = useState(new Date().getDate());
  const [isPickSchedule, setPickSchedule] = useState(false);

  const DatePickerFieldHandWriteHandler = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const onlyDate = e.target.value.length
      ? `${e.target.value.replaceAll(/\D/g, "")}`
      : ""; // get only numbers
    const pointsCounter = e.target.value.length - onlyDate.length;

    try {
      // check does user write a point e.g 20.05 is correct 2005 isn't correct
      if (
        (/^\d+$/g.test(e.target.value) && e.target.value.length === 3) ||
        (/^\d+$/g.test(e.target.value) && e.target.value.length === 4) ||
        (/^\d+$/g.test(e.target.value) && e.target.value.length === 8)
      ) {
        throw new Error();
      }

      const getScheduleByOptions = (options: {
        isDay?: boolean;
        isMonth?: boolean;
        isYear?: boolean;
      }) => {
        const day = +`${onlyDate.slice(0, 2)}`;
        const month = +`${onlyDate.slice(2, 4)}`;
        const year = +`${onlyDate.slice(4, 8)}`;
        return new Promise<{ idx: number; scheduleDay: ScheduleDay }>(
          (resolve) => {
            const hasUserDate = scheduleTable.findIndex(
              (scheduleTableItem, idx) => {
                scheduleTableItem[1].scheduleTable.filter(
                  (scheduleDay: ScheduleDay) => {
                    if (
                      (options.isDay && scheduleDay.day === day) ||
                      (options.isMonth &&
                        scheduleDay.day === day &&
                        getMonthName(
                          new Date(new Date().setMonth(month - 1))
                        ) === scheduleDay.month) ||
                      (scheduleDay.day === day &&
                        getMonthName(
                          new Date(new Date().setMonth(month - 1))
                        ) === scheduleDay.month &&
                        year === +scheduleDay.year)
                    ) {
                      resolve({ scheduleDay, idx });
                    }
                  }
                );
              }
            );

            if (hasUserDate === -1) {
              throw new Error();
            }
          }
        );
      };

      if (e.target.value.length === 2 && pointsCounter === 0) {
        getScheduleByOptions({ isDay: true }).then((r) => {
          setCurrentDay(r.scheduleDay.day);
          setCurrentTab(r.idx);
          setDatepickerValue(`${e.target.value}${datepickerValue.slice(2)}`);
        });
      } else if (
        e.target.value.length === 5 &&
        +onlyDate.slice(2, 4) < 13 &&
        pointsCounter === 1
      ) {
        getScheduleByOptions({ isMonth: true }).then((r) => {
          setCurrentDay(r.scheduleDay.day);
          setCurrentTab(r.idx);
          setDatepickerValue(
            `${datepickerValue.slice(0, 2)}.${e.target.value.slice(
              3,
              5
            )}.${datepickerValue.slice(6, 10)}`
          );
        });
      } else if (
        e.target.value.length === 10 &&
        +onlyDate.slice(4, 8) < props.maxYear &&
        pointsCounter === 2
      ) {
        getScheduleByOptions({ isYear: true }).then((r) => {
          setCurrentDay(r.scheduleDay.day);
          setCurrentTab(r.idx);
          setDatepickerValue(
            `${datepickerValue.slice(0, 5)}.${e.target.value.slice(6, 10)}`
          );
        });
      } else if (onlyDate.length === 0) {
        throw new Error();
      }
    } catch {
      setCurrentTab(0);
      setCurrentDay(new Date().getDate());
    }
  };

  return (
    <>
      <DatePickerField
        type="text"
        aria-label="Выбрать время"
        role={"search"}
        placeholder="дд.мм.ггггг"
        onClick={() => {
          setPopup(!isShowPopup);
        }}
        value={isPickSchedule ? datepickerValue : undefined}
        onChange={
          (e) => {
            isPickSchedule && setPickSchedule(false);
            DatePickerFieldHandWriteHandler(e);
          }
          // TODO: ты говорил что уже реализовал debounce, поэтому пж оберни DatePickerFieldHandWriteHandler в debounce delay-500ms
        }
      ></DatePickerField>

      {isShowPopup && (
        <>
          <PopUpCloseZone
            onClick={() => {
              setPopup(false);
            }}
          />

          <Content>
            <Title>
              {scheduleTable[currentTab][1].month +
                ", " +
                scheduleTable[currentTab][1].year}
            </Title>

            <ScheduleNavigation>
              <CreateNavigationArrow
                direction="M4 12L20 12M4 12L10 6M4 12L10 18"
                switchNavigation={() => {
                  setCurrentTab(
                    currentTab - 1 === -1
                      ? Math.abs(
                          12 * (new Date().getFullYear() - props.maxYear)
                        )
                      : currentTab - 1
                  );
                }}
              />

              <CreateNavigationArrow
                direction="M20 12L4 12M20 12L14 18M20 12L14 6"
                switchNavigation={() => {
                  setCurrentTab(
                    currentTab + 1 ===
                      -(12 * +(new Date().getFullYear() - props.maxYear) - 1)
                      ? 0
                      : currentTab + 1
                  );
                }}
              />
            </ScheduleNavigation>

            <Schedule>
              {scheduleTable[currentTab][1].scheduleTable.map(
                (day: ScheduleDay, key: number) => {
                  return (
                    <ScheduleItem
                      key={key}
                      isCurrentScheduleItem={day.day === currentDay}
                      onClick={() => {
                        setDatepickerValue(
                          `${formatSingleDate(day.day)}.${formatSingleDate(
                            day.monthOrder
                          )}.${day.year}`
                        );
                        setPickSchedule(true);
                        setCurrentDay(+day.day);
                      }}
                    >
                      {day.day}
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
