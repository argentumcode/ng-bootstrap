/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Directive, Input, Output, EventEmitter, ChangeDetectionStrategy, Inject, Injector, Renderer2, ElementRef, TemplateRef, ViewContainerRef, ComponentFactoryResolver, NgZone, ViewEncapsulation, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { listenToTriggers } from '../util/triggers';
import { ngbAutoClose } from '../util/autoclose';
import { positionElements } from '../util/positioning';
import { PopupService } from '../util/popup';
import { NgbPopoverConfig } from './popover-config';
import { fromEvent } from 'rxjs';
/** @type {?} */
let nextId = 0;
export class NgbPopoverWindow {
    /**
     * @return {?}
     */
    isTitleTemplate() { return this.title instanceof TemplateRef; }
}
NgbPopoverWindow.decorators = [
    { type: Component, args: [{
                selector: 'ngb-popover-window',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                host: { '[class]': '"popover" + (popoverClass ? " " + popoverClass : "")', 'role': 'tooltip', '[id]': 'id' },
                template: `
    <div class="arrow"></div>
    <h3 class="popover-header" *ngIf="title != null">
      <ng-template #simpleTitle>{{title}}</ng-template>
      <ng-template [ngTemplateOutlet]="isTitleTemplate() ? title : simpleTitle" [ngTemplateOutletContext]="context"></ng-template>
    </h3>
    <div class="popover-body"><ng-content></ng-content></div>`,
                styles: ["ngb-popover-window.bs-popover-bottom>.arrow,ngb-popover-window.bs-popover-top>.arrow{left:50%;margin-left:-.5rem}ngb-popover-window.bs-popover-bottom-left>.arrow,ngb-popover-window.bs-popover-top-left>.arrow{left:2em}ngb-popover-window.bs-popover-bottom-right>.arrow,ngb-popover-window.bs-popover-top-right>.arrow{left:auto;right:2em}ngb-popover-window.bs-popover-left>.arrow,ngb-popover-window.bs-popover-right>.arrow{top:50%;margin-top:-.5rem}ngb-popover-window.bs-popover-left-top>.arrow,ngb-popover-window.bs-popover-right-top>.arrow{top:.7em}ngb-popover-window.bs-popover-left-bottom>.arrow,ngb-popover-window.bs-popover-right-bottom>.arrow{top:auto;bottom:.7em}"]
            }] }
];
NgbPopoverWindow.propDecorators = {
    title: [{ type: Input }],
    id: [{ type: Input }],
    popoverClass: [{ type: Input }],
    context: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    NgbPopoverWindow.prototype.title;
    /** @type {?} */
    NgbPopoverWindow.prototype.id;
    /** @type {?} */
    NgbPopoverWindow.prototype.popoverClass;
    /** @type {?} */
    NgbPopoverWindow.prototype.context;
}
/**
 * A lightweight and extensible directive for fancy popover creation.
 */
