import {atom} from 'recoil';
import IScheduled from '../interface/IScheduled';

export const userScheduledListState = atom<IScheduled[]>({
  key: 'userScheduledList',
  default: [],
});

export const userScheduledCurrentState = atom<IScheduled | null>({
  key: 'userScheduledCurrent',
  default: null,
});
