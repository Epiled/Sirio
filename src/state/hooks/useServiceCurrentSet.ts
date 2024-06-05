import {useSetRecoilState} from 'recoil';
import {useServiceCurrentState} from '../atom';
import IService from '../../interface/IService';

// Retorna o serviço selecionada
const useServiceCurrentSet = () => {
  const setServiceCurrent = useSetRecoilState(useServiceCurrentState);
  return (service: IService) => {
    return setServiceCurrent(service);
  };
};

export default useServiceCurrentSet;
