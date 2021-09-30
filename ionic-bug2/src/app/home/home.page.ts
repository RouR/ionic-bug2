import {Component} from '@angular/core';
import {SomeComponentComponent} from '../components/some-component/some-component.component';
import {ModalController} from '@ionic/angular';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private modalController: ModalController,
              private data: DataService) {
  }

  public async open(): Promise<void> {
    let someData = this.data.getMessages()
      .map(x => x.fromName+'\n'+x.subject)
      .slice(0, 3);

    const modal = await this.modalController.create({
      component: SomeComponentComponent,
      componentProps: {
        Notes: someData ?? []
      }
    });
    await modal.present();
    const {data, role} = await modal.onWillDismiss();
    // console.log(data, role);
    if (role === 'cancel')
      return;
    //...
  }
}
