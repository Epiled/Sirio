import {useSetRecoilState} from 'recoil';
import {userScheduledListState} from '../atom';
import {Consulta} from '../../types/TypeConsulta';

// Adiciona uma consulta a lista de consultas
const useAddScheduled = () => {
  const setScheduledList = useSetRecoilState(userScheduledListState);
  return (newScheduled: Consulta) => {
    return setScheduledList(previewList => [...previewList, newScheduled]);
  };
};

export default useAddScheduled;
