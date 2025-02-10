import {
  trigger,
  state,
  transition,
  style,
  animate,
} from '@angular/animations';

// Configuração da animação de fadeIn para ser utilizada em componentes

export const fadeInAnimation = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('0.4s linear', style({ opacity: 1 })),
  ]),
]);

export const fadeInOut = trigger('fadeInOut', [
  state('true', style({ opacity: 1 })),
  state('false', style({ opacity: 0, display: 'none' })),
  transition('false => true', animate('0.8s ease-in')),
  transition('true => false', animate('0.8s ease-out')),
]);
