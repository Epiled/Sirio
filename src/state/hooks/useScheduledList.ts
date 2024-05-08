import {useRecoilValue} from 'recoil';
import {userScheduledListState} from '../atom';

const useScheduledList = () => {
  return useRecoilValue(userScheduledListState);
};

export default useScheduledList;
