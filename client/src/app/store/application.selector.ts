import { createSelector } from '@ngrx/store';
import { Application } from 'app/shared/data.model';
import { ApplicationState } from './application.reducer';

interface AppState {
  // TODO: consolidate all the different AppStates in all selectors into one
  application: ApplicationState
}

const selectApplication = (state: AppState) => state.application;

export const selectAllApplications = createSelector<any, any, any>(
  selectApplication,
  (state: ApplicationState) => state.applications
);

export const selectCurrentApplication = createSelector<any, any, any>(
  selectApplication,
  (state: ApplicationState) => state.currentApplication
)
