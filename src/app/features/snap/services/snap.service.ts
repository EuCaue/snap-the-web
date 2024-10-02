// TODO: use the real api
// TODO: make the download without previewing
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SnapOptions, type SnapData } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class SnapService {
  private snapUrlPreview = new Subject<SnapData>();
  snapUrlPreview$ = this.snapUrlPreview.asObservable();

  private isLoading = new Subject<boolean>();
  isLoading$ = this.isLoading.asObservable();

  private snapOptions = new BehaviorSubject<SnapOptions>(
    this.loadSnapOptions(),
  );
  private snapOptions$ = this.snapOptions.asObservable();

  constructor(private http: HttpClient) {}

  private saveSnapOptions(options: SnapOptions): void {
    localStorage.setItem('snapOptions', JSON.stringify(options));
  }
  private loadSnapOptions(): SnapOptions {
    const savedOptions = localStorage.getItem('snapOptions');
    return savedOptions
      ? JSON.parse(savedOptions)
      : {
          viewport: '1920x1080',
          captureFullPage: false,
        };
  }

  setSnapOptions(state: Partial<SnapOptions>) {
    const currentOptions = this.getSnapOptions();
    const updatedOptions = {
      ...currentOptions,
      ...state,
    };
    this.snapOptions.next(updatedOptions);
    this.saveSnapOptions(updatedOptions);
  }

  getSnapOptions(): SnapOptions {
    return this.snapOptions.getValue();
  }

  setIsLoading(loadingState: boolean) {
    this.isLoading.next(loadingState);
  }

  setData(data: SnapData) {
    this.snapUrlPreview.next(data);
  }

  getSnap(snapOptions: SnapOptions): Observable<string> {
    this.setData({
      snapUrl: '',
      showSnappedImage: false,
    });
    this.isLoading.next(true);
    return this.http
      .get('https://whatthecommit.com/index.txt', { responseType: 'text' })
      .pipe(
        tap(() => this.isLoading.next(false)),
        catchError((error) => {
          this.isLoading.next(false);
          throw error;
        }),
      );
  }
}
