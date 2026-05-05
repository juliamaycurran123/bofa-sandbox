import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsCurrencyComponent } from './ds-currency.component';

describe('DsCurrencyComponent', () => {
  let component: DsCurrencyComponent;
  let fixture: ComponentFixture<DsCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsCurrencyComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DsCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default amount to 0', () => {
    expect(component.amount).toBe(0);
  });

  it('should default currency to USD', () => {
    expect(component.currency).toBe('USD');
  });

  it('should default showSign to false', () => {
    expect(component.showSign).toBe(false);
  });

  it('should detect negative amounts', () => {
    component.amount = -50;
    expect(component.isNegative).toBe(true);
  });

  it('should detect positive amounts', () => {
    component.amount = 50;
    expect(component.isNegative).toBe(false);
  });

  it('should return absolute display value', () => {
    component.amount = -123.45;
    expect(component.displayValue).toBe(123.45);
  });

  it('should show minus sign for negative amounts', () => {
    component.amount = -100;
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('.ds-currency');
    expect(el.textContent).toContain('-');
  });

  it('should show plus sign when showSign is true and amount is positive', () => {
    component.amount = 100;
    component.showSign = true;
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('.ds-currency');
    expect(el.textContent).toContain('+');
  });

  it('should handle null amount gracefully', () => {
    component.amount = null;
    expect(component.isNegative).toBe(false);
    expect(component.displayValue).toBe(0);
  });
});
