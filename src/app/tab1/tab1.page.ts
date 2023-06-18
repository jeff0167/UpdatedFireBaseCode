import { Component, OnInit} from '@angular/core';
import { IonicModule, ModalController, PopoverController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { PirateService } from '../services/pirate-service.service';
import { RouterModule } from '@angular/router';
import { Pirate } from '../interfaces/pirate';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EditPirateComponent } from '../components/edit-pirate/edit-pirate.component';
import { PopUpComponent } from '../components/pop-up/pop-up.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
})
export class Tab1Page implements OnInit {

  pirates!: any[];
  createForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, public popoverController: PopoverController, private pirateService: PirateService, private modalController: ModalController){
    this.getPirates();
  }

  getPirates(){
    this.pirateService.getPirates().subscribe((res) =>{
      this.pirates = res as Pirate[];
    });
  }

  ngOnInit(){
    this.createForm = this.formBuilder.group({
      Name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      Age: ['', [Validators.required, Validators.min(1), Validators.max(900)]],
      PirateCrew: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]]
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
    this.pirateService.addPirate(this.createForm.value).then((res) =>{ 
      this.createForm.reset();
      console.log(res);
      this.getPirates(); 
    });
  } 

  async presentDeletePopover(pirate: Pirate){
    const popover = await this.popoverController.create({ 
      component: PopUpComponent,
      componentProps: { description: "Are you sure you want to delete " + pirate.Name }
    });

      await popover.present(); 
      
      popover.onDidDismiss()
      .then((data) => {
        if(data?.data) {
          this.deletePirate(pirate.id);
        }
      });
  }

  deletePirate(id: string){
    //console.log(id);
    this.pirateService.deletePirate(id).then((res) =>{ 
      this.createForm.reset();
      console.log(res);
      this.getPirates(); 
    });
  } 

}