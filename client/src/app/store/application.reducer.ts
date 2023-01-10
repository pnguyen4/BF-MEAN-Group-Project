import { createReducer, on } from '@ngrx/store';
import { HrApplicationAction } from './application.action';

export interface ApplicationState {
  // TODO: proper typing
  currentApplication: any,
  applications: any
};

const initialState: ApplicationState = {
  currentApplication: {},
  applications: []
};

function modifyhelper(apps: any[], id: string, field: string, value: string) {
  let idx = apps.findIndex(apps => apps._id == id);
  let updated = {...apps[idx], [field]: value};
  return [...apps.slice(0, idx), updated, ...apps.slice(idx + 1)];
}

export const applicationReducer = createReducer(
  initialState,

  on(HrApplicationAction.loadAllApplications, (state, action) => ({
    ...state, applications: action.applications
  })),

  on(HrApplicationAction.loadCurrentApplication, (state, action) => ({
    ...state, currentApplication: action.application
  })),

  on(HrApplicationAction.updateApplication, (state, action) => ({
    ...state,
    currentApplication: {...state.currentApplication, [action.field]: action.value},
    applications: modifyhelper(state.applications, action.id, action.field, action.value)
  })),
);
