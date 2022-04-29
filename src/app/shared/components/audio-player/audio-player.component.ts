import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { Observable, Subject } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';

import { AudioPlayerService } from 'src/app/core/services/audio-player/audio-player.service';
import { AudioPlaybackModel } from './audio-player.models';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AudioPlayerComponent implements OnInit, OnDestroy {
  private _audioStreamInitiator$ = new Subject<void>();

  sourceData$: Observable<AudioPlaybackModel>;

  @Input()
  label: string;

  @Input()
  source: string | Blob;

  @Output()
  playNoSource = new EventEmitter<void>();

  constructor(private _audioPlayerService: AudioPlayerService) {}

  get paused(): boolean {
    return this._audioPlayerService.isPaused;
  }

  get currentTime(): number {
    return this._audioPlayerService.currentTime;
  }

  get hasSource(): boolean {
    return !!this.source;
  }

  ngOnInit(): void {
    this.sourceData$ = this._audioStreamInitiator$.pipe(
      filter(() => this.hasSource),
      switchMap(() =>
        this._audioPlayerService.createAudioStream(this.source as string),
      ),
    );
  }

  onPlay(): void {
    if (!this.hasSource) {
      this.playNoSource.emit();

      return;
    }
    if (this.currentTime < 1) {
      this._audioStreamInitiator$.next();
    }
    this._audioPlayerService.play();
  }

  onPause(): void {
    this._audioPlayerService.pause();
  }

  onCurrentTimeChange(event: MatSliderChange): void {
    if (isFinite(event.value)) {
      this._audioPlayerService.updateCurrentTime(event.value);
    }
  }

  onStop(): void {
    this._audioPlayerService.stop();
  }

  ngOnDestroy(): void {
    this._audioStreamInitiator$.complete();
    this._audioPlayerService.stop();
  }
}
