import { Component, Input, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { Note } from '../note';

@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent implements OnInit {

  constructor(private notesService: NotesService) { }

  note: Note = new Note();
  notes: Note[];
  errMessage: string;

  addNotes(): void {
    this.errMessage = '';
    if (!this.note.title.replace(/\s/g, '') || !this.note.text.replace(/\s/g, '')) {
      this.errMessage = 'Title and Text both are required fields';
    } else {
      this.note.state = 'not-started';
      this.notesService.addNote(this.note).subscribe(note => {
        this.note = new Note();
      }, err => {
        this.errMessage = `Http failure response for ${err.url}: ${err.status} ${err.statusText}`;
      });
    }
  }

  ngOnInit(): void {
    this.note = new Note();
    this.notesService.getNotes().subscribe(notes => {
      this.notes = notes;
    });
  }
}
