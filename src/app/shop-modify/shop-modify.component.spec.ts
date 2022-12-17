import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopModifyComponent } from './shop-modify.component';

describe('ShopModifyComponent', () => {
  let component: ShopModifyComponent;
  let fixture: ComponentFixture<ShopModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopModifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
