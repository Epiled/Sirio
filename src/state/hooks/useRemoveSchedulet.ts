import {useSetRecoilState} from 'recoil';
import {userScheduledListState} from '../atom';
import IScheduled from '../../interface/IScheduled';

const useRemoveScheduled = () => {
  const setScheduledList = useSetRecoilState(userScheduledListState);

  return (scheduled: IScheduled) => {
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
