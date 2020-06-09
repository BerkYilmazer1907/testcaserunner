import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import  *  as  SCENARIOS  from  './cucumber-report.json';

@Injectable()
export class ScenarioService {
  constructor() {}

 fetchScenarios(): Observable<any> {
    return of(SCENARIOS);
  }

 }
