import {Paciente} from './TypePaciente';

export type Doctor = Paciente & {
  especializacao: number;
};
