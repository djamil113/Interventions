import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ITypeCategorie } from './categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private baseUrl = 'api/categories';

  constructor(private http: HttpClient) { }

  obtenirCategories(): Observable<ITypeCategorie[]> {
    return this.http.get<ITypeCategorie[]>(this.baseUrl).pipe(
      tap(data => console.log('obtenirCategories: ' + JSON.stringify(data))),
      catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
