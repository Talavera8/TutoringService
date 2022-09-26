import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TutoringRequestsService } from '../tutoring-requests.service';
import { Request } from '../requestModel';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-tutoring-request-create',
  templateUrl: './tutoring-request-create.component.html',
  styleUrls: ['./tutoring-request-create.component.css']
})
export class TutoringRequestCreateComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private requestsService: TutoringRequestsService, private activatedRoute: ActivatedRoute) { }

  requestForm!: FormGroup; 
  requestId!: number;
  mode: string = 'create';
  request!: Request;

  ngOnInit(): void {
    this.requestForm = this.formBuilder.group({
      date: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      city: ['', Validators.required],
      subject: ['', Validators.required],
      timeFrame: ['', Validators.required],
      availability: [[''], Validators.required]
    });
    this.requestId = this.activatedRoute.snapshot.params.requestId;
    if(this.requestId > 0) {
      this.mode = 'edit';
      this.requestsService.getRequestById(this.requestId).subscribe(response => {
        this.request = response.request[0];
        this.requestForm.patchValue({
          date: formatDate(this.request.date, "yyyy-MM-dd", "en"),
          firstName: this.request.firstName,
          lastName: this.request.lastName,
          city: this.request.city,
          subject: this.request.subject,
          timeFrame: this.request.timeFrame,
          availability: this.request.availability
        });
      });
    }
  }

  submitRequest() {
    if(this.requestForm.invalid) {
      return;
    }
    if(this.mode === 'create') {
      this.requestsService.createRequest(this.requestForm.value);
    }
    if(this.mode === 'edit') {
      const toBeEditedObj = {
        requestId: this.request.requestId,
        date: this.requestForm.value.date,
        firstName: this.requestForm.value.firstName,
        lastName: this.requestForm.value.lastName,
        city: this.requestForm.value.city,
        subject: this.requestForm.value.subject,
        timeFrame: this.requestForm.value.timeFrame,
        availability: this.requestForm.value.availability
      };
      this.requestForm.reset();
      this.requestsService.editRequest(toBeEditedObj);
    } 
  }
}
