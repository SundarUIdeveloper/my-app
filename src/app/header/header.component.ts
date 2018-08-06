import { Component, Input } from '@angular/core';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private routerService: RouterService) { }

  @Input() isNoteView = true;

  private toggleView(): void {
    if (this.isNoteView) {
      this.routerService.routeToNoteView();
    }

    if (!this.isNoteView) {
      this.routerService.routeToListView();
    }
  }
}
