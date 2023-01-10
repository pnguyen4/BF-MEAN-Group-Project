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

function modifyhelper(apps: any[], id: string, status: string) {
  let idx = apps.findIndex(apps => apps._id == id);
  let updated = {...apps[idx], status};
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

  on(HrApplicationAction.updateApplicationStatus, (state, action) => ({
    ...state,
    currentApplication: {...state.currentApplication, status: action.status},
    applications: modifyhelper(state.applications, action.id, action.status)
  })),
);
