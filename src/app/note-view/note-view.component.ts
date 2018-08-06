import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent implements OnInit {

  notes: Array<Note>;

  constructor(private notesService: NotesService) { }

  private getNotes() {
    this.notesService.getNotes().subscribe(notes => {
      this.notes = notes;
      console.log(notes);
    }, err => {
      console.log('ERROR!!!!!!!!!!');
    });
  }

  ngOnInit(): void {
    this.getNotes();
  }
}
