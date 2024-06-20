import {atom, selector} from 'recoil';
import {filterServiceCurrentState, servicesState} from '../atom';

const serviceListFilterState = selector({
  key: 'serviceListFilter',
  get: ({get}) => {
    const filter = get(filterServiceCurrentState);
    const listServices = get(servicesState);

    
  },
});
