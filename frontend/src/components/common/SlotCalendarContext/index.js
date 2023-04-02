import { createContext } from 'react';

const SlotCalendarContext = createContext({
  shownDate: new Date(),
});

export default SlotCalendarContext;
