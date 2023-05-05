export const addMinutes = (date: string, minutes: number) => {
  const newDate = new Date(date);
  newDate.setMinutes(newDate.getMinutes() + minutes);
  return getMilitaryTime(newDate.toISOString());
};

export const getMilitaryTime = (date?: string) => {
  if (!date) {
    return '';
  }
  return date.slice(11, 13) + date.slice(14, 16);
};
