import {RouteProp} from '@react-navigation/native';

export type MainUserScreenParams = undefined;
export type AgendamentoUserScreenParams = undefined;
export type EAgendamentoScreenParams = undefined;
export type ERealizadosScreenParams = undefined;

export type RootStackParamList = {
  MainUser: MainUserScreenParams;
  Agendamento: AgendamentoUserScreenParams;
  EAgendados: EAgendamentoScreenParams;
  ERealizados: ERealizadosScreenParams;
};
