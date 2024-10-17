import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { type SnapOptions, type SnapData } from '../types/types';
type ApiResponse = {
  url: string;
};

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
          imageFormat: { format: 'png' },
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

  getSnap(url: string, snapOptions: SnapOptions): Observable<string> {
    const [width, height] = snapOptions.viewport.split('x');
    this.setData({
      snapUrl: '',
      showSnappedImage: false,
    });
    this.isLoading.next(true);
    return this.http
      .get<ApiResponse>(
        `https://api.apiflash.com/v1/urltoimage?access_key=${process.env['TOKEN']}&wait_until=page_loaded&url=${url}&response_type=json&full_page=${snapOptions.captureFullPage}&width=${width}&height=${height}&format=${snapOptions.imageFormat.format}`,
        { responseType: 'json' },
      )
      .pipe(
        tap(() => this.isLoading.next(false)),
        map((data) => {
          return data.url;
        }),
        catchError((error) => {
          this.isLoading.next(false);
          throw error;
        }),
      );
  }
  downloadImage(imageUrl: string): Observable<void> {
    const fileName = `snapped-image-${new Date().toLocaleTimeString()}.jpg`;

    return this.http.get(imageUrl, { responseType: 'blob' }).pipe(
      map((blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
        window.URL.revokeObjectURL(url);
      }),
      catchError((err) => {
        console.error('Error downloading image:', err);
        return of();
      }),
    );
  }
}
