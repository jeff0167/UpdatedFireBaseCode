import { Component, OnInit} from '@angular/core';
import { IonicModule, ModalController, PopoverController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { PirateFBService } from '../services/pirate-FBService.service';
import { RouterModule } from '@angular/router';
import { Pirate } from '../interfaces/pirate';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EditPirateComponent } from '../components/edit-pirate/edit-pirate.component';
import { PopUpComponent } from '../components/pop-up/pop-up.component';
import { PirateMySQLService } from '../services/pirate-MySQLservice.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
})
export class Tab1Page implements OnInit {

  pirates!: any[];
  piratesAPI!: any[];
  createForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, public popoverController: PopoverController, private pirateAPIService: PirateMySQLService, private pirateService: PirateFBService, private modalController: ModalController){
    this.getPiratesFB();
    this.getPiratesMySQL();
  }

  getPiratesFB(){
    this.pirateService.getPirates().subscribe((res) =>{
      this.pirates = res as Pirate[];
    });
  }

  async getPiratesMySQL(): Promise<void> { // it doesn't display all of them
    this.pirateAPIService.getAll().subscribe((data: any) => {
        this.piratesAPI = data;
        console.log(this.piratesAPI);
    });
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
    this.pirateService.addPirate(this.createForm.value).then((res) =>{ 
      this.createForm.reset();
      console.log(res);
      this.getPiratesFB(); 
    });
  } 

  async presentDeletePopover(pirate: Pirate, firebase: boolean = true) {
    const popover = await this.popoverController.create({ 
      component: PopUpComponent,
      componentProps: { description: "Are you sure you want to delete " + pirate.name }
    });

      await popover.present(); 
      
      popover.onDidDismiss()
      .then((data) => {
        if(data?.data) {
          if(firebase){   
            this.deletePirate(pirate.id);
          }
          else{
            this.pirateAPIService.delete(pirate.pirate_id).subscribe((data: any) => {
              this.getPiratesMySQL();
          });
          }
        }
      });
  }

  deletePirate(id: string){
    //console.log(id);
    this.pirateService.deletePirate(id).then((res) =>{ 
      this.createForm.reset();
      console.log(res);
      this.getPiratesFB(); 
    });
  } 

}