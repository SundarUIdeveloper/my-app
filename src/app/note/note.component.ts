import { Component, Input, OnInit } from '@angular/core';
import { Note } from '../note';
import { RouterService } from '../services/router.service';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  @Input() note: Note;

  constructor(private routerService: RouterService, private NotesService: NotesService) { }

  ngOnInit(): void {
  }

  private editNote(noteId): void {
    this.routerService.routeToEditNoteView(noteId);
  }

  private deleteNote(noteId): void {
    this.NotesService.deleteNote(noteId).subscribe(deletedNote => {
      this.NotesService.fetchNotesFromServer();
    });
  }
}
