import { Action, createReducer, on } from '@ngrx/store';
import { saveOnboarding } from './isOnboarding.action';

export let initialState = false;

const _isOnboardingReducer = createReducer(
  initialState,
  on(saveOnboarding, (state,action) => {
      initialState = action.isOnboarding;
      return action.isOnboarding;
    }
  )
);

export function isOnboardingReducer(state: boolean | undefined, action: Action) {
  return _isOnboardingReducer(state, action);
}


