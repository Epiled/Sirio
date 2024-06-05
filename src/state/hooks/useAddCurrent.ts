import {useSetRecoilState} from 'recoil';
import {userScheduledCurrentState} from '../atom';
import {Consulta} from '../../types/TypeConsulta';

// Adiciona uma consulta a consulta selecionada
const useAddCurrent = () => {
  const setScheduledCurrent = useSetRecoilState(userScheduledCurrentState);
  return (newCurrent: Consulta | null) => {
    return setScheduledCurrent(newCurrent);
  };
};

export default useAddCurrent;
