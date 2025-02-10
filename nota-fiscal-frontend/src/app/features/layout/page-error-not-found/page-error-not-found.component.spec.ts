import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageErrorNotFoundComponent } from './page-error-not-found.component';

describe('PageErrorNotFoundComponent', () => {
  let component: PageErrorNotFoundComponent;
  let fixture: ComponentFixture<PageErrorNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageErrorNotFoundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageErrorNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
