import { trigger, transition, style, query, animate, group } from '@angular/animations';

export const fader = trigger('routeAnimations', [
  transition('* <=> *', [
    // estado inicial
    query(
      ':enter',
      [
        style({
          position: 'absolute',
          width: '100%',
          opacity: 0,
          transform: 'translateY(10px) scale(0.98)',
        }),
      ],
      { optional: true },
    ),

    query(
      ':leave',
      [
        style({
          position: 'absolute',
          width: '100%',
          opacity: 1,
          transform: 'translateY(0) scale(1)',
        }),
      ],
      { optional: true },
    ),

    // animações rodando juntas
    group([
      // saída
      query(
        ':leave',
        [
          animate(
            '350ms cubic-bezier(0.4, 0.0, 0.2, 1)',
            style({
              opacity: 0,
              transform: 'translateY(-10px) scale(0.98)',
            }),
          ),
        ],
        { optional: true },
      ),

      // entrada (com leve delay)
      query(
        ':enter',
        [
          animate(
            '450ms 80ms cubic-bezier(0.2, 0.8, 0.2, 1)',
            style({
              opacity: 1,
              transform: 'translateY(0) scale(1)',
            }),
          ),
        ],
        { optional: true },
      ),
    ]),
  ]),
]);
