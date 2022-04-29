import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, scan, switchMap, skipUntil, first } from 'rxjs/operators';
import AudioRecorder from 'audio-recorder-polyfill';

import {
  MediaRecorderEvents,
  MediaRecordingState,
} from './audio-recorder.models';

import { FileReaderService } from '../file-reader/file-reader.service';

@Injectable({
  providedIn: 'root',
})
export class AudioRecorderService {
  private _stop$ = new Subject<void>();
  private _mediaRecorder: MediaRecorder;

  constructor(private _fileReaderService: FileReaderService) {}

  get recorderState(): MediaRecordingState {
    return this._mediaRecorder?.state as MediaRecordingState;
  }

  get recorderInactive(): boolean {
    return this.recorderState === MediaRecordingState.Inactive;
  }

  get recorderPaused(): boolean {
    return this.recorderState === MediaRecordingState.Paused;
  }

  get recorderRecording(): boolean {
    return this.recorderState === MediaRecordingState.Recording;
  }

  createAudioRecording(
    stream: MediaStream,
    startTimeout: number,
  ): Observable<Blob> {
    return this.initiateAudioStream(stream, startTimeout)
      .pipe(
        switchMap(() =>
          this.fetchAudioStream().pipe(
            scan((blobData, event: BlobEvent) => [...blobData, event.data], []),
            map((audioBlobs) => new Blob(audioBlobs, { type: 'audio/wav' })),
          ),
        ),
      )
      .pipe(skipUntil(this._stop$), first());
  }

  stopRecording(): void {
    if (!this.recorderInactive) {
      this._mediaRecorder.stop();
      this._stop$.next();
    }
  }

  pauseRecording(): void {
    const canPauseRecording = !this.recorderPaused && !this.recorderInactive;

    if (canPauseRecording) {
      this._mediaRecorder.pause();
    }
  }

  resumeRecording(): void {
    if (this.recorderPaused) {
      this._mediaRecorder.resume();
    }
  }

  requestMicrophone(): Observable<MediaStream> {
    return new Observable((observer) => {
      const media = navigator.mediaDevices.getUserMedia({ audio: true });

      media
        .then((stream: MediaStream) => {
          observer.next(stream);
          observer.complete();
        })
        .catch((e) => {
          observer.error(e);
          observer.complete();
        });
    });
  }

  convertToBase64(blob: Blob): Observable<string | ArrayBuffer> {
    return this._fileReaderService.readFile(blob);
  }

  private initiateAudioStream(
    stream: MediaStream,
    startTimeout: number,
  ): Observable<void> {
    return new Observable((observer) => {
      if (!window.MediaRecorder) {
        this._mediaRecorder = new AudioRecorder(stream);
        this._mediaRecorder.start();
      } else {
        this._mediaRecorder = new MediaRecorder(stream);
        this._mediaRecorder.start(startTimeout);
      }

      observer.next();
    });
  }

  private fetchAudioStream(): Observable<BlobEvent> {
    return new Observable((observer) => {
      this._mediaRecorder.addEventListener(
        MediaRecorderEvents.Dataavailable,
        (event: BlobEvent) => observer.next(event),
      );
      this._mediaRecorder.addEventListener(
        MediaRecorderEvents.Error,
        (error: MediaRecorderErrorEvent) => observer.error(error),
      );

      this._mediaRecorder.addEventListener(MediaRecorderEvents.Stop, () =>
        observer.complete(),
      );
    });
  }
}
