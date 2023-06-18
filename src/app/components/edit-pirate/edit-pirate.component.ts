import { Component, Input, OnInit, inject } from '@angular/core';
import { Pirate } from '../../interfaces/pirate';
import { PirateFBService } from '../../services/pirate-FBService.service';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-pirate',
  templateUrl: './edit-pirate.component.html',
  styleUrls: ['./edit-pirate.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class EditPirateComponent  implements OnInit {

  originalPirate!: Pirate;
  updateForm!: FormGroup;
  @Input() pirate!: Pirate;

  toastController: ToastController = inject(ToastController);

  constructor(private formBuilder: FormBuilder, private pirateService: PirateFBService, private modalController: ModalController) { 
  }

  ngOnInit(){
    this.updateForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      age: ['', [Validators.required, Validators.min(1), Validators.max(900)]],
      pirateCrew: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]]
    });

    this.originalPirate = this.pirate;
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }
  
  updatePirate(){
    this.pirateService.updatePirate(this.pirate.id, this.updateForm.value).then((res) =>{ 
      console.log(res);
      this.cancel();
      this.presentToast();
    });
  }

   async presentToast() {
    const toast = await this.toastController.create({
      message: "Updated pirate",
      duration: 1200,
      position: "middle",
      cssClass: "toast"
    });
    
    await toast.present();
  }
  
  async cancel(){
    await this.modalController.dismiss();
  }

}
