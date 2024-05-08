import {RouteProp} from '@react-navigation/native';

export type HomeScreenParams = undefined;
export type LoginUserScreenParams = undefined;
export type LoginDoctorScreenParams = undefined;

export type RootStackParamList = {
  Home: HomeScreenParams;
  LoginUser: LoginUserScreenParams;
  LoginDoctor: LoginDoctorScreenParams;
};
