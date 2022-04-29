import { createAction, props } from '@ngrx/store';

export const redirectToRoute = createAction(
  '[Schedule Message Actions] Redirect To Route',
  props<{ route: string[] }>(),
);
