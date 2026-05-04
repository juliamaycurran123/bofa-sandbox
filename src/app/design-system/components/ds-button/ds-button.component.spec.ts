import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { DsButtonComponent } from './ds-button.component';

describe('DsButtonComponent', () => {
  let component: DsButtonComponent;
  let fixture: ComponentFixture<DsButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsButtonComponent],
      providers: [provideNoopAnimations()]
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

  it('should not emit pressed when loading', () => {
    component.loading = true;
    spyOn(component.pressed, 'emit');
    component.onClick(new MouseEvent('click'));
    expect(component.pressed.emit).not.toHaveBeenCalled();
  });

  it('should emit pressed on click when enabled', () => {
    spyOn(component.pressed, 'emit');
    const event = new MouseEvent('click');
    component.onClick(event);
    expect(component.pressed.emit).toHaveBeenCalledWith(event);
  });

  it('should default to primary variant', () => {
    expect(component.variant).toBe('primary');
    expect(component.matColor).toBe('primary');
  });

  it('should map danger variant to warn color', () => {
    component.variant = 'danger';
    expect(component.matColor).toBe('warn');
  });

  it('should map secondary variant to accent color', () => {
    component.variant = 'secondary';
    expect(component.matColor).toBe('accent');
  });

  it('should return empty string for tertiary variant color', () => {
    component.variant = 'tertiary';
    expect(component.matColor).toBe('');
  });

  it('should default to md size', () => {
    expect(component.size).toBe('md');
  });

  it('should default to button type', () => {
    expect(component.type).toBe('button');
  });
});
