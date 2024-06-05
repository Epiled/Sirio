import {useSetRecoilState} from 'recoil';
import {userScheduledListState} from '../atom';
import {Consulta} from '../../types/TypeConsulta';

// Define o tipo de usuário ativo no momento Paciente ou Médico
const useScheduledListSet = () => {
  const setScheduledList = useSetRecoilState(userScheduledListState);
  return (newScheduled: Consulta[]) => {
    return setScheduledList(newScheduled);
  };
};

export default useScheduledListSet;
