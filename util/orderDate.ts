import {Consulta} from '../src/types/TypeConsulta';

export default (dates: Consulta[], order?: string) => {
  const dateOrdened = dates.sort((a, b) => {
    const [dataA, horaA] = a.dataHoraConsulta.split(' ');
    const [diaA, mesA, anoA] = dataA.split('/').map(Number);
    const [horaAInt, minutoAInt] = horaA.split(':').map(Number);
    const dateA = new Date(anoA, mesA - 1, diaA, horaAInt, minutoAInt);

    const [dataB, horaB] = b.dataHoraConsulta.split(' ');
    const [diaB, mesB, anoB] = dataB.split('/').map(Number);
    const [horaBInt, minutoBInt] = horaB.split(':').map(Number);
    const dateB = new Date(anoB, mesB - 1, diaB, horaBInt, minutoBInt);

    const ordened = order
      ? dateA.getTime() - dateB.getTime()
      : dateB.getTime() - dateA.getTime();

    return ordened;
  });

  return dateOrdened;
};
