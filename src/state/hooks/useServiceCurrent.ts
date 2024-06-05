import {useRecoilValue} from 'recoil';
import {useServiceCurrentState} from '../atom';

// Retorna o serviço selecionada
const useServiceCurrent = () => {
  return useRecoilValue(useServiceCurrentState);
};

export default useServiceCurrent;
