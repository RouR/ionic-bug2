import {Component, Input, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-some-component',
  templateUrl: './some-component.component.html',
  styleUrls: ['./some-component.component.css']
})
export class SomeComponentComponent implements OnInit {

  @Input() public Notes: string[];
  public NoteMaxLen = 200;
  public newNote: string = '';

  constructor(private modalController: ModalController) {
  }

  ngOnInit(): void {
    if (!this.Notes) {
      this.Notes = [];
    }
    this.Notes = [...this.Notes]; //deep copy for cancel
  }

  public dismissModal() {
    this.modalController.dismiss(null, 'cancel');
  }

  public saveModal() {
    // this.validateAndModifyNotes();
    // console.log('saveModal', goodNotes, this.Notes);
    this.modalController.dismiss(this.Notes, 'save');
  }

  public trackByFn(i: number) {
    return i;
  }

  public delete(idx: number) {
    this.Notes.splice(idx, 1);
  }

  public addNewNote() {
    if (!this.newNote) {
      return
    }
    this.Notes.push(this.newNote);
    this.newNote = '';
  }

}
