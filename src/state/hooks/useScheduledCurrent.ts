import {useRecoilValue} from 'recoil';
import {userScheduledCurrentState} from '../atom';

// Retorna a consulta selecionada
const useScheduledCurrent = () => {
  return useRecoilValue(userScheduledCurrentState);
};

export default useScheduledCurrent;
