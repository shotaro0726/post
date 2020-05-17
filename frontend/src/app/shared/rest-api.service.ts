import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from '../shared/book';
import { Author } from '../shared/author';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class RestApiService {
    apiURL = 'http://127.0.0.1:8000';

    constructor(private http: HttpClient) { }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    getAuthors(): Observable<Author> {
        return this.http.get<Author>(this.apiURL + '/authors/')
            .pipe(
                retry(1),
                catchError(this.handleError)
            )
    }

    getBooks(): Observable<Book> {
        return this.http.get<Book>(this.apiURL + '/books/')
            .pipe(
                retry(1),
                catchError(this.handleError)
            )
    }

    createBook(book): Observable<Book> {
        return this.http.post<Book>(this.apiURL + '/books/', JSON.stringify(book), this.httpOptions)
            .pipe(
                retry(1),
                catchError(this.handleError)
            )
    }

    handleError(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        alert(errorMessage);
        return throwError(errorMessage);
    }


}
