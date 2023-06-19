import { Component, inject } from '@angular/core';
import { IonicModule, ModalController, PopoverController } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { EditPirateComponent } from '../components/edit-pirate/edit-pirate.component';
import { Pirate } from '../interfaces/pirate';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../services/local-storage.service';
import { PopUpComponent } from '../components/pop-up/pop-up.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, ReactiveFormsModule]
})
export class Tab2Page {

  pirates!: any[];
  createForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, public popoverController: PopoverController,  private modalController: ModalController){
    this.getPirates();
  }

  getPirates(){
    // this.localStorage.getAllPirates().then(()=>{
    //   console.log()
    // })
  }

  ngOnInit(){
    this.createForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      age: ['', [Validators.required, Validators.min(1), Validators.max(900)]],
      pirateCrew: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]]
    });
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }

  async presentEditPirateModal(_pirate: Pirate) { // still a bunch of code just to use a object/component
    console.log("present");
    const modal = await this.modalController.create({  // we create a modal from the existing modal Component class so to say, you could switch out the component to create
      component: EditPirateComponent,
      componentProps: { pirate: _pirate } 
    });
      await modal.present(); 
  }

  addPirate(){
 
  } 

  async presentDeletePopover(pirate: Pirate) {
    const popover = await this.popoverController.create({ 
      component: PopUpComponent,
      componentProps: { description: "Are you sure you want to delete " + pirate.name }
    });

      await popover.present(); 
      
      popover.onDidDismiss()
      .then((data) => {
        if(data?.data) {
       
          
        }
      });
  }

  deletePirate(id: number){
   
  } 

}
