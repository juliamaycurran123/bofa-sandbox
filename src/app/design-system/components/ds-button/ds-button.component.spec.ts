import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DsButtonComponent } from './ds-button.component';

describe('DsButtonComponent', () => {
  let component: DsButtonComponent;
  let fixture: ComponentFixture<DsButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsButtonComponent, NoopAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not emit pressed when disabled', () => {
    component.disabled = true;
    spyOn(component.pressed, 'emit');
    component.onClick(new MouseEvent('click'));
    expect(component.pressed.emit).not.toHaveBeenCalled();
  });

  // TODO: add coverage for loading state, variants, size, ariaLabel
});
