import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponets } from './login-componets';

describe('LoginComponets', () => {
  let component: LoginComponets;
  let fixture: ComponentFixture<LoginComponets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponets]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponets);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
