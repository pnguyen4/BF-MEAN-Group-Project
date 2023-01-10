import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { RegisterToken } from '../shared/data.model';

export const HrRegisterTokenAction = createActionGroup({
  source: 'Hr Page',
  events: {
    'Load All Register Tokens': props<{ registerTokens: any }>(),
  }
});
