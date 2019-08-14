/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Options available when opening new modal windows with `NgbModal.open()` method.
 * @record
 */
export function NgbModalOptions() { }
if (false) {
    /**
     * `aria-labelledby` attribute value to set on the modal window.
     *
     * \@since 2.2.0
     * @type {?|undefined}
     */
    NgbModalOptions.prototype.ariaLabelledBy;
    /**
     * If `true`, the backdrop element will be created for a given modal.
     *
     * Alternatively, specify `'static'` for a backdrop which doesn't close the modal on click.
     *
     * Default value is `true`.
     * @type {?|undefined}
     */
    NgbModalOptions.prototype.backdrop;
    /**
     * Callback right before the modal will be dismissed.
     *
     * If this function returns:
     * * `false`
     * * a promise resolved with `false`
     * * a promise that is rejected
     *
     * then the modal won't be dismissed.
     * @type {?|undefined}
     */
    NgbModalOptions.prototype.beforeDismiss;
    /**
     * If `true`, the modal will be centered vertically.
     *
     * Default value is `false`.
     *
     * \@since 1.1.0
     * @type {?|undefined}
     */
    NgbModalOptions.prototype.centered;
    /**
     * A selector specifying the element all new modal windows should be appended to.
     *
     * If not specified, will be `body`.
     * @type {?|undefined}
     */
    NgbModalOptions.prototype.container;
    /**
     * The `Injector` to use for modal content.
     * @type {?|undefined}
     */
    NgbModalOptions.prototype.injector;
    /**
     * If `true`, the modal will be closed when `Escape` key is pressed
     *
     * Default value is `true`.
     * @type {?|undefined}
     */
    NgbModalOptions.prototype.keyboard;
    /**
     * Scrollable modal content (false by default).
     *
     * \@since 5.0.0
     * @type {?|undefined}
     */
    NgbModalOptions.prototype.scrollable;
    /**
     * Size of a new modal window.
     * @type {?|undefined}
     */
    NgbModalOptions.prototype.size;
    /**
     * A custom class to append to the modal window.
     * @type {?|undefined}
     */
    NgbModalOptions.prototype.windowClass;
    /**
     * A custom class to append to the modal backdrop.
     *
     * \@since 1.1.0
     * @type {?|undefined}
     */
    NgbModalOptions.prototype.backdropClass;
}
/**
 * A configuration service for the [`NgbModal`](#/components/modal/api#NgbModal) service.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all modals used in the application.
 *
 * \@since 3.1.0
 */
