import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { EditNoteViewComponent } from '../edit-note-view/edit-note-view.component';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-edit-note-opener',
  templateUrl: './edit-note-opener.component.html',
  styleUrls: ['./edit-note-opener.component.css']
})
export class EditNoteOpenerComponent implements OnInit {
  constructor(private route: ActivatedRoute, public dialog: MatDialog, private router: Router, private routerService: RouterService) {
      this.openDialog();
    }

  noteId: String = this.route.snapshot.paramMap.get('noteId');

  ngOnInit() {}

  openDialog(): void {
    setTimeout(() => {
      this.dialog
        .open(EditNoteViewComponent, {
          width: '250px',
          data: this.noteId
        })
        .afterClosed().subscribe(() => {
          console.log('The dialog was closed');
          this.routerService.routeBack();
        });
    }, 200);
  }

}
