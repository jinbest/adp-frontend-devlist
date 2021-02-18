import * as React from 'react';
import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { CustomNumeric } from './';
import { repairWidgetStore } from '../store';

const Frame = styled.div`
  width: 100%;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 15px;
  height: 300px;
  // min-width: 340px;
`;

const InputDate = styled.div`
  width: 100%;
  padding: 0px 20px;
  font-size: 14px;
  height: 30px;
  border-radius: 15px 15px 0;
  display: flex;
  align-items: center;
`;

const Numeric = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const Weekdiv = styled.div`
  background-color: #BDBFC3;
  width: 100%;
  display: flex;
  height: 35px;
`;

interface DayProps {
  isToday?: boolean;
  isSelected?: boolean;
  isPastDay?: boolean;
  color?: string;
  bg?: string;
  repairBooktimeCol?: string;
  margin?: string;
}

const Day = styled.div<DayProps>`
  width: 14.1%;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
  ${props => props.margin &&
    css`
      margin: ${props.margin};
    `}
  ${props => props.color &&
    css`
      color: ${props.color};
    `}
  ${props => props.bg &&
    css`
      background-color: ${props.bg};
    `}
  ${props => props.isToday &&
    css`
      border: 1px solid ${props.repairBooktimeCol};
      border-radius: 7px;
      opacity: 0.8;
    `}
  ${props => props.isPastDay &&
    css`
      color: #ddd;
    `}
  ${props => props.isSelected &&
    css`
      background-color: ${props.repairBooktimeCol};
      border-radius: 7px;
      color: white;
      opacity: 0.8;
    `}
`;

type CanlendarProps = {
  subDomain?: string;
  handleParentDate: (date:Date) => void;
  timezone: string;
}

const CustomCalendar = ({subDomain, handleParentDate, timezone}: CanlendarProps) => {
  const mainData = require(`../assets/${subDomain}/Database.js`);
  const repairBooktimeCol = mainData.colorPalle.repairBooktimeCol;

  const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const DAYS_OF_THE_WEEK = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const MONTHS = ['January', 'Febrary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octorber', 'November', 'December'];

  const [today, setToday] = useState(changeTimezone(new Date(), timezone));
  const [date, setDate] = useState(today);
  const [day, setDay] = useState(date.getDate());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [startDay, setStartDay] = useState(getStartDayOfMonth(date));

  useEffect(() => {
    setDay(date.getDate());
    setMonth(date.getMonth());
    setYear(date.getFullYear());
    setStartDay(getStartDayOfMonth(date));
    handleParentDate(date);
  }, [date]);

  useEffect(()=> {
    setToday(changeTimezone(new Date(), timezone))
    // if (new Date(year, month, day) > today) {
    //   setDate(changeTimezone(new Date(year, month, day), timezone))
    // } else {
    //   setDate(changeTimezone(new Date(), timezone))
    // }
    setDate(changeTimezone(new Date(repairWidgetStore.repairWidgetInitialValue.selectDate), timezone))
  }, [timezone])

  function changeTimezone(date:Date, ianatz:string) {
    const invdate = new Date(date.toLocaleString('en-US', {
      timeZone: ianatz
    }));
    const diff = date.getTime() - invdate.getTime();
    return new Date(date.getTime() - diff);
  }

  function getStartDayOfMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  }

  function isLeapYear(year: number) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  const days = isLeapYear(year) ? DAYS_LEAP : DAYS;

  function handleDate(date:Date) {
    if (date < new Date(today.getFullYear(), today.getMonth(), today.getDate())) return;
    setDate(date)
  }

  function handleNextMonth() {
    if (month < 11) {
      setMonth(month+1)
      setDate(new Date(year, month+1, day))
    } else {
      setMonth(0)
      setYear(year+1)
      setDate(new Date(year+1, 0, day))
    }
  }

  function handlePrevMonth() {
    if (year === today.getFullYear() && month === today.getMonth()) return;
    if (month > 0) {
      setMonth(month-1)
      setDate(new Date(year, month-1, day))
    } else {
      setMonth(11)
      setYear(year-1)
      setDate(new Date(year-1, 11, day))
    }
  }

  function handlePrevYear() {
    if (year === today.getFullYear()) return;
    setYear(year-1)
    setDate(new Date(year-1, month, day))
  }

  function handleNextYear() {
    setYear(year+1)
    setDate(new Date(year+1, month, day))
  }

  return (
    <Frame>
      <InputDate>
        {month+1}/{day}/{year}
      </InputDate>
      <Numeric>
        <CustomNumeric content={MONTHS[month]} handlePrevState={handlePrevMonth} handleNextState={handleNextMonth} subDomain={subDomain} />
        <CustomNumeric content={year.toString()} handlePrevState={handlePrevYear} handleNextState={handleNextYear} subDomain={subDomain} />
      </Numeric>
      <Body>
        <Weekdiv>
          {DAYS_OF_THE_WEEK.map(d => (
            <Day key={d} color='white' bg='#BDBFC3' margin='0 0 10px'>
              <strong>{d}</strong>
            </Day>
          ))}
        </Weekdiv>
        {Array(days[month] + (startDay - 1))
          .fill(null)
          .map((_, index) => {
            const d = index - (startDay - 2);
            return (
              <Day
                key={index}
                isPastDay={new Date(year, month, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate())}
                isToday={d === today.getDate() && month === today.getMonth() && year === today.getFullYear()}
                isSelected={d === day}
                repairBooktimeCol={repairBooktimeCol}
                onClick={()=>handleDate(new Date(year, month, d))}
              >
                {d > 0 ? d : ''}
              </Day>
            );
          })}
      </Body>
    </Frame>
  );
}

export default CustomCalendar