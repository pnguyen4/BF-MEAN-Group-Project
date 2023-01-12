import { createReducer, on } from '@ngrx/store';
import { EmployeeHousingAction, HrHousingAction } from './housing.action';
import { Housing, Report, ReportMessage } from '../shared/data.model';

export interface HousingState {
  house: Housing | undefined // for employees
  houses: Housing[], // for hr
  reports: Report[]
  currentReport: any
};

const initialState: HousingState = {
  house: undefined,
  houses: [],
  reports: [],
  currentReport: {}
};

function modifyhelper(apps: any[], id: string, field: string, value: string) {
  let idx = apps.findIndex(apps => apps._id == id);
  let updated = {...apps[idx], [field]: value};
  return [...apps.slice(0, idx), updated, ...apps.slice(idx + 1)];
}

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
  on(EmployeeHousingAction.loadCurrentFacilityReport, (state, action) => ({
    ...state, currentReport: action.currentReport
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
  })),

  on(HrHousingAction.loadCurrentFacilityReport, (state, action) => ({
    ...state, currentReport: action.currentReport
  })),

  on(HrHousingAction.updateCurrentFacilityReportStatus, (state, action) => ({
    ...state,
    currentReport: { ...state.currentReport, status: action.value },
    reports: modifyhelper(state.reports, action.id, 'status', action.value)
  })),

);
