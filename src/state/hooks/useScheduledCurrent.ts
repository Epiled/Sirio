import {useRecoilValue} from 'recoil';
import {userScheduledCurrentState} from '../atom';

const useScheduledCurrent = () => {
  return useRecoilValue(userScheduledCurrentState);
};

export default useScheduledCurrent;
