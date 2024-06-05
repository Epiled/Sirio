import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TipoUser from '../views/TipoUser';
import Login from '../views/Login';
import MainUser from '../views/User/MainUser';
import Scheduling from '../views/User/Scheduling';
import ExamsDone from '../views/User/ExamsDone';
import ScheduledExams from '../views/User/ScheduledExams';
import EditScheduling from '../views/User/EditScheduling';
import {RecoilRoot} from 'recoil';
import UserType from '../views/Account/UserType';
import CreateAccount from '../views/Account/CreateAccount';
import MainDoctor from '../views/Doctor/MainDoctor';
import TodaysAppointments from '../views/Doctor/TodaysAppointments';
import YourPatients from '../views/Doctor/YourPatients';
import AppointmentStatus from '../views/Doctor/AppointmentStatus';

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <RecoilRoot>
      <Stack.Navigator initialRouteName="TipoUser">
        <Stack.Screen
          name="TipoUser"
          component={TipoUser}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={({route}) => ({
            title:
              route.params &&
              'userType' in route.params &&
              route.params.userType === 'Médico'
                ? 'Portal do Médico'
                : 'Portal do Paciente',
          })}
        />
        <Stack.Screen
          name="MainUser"
          component={MainUser}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AgendarConsulta"
          component={Scheduling}
          options={{title: 'Agendar Consulta'}}
        />
        <Stack.Screen
          name="ConsultasRealizadas"
          component={ExamsDone}
          options={{title: 'Consultas Realizadas'}}
        />
        <Stack.Screen
          name="ConsultasAgendadas"
          component={ScheduledExams}
          options={{title: 'Consultas Agendadas'}}
        />
        <Stack.Screen
          name="MainDoctor"
          component={MainDoctor}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TodaysAppointments"
          component={TodaysAppointments}
        />
        <Stack.Screen name="YourPatients" component={YourPatients} />
        <Stack.Screen name="AppointmentStatus" component={AppointmentStatus} />
        <Stack.Screen
          name="TipoCadastro"
          component={UserType}
          options={{title: 'Cadastro'}}
        />
        <Stack.Screen
          name="Cadastro"
          component={CreateAccount}
          options={({route}) => ({
            title:
              route.params &&
              'userType' in route.params &&
              route.params.userType === 'Paciente'
                ? 'Cadastro Paciente'
                : 'Cadastro Médico',
          })}
        />
        <Stack.Screen
          name="EditScheduling"
          component={EditScheduling}
          options={{title: 'Editar Agendamento'}}
        />
      </Stack.Navigator>
    </RecoilRoot>
  );
};
