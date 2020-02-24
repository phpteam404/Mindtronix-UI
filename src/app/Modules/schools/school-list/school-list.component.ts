import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.scss']
})
export class SchoolListComponent implements OnInit {

  cities: any;
  cars: any;
  cols:any;
  constructor(private router: Router, private _route: ActivatedRoute) {
    this.cities = [
        {label:'Select City', value:null},
        {label:'New York', value:{id:1, name: 'New York', code: 'NY'}},
        {label:'Rome', value:{id:2, name: 'Rome', code: 'RM'}},
        {label:'London', value:{id:3, name: 'London', code: 'LDN'}},
        {label:'Istanbul', value:{id:4, name: 'Istanbul', code: 'IST'}},
        {label:'Paris', value:{id:5, name: 'Paris', code: 'PRS'}}
    ];
    this.cars = [
      {code:'AAH', no_of_students:'10', school_name:'About Academic Heights Public School - AHPS', address:'Plot No. 153, Air By Pass Road, Near M.R. Palli Circle', phone_no:'9000867321', email:'academicheights@gmail.com',last_update:'01-02-2020'},
      {code:'AS', no_of_students:'10', school_name:'Accord School', address:'RC Road, Chiguruwada ', phone_no:'9908729577', email:'accordschool@gmail.com',last_update:'07-02-2020'},
      {code:'AVH', no_of_students:'10', school_name:'Adarsha Vidyalaya High School', address:'G.N. Mada Street', phone_no:'9393607734', email:'Pending',last_update:'02-02-2020'},
      {code:'AHS', no_of_students:'10', school_name:'Akshara High School', address:'Nawab Pet, Near Head Post Office', phone_no:'(0877) 2256375', email:'aksharaschool@gmail.com',last_update:'04-02-2020'},
      {code:'BES', no_of_students:'10', school_name:'Balaji English School', address:'Madhura Nagar, Railway Colony', phone_no:'(0877) 2226122', email:'balajischool@gmail.com',last_update:'05-02-2020'},
      {code:'BHS', no_of_students:'10', school_name:'BCM High School', address:'5/677, Mangalam Quarters', phone_no:'9000371258', email:'bcmhighschool@gmail.com',last_update:'06-02-2020'},
      {code:'BV', no_of_students:'10', school_name:'Bharathi Vidyanikethan', address:'935/B, Korlagunta', phone_no:'(0877) 6571287', email:'bharathischool@gmail.com',last_update:'08-02-2020'},
      {code:'BVB', no_of_students:'10', school_name:'Bharatiya Vidya Bhavan', address:'Post Box No. 12, Bhavan\'s Campus Alipiri', phone_no:'(0877) 2288657', email:'bvidyabhavan@gmail.com',last_update:'09-02-2020'},
      {code:'BPS', no_of_students:'10', school_name:'Bhashyam Public School', address:'S.D.N. Buiildings, Air Bye Pass Riad, Balaji Colony', phone_no:'(0877) 289174 ', email:'bhashyamschoold@gmail.com',last_update:'12-02-2020'},
      {code:'BSV', no_of_students:'10', school_name:'Bhavan\'s S.V. Vidyalaya', address:'Post Box No. 12, Bhavan\'s Campus, Alipiri', phone_no:'(0877) 2288657', email:'bhavansvschool@gmail.com',last_update:'10-02-2020'},
      {code:'BJC', no_of_students:'10', school_name:'Bhupal Junior College', address:'1, R.C. Road, Near Raithu Bazaar', phone_no:'9396247397', email:'bhupaljrcollege@gmail.com',last_update:'11-02-2020'},
      {code:'BOM', no_of_students:'10', school_name:'Birla Open Minds International School', address:'Opp. Thondavada Village, Tirupati-Bengaluru Highway', phone_no:'7036620222', email:'birlaopenmindstpty@gmail.com',last_update:'13-02-2020'},
      {code:'BHS', no_of_students:'10', school_name:'Brilliant High School', address:'RS Gardens', phone_no:'(0877) 2230911', email:'brillianthighschool@gmail.com',last_update:'03-02-2020'},
      {code:'CJC', no_of_students:'10', school_name:'CAN Junior College', address:'K.T. Road, Opposite E- Seva Kendram', phone_no:'9849817008', email:'canjrcollege@gmail.com',last_update:'14-02-2020'},
      {code:'CBS', no_of_students:'10', school_name:'Chaitanya Bharathi School', address:'Hatirai Colony', phone_no:'(0877) 2240455', email:'cbschool@gmail.com',last_update:'15-02-2020'},
      {code:'DKG', no_of_students:'10', school_name:'Dr. KKR’s Gowtham (E.M.) High School', address:'K.T. Road, Varadaraja Nagar', phone_no:'9160100222', email:'kkrschool@gmail.com',last_update:'16-02-2020'},
      {code:'ES', no_of_students:'10', school_name:'Edify School', address:'Mohan Gardens, Vaishnavi Nagar, Tiruchanoor', phone_no:'9505908888', email:'edifyschool@gmail.com',last_update:'17-02-2020'},
      {code:'NCS', no_of_students:'10', school_name:'Narayana Concept School', address:'Near Srinivasa Kalyana Mandapam, Tiruchur Road, Srinivasa Puram', phone_no:'9912341566', email:'narayanaschool@gmail.com',last_update:'18-02-2020'}
    ];
    this.cols = [
      { field: 'code', header: 'School code' },
      { field: 'school_name', header: 'School Name' },
      { field: 'no_of_students', header: 'Number of Students' },
      { field: 'phone_no', header: 'Phone no' },
      { field: 'email', header: 'Email' },
      { field: 'addres', header: 'Actions' }
    ];
  }
  ngOnInit(): void {
    //this.getList();
   console.log('getList');
  }

  AddNewSchool(event: Event){
    this.router.navigate(['add'], {relativeTo: this._route});
  }
  EditSchool(data:any){
    //this.router.navigate(['update/'+btoa(data.school_name)],{ relativeTo: this._route});
  }
  GoToStudent(event: Event){
    this.router.navigate(['users/students'], {});
  }

}
