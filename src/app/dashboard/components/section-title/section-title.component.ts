import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-title',
  template: `<section>
    <h3 [innerHTML]="title" class="title-text"></h3>
    <mat-divider class="divider-wrapper"></mat-divider>
  </section>`,
  styles: [
    `
      .title-text {
        text-align: center;
        color: black;
        font-weight: 500;
        margin: 0 0 0.75rem 0;
      }
      .divider-wrapper {
        padding: 0.5rem 0;
        position: relative !important;
      }

      @media screen and (max-width: 959px) {
        .title-text, .divider-wrapper {
          display: none;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionTitleComponent {
  @Input() title: string;
}
