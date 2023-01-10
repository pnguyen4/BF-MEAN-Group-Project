import { createAction,props } from '@ngrx/store';

export const saveOnboarding = createAction('[Counter Component] saveOnboarding',props<{isOnboarding:boolean}>());
