import {useSetRecoilState} from 'recoil';
import {userScheduledCurrentState} from '../atom';
import IScheduled from '../../interface/IScheduled';

const useAddCurrent = () => {
  const setScheduledCurrent = useSetRecoilState(userScheduledCurrentState);
  return (newCurrent: IScheduled) => {
    return setScheduledCurrent(newCurrent);
  };
};

export default useAddCurrent;
