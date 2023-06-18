import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class PopUpComponent {

  @Input() description: string = "Are you sure about that?";

  constructor(public popover: PopoverController) {}

  choice(doIt: boolean):void {
    this.popover.dismiss(doIt);
  }

}
