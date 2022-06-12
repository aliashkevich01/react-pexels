import { stateInterface } from '../redux/reducers/photo';

export interface StateInterface {
  photo: stateInterface;
  router: Record<string, unknown>;
}
