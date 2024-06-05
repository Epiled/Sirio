import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'; // Importe a localização para o português do Brasi
import {DateType} from 'react-native-ui-datepicker';
dayjs.locale('pt-br'); // Defina o idioma padrão para o português do Brasil

// Gera a data no formato Dia, Mês, Ano, Hora e Minuto
const handleDate = (date: DateType) => {
  return dayjs(date).format('DD/MM/YYYY HH:mm');
};

export default handleDate;
