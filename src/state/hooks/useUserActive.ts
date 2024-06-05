import {useRecoilValue} from 'recoil';
import {userActiveState} from '../atom';

// Retorna o tipo de usuário ativo no momento Paciente ou Médico
const useUserActive = () => {
  return useRecoilValue(userActiveState);
};

export default useUserActive;
