import { createSelector } from '@ngrx/store';
import { RegisterTokenState } from './registerToken.reducer';

interface AppState {
  registerToken: RegisterTokenState
}

const selectRegisterToken = (state: AppState) => state.registerToken;

export const selectAllRegisterTokens = createSelector<any, any, any>(
  selectRegisterToken,
  (state: RegisterTokenState) => state.registerTokens
);
