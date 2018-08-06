import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Note } from '../note';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/do';

@Injectable()
export class NotesService {

  notes: Array<Note>;
  notesSubject: BehaviorSubject<Array<Note>>;

  constructor(private httpClient: HttpClient, private authenticationService: AuthenticationService) {
    this.notes = [];
    this.notesSubject = new BehaviorSubject(this.notes);
  }

  fetchNotesFromServer() {
    const token = this.authenticationService.getBearerToken();
    const notesData = this.httpClient.get<Array<Note>>('http://localhost:3000/api/v1/notes', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    notesData.subscribe(notes => {
      this.notes = notes;
      this.notesSubject.next(this.notes);
    }, err => {

    });

  }

  getNotes(): Observable<Array<Note>> {
    return this.notesSubject;
  }

  addNote(note: Note): Observable<Note> {
    const token = this.authenticationService.getBearerToken();
    return this.httpClient.post<Note>('http://localhost:3000/api/v1/notes', {
      id: note.id,
      title: note.title,
      text: note.text,
      state: note.state
    }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).do(newNote => {
        this.notes.push(newNote);
        this.notesSubject.next(this.notes);
      });
  }

  editNote(note: Note): Observable<Note> {
    const token = this.authenticationService.getBearerToken();
    return this.httpClient.put<Note>(`http://localhost:3000/api/v1/notes/${note.id}`, {
      id: note.id,
      title: note.title,
      text: note.text,
      state: note.state
    }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).do(editedNote => {
        const noteById = this.notes.find(n => n.id === editedNote.id);
        Object.assign(noteById, editedNote);
        this.notesSubject.next(this.notes);
      }, err => {

      });
  }

  getNoteById(noteId): Note {
    return this.notes.find(note => note.id === parseInt(noteId, 10));
  }

  deleteNote(note: Note): Observable<{}> {debugger;
    const token = this.authenticationService.getBearerToken();
    return this.httpClient.delete<Note>(`http://localhost:3000/api/v1/notes/${note}`, {
      headers: {
          'Authorization': `Bearer ${token}`
        }
    });
  }
}
