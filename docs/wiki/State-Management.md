# State Management

## Pattern: ngrx-style Services

ClearVault uses a **homegrown unidirectional state management pattern** inspired by ngrx but implemented with plain Angular services and RxJS. This predates the team's decision to adopt ngrx proper.

## How It Works

State is managed through injectable singleton services that expose:

1. **Private `BehaviorSubject`** — holds the current state.
2. **Public `Observable`** — exposes the state stream for components to subscribe to.
3. **Mutation methods** — update the `BehaviorSubject` through well-defined entry points.

### Example: AuthService

```typescript
@Injectable()
export class AuthService {
  // Private mutable state
  private user$ = new BehaviorSubject<AuthUser | null>(null);

  // Public read-only stream
  currentUser(): Observable<AuthUser | null> {
    return this.user$.asObservable();
  }

  // Synchronous accessor
  isAuthenticated(): boolean {
    return this.user$.value !== null;
  }

  // State mutation
  logout(): void {
    this.sso.clearToken();
    this.user$.next(null);
  }
}
```

### Example: AccountsService

`AccountsService` follows a simpler pattern — it returns `Observable` results from HTTP calls (or fixtures) without maintaining a `BehaviorSubject`. Components subscribe to these observables directly, typically via the `async` pipe.

## Services vs. ngrx Store

| Aspect | Current (Services) | ngrx |
|--------|-------------------|------|
| State container | `BehaviorSubject` | `Store` |
| Mutations | Service methods | Actions → Reducers |
| Side effects | Service methods with RxJS | `@ngrx/effects` |
| DevTools | None | Redux DevTools |
| Boilerplate | Low | Higher |

## Best Practices

- Keep state in services registered in `CoreModule` or `providedIn: 'root'`.
- Expose state as `Observable` — don't expose the `BehaviorSubject` directly.
- Use the `async` pipe in templates where possible to avoid manual subscription management.
- If you must subscribe imperatively, use `takeUntil` with a destroy subject to prevent memory leaks.
