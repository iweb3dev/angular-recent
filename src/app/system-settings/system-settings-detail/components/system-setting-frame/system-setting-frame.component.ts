import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LookupsFacade } from 'src/app/core/store/features/lookups/lookups.facade';
import { HelpTopic } from 'src/app/core/store/features/lookups/lookups.models';

@Component({
  selector: 'app-system-setting-frame',
  templateUrl: './system-setting-frame.component.html',
  styleUrls: ['./system-setting-frame.component.scss']
})
export class SystemSettingFrameComponent implements OnInit {
  @Input()
  fxLayout_lt_md = 'row';
  @Input()
  setting: string;
  @Input()
  promptconfig = {
    show: false,
    helpTopicId: '-1'
  } as SystemSettingHelpPromptConfiguration;

  helpTopicById$: Observable<HelpTopic>;

  constructor(private _lookupsFacade: LookupsFacade) {}

  ngOnInit() {
    this.helpTopicById$ = this._lookupsFacade.getHelpTopicByIdWithCange(this.promptconfig.helpTopicId);
  }
}

export interface SystemSettingHelpPromptConfiguration {
  show: boolean;
  helpTopicId: string;
}
