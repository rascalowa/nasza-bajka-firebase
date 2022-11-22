import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-image",
  templateUrl: "./image.component.html"
})
export class ImageComponent {
  formTemplate = new FormGroup({
    caption: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2)]
    }),
    // category: new FormControl(''),
    imageUrl: new FormControl('', {
      validators: [Validators.required]
    })
  });

  imgSrc: string = '../../../../assets/img/ns-klara.jpg';
  selectedImage: any = null;
  isSubmitted: boolean = false;

  constructor() {}

  showPreview(event: any) {
    console.log(event.target.files);
    console.log(event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e:any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imgSrc = '../../../../assets/img/ns-klara.jpg';
      this.selectedImage = null;
    }
  }

  onSubmit(formValue) {
    console.log(formValue)
    this.isSubmitted = true;
  }

  get formControls() {
    return this.formTemplate['controls'];
  }
}
