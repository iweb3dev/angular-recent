import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-member',
  template: `
    <div class="loading-screen">
      <span [style.color]="'#808080'">{{ message?.primary }}</span>
      <span [style.color]="'#808080'">{{ message?.secondary }}</span>
    </div>
  `,
  styles: [
    `
      .loading-screen {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        height: calc(100vh - 390px);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoMemberComponent {
  @Input() message: {
    primary: string;
    secondary: string;
  } = {
    primary: 'Woohoo! Clean Slate!',
    secondary: 'Go ahead and add new members!',
  };
}
