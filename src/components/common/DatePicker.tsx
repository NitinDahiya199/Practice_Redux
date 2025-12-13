// src/components/common/DatePicker.tsx
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const DatePickerContainer = styled.div`
  position: relative;
`;

const DatePickerDropdown = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  min-width: 300px;
  z-index: 1000;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.surface} 0%,
    ${({ theme }) => theme.colors.surfaceLight} 100%
  );
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  padding: ${({ theme }) => theme.spacing.md};
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  animation: ${({ $isOpen }) => ($isOpen ? 'slideDown 0.2s ease-out' : 'none')};
  backdrop-filter: blur(10px);

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const MonthYearSelector = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  font-size: ${({ theme }) => theme.fontSize.lg};
`;

const NavButton = styled.button`
  background: transparent;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  width: 32px;
  height: 32px;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const WeekDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const WeekDay = styled.div`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: ${({ theme }) => theme.spacing.xs};
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: ${({ theme }) => theme.spacing.xs};
`;

const DayButton = styled.button<{ $isSelected: boolean; $isToday: boolean; $isOtherMonth: boolean; $isDisabled: boolean }>`
  aspect-ratio: 1;
  min-width: 36px;
  min-height: 36px;
  border: 2px solid transparent;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ $isSelected, $isToday, theme }) => {
    if ($isSelected) return theme.gradients.primary;
    if ($isToday) return `${theme.colors.primary}20`;
    return 'transparent';
  }};
  color: ${({ $isSelected, $isOtherMonth, $isDisabled, theme }) => {
    if ($isDisabled) return theme.colors.textSecondary + '40';
    if ($isSelected) return '#FFFFFF';
    if ($isOtherMonth) return theme.colors.textSecondary + '60';
    return theme.colors.text;
  }};
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'pointer')};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ $isSelected, $isToday, theme }) => ($isSelected || $isToday ? theme.fontWeight.semibold : theme.fontWeight.normal)};
  transition: all 0.2s ease;
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.4 : 1)};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background: ${({ $isSelected, theme }) => ($isSelected ? theme.gradients.primary : theme.colors.surfaceHover)};
    border-color: ${({ theme }) => theme.colors.primary};
    transform: scale(1.05);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const CalendarActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const ActionButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  transition: all 0.2s ease;
  border-radius: ${({ theme }) => theme.borderRadius.md};

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
    color: ${({ theme }) => theme.colors.primaryLight};
  }
`;

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  minDate?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({ value, onChange, minDate, isOpen, onClose }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedDate = value ? new Date(value + 'T00:00:00') : null;
  const minDateObj = minDate ? new Date(minDate + 'T00:00:00') : null;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      // Set current month to selected date or today
      if (value) {
        setCurrentMonth(new Date(value + 'T00:00:00'));
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, value, onClose]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const handleDateSelect = (date: Date) => {
    if (minDateObj && date < minDateObj) return;
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    onChange(`${year}-${month}-${day}`);
    onClose();
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleToday = () => {
    const today = new Date();
    if (!minDateObj || today >= minDateObj) {
      handleDateSelect(today);
    }
  };

  const handleClear = () => {
    onChange('');
    onClose();
  };

  const isToday = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    return compareDate.getTime() === today.getTime();
  };

  const isSelected = (date: Date) => {
    if (!selectedDate) return false;
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    const compareSelected = new Date(selectedDate);
    compareSelected.setHours(0, 0, 0, 0);
    return compareDate.getTime() === compareSelected.getTime();
  };

  const isDisabled = (date: Date) => {
    if (!minDateObj) return false;
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    const compareMin = new Date(minDateObj);
    compareMin.setHours(0, 0, 0, 0);
    return compareDate.getTime() < compareMin.getTime();
  };

  const days = getDaysInMonth(currentMonth);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <DatePickerContainer ref={containerRef}>
      <DatePickerDropdown $isOpen={isOpen}>
        <CalendarHeader>
          <NavButton onClick={handlePreviousMonth} type="button">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </NavButton>
          <MonthYearSelector>
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </MonthYearSelector>
          <NavButton onClick={handleNextMonth} type="button">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </NavButton>
        </CalendarHeader>

        <WeekDays>
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
            <WeekDay key={day}>{day}</WeekDay>
          ))}
        </WeekDays>

        <CalendarGrid>
          {days.map((date, index) => {
            if (!date) {
              return <div key={`empty-${index}`} />;
            }

            const isOtherMonth = date.getMonth() !== currentMonth.getMonth();
            return (
              <DayButton
                key={date.toISOString()}
                $isSelected={isSelected(date)}
                $isToday={isToday(date)}
                $isOtherMonth={isOtherMonth}
                $isDisabled={isDisabled(date)}
                onClick={() => !isDisabled(date) && handleDateSelect(date)}
                disabled={isDisabled(date)}
                type="button"
              >
                {date.getDate()}
              </DayButton>
            );
          })}
        </CalendarGrid>

        <CalendarActions>
          <ActionButton onClick={handleClear} type="button">
            Clear
          </ActionButton>
          <ActionButton onClick={handleToday} type="button" disabled={minDateObj ? new Date() < minDateObj : false}>
            Today
          </ActionButton>
        </CalendarActions>
      </DatePickerDropdown>
    </DatePickerContainer>
  );
};

