import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Housing, Report, ReportMessage } from '../shared/data.model';

export const EmployeeHousingAction = createActionGroup({
  source: 'Employee Page',
  events: {
    'Load Housing': props<{ house: Housing }>(),
    'Load Facility Reports': props<{ facReports: Report[] }>(),
    'Create Facility Report': props<{ facReport: Report }>(),
  }
});

export const HrHousingAction = createActionGroup({
  source: 'Hr Page',
  events: {
    'Load All Housing': props<{ houses: Housing[] }>(),
    'Load Facility Reports': props<{ facReports: Report[] }>(),
    'Delete Housing': props<{ id: string }>(),
    'Create Housing': props<{ house: Housing }>(),

    'Load One Facility Report': props<{ houseid: string, reportid: string }>(),
  }
});
