import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-panel',
  templateUrl: './add-panel.component.html',
  styleUrls: ['./add-panel.component.css']
})
export class AddPanelComponent implements OnInit {

  isClick = false;
  constructor() { }

  ngOnInit() {
  }

  onClick(): void {
    this.isClick = !this.isClick;
  }
}
