import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SilverwareclientService } from '../silverwareclient.service';
import { NgForm } from '@angular/forms';
import { Client } from 'src/app/models/ui-models/client.model';
import { AriaDescriber } from '@angular/cdk/a11y';
import { GenderService } from 'src/app/services/gender.service';
import { Gender } from 'src/app/models/ui-models/gender.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GetClientResponse } from 'src/app/models/apimodels/client.model';


@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.css']
})
export class ViewClientComponent implements OnInit {

  clientResponse : GetClientResponse | undefined;
  clientId: string | null | undefined;
  client: Client = {
    id: 0,
    name: '',
    description: '',
    clientType: 0,
    emailAddress: '',
    address: '',
    created: '',
    profileImageUrl: '',
    employeeUserId:0
  }

  isnewClient = true;
  header = '';
  displayProfileImageUrl = '';
  genderList: Gender[] = [];

  @ViewChild('clientDetailsForm') clientDetailsForm?: NgForm;

  constructor(private readonly clientService: SilverwareclientService,
    private readonly route: ActivatedRoute,
    private readonly genderService: GenderService, private snackbar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        this.clientId = params.get('id');
        if (this.clientId) {

          //if route contains add, new client

          if(this.clientId.toLowerCase() == 'Add'.toLowerCase()) {
            //new client
            this.isnewClient = true;
            this.header = 'Add New Client';
            this.setImage();
          }
          else {
            //existing client
            this.isnewClient = false;
            this.header = 'Edit Client';

            this.clientService.getClient(this.clientId)
            .subscribe (
              (successResponse) => {
              this.clientResponse = successResponse;
              this.setImage();
              },
              (errorResponse) => {
                this.setImage();
              }
            );
          }

          // this.genderService.getGenderList().
          // subscribe(
          //   (successResponse) => {
          //     this.genderList = successResponse;
          //   }
          // )
        }
      }
    );
  }

  onUpdate(): void {

    if(this.clientDetailsForm?.form.valid) {

      this.client.name = this.clientResponse!.data.name;
      this.client.id = this.clientResponse!.data.id;
      this.client.description = this.clientResponse!.data.description;
      this.client.emailAddress = this.clientResponse!.data.emailAddress;
      this.client.address = this.clientResponse!.data.address;
      this.clientService.updateClient(this.client.id, this.client)
    .subscribe(
      (successResponse) => {
        //show a notification
        this.snackbar.open('Client updated successfully', undefined,
        {duration: 2000});
      },
      (errorResponse) => {
        //log it
      }
    )
    }
  }

  onDelete(): void {
  this.client.id = this.clientResponse!.data.id;
  this.clientService.deleteClient(this.client.id)
  .subscribe(
    (successResponse) => {
      this.snackbar.open('Client deleted successfully', undefined,
      {duration: 2000});

      setTimeout(() => {
        this.router.navigateByUrl('clients');
      }, 2000);

    },
    (errorResponse) => {
      //log
    }
  );
  }

  onAdd(): void {
  if(this.clientDetailsForm?.form.valid) {

    this.clientService.addClient(this.client)
    .subscribe(
      (successResponse) => {
        this.snackbar.open('Client added successfully', undefined,
        {duration: 2000});

        setTimeout(() => {
          this.router.navigateByUrl(`clients/${successResponse.id}`);  }, 2000);
      },
      (errorResponse) => {
        //Log
      }
    );
  }


  }

  private setImage() : void {
    if (this.clientResponse!.data.profileImageUrl) {
      this.displayProfileImageUrl = this.clientService.getImagePath(this.clientResponse!.data.profileImageUrl);

    }
    else {
      //display default
      this.displayProfileImageUrl='/assets/defaultimage.png';
    }
  }

  uploadImage(event: any): void {
    this.client.id = this.clientResponse!.data.id;
    if (this.clientId) {
      const file: File = event.target.files[0];
      this.clientService.uploadImage(this.client.id, file)
      .subscribe(
        (successResponse) => {
          this.clientResponse!.data.profileImageUrl = successResponse;
          this.setImage();

          this.snackbar.open('Profile photo updated successfully.', undefined,
          {duration: 2000});
        },
        (errorResponse) => {

        }
      )
    }
  }
}
