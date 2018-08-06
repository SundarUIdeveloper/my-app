import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationService } from './services/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotesService } from './services/notes.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './/app-routing.module';
import { RouterModule } from '@angular/router';
import { RouterService } from './services/router.service';
import { CanActivateRouteGuard } from './can-activate-route.guard';
import { NoteTakerComponent } from './note-taker/note-taker.component';
import { NoteViewComponent } from './note-view/note-view.component';
import { NoteComponent } from './note/note.component';
import { ListViewComponent } from './list-view/list-view.component';
import { EditNoteViewComponent } from './edit-note-view/edit-note-view.component';
import { MatSelectModule } from '@angular/material/select';
import { EditNoteOpenerComponent } from './edit-note-opener/edit-note-opener.component';
import { MatDialogModule } from '@angular/material';

@NgModule({
  declarations: [AppComponent, HeaderComponent, LoginComponent, DashboardComponent,
    NoteTakerComponent, NoteViewComponent, NoteComponent, ListViewComponent,
    EditNoteViewComponent, EditNoteOpenerComponent],
  imports: [BrowserModule, MatToolbarModule, MatFormFieldModule, ReactiveFormsModule,
    FormsModule, MatInputModule, MatButtonModule, BrowserAnimationsModule, HttpClientModule,
    MatExpansionModule, MatCardModule, AppRoutingModule, AppRoutingModule, RouterModule, MatSelectModule, MatDialogModule],
  providers: [AuthenticationService, NotesService, RouterService, CanActivateRouteGuard],
  bootstrap: [AppComponent],
  entryComponents: [EditNoteViewComponent]
})

export class AppModule { }
