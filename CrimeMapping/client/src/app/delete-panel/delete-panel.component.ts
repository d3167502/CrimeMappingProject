import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-panel',
  templateUrl: './delete-panel.component.html',
  styleUrls: ['./delete-panel.component.css']
})
export class DeletePanelComponent implements OnInit {

  isClick = false;
  constructor() { }

  ngOnInit() {
  }

  onClick(): void {
    this.isClick = !this.isClick;
  }
}
