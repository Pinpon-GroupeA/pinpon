export const addMinutes = (date: string, minutes: number) => {
  const newDate = new Date(date);
  newDate.setMinutes(newDate.getMinutes() + minutes);
  return getMilitaryTime(newDate);
};

export const getMilitaryTime = (date?: Date) => {
  if (!date) {
    return '';
  }
  return (
    date.getHours().toString().padStart(2, '0') + date.getMinutes().toString().padStart(2, '0')
  );
};

export const dateTimeFormattingOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: false,
};
