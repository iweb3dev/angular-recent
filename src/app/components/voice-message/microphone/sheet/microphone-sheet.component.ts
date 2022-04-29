import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { interval, Observable } from 'rxjs';
import { filter, map, scan, withLatestFrom } from 'rxjs/operators';

import { VoiceFacade } from '../../voice/voice.facade';


@Component({
  selector: 'app-microphone-sheet',
  templateUrl: './microphone-sheet.component.html',
  styleUrls: ['./microphone-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MicrophoneSheetComponent implements OnInit, OnDestroy {
  recordingState$ = this._voiceFacade.recordingState$;
  microphoneDialogClosed$ = this._voiceFacade.microphoneDialogClosed$;
  timer$: Observable<string>;

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<MicrophoneSheetComponent>,
    private _voiceFacade: VoiceFacade,
  ) {}

  ngOnInit(): void {
    this.timer$ = interval(1000).pipe(
      withLatestFrom(this.recordingState$),
      filter(([, recording]) => recording.isMicrophoneRecording),
      scan(
        (initialValues, [, recording]) =>
          this.countTimer(initialValues, recording),
        {
          seconds: '00',
          minutes: '00',
        },
      ),
      map(({ seconds, minutes }) => `${minutes}:${seconds}`),
    );
  }

  ngOnDestroy(): void {}

  closeDialog(): void {
    this._bottomSheetRef.dismiss();
  }

  onRecordingStart(): void {
    this._voiceFacade.initiateRecording();
  }

  onRecordingPause(): void {
    this._voiceFacade.recordingPauseResume({ isPaused: true });
  }

  onRecordingResume(): void {
    this._voiceFacade.recordingPauseResume({ isPaused: false });
  }

  onRecordingStop(): void {
    this._voiceFacade.recordingStop();
    this._bottomSheetRef.dismiss();
  }

  private countTimer(
    {
      seconds,
      minutes,
    }: {
      seconds: string;
      minutes: string;
    },
    recording: { isMicrophoneRecording: boolean; isPaused: boolean },
  ): {
    seconds: string;
    minutes: string;
  } {
    if (!recording.isMicrophoneRecording) {
      return {
        seconds: '00',
        minutes: '00',
      };
    }
    if (recording.isPaused) {
      return {
        seconds,
        minutes,
      };
    }
    seconds = +seconds < 9 ? `0${+seconds + 1}` : (+seconds + 1).toString();

    if (+seconds === 60) {
      seconds = '00';
      minutes = +minutes < 9 ? `0${+minutes + 1}` : (+minutes + 1).toString();
    }
    if (+minutes === 60) {
      minutes = '0';
    }

    return {
      seconds,
      minutes,
    };
  }
}
