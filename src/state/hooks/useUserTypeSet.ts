import {useSetRecoilState} from 'recoil';
import {userTypeState} from '../atom';

// Defini o Tipo de usuário pacinete ou Médico
const useUserTypeSet = () => {
  const setUserType = useSetRecoilState(userTypeState);
  return (userType: string) => {
    return setUserType(userType);
  };
};

export default useUserTypeSet;
