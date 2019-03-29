/**
 * Route transition animation
 *
 * Gives the effect of the pages sliding in and out on route change.
 *
 * Credit for the animation to: https://medium.com/@tejozarkar/angular-route-transition-animation-in-5-easy-steps-ab0ddc8230e
 */
import {
  transition,
  trigger,
  query,
  style,
  animate,
  group
} from '@angular/animations';
export const slideInAnimation =
  trigger('routeAnimations', [
    transition('* => *', [
      query(':enter, :leave',
        style({ position: 'fixed', width: '100%' }),
        { optional: true }),
      group([
        query(':enter',[
          style({ transform: 'translateX(-100%)' }),
          animate('0.5s ease-in-out',
            style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform:   'translateX(0%)'}),
          animate('0.5s ease-in-out',
            style({ transform: 'translateX(100%)' }))
        ], { optional: true }),
      ])
    ])
  ]);
