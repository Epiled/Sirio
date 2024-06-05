import {useSetRecoilState} from 'recoil';
import {userActiveState} from '../atom';
import {Paciente} from '../../types/TypePaciente';
import {Doctor} from '../../types/TypeDoctor';

const useUserActiveSet = () => {
  const setUserActive = useSetRecoilState(userActiveState);
  return (user: Paciente | Doctor) => {
    return setUserActive(user);
  };
};

export default useUserActiveSet;
