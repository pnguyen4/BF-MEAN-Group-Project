import { createReducer, on } from '@ngrx/store';
import { HrRegisterTokenAction } from './registerToken.action';

export interface RegisterTokenState {
  registerTokens: any
};

const initialState: RegisterTokenState = {
  registerTokens: []
}

export const registerTokenReducer = createReducer(
  initialState,

  on(HrRegisterTokenAction.loadAllRegisterTokens, (state, action) => ({
    ...state, registerTokens: action.registerTokens
  })),
);
