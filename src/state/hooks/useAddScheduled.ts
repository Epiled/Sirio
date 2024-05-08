import {useSetRecoilState} from 'recoil';
import {userScheduledListState} from '../atom';
import IScheduled from '../../interface/IScheduled';

const useAddScheduled = () => {
  const setScheduledList = useSetRecoilState(userScheduledListState);
  return (newScheduled: IScheduled) => {
    return setScheduledList(previewList => [...previewList, newScheduled]);
  };
};

export default useAddScheduled;
