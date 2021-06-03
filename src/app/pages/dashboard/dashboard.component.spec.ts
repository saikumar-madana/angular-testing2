import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpService } from 'src/app/common/services/http.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DashboardComponent } from './dashboard.component';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let httpMock: any;
  let httpService: HttpService

  function compileComponents() {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.debugElement.componentInstance;
    httpService = fixture.debugElement.injector.get(HttpService);
}

  beforeEach(async () => {
    httpMock = jasmine.createSpyObj('HttpService', ['callApi']);
    httpMock.callApi.and.returnValue(of({data: []}));
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [ {provide: HttpService, useValue: httpMock} ]
    })
    .compileComponents();
  });

  it('should create', () => {
    compileComponents();
    expect(component).toBeTruthy();
  });

  it('test API', () => {
    compileComponents();
    const req = {
      url: 'users',
      method: 'get'
    };
    component.getDashboardUsers();
    expect(httpService.callApi).toHaveBeenCalledWith(req);
    expect(component.users.length).toEqual(0);
  });
});
