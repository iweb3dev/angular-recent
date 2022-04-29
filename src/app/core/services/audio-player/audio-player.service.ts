import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { AudioPlayerEvents } from './audio-player.models';

@Injectable({ providedIn: 'root' })
export class AudioPlayerService {
  private _stop$ = new Subject<void>();
  private _audio = new Audio();

  constructor() {}

  get isPaused(): boolean {
    return this._audio.paused;
  }

  get currentTime(): number {
    return this._audio.currentTime;
  }

  play(): void {
    this._audio.play();
  }

  pause(): void {
    this._audio.pause();
  }

  updateCurrentTime(value: number): void {
    this._audio.currentTime = value;
  }

  stop(): void {
    this._audio.currentTime = 0;
    this._audio.pause();
    this._stop$.next();
  }

  createAudioStream(source: string) {
    return this.initiateAudio(source).pipe(
      switchMap(() =>
        this.calculateMediaDuration(source).pipe(
          switchMap((calculatedDuration) =>
            this.fetchTimeUpdateStream().pipe(
              map((currentTime) => ({
                duration: Math.floor(calculatedDuration),
                currentTime: Math.floor(currentTime),
                formattedDuration: this.formatTime(
                  Math.floor(calculatedDuration),
                ),
                formattedCurrentTime: this.formatTime(Math.floor(currentTime)),
              })),
            ),
          ),
        ),
      ),
    );
  }

  private formatTime(time: number): string {
    let seconds = '00';
    let minutes = '00';

    const audioLength = Math.floor(time / 60);

    if (!audioLength) {
      seconds = time < 10 ? `0${time}` : `${time}`;
      minutes = '00';
    } else {
      const currentSeconds = time - audioLength * 60;
      minutes = audioLength < 10 ? `0${audioLength}` : `${audioLength}`;
      seconds =
        currentSeconds < 10
          ? `0${time - audioLength * 60}`
          : `${currentSeconds}`;
    }

    return `${minutes}:${seconds}`;
  }

  private fetchTimeUpdateStream(): Observable<number> {
    return new Observable((observer) => {
      this._audio.ontimeupdate = () => observer.next(this._audio.currentTime);

      this._audio.onended = () => {
        this._audio.currentTime = 0;
        this._stop$.next();
        observer.next(this._audio.currentTime);
        observer.complete();
      };
    });
  }

  private initiateAudio(source: string): Observable<void> {
    return new Observable((observer) => {
      this._audio.src = source;

      observer.next();
      observer.complete();
    });
  }

  // Workaround for ongoing chrome issue: https://bugs.chromium.org/p/chromium/issues/detail?id=642012
  // TODO: get rid of this once issue is resolved

  private calculateMediaDuration(stream: string): Observable<number> {
    const media = new Audio(stream);

    media.dispatchEvent(new Event(AudioPlayerEvents.LoadedData));
    media.dispatchEvent(new Event(AudioPlayerEvents.TimeUpdate));

    return new Observable((observer) => {
      media.onloadedmetadata = function () {
        if (!isNaN(media.duration) && Number.isFinite(media.duration)) {
          observer.next(media.duration);
        } else {
          media.currentTime = Number.MAX_SAFE_INTEGER;

          media.ontimeupdate = function () {
            this.ontimeupdate = () => {
              return;
            };
            media.ontimeupdate = null;
            media.currentTime = 0.1;
            media.currentTime = 0;

            observer.next(media.duration);
          };
        }
      };
    });
  }
}
