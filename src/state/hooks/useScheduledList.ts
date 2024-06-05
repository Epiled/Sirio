import {useRecoilValue} from 'recoil';
import {userScheduledListState} from '../atom';

// Retorna a lista de tdos os agendamentos
const useScheduledList = () => {
  return useRecoilValue(userScheduledListState);
};

export default useScheduledList;
