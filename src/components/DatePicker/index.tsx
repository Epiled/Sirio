import React, {Dispatch, SetStateAction, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';

import DateTimePicker, {DateType} from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'; // Importe a localização para o português do Brasi
dayjs.locale('pt-br'); // Defina o idioma padrão para o português do Brasil

import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import {useRecoilState} from 'recoil';
import {userScheduledCurrentState} from '../../state/atom';
import {colors} from '../../styles/styles';
import useAddScheduled from '../../state/hooks/useAddScheduled';

const stylesHeader: TextStyle = {
  color: colors.textAlt,
};

interface IDatePicker {
  showPicker: boolean;
  onClose?: Dispatch<SetStateAction<boolean>>;
}

export default ({showPicker, onClose}: IDatePicker) => {
  const [date, setDate] = useState<DateType>(dayjs());

  const [userScheduledCurrent, setUserScheduledCurrent] = useRecoilState(
    userScheduledCurrentState,
  );

  const setUserScheduledList = useAddScheduled();

  const handlerScheduled = () => {
    if (userScheduledCurrent != null) {
      const formattingDate = dayjs(date).format('DD/MM/YYYY HH:mm');
      const novoAgendamento = {
        ...userScheduledCurrent,
        date: formattingDate,
        status: 'a' as 'a' | 'c' | 'x',
      };
      setUserScheduledCurrent(novoAgendamento);
      setUserScheduledList(novoAgendamento);
      onClose?.(false);
    }
  };

  const handleClose = () => {
    onClose?.(false);
    setUserScheduledCurrent(null);
  };

  return (
    <View
      style={[styles.container, showPicker ? styles.showPickerContainer : {}]}>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.buttonDefault}
          onPress={() => {
            handlerScheduled();
          }}>
          <Material size={20} name={'check'} color={colors.lighter} />
          <Text style={styles.buttonText}>Agendar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonClose} onPress={handleClose}>
          <Material size={20} name={'close'} color={colors.lighter} />
        </TouchableOpacity>
      </View>

      <DateTimePicker
        calendarTextStyle={styles.datePicker}
        headerTextStyle={stylesHeader}
        headerButtonColor={colors.primary}
        weekDaysTextStyle={stylesHeader}
        mode="single"
        locale="pt"
        timePicker={true}
        displayFullDays={true}
        date={date}
        onChange={params => {
          setDate(params.date);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBlockColor: colors.primary,
    borderTopWidth: 2,
    backgroundColor: colors.lighter,
    padding: 10,
    position: 'absolute',
    bottom: '100%',
  },
  datePicker: {
    color: colors.text,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  buttonDefault: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.done,
    borderRadius: 50,
    paddingHorizontal: 20,
    width: 'auto',
    height: 'auto',
  },
  buttonClose: {
    backgroundColor: colors.error,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    width: 40,
    height: 40,
  },
  buttonText: {
    color: colors.lighter,
    fontSize: 20,
    fontWeight: '500',
  },
  showPickerContainer: {
    display: 'flex',
    bottom: '0%',
  },
});
