import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TipoUser from '../views/TipoUser';
import LoginUser from '../views/User/LoginUser';
import LoginDoctor from '../views/Doctor/LoginDoctor';
import MainUser from '../views/User/MainUser';
import Scheduling from '../views/User/Scheduling';
import ExamsDone from '../views/User/ExamsDone';
import ScheduledExams from '../views/User/ScheduledExams';
import {RecoilRoot} from 'recoil';

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
          name="LoginUser"
          component={LoginUser}
          options={{title: 'Portal do Paciente'}}
        />
        <Stack.Screen
          name="LoginDoctor"
          component={LoginDoctor}
          options={{title: 'Portal do Médico'}}
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
      </Stack.Navigator>
    </RecoilRoot>
  );
};
