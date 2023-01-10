import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Housing, Report, ReportMessage } from '../shared/data.model';

export const HrApplicationAction = createActionGroup({
  source: 'Hr Page',
  events: {
    'Load All Applications': props<{ applications: any }>(),
    'Load Current Application': props<{ application: any }>(),
    'Update Application Status': props<{id: string, status: string}>(),
  }
});
