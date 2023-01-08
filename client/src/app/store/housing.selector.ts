import { createSelector } from '@ngrx/store';
import { HousingState } from './housing.reducer';

interface AppState {
  // note:
  // store will at LEAST contain this slice of state, along with others
  // this name must must what is defined in StoreModule.forRoot in app.module.ts
  housing: HousingState
}

const selectHousing = (state: AppState) => state.housing;

export const selectEmployeeHousing = createSelector<any, any, any>(
  selectHousing,
  (state: HousingState) => state.house
);

export const selectAllHousing = createSelector<any, any, any>(
  selectHousing,
  (state: HousingState) => state.houses
);

export const selectFacReports = createSelector<any, any, any>(
  selectHousing,
  (state: HousingState) => state.reports
);
