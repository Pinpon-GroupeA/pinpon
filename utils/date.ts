export const addMinutes = (date: string, minutes: number) => {
  const newDate = new Date(date);
  newDate.setMinutes(newDate.getMinutes() + minutes);
  return getMilitaryTime(newDate.toLocaleTimeString());
};

export const getMilitaryTime = (date?: string) => {
  if (!date) {
    return '';
  }
  return date.slice(0, 2) + date.slice(3, 5);
};
