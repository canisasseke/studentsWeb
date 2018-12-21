import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  @Input() public modalHeaderText: string;
  @Input() public modalBodyText: string;
  @Input() public okButtonText: string;
  @Input() public noButtonText: string;
  @Output() public redirectOnOK = new EventEmitter();
  @Output() public redirectOnNo = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  public emmitEvent() {
    this.redirectOnOK.emit();
  }
  public emmitEventNo() {
    this.redirectOnNo.emit();
  }
}
