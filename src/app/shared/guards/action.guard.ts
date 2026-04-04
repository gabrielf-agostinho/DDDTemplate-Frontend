import { CanMatchFn } from "@angular/router";

export function ACTION_GUARD(action: 'insert' | 'update'): CanMatchFn {
  return () => {
    return true;
  };
}