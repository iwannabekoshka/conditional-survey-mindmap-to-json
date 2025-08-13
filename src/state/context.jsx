import { createContext } from 'react';

const SurveyContext = createContext({
  dispatch: () => {},
});

export default SurveyContext;