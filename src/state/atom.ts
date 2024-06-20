import {atom} from 'recoil';
import {Paciente} from '../types/TypePaciente';
import {Doctor} from '../types/TypeDoctor';
import {Consulta} from '../types/TypeConsulta';
import IService from '../interface/IService';
import {services} from '../db/services';

export const userScheduledListState = atom<Consulta[]>({
  key: 'userScheduledList',
  default: [],
});

export const userScheduledCurrentState = atom<Consulta | null>({
  key: 'userScheduledCurrent',
  default: null,
});

export const useServiceCurrentState = atom<IService | null>({
  key: 'useServiceCurrent',
  default: null,
});

export const userTypeState = atom<string | null>({
  key: 'userType',
  default: null,
});

export const userActiveState = atom<Paciente | Doctor>({
  key: 'userActive',
  default: {
    id: 0,
    nome: '',
    telefone: '',
    email: '',
    senha: '',
    especializacao: 0, // Especialização é uma propriedade opcional
  },
});

export const servicesState = atom({
  key: 'services',
  default: services,
});

export const filterServiceCurrentState = atom<number>({
  key: 'filterServiceCurrent',
  default: 0,
});