export class NgbModalConfig {
    constructor() {
        this.backdrop = true;
        this.keyboard = true;
    }
}
NgbModalConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ NgbModalConfig.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function NgbModalConfig_Factory() { return new NgbModalConfig(); }, token: NgbModalConfig, providedIn: "root" });
if (false) {
    /** @type {?} */
    NgbModalConfig.prototype.backdrop;
    /** @type {?} */
    NgbModalConfig.prototype.keyboard;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtY29uZmlnLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJtb2RhbC9tb2RhbC1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQVcsTUFBTSxlQUFlLENBQUM7Ozs7OztBQUtuRCxxQ0FnRkM7Ozs7Ozs7O0lBMUVDLHlDQUF3Qjs7Ozs7Ozs7O0lBU3hCLG1DQUE4Qjs7Ozs7Ozs7Ozs7O0lBWTlCLHdDQUFpRDs7Ozs7Ozs7O0lBU2pELG1DQUFtQjs7Ozs7OztJQU9uQixvQ0FBbUI7Ozs7O0lBS25CLG1DQUFvQjs7Ozs7OztJQU9wQixtQ0FBbUI7Ozs7Ozs7SUFPbkIscUNBQXFCOzs7OztJQUtyQiwrQkFBMEI7Ozs7O0lBSzFCLHNDQUFxQjs7Ozs7OztJQU9yQix3Q0FBdUI7Ozs7Ozs7Ozs7QUFZekIsTUFBTSxPQUFPLGNBQWM7SUFEM0I7UUFFRSxhQUFRLEdBQXVCLElBQUksQ0FBQztRQUNwQyxhQUFRLEdBQUcsSUFBSSxDQUFDO0tBQ2pCOzs7WUFKQSxVQUFVLFNBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDOzs7OztJQUU5QixrQ0FBb0M7O0lBQ3BDLGtDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgSW5qZWN0b3J9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIE9wdGlvbnMgYXZhaWxhYmxlIHdoZW4gb3BlbmluZyBuZXcgbW9kYWwgd2luZG93cyB3aXRoIGBOZ2JNb2RhbC5vcGVuKClgIG1ldGhvZC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBOZ2JNb2RhbE9wdGlvbnMge1xuICAvKipcbiAgICogYGFyaWEtbGFiZWxsZWRieWAgYXR0cmlidXRlIHZhbHVlIHRvIHNldCBvbiB0aGUgbW9kYWwgd2luZG93LlxuICAgKlxuICAgKiBAc2luY2UgMi4yLjBcbiAgICovXG4gIGFyaWFMYWJlbGxlZEJ5Pzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBJZiBgdHJ1ZWAsIHRoZSBiYWNrZHJvcCBlbGVtZW50IHdpbGwgYmUgY3JlYXRlZCBmb3IgYSBnaXZlbiBtb2RhbC5cbiAgICpcbiAgICogQWx0ZXJuYXRpdmVseSwgc3BlY2lmeSBgJ3N0YXRpYydgIGZvciBhIGJhY2tkcm9wIHdoaWNoIGRvZXNuJ3QgY2xvc2UgdGhlIG1vZGFsIG9uIGNsaWNrLlxuICAgKlxuICAgKiBEZWZhdWx0IHZhbHVlIGlzIGB0cnVlYC5cbiAgICovXG4gIGJhY2tkcm9wPzogYm9vbGVhbiB8ICdzdGF0aWMnO1xuXG4gIC8qKlxuICAgKiBDYWxsYmFjayByaWdodCBiZWZvcmUgdGhlIG1vZGFsIHdpbGwgYmUgZGlzbWlzc2VkLlxuICAgKlxuICAgKiBJZiB0aGlzIGZ1bmN0aW9uIHJldHVybnM6XG4gICAqICogYGZhbHNlYFxuICAgKiAqIGEgcHJvbWlzZSByZXNvbHZlZCB3aXRoIGBmYWxzZWBcbiAgICogKiBhIHByb21pc2UgdGhhdCBpcyByZWplY3RlZFxuICAgKlxuICAgKiB0aGVuIHRoZSBtb2RhbCB3b24ndCBiZSBkaXNtaXNzZWQuXG4gICAqL1xuICBiZWZvcmVEaXNtaXNzPzogKCkgPT4gYm9vbGVhbiB8IFByb21pc2U8Ym9vbGVhbj47XG5cbiAgLyoqXG4gICAqIElmIGB0cnVlYCwgdGhlIG1vZGFsIHdpbGwgYmUgY2VudGVyZWQgdmVydGljYWxseS5cbiAgICpcbiAgICogRGVmYXVsdCB2YWx1ZSBpcyBgZmFsc2VgLlxuICAgKlxuICAgKiBAc2luY2UgMS4xLjBcbiAgICovXG4gIGNlbnRlcmVkPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogQSBzZWxlY3RvciBzcGVjaWZ5aW5nIHRoZSBlbGVtZW50IGFsbCBuZXcgbW9kYWwgd2luZG93cyBzaG91bGQgYmUgYXBwZW5kZWQgdG8uXG4gICAqXG4gICAqIElmIG5vdCBzcGVjaWZpZWQsIHdpbGwgYmUgYGJvZHlgLlxuICAgKi9cbiAgY29udGFpbmVyPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgYEluamVjdG9yYCB0byB1c2UgZm9yIG1vZGFsIGNvbnRlbnQuXG4gICAqL1xuICBpbmplY3Rvcj86IEluamVjdG9yO1xuXG4gIC8qKlxuICAgKiBJZiBgdHJ1ZWAsIHRoZSBtb2RhbCB3aWxsIGJlIGNsb3NlZCB3aGVuIGBFc2NhcGVgIGtleSBpcyBwcmVzc2VkXG4gICAqXG4gICAqIERlZmF1bHQgdmFsdWUgaXMgYHRydWVgLlxuICAgKi9cbiAga2V5Ym9hcmQ/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBTY3JvbGxhYmxlIG1vZGFsIGNvbnRlbnQgKGZhbHNlIGJ5IGRlZmF1bHQpLlxuICAgKlxuICAgKiBAc2luY2UgNS4wLjBcbiAgICovXG4gIHNjcm9sbGFibGU/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBTaXplIG9mIGEgbmV3IG1vZGFsIHdpbmRvdy5cbiAgICovXG4gIHNpemU/OiAnc20nIHwgJ2xnJyB8ICd4bCc7XG5cbiAgLyoqXG4gICAqIEEgY3VzdG9tIGNsYXNzIHRvIGFwcGVuZCB0byB0aGUgbW9kYWwgd2luZG93LlxuICAgKi9cbiAgd2luZG93Q2xhc3M/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEEgY3VzdG9tIGNsYXNzIHRvIGFwcGVuZCB0byB0aGUgbW9kYWwgYmFja2Ryb3AuXG4gICAqXG4gICAqIEBzaW5jZSAxLjEuMFxuICAgKi9cbiAgYmFja2Ryb3BDbGFzcz86IHN0cmluZztcbn1cblxuLyoqXG4gKiBBIGNvbmZpZ3VyYXRpb24gc2VydmljZSBmb3IgdGhlIFtgTmdiTW9kYWxgXSgjL2NvbXBvbmVudHMvbW9kYWwvYXBpI05nYk1vZGFsKSBzZXJ2aWNlLlxuICpcbiAqIFlvdSBjYW4gaW5qZWN0IHRoaXMgc2VydmljZSwgdHlwaWNhbGx5IGluIHlvdXIgcm9vdCBjb21wb25lbnQsIGFuZCBjdXN0b21pemUgdGhlIHZhbHVlcyBvZiBpdHMgcHJvcGVydGllcyBpblxuICogb3JkZXIgdG8gcHJvdmlkZSBkZWZhdWx0IHZhbHVlcyBmb3IgYWxsIG1vZGFscyB1c2VkIGluIHRoZSBhcHBsaWNhdGlvbi5cbipcbiogQHNpbmNlIDMuMS4wXG4qL1xuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgTmdiTW9kYWxDb25maWcgaW1wbGVtZW50cyBOZ2JNb2RhbE9wdGlvbnMge1xuICBiYWNrZHJvcDogYm9vbGVhbiB8ICdzdGF0aWMnID0gdHJ1ZTtcbiAga2V5Ym9hcmQgPSB0cnVlO1xufVxuIl19