import { Action, createReducer, on } from '@ngrx/store';
import { User } from 'app/shared/data.model';
import { saveUser, decrement, reset } from './user.action';

export let initialState = new User('','','','',true,'','');

const _userReducer = createReducer(
  initialState,
  on(saveUser, (state,action) => {
      initialState = action.userInfo;
      return action.userInfo;
    }
  ),
  on(decrement, (state) => state),
  on(reset, (state) => state)
);

export function userReducer(state: User | undefined, action: Action) {
  return _userReducer(state, action);
}




