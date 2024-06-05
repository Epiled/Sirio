import {useRecoilValue} from 'recoil';
import {userTypeState} from '../atom';

// Retorna o tipo de usuário Paciente ou Médico
const useUserType = () => {
  return useRecoilValue(userTypeState);
};

export default useUserType;
