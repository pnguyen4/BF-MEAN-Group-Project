import { createReducer, on } from '@ngrx/store';
import { EmployeeHousingAction, HrHousingAction } from './housing.action';
import { Housing, Report, ReportMessage } from '../shared/data.model';

export interface HousingState {
  house: Housing | undefined // for employees
  houses: Housing[], // for hr
  reports: Report[]
};

const initialState: HousingState = {
  house: undefined,
  houses: [],
  reports: []
};

export const housingReducer = createReducer(
  initialState,

  on(EmployeeHousingAction.loadHousing, (state, action) => ({
    ...state, house: action.house
  })),

  on(EmployeeHousingAction.loadFacilityReports, (state, action) => ({
    ...state, reports: action.facReports
  })),

  on(EmployeeHousingAction.createFacilityReport, (state, action) => ({
    ...state, reports: [action.facReport, ...state.reports]
  })),

  on(HrHousingAction.loadAllHousing, (state, action) => ({
    ...state, houses: action.houses
  })),

  on(HrHousingAction.loadFacilityReports, (state, action) => ({
    ...state, reports: action.facReports
  })),

  on(HrHousingAction.deleteHousing, (state, action) => ({
    ...state, houses: state.houses.filter((house: Housing) => house._id != action.id)
  })),

  on(HrHousingAction.createHousing, (state, action) => ({
    ...state, houses: [action.house, ...state.houses]
  }))
);
