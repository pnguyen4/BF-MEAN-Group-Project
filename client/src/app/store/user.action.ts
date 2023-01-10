import { createAction,props } from '@ngrx/store';
import { User } from 'app/shared/data.model';

export const saveUser = createAction('[Counter Component] SaveUser',props<{userInfo:User}>());
