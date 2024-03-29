import React, { useState, useEffect } from 'react';
import {
  format,
  startOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  isSameMonth,
  endOfWeek,
  subMonths,
  addMonths,
  isToday,
  isBefore,
  differenceInCalendarDays
} from 'date-fns';
import './CustomCalendar.css';

interface ProgressData {
  mentalHealthCheckedCount: number;
  physicalHealthCheckedCount: number;
  nutritionCheckedCount: number;
  sleepCheckedCount: number;
  mentalHealthPercentage?: number;
  physicalHealthPercentage?: number;
  nutritionPercentage?: number;
  sleepPercentage?: number;
}

interface CustomCalendarProps {
  dayRatings: { [key: string]: number };
  onDaySelect: (date: string) => void;
  calculatedColor: string;
  progressData: ProgressData; // Use the defined ProgressData type here
  style?: React.CSSProperties;
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({ dayRatings, onDaySelect, calculatedColor, progressData }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  // Define the state for holding the progress data of the selected day
  const [selectedDayProgress, setSelectedDayProgress] = useState<ProgressData | null>(null);

  useEffect(() => {
    // Automatically select the current day and load its progress data
    const today = format(new Date(), 'yyyy-MM-dd');
    setSelectedDay(today);
    loadProgressData(today);
  }, []);

  // Function to load progress data for a specific day
  const loadProgressData = (date: string) => {
    const healthDataByDate = JSON.parse(localStorage.getItem('healthDataByDate') || '{}');
    const dayData = healthDataByDate[date];
    if (dayData) {
      setSelectedDayProgress(dayData);
    } else {
      setSelectedDayProgress(null);
    }
  };

  // Function to handle day click
  const handleDayClick = (formattedDay: string) => {
    onDaySelect(formattedDay);
    setSelectedDay(formattedDay);
    loadProgressData(formattedDay);
  };

  // Effect to update progress data when it changes externally (e.g., when checkboxes are checked)
  useEffect(() => {
    if (selectedDay) {
      loadProgressData(selectedDay);
    }
  }, [progressData]);


  const MAX_CHECKBOXES = {
    mentalHealth: 8,
    physicalHealth: 6,
    nutrition: 4,
    sleep: 10,
  };

  useEffect(() => {
    // Automatically select the current day and load its progress data
    const today = format(new Date(), 'yyyy-MM-dd');
    setSelectedDay(today);
    const healthDataByDate = JSON.parse(localStorage.getItem('healthDataByDate') || '{}');
    const dayData = healthDataByDate[today];
    if (dayData) {
      setSelectedDayProgress(dayData);
    } else {
      setSelectedDayProgress(null);
    }
  }, []);


  const saveHealthData = (data: ProgressData, date: string) => {
    const healthData = {
      mentalHealthPercentage: (data.mentalHealthCheckedCount / MAX_CHECKBOXES.mentalHealth) * 100,
      physicalHealthPercentage: (data.physicalHealthCheckedCount / MAX_CHECKBOXES.physicalHealth) * 100,
      nutritionPercentage: (data.nutritionCheckedCount / MAX_CHECKBOXES.nutrition) * 100,
      sleepPercentage: (data.sleepCheckedCount / MAX_CHECKBOXES.sleep) * 100,
      mentalHealthColor: getColorForRating(data.mentalHealthCheckedCount),
      physicalHealthColor: getColorForRating(data.physicalHealthCheckedCount),
      nutritionColor: getColorForRating(data.nutritionCheckedCount),
      sleepColor: getColorForRating(data.sleepCheckedCount),
      
    };

    const existingData = JSON.parse(localStorage.getItem('healthDataByDate') || '{}');
    existingData[date] = healthData;
    localStorage.setItem('healthDataByDate', JSON.stringify(existingData));
  };


  useEffect(() => {
    const currentDate = format(new Date(), 'yyyy-MM-dd');
    saveHealthData(progressData, currentDate);

  }, [progressData]);


  const getColorForRating = (rating: number): string => {
    switch (rating) {
      case 1: return '#fa0000';
      case 2: return '#f94300';
      case 3: return '#f46400';
      case 4: return '#eb8000';
      case 5: return '#dd9900';
      case 6: return '#cbb000';
      case 7: return '#b5c600';
      case 8: return '#98da00';
      case 9: return '#6fed00';
      case 10: return '#00ff00';
      default: return '';
    }
  };


  const renderHeader = () => {
    const dateFormat = 'MMMM yyyy';
    return (
      <div className="header row flex-middle">
        <div className="column col-start" onClick={prevMonth}>
          <div className="icon">{'<'}</div>
        </div>
        <div className="column col-center">
          <span>{format(currentMonth, dateFormat)}</span>
        </div>
        <div className="column col-end" onClick={nextMonth}>
          <div className="icon">{'>'}</div>
        </div>
      </div>
    );
  };

  const renderDaysOfWeekHeader = () => {
    const dateFormat = 'EEE';
    const days = [];
    let startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="column cell" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="row">{days}</div>;
  };


  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
  
    const healthDataByDate = JSON.parse(localStorage.getItem('healthDataByDate') || '{}');
  
    const rows = [];
    let days = [];
    let day = startDate;
    const today = new Date();
  
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDay = format(day, "yyyy-MM-dd");
        const dayRating = dayRatings[formattedDay] || 0;
        const dayHealthData = healthDataByDate[formattedDay];
        const isTodayFlag = isToday(day);
        const isCurrentMonth = isSameMonth(day, monthStart);
        const backgroundColor = isTodayFlag ? calculatedColor : getColorForRating(dayRating);
        const isDayInPastWeek = differenceInCalendarDays(today, day) <= 7 && differenceInCalendarDays(today, day) >= 0;
        const isEligibleForRating = isTodayFlag || (isBefore(day, today) && isDayInPastWeek);
        let cellStyle: React.CSSProperties = {
          cursor: 'pointer',
          opacity: 1,
          position: 'relative',
          backgroundColor: isEligibleForRating ? 'white' : '#929693',
          border: '2px solid #b0b0b0', // Default border color
        };
        if (isTodayFlag) {
          cellStyle.border = `5px solid ${calculatedColor}`;
        }
        if (dayRating) {
          const ratingColor = getColorForRating(dayRating);
          cellStyle.backgroundColor = ratingColor;
          cellStyle.border = `4px solid ${ratingColor}`; // Set border color to the rating color
        }
  
        const renderProgressBars = (progressData: ProgressData | null) => {
          if (!progressData) {
            return null; // No progress data for this day.
          }
          return (
            <div style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              height: '100%', // Ensure the container takes the full height of the cell
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end'
            }}>
              <div style={{
                flex: 1, // This will allow the bar to fill the space evenly
                width: `${progressData.mentalHealthPercentage || 0}%`,
                backgroundColor: '#ebc2ff'
              }}></div>
              <div style={{
                flex: 1,
                width: `${progressData.physicalHealthPercentage || 0}%`,
                backgroundColor: '#a873e8'
              }}></div>
              <div style={{
                flex: 1,
                width: `${progressData.nutritionPercentage || 0}%`,
                backgroundColor: '#56d1dc'
              }}></div>
              <div style={{
                flex: 1,
                width: `${progressData.sleepPercentage || 0}%`,
                backgroundColor: '#5d7bd5'
              }}></div>
  
            </div>
          );
        };
        days.push(
          <div
            className={`column cell ${!isCurrentMonth ? 'disabled' : ''} ${isTodayFlag ? 'today' : ''}`}
            key={day.toString()}
            style={cellStyle}
            onClick={() => handleDayClick(formattedDay)}
          >
            {format(day, "d")}
            {(selectedDay === formattedDay || (isTodayFlag && day === today)) && dayHealthData && renderProgressBars(dayHealthData)}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(<div className="row" key={day.toString()}>{days}</div>);
      days = [];
    }
  
    return <div className="body">{rows}</div>;
  };
  
  


  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  return (
    <div className="calendar">
      {renderHeader()}
      {renderDaysOfWeekHeader()}
      {renderCells()}
    </div>
  );
};

export default CustomCalendar;
