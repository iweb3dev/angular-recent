import { createAction } from '@ngrx/store';

export const showLoader = createAction('[Loader Actions] Show Loader');
export const removeLoader = createAction('[Loader Actions] Remove Loader');

export const showDetachedLoader = createAction(
  '[Loader Actions] Show Detached Loader'
);
export const removeAttachedLoader = createAction(
  '[Loader Actions] Remove Attached Loader'
);
