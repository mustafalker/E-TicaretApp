import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilKayitComponent } from './profil-kayit.component';

describe('ProfilKayitComponent', () => {
  let component: ProfilKayitComponent;
  let fixture: ComponentFixture<ProfilKayitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilKayitComponent]
    });
    fixture = TestBed.createComponent(ProfilKayitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