export class NgbPopover {
    /**
     * @param {?} _elementRef
     * @param {?} _renderer
     * @param {?} injector
     * @param {?} componentFactoryResolver
     * @param {?} viewContainerRef
     * @param {?} config
     * @param {?} _ngZone
     * @param {?} _document
     * @param {?} _changeDetector
     * @param {?} _applicationRef
     */
    constructor(_elementRef, _renderer, injector, componentFactoryResolver, viewContainerRef, config, _ngZone, _document, _changeDetector, _applicationRef) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._ngZone = _ngZone;
        this._document = _document;
        this._changeDetector = _changeDetector;
        this._applicationRef = _applicationRef;
        /**
         * An event emitted when the popover is shown. Contains no payload.
         */
        this.shown = new EventEmitter();
        /**
         * An event emitted when the popover is hidden. Contains no payload.
         */
        this.hidden = new EventEmitter();
        this._updated = false;
        this._ngbPopoverWindowId = `ngb-popover-${nextId++}`;
        this.autoClose = config.autoClose;
        this.placement = config.placement;
        this.triggers = config.triggers;
        this.container = config.container;
        this.disablePopover = config.disablePopover;
        this.popoverClass = config.popoverClass;
        this.openDelay = config.openDelay;
        this.closeDelay = config.closeDelay;
        this._popupService = new PopupService(NgbPopoverWindow, injector, viewContainerRef, _renderer, componentFactoryResolver, _applicationRef);
        this._resizeSubscription = fromEvent(window, 'resize').subscribe((/**
         * @return {?}
         */
        () => {
            this._updated = true;
        }));
        this._zoneSubscription = _ngZone.onStable.subscribe((/**
         * @return {?}
         */
        () => {
            if (this._windowRef && this._updated) {
                this._updated = false;
                positionElements(this._elementRef.nativeElement, this._windowRef.location.nativeElement, this.placement, this.container === 'body', 'bs-popover');
            }
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _isDisabled() {
        if (this.disablePopover) {
            return true;
        }
        if (!this.ngbPopover && !this.popoverTitle) {
            return true;
        }
        return false;
    }
    /**
     * Opens the popover.
     *
     * This is considered to be a "manual" triggering.
     * The `context` is an optional value to be injected into the popover template when it is created.
     * @param {?=} context
     * @return {?}
     */
    open(context) {
        if (!this._windowRef && !this._isDisabled()) {
            this._windowRef = this._popupService.open(this.ngbPopover, context);
            this._windowRef.instance.title = this.popoverTitle;
            this._windowRef.instance.context = context;
            this._windowRef.instance.popoverClass = this.popoverClass;
            this._windowRef.instance.id = this._ngbPopoverWindowId;
            this._renderer.setAttribute(this._elementRef.nativeElement, 'aria-describedby', this._ngbPopoverWindowId);
            if (this.container === 'body') {
                this._document.querySelector(this.container).appendChild(this._windowRef.location.nativeElement);
            }
            // We need to detect changes, because we don't know where .open() might be called from.
            // Ex. opening popover from one of lifecycle hooks that run after the CD
            // (say from ngAfterViewInit) will result in 'ExpressionHasChanged' exception
            this._windowRef.changeDetectorRef.detectChanges();
            // We need to mark for check, because popover won't work inside the OnPush component.
            // Ex. when we use expression like `{{ popover.isOpen() : 'opened' : 'closed' }}`
            // inside the template of an OnPush component and we change the popover from
            // open -> closed, the expression in question won't be updated unless we explicitly
            // mark the parent component to be checked.
            this._windowRef.changeDetectorRef.markForCheck();
            ngbAutoClose(this._ngZone, this._document, this.autoClose, (/**
             * @return {?}
             */
            () => this.close()), this.hidden, [this._windowRef.location.nativeElement]);
            this.shown.emit();
            this._updated = true;
        }
    }
    /**
     * Closes the popover.
     *
     * This is considered to be a "manual" triggering of the popover.
     * @return {?}
     */
    close() {
        if (this._windowRef) {
            this._renderer.removeAttribute(this._elementRef.nativeElement, 'aria-describedby');
            this._popupService.close();
            this._windowRef = null;
            this.hidden.emit();
            this._changeDetector.markForCheck();
        }
    }
    /**
     * Toggles the popover.
     *
     * This is considered to be a "manual" triggering of the popover.
     * @return {?}
     */
    toggle() {
        if (this._windowRef) {
            this.close();
        }
        else {
            this.open();
        }
    }
    /**
     * Returns `true`, if the popover is currently shown.
     * @return {?}
     */
    isOpen() { return this._windowRef != null; }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._unregisterListenersFn = listenToTriggers(this._renderer, this._elementRef.nativeElement, this.triggers, this.isOpen.bind(this), this.open.bind(this), this.close.bind(this), +this.openDelay, +this.closeDelay);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        // close popover if title and content become empty, or disablePopover set to true
        if ((changes['ngbPopover'] || changes['popoverTitle'] || changes['disablePopover']) && this._isDisabled()) {
            this.close();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.close();
        // This check is needed as it might happen that ngOnDestroy is called before ngOnInit
        // under certain conditions, see: https://github.com/ng-bootstrap/ng-bootstrap/issues/2199
        if (this._unregisterListenersFn) {
            this._unregisterListenersFn();
        }
        this._zoneSubscription.unsubscribe();
        this._resizeSubscription.unsubscribe();
    }
}
NgbPopover.decorators = [
    { type: Directive, args: [{ selector: '[ngbPopover]', exportAs: 'ngbPopover' },] }
];
/** @nocollapse */
NgbPopover.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: Injector },
    { type: ComponentFactoryResolver },
    { type: ViewContainerRef },
    { type: NgbPopoverConfig },
    { type: NgZone },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: ChangeDetectorRef },
    { type: ApplicationRef }
];
NgbPopover.propDecorators = {
    autoClose: [{ type: Input }],
    ngbPopover: [{ type: Input }],
    popoverTitle: [{ type: Input }],
    placement: [{ type: Input }],
    triggers: [{ type: Input }],
    container: [{ type: Input }],
    disablePopover: [{ type: Input }],
    popoverClass: [{ type: Input }],
    openDelay: [{ type: Input }],
    closeDelay: [{ type: Input }],
    shown: [{ type: Output }],
    hidden: [{ type: Output }]
};
if (false) {
    /**
     * Indicates whether the popover should be closed on `Escape` key and inside/outside clicks:
     *
     * * `true` - closes on both outside and inside clicks as well as `Escape` presses
     * * `false` - disables the autoClose feature (NB: triggers still apply)
     * * `"inside"` - closes on inside clicks as well as Escape presses
     * * `"outside"` - closes on outside clicks (sometimes also achievable through triggers)
     * as well as `Escape` presses
     *
     * \@since 3.0.0
     * @type {?}
     */
    NgbPopover.prototype.autoClose;
    /**
     * The string content or a `TemplateRef` for the content to be displayed in the popover.
     *
     * If the title and the content are empty, the popover won't open.
     * @type {?}
     */
    NgbPopover.prototype.ngbPopover;
    /**
     * The title of the popover.
     *
     * If the title and the content are empty, the popover won't open.
     * @type {?}
     */
    NgbPopover.prototype.popoverTitle;
    /**
     * The preferred placement of the popover.
     *
     * Possible values are `"top"`, `"top-left"`, `"top-right"`, `"bottom"`, `"bottom-left"`,
     * `"bottom-right"`, `"left"`, `"left-top"`, `"left-bottom"`, `"right"`, `"right-top"`,
     * `"right-bottom"`
     *
     * Accepts an array of strings or a string with space separated possible values.
     *
     * The default order of preference is `"auto"` (same as the sequence above).
     *
     * Please see the [positioning overview](#/positioning) for more details.
     * @type {?}
     */
    NgbPopover.prototype.placement;
    /**
     * Specifies events that should trigger the tooltip.
     *
     * Supports a space separated list of event names.
     * For more details see the [triggers demo](#/components/popover/examples#triggers).
     * @type {?}
     */
    NgbPopover.prototype.triggers;
    /**
     * A selector specifying the element the popover should be appended to.
     *
     * Currently only supports `body`.
     * @type {?}
     */
    NgbPopover.prototype.container;
    /**
     * If `true`, popover is disabled and won't be displayed.
     *
     * \@since 1.1.0
     * @type {?}
     */
    NgbPopover.prototype.disablePopover;
    /**
     * An optional class applied to the popover window element.
     *
     * \@since 2.2.0
     * @type {?}
     */
    NgbPopover.prototype.popoverClass;
    /**
     * The opening delay in ms. Works only for "non-manual" opening triggers defined by the `triggers` input.
     *
     * \@since 4.1.0
     * @type {?}
     */
    NgbPopover.prototype.openDelay;
    /**
     * The closing delay in ms. Works only for "non-manual" opening triggers defined by the `triggers` input.
     *
     * \@since 4.1.0
     * @type {?}
     */
    NgbPopover.prototype.closeDelay;
    /**
     * An event emitted when the popover is shown. Contains no payload.
     * @type {?}
     */
    NgbPopover.prototype.shown;
    /**
     * An event emitted when the popover is hidden. Contains no payload.
     * @type {?}
     */
    NgbPopover.prototype.hidden;
    /**
     * @type {?}
     * @private
     */
    NgbPopover.prototype._updated;
    /**
     * @type {?}
     * @private
     */
    NgbPopover.prototype._ngbPopoverWindowId;
    /**
     * @type {?}
     * @private
     */
    NgbPopover.prototype._popupService;
    /**
     * @type {?}
     * @private
     */
    NgbPopover.prototype._windowRef;
    /**
     * @type {?}
     * @private
     */
    NgbPopover.prototype._unregisterListenersFn;
    /**
     * @type {?}
     * @private
     */
    NgbPopover.prototype._zoneSubscription;
    /**
     * @type {?}
     * @private
     */
    NgbPopover.prototype._resizeSubscription;
    /**
     * @type {?}
     * @private
     */
    NgbPopover.prototype._elementRef;
    /**
     * @type {?}
     * @private
     */
    NgbPopover.prototype._renderer;
    /**
     * @type {?}
     * @private
     */
    NgbPopover.prototype._ngZone;
    /**
     * @type {?}
     * @private
     */
    NgbPopover.prototype._document;
    /**
     * @type {?}
     * @private
     */
    NgbPopover.prototype._changeDetector;
    /**
     * @type {?}
     * @private
     */
    NgbPopover.prototype._applicationRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsicG9wb3Zlci9wb3BvdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWix1QkFBdUIsRUFJdkIsTUFBTSxFQUNOLFFBQVEsRUFDUixTQUFTLEVBRVQsVUFBVSxFQUNWLFdBQVcsRUFDWCxnQkFBZ0IsRUFDaEIsd0JBQXdCLEVBQ3hCLE1BQU0sRUFFTixpQkFBaUIsRUFDakIsaUJBQWlCLEVBQ2pCLGNBQWMsRUFDZixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFekMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDbEQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxnQkFBZ0IsRUFBaUIsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ2xELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxNQUFNLENBQUM7O0lBRTNCLE1BQU0sR0FBRyxDQUFDO0FBZ0JkLE1BQU0sT0FBTyxnQkFBZ0I7Ozs7SUFNM0IsZUFBZSxLQUFLLE9BQU8sSUFBSSxDQUFDLEtBQUssWUFBWSxXQUFXLENBQUMsQ0FBQyxDQUFDOzs7WUFwQmhFLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLElBQUksRUFBRSxFQUFD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d0JBcURiLEtBQUs7eUJBT0wsS0FBSzsyQkFPTCxLQUFLO3dCQWVMLEtBQUs7dUJBUUwsS0FBSzt3QkFPTCxLQUFLOzZCQU9MLEtBQUs7MkJBT0wsS0FBSzt3QkFPTCxLQUFLO3lCQU9MLEtBQUs7b0JBS0wsTUFBTTtxQkFLTixNQUFNOzs7Ozs7Ozs7Ozs7Ozs7SUFsRlAsK0JBQW1EOzs7Ozs7O0lBT25ELGdDQUErQzs7Ozs7OztJQU8vQyxrQ0FBaUQ7Ozs7Ozs7Ozs7Ozs7OztJQWVqRCwrQkFBbUM7Ozs7Ozs7O0lBUW5DLDhCQUEwQjs7Ozs7OztJQU8xQiwrQkFBMkI7Ozs7Ozs7SUFPM0Isb0NBQWlDOzs7Ozs7O0lBT2pDLGtDQUE4Qjs7Ozs7OztJQU85QiwrQkFBMkI7Ozs7Ozs7SUFPM0IsZ0NBQTRCOzs7OztJQUs1QiwyQkFBMkM7Ozs7O0lBSzNDLDRCQUE0Qzs7Ozs7SUFFNUMsOEJBQXlCOzs7OztJQUN6Qix5Q0FBd0Q7Ozs7O0lBQ3hELG1DQUFzRDs7Ozs7SUFDdEQsZ0NBQW1EOzs7OztJQUNuRCw0Q0FBK0I7Ozs7O0lBQy9CLHVDQUErQjs7Ozs7SUFDL0IseUNBQWlDOzs7OztJQVk3QixpQ0FBNEM7Ozs7O0lBQUUsK0JBQTRCOzs7OztJQUUxRSw2QkFBdUI7Ozs7O0lBQUUsK0JBQXdDOzs7OztJQUFFLHFDQUEwQzs7Ozs7SUFDN0cscUNBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBEaXJlY3RpdmUsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIE9uSW5pdCxcbiAgT25EZXN0cm95LFxuICBPbkNoYW5nZXMsXG4gIEluamVjdCxcbiAgSW5qZWN0b3IsXG4gIFJlbmRlcmVyMixcbiAgQ29tcG9uZW50UmVmLFxuICBFbGVtZW50UmVmLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBOZ1pvbmUsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQXBwbGljYXRpb25SZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQge2xpc3RlblRvVHJpZ2dlcnN9IGZyb20gJy4uL3V0aWwvdHJpZ2dlcnMnO1xuaW1wb3J0IHtuZ2JBdXRvQ2xvc2V9IGZyb20gJy4uL3V0aWwvYXV0b2Nsb3NlJztcbmltcG9ydCB7cG9zaXRpb25FbGVtZW50cywgUGxhY2VtZW50QXJyYXl9IGZyb20gJy4uL3V0aWwvcG9zaXRpb25pbmcnO1xuaW1wb3J0IHtQb3B1cFNlcnZpY2V9IGZyb20gJy4uL3V0aWwvcG9wdXAnO1xuXG5pbXBvcnQge05nYlBvcG92ZXJDb25maWd9IGZyb20gJy4vcG9wb3Zlci1jb25maWcnO1xuaW1wb3J0IHtmcm9tRXZlbnR9IGZyb20gJ3J4anMnO1xuXG5sZXQgbmV4dElkID0gMDtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmdiLXBvcG92ZXItd2luZG93JyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGhvc3Q6IHsnW2NsYXNzXSc6ICdcInBvcG92ZXJcIiArIChwb3BvdmVyQ2xhc3MgPyBcIiBcIiArIHBvcG92ZXJDbGFzcyA6IFwiXCIpJywgJ3JvbGUnOiAndG9vbHRpcCcsICdbaWRdJzogJ2lkJ30sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImFycm93XCI+PC9kaXY+XG4gICAgPGgzIGNsYXNzPVwicG9wb3Zlci1oZWFkZXJcIiAqbmdJZj1cInRpdGxlICE9IG51bGxcIj5cbiAgICAgIDxuZy10ZW1wbGF0ZSAjc2ltcGxlVGl0bGU+e3t0aXRsZX19PC9uZy10ZW1wbGF0ZT5cbiAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJpc1RpdGxlVGVtcGxhdGUoKSA/IHRpdGxlIDogc2ltcGxlVGl0bGVcIiBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwiY29udGV4dFwiPjwvbmctdGVtcGxhdGU+XG4gICAgPC9oMz5cbiAgICA8ZGl2IGNsYXNzPVwicG9wb3Zlci1ib2R5XCI+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PjwvZGl2PmAsXG4gIHN0eWxlVXJsczogWycuL3BvcG92ZXIuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIE5nYlBvcG92ZXJXaW5kb3cge1xuICBASW5wdXQoKSB0aXRsZTogdW5kZWZpbmVkIHwgc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PjtcbiAgQElucHV0KCkgaWQ6IHN0cmluZztcbiAgQElucHV0KCkgcG9wb3ZlckNsYXNzOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGNvbnRleHQ6IGFueTtcblxuICBpc1RpdGxlVGVtcGxhdGUoKSB7IHJldHVybiB0aGlzLnRpdGxlIGluc3RhbmNlb2YgVGVtcGxhdGVSZWY7IH1cbn1cblxuLyoqXG4gKiBBIGxpZ2h0d2VpZ2h0IGFuZCBleHRlbnNpYmxlIGRpcmVjdGl2ZSBmb3IgZmFuY3kgcG9wb3ZlciBjcmVhdGlvbi5cbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdbbmdiUG9wb3Zlcl0nLCBleHBvcnRBczogJ25nYlBvcG92ZXInfSlcbmV4cG9ydCBjbGFzcyBOZ2JQb3BvdmVyIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgcG9wb3ZlciBzaG91bGQgYmUgY2xvc2VkIG9uIGBFc2NhcGVgIGtleSBhbmQgaW5zaWRlL291dHNpZGUgY2xpY2tzOlxuICAgKlxuICAgKiAqIGB0cnVlYCAtIGNsb3NlcyBvbiBib3RoIG91dHNpZGUgYW5kIGluc2lkZSBjbGlja3MgYXMgd2VsbCBhcyBgRXNjYXBlYCBwcmVzc2VzXG4gICAqICogYGZhbHNlYCAtIGRpc2FibGVzIHRoZSBhdXRvQ2xvc2UgZmVhdHVyZSAoTkI6IHRyaWdnZXJzIHN0aWxsIGFwcGx5KVxuICAgKiAqIGBcImluc2lkZVwiYCAtIGNsb3NlcyBvbiBpbnNpZGUgY2xpY2tzIGFzIHdlbGwgYXMgRXNjYXBlIHByZXNzZXNcbiAgICogKiBgXCJvdXRzaWRlXCJgIC0gY2xvc2VzIG9uIG91dHNpZGUgY2xpY2tzIChzb21ldGltZXMgYWxzbyBhY2hpZXZhYmxlIHRocm91Z2ggdHJpZ2dlcnMpXG4gICAqIGFzIHdlbGwgYXMgYEVzY2FwZWAgcHJlc3Nlc1xuICAgKlxuICAgKiBAc2luY2UgMy4wLjBcbiAgICovXG4gIEBJbnB1dCgpIGF1dG9DbG9zZTogYm9vbGVhbiB8ICdpbnNpZGUnIHwgJ291dHNpZGUnO1xuXG4gIC8qKlxuICAgKiBUaGUgc3RyaW5nIGNvbnRlbnQgb3IgYSBgVGVtcGxhdGVSZWZgIGZvciB0aGUgY29udGVudCB0byBiZSBkaXNwbGF5ZWQgaW4gdGhlIHBvcG92ZXIuXG4gICAqXG4gICAqIElmIHRoZSB0aXRsZSBhbmQgdGhlIGNvbnRlbnQgYXJlIGVtcHR5LCB0aGUgcG9wb3ZlciB3b24ndCBvcGVuLlxuICAgKi9cbiAgQElucHV0KCkgbmdiUG9wb3Zlcjogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogVGhlIHRpdGxlIG9mIHRoZSBwb3BvdmVyLlxuICAgKlxuICAgKiBJZiB0aGUgdGl0bGUgYW5kIHRoZSBjb250ZW50IGFyZSBlbXB0eSwgdGhlIHBvcG92ZXIgd29uJ3Qgb3Blbi5cbiAgICovXG4gIEBJbnB1dCgpIHBvcG92ZXJUaXRsZTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogVGhlIHByZWZlcnJlZCBwbGFjZW1lbnQgb2YgdGhlIHBvcG92ZXIuXG4gICAqXG4gICAqIFBvc3NpYmxlIHZhbHVlcyBhcmUgYFwidG9wXCJgLCBgXCJ0b3AtbGVmdFwiYCwgYFwidG9wLXJpZ2h0XCJgLCBgXCJib3R0b21cImAsIGBcImJvdHRvbS1sZWZ0XCJgLFxuICAgKiBgXCJib3R0b20tcmlnaHRcImAsIGBcImxlZnRcImAsIGBcImxlZnQtdG9wXCJgLCBgXCJsZWZ0LWJvdHRvbVwiYCwgYFwicmlnaHRcImAsIGBcInJpZ2h0LXRvcFwiYCxcbiAgICogYFwicmlnaHQtYm90dG9tXCJgXG4gICAqXG4gICAqIEFjY2VwdHMgYW4gYXJyYXkgb2Ygc3RyaW5ncyBvciBhIHN0cmluZyB3aXRoIHNwYWNlIHNlcGFyYXRlZCBwb3NzaWJsZSB2YWx1ZXMuXG4gICAqXG4gICAqIFRoZSBkZWZhdWx0IG9yZGVyIG9mIHByZWZlcmVuY2UgaXMgYFwiYXV0b1wiYCAoc2FtZSBhcyB0aGUgc2VxdWVuY2UgYWJvdmUpLlxuICAgKlxuICAgKiBQbGVhc2Ugc2VlIHRoZSBbcG9zaXRpb25pbmcgb3ZlcnZpZXddKCMvcG9zaXRpb25pbmcpIGZvciBtb3JlIGRldGFpbHMuXG4gICAqL1xuICBASW5wdXQoKSBwbGFjZW1lbnQ6IFBsYWNlbWVudEFycmF5O1xuXG4gIC8qKlxuICAgKiBTcGVjaWZpZXMgZXZlbnRzIHRoYXQgc2hvdWxkIHRyaWdnZXIgdGhlIHRvb2x0aXAuXG4gICAqXG4gICAqIFN1cHBvcnRzIGEgc3BhY2Ugc2VwYXJhdGVkIGxpc3Qgb2YgZXZlbnQgbmFtZXMuXG4gICAqIEZvciBtb3JlIGRldGFpbHMgc2VlIHRoZSBbdHJpZ2dlcnMgZGVtb10oIy9jb21wb25lbnRzL3BvcG92ZXIvZXhhbXBsZXMjdHJpZ2dlcnMpLlxuICAgKi9cbiAgQElucHV0KCkgdHJpZ2dlcnM6IHN0cmluZztcblxuICAvKipcbiAgICogQSBzZWxlY3RvciBzcGVjaWZ5aW5nIHRoZSBlbGVtZW50IHRoZSBwb3BvdmVyIHNob3VsZCBiZSBhcHBlbmRlZCB0by5cbiAgICpcbiAgICogQ3VycmVudGx5IG9ubHkgc3VwcG9ydHMgYGJvZHlgLlxuICAgKi9cbiAgQElucHV0KCkgY29udGFpbmVyOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIElmIGB0cnVlYCwgcG9wb3ZlciBpcyBkaXNhYmxlZCBhbmQgd29uJ3QgYmUgZGlzcGxheWVkLlxuICAgKlxuICAgKiBAc2luY2UgMS4xLjBcbiAgICovXG4gIEBJbnB1dCgpIGRpc2FibGVQb3BvdmVyOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBBbiBvcHRpb25hbCBjbGFzcyBhcHBsaWVkIHRvIHRoZSBwb3BvdmVyIHdpbmRvdyBlbGVtZW50LlxuICAgKlxuICAgKiBAc2luY2UgMi4yLjBcbiAgICovXG4gIEBJbnB1dCgpIHBvcG92ZXJDbGFzczogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgb3BlbmluZyBkZWxheSBpbiBtcy4gV29ya3Mgb25seSBmb3IgXCJub24tbWFudWFsXCIgb3BlbmluZyB0cmlnZ2VycyBkZWZpbmVkIGJ5IHRoZSBgdHJpZ2dlcnNgIGlucHV0LlxuICAgKlxuICAgKiBAc2luY2UgNC4xLjBcbiAgICovXG4gIEBJbnB1dCgpIG9wZW5EZWxheTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgY2xvc2luZyBkZWxheSBpbiBtcy4gV29ya3Mgb25seSBmb3IgXCJub24tbWFudWFsXCIgb3BlbmluZyB0cmlnZ2VycyBkZWZpbmVkIGJ5IHRoZSBgdHJpZ2dlcnNgIGlucHV0LlxuICAgKlxuICAgKiBAc2luY2UgNC4xLjBcbiAgICovXG4gIEBJbnB1dCgpIGNsb3NlRGVsYXk6IG51bWJlcjtcblxuICAvKipcbiAgICogQW4gZXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBwb3BvdmVyIGlzIHNob3duLiBDb250YWlucyBubyBwYXlsb2FkLlxuICAgKi9cbiAgQE91dHB1dCgpIHNob3duID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIC8qKlxuICAgKiBBbiBldmVudCBlbWl0dGVkIHdoZW4gdGhlIHBvcG92ZXIgaXMgaGlkZGVuLiBDb250YWlucyBubyBwYXlsb2FkLlxuICAgKi9cbiAgQE91dHB1dCgpIGhpZGRlbiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICBwcml2YXRlIF91cGRhdGVkID0gZmFsc2U7XG4gIHByaXZhdGUgX25nYlBvcG92ZXJXaW5kb3dJZCA9IGBuZ2ItcG9wb3Zlci0ke25leHRJZCsrfWA7XG4gIHByaXZhdGUgX3BvcHVwU2VydmljZTogUG9wdXBTZXJ2aWNlPE5nYlBvcG92ZXJXaW5kb3c+O1xuICBwcml2YXRlIF93aW5kb3dSZWY6IENvbXBvbmVudFJlZjxOZ2JQb3BvdmVyV2luZG93PjtcbiAgcHJpdmF0ZSBfdW5yZWdpc3Rlckxpc3RlbmVyc0ZuO1xuICBwcml2YXRlIF96b25lU3Vic2NyaXB0aW9uOiBhbnk7XG4gIHByaXZhdGUgX3Jlc2l6ZVN1YnNjcmlwdGlvbjogYW55O1xuICBwcml2YXRlIF9pc0Rpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmRpc2FibGVQb3BvdmVyKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLm5nYlBvcG92ZXIgJiYgIXRoaXMucG9wb3ZlclRpdGxlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PiwgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMiwgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgICAgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsIGNvbmZpZzogTmdiUG9wb3ZlckNvbmZpZyxcbiAgICAgIHByaXZhdGUgX25nWm9uZTogTmdab25lLCBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55LCBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICBwcml2YXRlIF9hcHBsaWNhdGlvblJlZjogQXBwbGljYXRpb25SZWYpIHtcbiAgICB0aGlzLmF1dG9DbG9zZSA9IGNvbmZpZy5hdXRvQ2xvc2U7XG4gICAgdGhpcy5wbGFjZW1lbnQgPSBjb25maWcucGxhY2VtZW50O1xuICAgIHRoaXMudHJpZ2dlcnMgPSBjb25maWcudHJpZ2dlcnM7XG4gICAgdGhpcy5jb250YWluZXIgPSBjb25maWcuY29udGFpbmVyO1xuICAgIHRoaXMuZGlzYWJsZVBvcG92ZXIgPSBjb25maWcuZGlzYWJsZVBvcG92ZXI7XG4gICAgdGhpcy5wb3BvdmVyQ2xhc3MgPSBjb25maWcucG9wb3ZlckNsYXNzO1xuICAgIHRoaXMub3BlbkRlbGF5ID0gY29uZmlnLm9wZW5EZWxheTtcbiAgICB0aGlzLmNsb3NlRGVsYXkgPSBjb25maWcuY2xvc2VEZWxheTtcbiAgICB0aGlzLl9wb3B1cFNlcnZpY2UgPSBuZXcgUG9wdXBTZXJ2aWNlPE5nYlBvcG92ZXJXaW5kb3c+KFxuICAgICAgICBOZ2JQb3BvdmVyV2luZG93LCBpbmplY3Rvciwgdmlld0NvbnRhaW5lclJlZiwgX3JlbmRlcmVyLCBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIF9hcHBsaWNhdGlvblJlZik7XG5cbiAgICB0aGlzLl9yZXNpemVTdWJzY3JpcHRpb24gPSBmcm9tRXZlbnQod2luZG93LCAncmVzaXplJykuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuX3VwZGF0ZWQgPSB0cnVlO1xuICAgIH0pO1xuICAgIHRoaXMuX3pvbmVTdWJzY3JpcHRpb24gPSBfbmdab25lLm9uU3RhYmxlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5fd2luZG93UmVmICYmIHRoaXMuX3VwZGF0ZWQpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlZCA9IGZhbHNlO1xuICAgICAgICBwb3NpdGlvbkVsZW1lbnRzKFxuICAgICAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLl93aW5kb3dSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCwgdGhpcy5wbGFjZW1lbnQsXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lciA9PT0gJ2JvZHknLCAnYnMtcG9wb3ZlcicpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIE9wZW5zIHRoZSBwb3BvdmVyLlxuICAgKlxuICAgKiBUaGlzIGlzIGNvbnNpZGVyZWQgdG8gYmUgYSBcIm1hbnVhbFwiIHRyaWdnZXJpbmcuXG4gICAqIFRoZSBgY29udGV4dGAgaXMgYW4gb3B0aW9uYWwgdmFsdWUgdG8gYmUgaW5qZWN0ZWQgaW50byB0aGUgcG9wb3ZlciB0ZW1wbGF0ZSB3aGVuIGl0IGlzIGNyZWF0ZWQuXG4gICAqL1xuICBvcGVuKGNvbnRleHQ/OiBhbnkpIHtcbiAgICBpZiAoIXRoaXMuX3dpbmRvd1JlZiAmJiAhdGhpcy5faXNEaXNhYmxlZCgpKSB7XG4gICAgICB0aGlzLl93aW5kb3dSZWYgPSB0aGlzLl9wb3B1cFNlcnZpY2Uub3Blbih0aGlzLm5nYlBvcG92ZXIsIGNvbnRleHQpO1xuICAgICAgdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLnRpdGxlID0gdGhpcy5wb3BvdmVyVGl0bGU7XG4gICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UucG9wb3ZlckNsYXNzID0gdGhpcy5wb3BvdmVyQ2xhc3M7XG4gICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UuaWQgPSB0aGlzLl9uZ2JQb3BvdmVyV2luZG93SWQ7XG5cbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdhcmlhLWRlc2NyaWJlZGJ5JywgdGhpcy5fbmdiUG9wb3ZlcldpbmRvd0lkKTtcblxuICAgICAgaWYgKHRoaXMuY29udGFpbmVyID09PSAnYm9keScpIHtcbiAgICAgICAgdGhpcy5fZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmNvbnRhaW5lcikuYXBwZW5kQ2hpbGQodGhpcy5fd2luZG93UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgfVxuXG4gICAgICAvLyBXZSBuZWVkIHRvIGRldGVjdCBjaGFuZ2VzLCBiZWNhdXNlIHdlIGRvbid0IGtub3cgd2hlcmUgLm9wZW4oKSBtaWdodCBiZSBjYWxsZWQgZnJvbS5cbiAgICAgIC8vIEV4LiBvcGVuaW5nIHBvcG92ZXIgZnJvbSBvbmUgb2YgbGlmZWN5Y2xlIGhvb2tzIHRoYXQgcnVuIGFmdGVyIHRoZSBDRFxuICAgICAgLy8gKHNheSBmcm9tIG5nQWZ0ZXJWaWV3SW5pdCkgd2lsbCByZXN1bHQgaW4gJ0V4cHJlc3Npb25IYXNDaGFuZ2VkJyBleGNlcHRpb25cbiAgICAgIHRoaXMuX3dpbmRvd1JlZi5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG5cbiAgICAgIC8vIFdlIG5lZWQgdG8gbWFyayBmb3IgY2hlY2ssIGJlY2F1c2UgcG9wb3ZlciB3b24ndCB3b3JrIGluc2lkZSB0aGUgT25QdXNoIGNvbXBvbmVudC5cbiAgICAgIC8vIEV4LiB3aGVuIHdlIHVzZSBleHByZXNzaW9uIGxpa2UgYHt7IHBvcG92ZXIuaXNPcGVuKCkgOiAnb3BlbmVkJyA6ICdjbG9zZWQnIH19YFxuICAgICAgLy8gaW5zaWRlIHRoZSB0ZW1wbGF0ZSBvZiBhbiBPblB1c2ggY29tcG9uZW50IGFuZCB3ZSBjaGFuZ2UgdGhlIHBvcG92ZXIgZnJvbVxuICAgICAgLy8gb3BlbiAtPiBjbG9zZWQsIHRoZSBleHByZXNzaW9uIGluIHF1ZXN0aW9uIHdvbid0IGJlIHVwZGF0ZWQgdW5sZXNzIHdlIGV4cGxpY2l0bHlcbiAgICAgIC8vIG1hcmsgdGhlIHBhcmVudCBjb21wb25lbnQgdG8gYmUgY2hlY2tlZC5cbiAgICAgIHRoaXMuX3dpbmRvd1JlZi5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcblxuICAgICAgbmdiQXV0b0Nsb3NlKFxuICAgICAgICAgIHRoaXMuX25nWm9uZSwgdGhpcy5fZG9jdW1lbnQsIHRoaXMuYXV0b0Nsb3NlLCAoKSA9PiB0aGlzLmNsb3NlKCksIHRoaXMuaGlkZGVuLFxuICAgICAgICAgIFt0aGlzLl93aW5kb3dSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudF0pO1xuICAgICAgdGhpcy5zaG93bi5lbWl0KCk7XG5cbiAgICAgIHRoaXMuX3VwZGF0ZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgdGhlIHBvcG92ZXIuXG4gICAqXG4gICAqIFRoaXMgaXMgY29uc2lkZXJlZCB0byBiZSBhIFwibWFudWFsXCIgdHJpZ2dlcmluZyBvZiB0aGUgcG9wb3Zlci5cbiAgICovXG4gIGNsb3NlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl93aW5kb3dSZWYpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUF0dHJpYnV0ZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdhcmlhLWRlc2NyaWJlZGJ5Jyk7XG4gICAgICB0aGlzLl9wb3B1cFNlcnZpY2UuY2xvc2UoKTtcbiAgICAgIHRoaXMuX3dpbmRvd1JlZiA9IG51bGw7XG4gICAgICB0aGlzLmhpZGRlbi5lbWl0KCk7XG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlcyB0aGUgcG9wb3Zlci5cbiAgICpcbiAgICogVGhpcyBpcyBjb25zaWRlcmVkIHRvIGJlIGEgXCJtYW51YWxcIiB0cmlnZ2VyaW5nIG9mIHRoZSBwb3BvdmVyLlxuICAgKi9cbiAgdG9nZ2xlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl93aW5kb3dSZWYpIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vcGVuKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYHRydWVgLCBpZiB0aGUgcG9wb3ZlciBpcyBjdXJyZW50bHkgc2hvd24uXG4gICAqL1xuICBpc09wZW4oKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl93aW5kb3dSZWYgIT0gbnVsbDsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuX3VucmVnaXN0ZXJMaXN0ZW5lcnNGbiA9IGxpc3RlblRvVHJpZ2dlcnMoXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLCB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRoaXMudHJpZ2dlcnMsIHRoaXMuaXNPcGVuLmJpbmQodGhpcyksIHRoaXMub3Blbi5iaW5kKHRoaXMpLFxuICAgICAgICB0aGlzLmNsb3NlLmJpbmQodGhpcyksICt0aGlzLm9wZW5EZWxheSwgK3RoaXMuY2xvc2VEZWxheSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgLy8gY2xvc2UgcG9wb3ZlciBpZiB0aXRsZSBhbmQgY29udGVudCBiZWNvbWUgZW1wdHksIG9yIGRpc2FibGVQb3BvdmVyIHNldCB0byB0cnVlXG4gICAgaWYgKChjaGFuZ2VzWyduZ2JQb3BvdmVyJ10gfHwgY2hhbmdlc1sncG9wb3ZlclRpdGxlJ10gfHwgY2hhbmdlc1snZGlzYWJsZVBvcG92ZXInXSkgJiYgdGhpcy5faXNEaXNhYmxlZCgpKSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5jbG9zZSgpO1xuICAgIC8vIFRoaXMgY2hlY2sgaXMgbmVlZGVkIGFzIGl0IG1pZ2h0IGhhcHBlbiB0aGF0IG5nT25EZXN0cm95IGlzIGNhbGxlZCBiZWZvcmUgbmdPbkluaXRcbiAgICAvLyB1bmRlciBjZXJ0YWluIGNvbmRpdGlvbnMsIHNlZTogaHR0cHM6Ly9naXRodWIuY29tL25nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvaXNzdWVzLzIxOTlcbiAgICBpZiAodGhpcy5fdW5yZWdpc3Rlckxpc3RlbmVyc0ZuKSB7XG4gICAgICB0aGlzLl91bnJlZ2lzdGVyTGlzdGVuZXJzRm4oKTtcbiAgICB9XG4gICAgdGhpcy5fem9uZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3Jlc2l6ZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=