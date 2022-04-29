import { createAction, props } from '@ngrx/store';

export const redirectToRoute = createAction(
  '[Message Library Create Actions] Redirect To Route',
  props<{ route: string[] }>(),
);
