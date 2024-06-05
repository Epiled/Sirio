import {useSetRecoilState} from 'recoil';
import {userScheduledListState} from '../atom';
import {Consulta} from '../../types/TypeConsulta';

// Atualiza uma consulta da lista de consultas
const useRemoveScheduled = () => {
  const setScheduledList = useSetRecoilState(userScheduledListState);

  return (scheduled: Consulta) => {
    setScheduledList(prevList => {
      const updatedList = prevList.map(item => {
        if (item.id === scheduled.id) {
          return scheduled; // Atualiza o item específico
        }
        return item; // Mantém os outros itens inalterados
      });
      return updatedList;
    });
  };
};

export default useRemoveScheduled;
