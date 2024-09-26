import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

type Data = {
  snapUrl: string;
  showSnappedImage: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class SnapService {
  private snapUrlPreview = new Subject<Data>();
  snapUrlPreview$ = this.snapUrlPreview.asObservable();

  private isLoading = new Subject<boolean>();
  isLoading$ = this.isLoading.asObservable();

  constructor(private http: HttpClient) {}

  setIsLoading(loadingState: boolean) {
    this.isLoading.next(loadingState);
  }

  setData(data: Data) {
    this.snapUrlPreview.next(data);
  }

getSnap(url: string): Observable<string> {
    this.setData({
      snapUrl: '',
      showSnappedImage: false,
    });
    this.isLoading.next(true);
    return this.http.get(url, { responseType: 'text' }).pipe(
      tap(() => this.isLoading.next(false)),
      catchError(error => {
        this.isLoading.next(false);
        throw error;
      })
    );
  }
}
