import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * A configuration service for the [`NgbNav`](#/components/nav/api#NgbNav) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the navs used in the application.
 *
 * @since 5.2.0
 */
export class NgbNavConfig {
    constructor() {
        this.destroyOnHide = true;
        this.orientation = 'horizontal';
        this.roles = 'tablist';
        this.keyboard = false;
    }
}
NgbNavConfig.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgbNavConfig_Factory() { return new NgbNavConfig(); }, token: NgbNavConfig, providedIn: "root" });
NgbNavConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2LWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9uYXYvbmF2LWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQUV6Qzs7Ozs7OztHQU9HO0FBRUgsTUFBTSxPQUFPLFlBQVk7SUFEekI7UUFFRSxrQkFBYSxHQUFHLElBQUksQ0FBQztRQUNyQixnQkFBVyxHQUE4QixZQUFZLENBQUM7UUFDdEQsVUFBSyxHQUFzQixTQUFTLENBQUM7UUFDckMsYUFBUSxHQUFpQyxLQUFLLENBQUM7S0FDaEQ7Ozs7WUFOQSxVQUFVLFNBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBBIGNvbmZpZ3VyYXRpb24gc2VydmljZSBmb3IgdGhlIFtgTmdiTmF2YF0oIy9jb21wb25lbnRzL25hdi9hcGkjTmdiTmF2KSBjb21wb25lbnQuXG4gKlxuICogWW91IGNhbiBpbmplY3QgdGhpcyBzZXJ2aWNlLCB0eXBpY2FsbHkgaW4geW91ciByb290IGNvbXBvbmVudCwgYW5kIGN1c3RvbWl6ZSB0aGUgdmFsdWVzIG9mIGl0cyBwcm9wZXJ0aWVzIGluXG4gKiBvcmRlciB0byBwcm92aWRlIGRlZmF1bHQgdmFsdWVzIGZvciBhbGwgdGhlIG5hdnMgdXNlZCBpbiB0aGUgYXBwbGljYXRpb24uXG4gKlxuICogQHNpbmNlIDUuMi4wXG4gKi9cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIE5nYk5hdkNvbmZpZyB7XG4gIGRlc3Ryb3lPbkhpZGUgPSB0cnVlO1xuICBvcmllbnRhdGlvbjogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJyA9ICdob3Jpem9udGFsJztcbiAgcm9sZXM6ICd0YWJsaXN0JyB8IGZhbHNlID0gJ3RhYmxpc3QnO1xuICBrZXlib2FyZDogYm9vbGVhbiB8ICdjaGFuZ2VXaXRoQXJyb3dzJyA9IGZhbHNlO1xufVxuIl19