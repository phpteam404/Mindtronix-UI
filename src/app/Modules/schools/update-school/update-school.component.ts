import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/utils/toaster.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-update-school',
  templateUrl: '../add-school/add-school.component.html',
  styleUrls: ['./update-school.component.scss']
})
export class UpdateSchoolComponent implements OnInit {
  submitted = null;
  pageTitle:string = "Update School";
  fullObject:any={};
  list:any=[];
  constructor(private _router: Router,private _ar: ActivatedRoute, private _toast: ToasterService) { 
    this.list = [
      {id:1,code:'AAH', no_of_students:'10', school_name:'About Academic Heights Public School - AHPS', address:'Plot No. 153, Air By Pass Road, Near M.R. Palli Circle', phone_no:'9000867321', email:'academicheights@gmail.com',last_update:'01-02-2020'},
      {id:2,code:'AS', no_of_students:'10', school_name:'Accord School', address:'RC Road, Chiguruwada ', phone_no:'9908729577', email:'accordschool@gmail.com',last_update:'07-02-2020'},
      {id:3,code:'AVH', no_of_students:'10', school_name:'Adarsha Vidyalaya High School', address:'G.N. Mada Street', phone_no:'9393607734', email:'Pending',last_update:'02-02-2020'},
      {id:4,code:'AHS', no_of_students:'10', school_name:'Akshara High School', address:'Nawab Pet, Near Head Post Office', phone_no:'(0877) 2256375', email:'aksharaschool@gmail.com',last_update:'04-02-2020'},
      {id:5,code:'BES', no_of_students:'10', school_name:'Balaji English School', address:'Madhura Nagar, Railway Colony', phone_no:'(0877) 2226122', email:'balajischool@gmail.com',last_update:'05-02-2020'},
      {id:6,code:'BHS', no_of_students:'10', school_name:'BCM High School', address:'5/677, Mangalam Quarters', phone_no:'9000371258', email:'bcmhighschool@gmail.com',last_update:'06-02-2020'},
      {id:7,code:'BV', no_of_students:'10', school_name:'Bharathi Vidyanikethan', address:'935/B, Korlagunta', phone_no:'(0877) 6571287', email:'bharathischool@gmail.com',last_update:'08-02-2020'},
      {id:8,code:'BVB', no_of_students:'10', school_name:'Bharatiya Vidya Bhavan', address:'Post Box No. 12, Bhavan\'s Campus Alipiri', phone_no:'(0877) 2288657', email:'bvidyabhavan@gmail.com',last_update:'09-02-2020'},
      {id:9,code:'BPS', no_of_students:'10', school_name:'Bhashyam Public School', address:'S.D.N. Buiildings, Air Bye Pass Riad, Balaji Colony', phone_no:'(0877) 289174 ', email:'bhashyamschoold@gmail.com',last_update:'12-02-2020'},
      {id:10,code:'BSV', no_of_students:'10', school_name:'Bhavan\'s S.V. Vidyalaya', address:'Post Box No. 12, Bhavan\'s Campus, Alipiri', phone_no:'(0877) 2288657', email:'bhavansvschool@gmail.com',last_update:'10-02-2020'},
      {id:11,code:'BJC', no_of_students:'10', school_name:'Bhupal Junior College', address:'1, R.C. Road, Near Raithu Bazaar', phone_no:'9396247397', email:'bhupaljrcollege@gmail.com',last_update:'11-02-2020'},
      {id:12,code:'BOM', no_of_students:'10', school_name:'Birla Open Minds International School', address:'Opp. Thondavada Village, Tirupati-Bengaluru Highway', phone_no:'7036620222', email:'birlaopenmindstpty@gmail.com',last_update:'13-02-2020'},
      {id:13,code:'BHS', no_of_students:'10', school_name:'Brilliant High School', address:'RS Gardens', phone_no:'(0877) 2230911', email:'brillianthighschool@gmail.com',last_update:'03-02-2020'},
      {id:14,code:'CJC', no_of_students:'10', school_name:'CAN Junior College', address:'K.T. Road, Opposite E- Seva Kendram', phone_no:'9849817008', email:'canjrcollege@gmail.com',last_update:'14-02-2020'},
      {id:15,code:'CBS', no_of_students:'10', school_name:'Chaitanya Bharathi School', address:'Hatirai Colony', phone_no:'(0877) 2240455', email:'cbschool@gmail.com',last_update:'15-02-2020'},
      {id:16,code:'DKG', no_of_students:'10', school_name:'Dr. KKR’s Gowtham (E.M.) High School', address:'K.T. Road, Varadaraja Nagar', phone_no:'9160100222', email:'kkrschool@gmail.com',last_update:'16-02-2020'},
      {id:17,code:'ES', no_of_students:'10', school_name:'Edify School', address:'Mohan Gardens, Vaishnavi Nagar, Tiruchanoor', phone_no:'9505908888', email:'edifyschool@gmail.com',last_update:'17-02-2020'},
      {id:18,code:'NCS', no_of_students:'10', school_name:'Narayana Concept School', address:'Near Srinivasa Kalyana Mandapam, Tiruchur Road, Srinivasa Puram', phone_no:'9912341566', email:'narayanaschool@gmail.com',last_update:'18-02-2020'}
    ];
    var id;
    _ar.paramMap.subscribe(params => {
      id = atob(params['params'].id);
      console.log('params===>>>', id);
      this.fullObject = this.list.filter(t=>t.id == id)[0];
      this.schoolForm.setValue({
        name: this.fullObject.school_name,
        code: this.fullObject.code,
        contact_person: null,
        phone_no: this.fullObject.phone_no,
        email: this.fullObject.email,
        address: this.fullObject.address,
        state: null,
        city: null,
        pincode: null
      });
    });
  }
  schoolForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    code: new FormControl('', [Validators.required]),
    contact_person: new FormControl(''),
    phone_no: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl(''),
    state: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    pincode: new FormControl('')
  });

  ngOnInit(): void {

  }

  submit(): any{
    this.submitted = false;
    if (this.schoolForm.valid) {
      this._toast.show('success','Successfully Added');
      this.submitted = true;
      this.goToList();
    }else{
      this._toast.show('warning','Please enter mandatory fields.');
    }
  }

  goToList(){
    this._router.navigate(['schools_management']);
  }

}
