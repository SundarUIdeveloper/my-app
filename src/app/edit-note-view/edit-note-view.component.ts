import { Component, Input, Inject, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { RouterService } from '../services/router.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})
export class EditNoteViewComponent implements OnInit {

  constructor(private notesService: NotesService, private routerService: RouterService,
    public dialogRef: MatDialogRef<EditNoteViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  note: Note;
  states: Array<string> = ['not-started', 'started', 'completed'];
  errMessage: string;

  onSave() {
    this.notesService.editNote(this.note).subscribe(data => {
      this.dialogRef.close();
    }, err => {
      this.errMessage = `Http failure response for ${err.url}: ${err.status} ${err.statusText}`;
    });
  }

  ngOnInit() {
    this.note = this.notesService.getNoteById(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
