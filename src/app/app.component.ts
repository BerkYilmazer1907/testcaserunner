import { Component, OnInit,ViewChild } from '@angular/core';
import {MdbTableDirective} from "angular-bootstrap-md";
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, NgForm } from '@angular/forms'

import { ScenarioService } from './scenario.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Angular Example';
  addForm: FormGroup;
  rows: FormArray;
  itemForm: FormGroup;
 elements: any = [];
 stepelements: any=[];
  headElements = ['ID', 'Name', 'Keyword'];
  masterHeadElements = ['Keyword', 'Name','Result'];
  public countfail: number = 0 ;
  public countpass: number = 0;
  public countblock:  number = 0;
  public countnotexec:  number = 0;
public contents: Array<any>;
public innercontentsfields: Array<any>;
public stepscontents: Array<any>;
@ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;

  constructor(private scenarioService: ScenarioService,private fb: FormBuilder){}

  ngOnInit(){

         this.getScenarioResults();
         this.mdbTable.setDataSource(this.elements);
                this.elements = this.mdbTable.getDataSource();
                 this.getChartDataValues();
  }
   navigate(el:any){

    }

    setPage(event: any) {
        //  event.prevendDefault();
        //console.log("in setPage: ")
       // console.log(this.page);
       this.page = this.page /5  + 1;
         this.page = this.page *5;

        //this.getIssuessByMaxResults();

       // this.getContents();

      }

        public pages: Array<number>;
        private page: number = 0;
 public chartType: string = 'pie';

  public chartDatasets: Array<any> = [
    { data: [this.countfail, this.countpass, this.countblock, this.countnotexec], label: 'Test Exec Chart Results' }
  ];

  public chartLabels: Array<any> = ['Fail', 'Pass', 'Block', 'Not Executed'];

  public chartColors: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#23bf5c', '#FDB45C', '#949FB1'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774'],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void {
    // this.getChartDataValues();
  }
  public chartHovered(e: any): void {
    //  this.getChartDataValues();
  }

  getChartDataValues(){
  this.scenarioService.fetchScenarios().subscribe(

                  data => {


                       this.contents = data["default"][0]
                       this.contents = this.contents["elements"];
                       console.log(this.contents)

                     for(let content in this.contents){
                         this.stepscontents = this.contents[content].steps,
                         console.log(this.stepscontents)
                         for(let step in this.stepscontents){
                         console.log(this.stepscontents[step].result.status)
                           if(this.stepscontents[step].result.status.includes('passed')){
                                          this.countpass=this.countpass+1;
                           }
                           if(this.stepscontents[step].result.status.includes('failed') ){
                                           this.countfail=this.countfail+1;
                           }
                           if(this.stepscontents[step].result.status.includes('empty')){
                                       this.countnotexec=this.countnotexec+1;
                           }
                         }

      }



                  },
                          (error)=>{
                            console.log(error.error.message);
                          }
            );
  this.chartDatasets =[
          { data: [this.countfail, this.countpass, this.countblock, this.countnotexec], label: 'Test Exec Chart Results'}
        ];
   }

   getScenarioResults(){

   this.scenarioService.fetchScenarios().subscribe(

                data => {


                     this.contents = data["default"][0]
                     this.contents = this.contents["elements"];
                     console.log(this.contents)

                   /*for(let content in this.contents){
                       this.stepscontents = this.contents[content].steps,
                       this.elements.push({id:this.contents[content].id,
                                          name:this.contents[content].name,
                                          keyword:this.contents[content].keyword})
                       console.log(this.stepscontents)
                       for(let step in this.stepscontents){
                          this.elements.push({
                                masterDetail:[{keyword:this.stepscontents[step].keyword,
                                               name:this.stepscontents[step].name,
                                               result:this.stepscontents[step].result.status}]
                                                                  });
                       }



                   }*/



                },
                        (error)=>{
                          console.log(error.error.message);
                        }
          );
   }


}
