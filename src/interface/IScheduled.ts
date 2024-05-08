import IService from './IService';

export default interface IScheduled extends IService {
  date?: any;
  status?: 'a' | 'c' | 'x';
}
