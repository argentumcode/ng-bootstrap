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
var nextId = 0;
var NgbPopoverWindow = /** @class */ (function () {
    function NgbPopoverWindow() {
    }
    /**
     * @return {?}
     */
    NgbPopoverWindow.prototype.isTitleTemplate = /**
     * @return {?}
     */
    function () { return this.title instanceof TemplateRef; };
    NgbPopoverWindow.decorators = [
        { type: Component, args: [{
                    selector: 'ngb-popover-window',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: { '[class]': '"popover" + (popoverClass ? " " + popoverClass : "")', 'role': 'tooltip', '[id]': 'id' },
                    template: "\n    <div class=\"arrow\"></div>\n    <h3 class=\"popover-header\" *ngIf=\"title != null\">\n      <ng-template #simpleTitle>{{title}}</ng-template>\n      <ng-template [ngTemplateOutlet]=\"isTitleTemplate() ? title : simpleTitle\" [ngTemplateOutletContext]=\"context\"></ng-template>\n    </h3>\n    <div class=\"popover-body\"><ng-content></ng-content></div>",
                    styles: ["ngb-popover-window.bs-popover-bottom>.arrow,ngb-popover-window.bs-popover-top>.arrow{left:50%;margin-left:-.5rem}ngb-popover-window.bs-popover-bottom-left>.arrow,ngb-popover-window.bs-popover-top-left>.arrow{left:2em}ngb-popover-window.bs-popover-bottom-right>.arrow,ngb-popover-window.bs-popover-top-right>.arrow{left:auto;right:2em}ngb-popover-window.bs-popover-left>.arrow,ngb-popover-window.bs-popover-right>.arrow{top:50%;margin-top:-.5rem}ngb-popover-window.bs-popover-left-top>.arrow,ngb-popover-window.bs-popover-right-top>.arrow{top:.7em}ngb-popover-window.bs-popover-left-bottom>.arrow,ngb-popover-window.bs-popover-right-bottom>.arrow{top:auto;bottom:.7em}"]
                }] }
    ];
    NgbPopoverWindow.propDecorators = {
        title: [{ type: Input }],
        id: [{ type: Input }],
        popoverClass: [{ type: Input }],
        context: [{ type: Input }]
    };
    return NgbPopoverWindow;
}());
export { NgbPopoverWindow };
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
var NgbPopover = /** @class */ (function () {
    function NgbPopover(_elementRef, _renderer, injector, componentFactoryResolver, viewContainerRef, config, _ngZone, _document, _changeDetector, _applicationRef) {
        var _this = this;
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
        this._ngbPopoverWindowId = "ngb-popover-" + nextId++;
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
        function () {
            _this._updated = true;
        }));
        this._zoneSubscription = _ngZone.onStable.subscribe((/**
         * @return {?}
         */
        function () {
            if (_this._windowRef && _this._updated) {
                _this._updated = false;
                positionElements(_this._elementRef.nativeElement, _this._windowRef.location.nativeElement, _this.placement, _this.container === 'body', 'bs-popover');
            }
        }));
    }
    /**
     * @private
     * @return {?}
     */
    NgbPopover.prototype._isDisabled = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.disablePopover) {
            return true;
        }
        if (!this.ngbPopover && !this.popoverTitle) {
            return true;
        }
        return false;
    };
    /**
     * Opens the popover.
     *
     * This is considered to be a "manual" triggering.
     * The `context` is an optional value to be injected into the popover template when it is created.
     */
    /**
     * Opens the popover.
     *
     * This is considered to be a "manual" triggering.
     * The `context` is an optional value to be injected into the popover template when it is created.
     * @param {?=} context
     * @return {?}
     */
    NgbPopover.prototype.open = /**
     * Opens the popover.
     *
     * This is considered to be a "manual" triggering.
     * The `context` is an optional value to be injected into the popover template when it is created.
     * @param {?=} context
     * @return {?}
     */
    function (context) {
        var _this = this;
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
            function () { return _this.close(); }), this.hidden, [this._windowRef.location.nativeElement]);
            this.shown.emit();
            this._updated = true;
        }
    };
    /**
     * Closes the popover.
     *
     * This is considered to be a "manual" triggering of the popover.
     */
    /**
     * Closes the popover.
     *
     * This is considered to be a "manual" triggering of the popover.
     * @return {?}
     */
    NgbPopover.prototype.close = /**
     * Closes the popover.
     *
     * This is considered to be a "manual" triggering of the popover.
     * @return {?}
     */
    function () {
        if (this._windowRef) {
            this._renderer.removeAttribute(this._elementRef.nativeElement, 'aria-describedby');
            this._popupService.close();
            this._windowRef = null;
            this.hidden.emit();
            this._changeDetector.markForCheck();
        }
    };
    /**
     * Toggles the popover.
     *
     * This is considered to be a "manual" triggering of the popover.
     */
    /**
     * Toggles the popover.
     *
     * This is considered to be a "manual" triggering of the popover.
     * @return {?}
     */
    NgbPopover.prototype.toggle = /**
     * Toggles the popover.
     *
     * This is considered to be a "manual" triggering of the popover.
     * @return {?}
     */
    function () {
        if (this._windowRef) {
            this.close();
        }
        else {
            this.open();
        }
    };
    /**
     * Returns `true`, if the popover is currently shown.
     */
    /**
     * Returns `true`, if the popover is currently shown.
     * @return {?}
     */
    NgbPopover.prototype.isOpen = /**
     * Returns `true`, if the popover is currently shown.
     * @return {?}
     */
    function () { return this._windowRef != null; };
    /**
     * @return {?}
     */
    NgbPopover.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this._unregisterListenersFn = listenToTriggers(this._renderer, this._elementRef.nativeElement, this.triggers, this.isOpen.bind(this), this.open.bind(this), this.close.bind(this), +this.openDelay, +this.closeDelay);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NgbPopover.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        // close popover if title and content become empty, or disablePopover set to true
        if ((changes['ngbPopover'] || changes['popoverTitle'] || changes['disablePopover']) && this._isDisabled()) {
            this.close();
        }
    };
    /**
     * @return {?}
     */
    NgbPopover.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.close();
        // This check is needed as it might happen that ngOnDestroy is called before ngOnInit
        // under certain conditions, see: https://github.com/ng-bootstrap/ng-bootstrap/issues/2199
        if (this._unregisterListenersFn) {
            this._unregisterListenersFn();
        }
        this._zoneSubscription.unsubscribe();
        this._resizeSubscription.unsubscribe();
    };
    NgbPopover.decorators = [
        { type: Directive, args: [{ selector: '[ngbPopover]', exportAs: 'ngbPopover' },] }
    ];
    /** @nocollapse */
    NgbPopover.ctorParameters = function () { return [
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
    ]; };
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
    return NgbPopover;
}());
export { NgbPopover };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsicG9wb3Zlci9wb3BvdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWix1QkFBdUIsRUFJdkIsTUFBTSxFQUNOLFFBQVEsRUFDUixTQUFTLEVBRVQsVUFBVSxFQUNWLFdBQVcsRUFDWCxnQkFBZ0IsRUFDaEIsd0JBQXdCLEVBQ3hCLE1BQU0sRUFFTixpQkFBaUIsRUFDakIsaUJBQWlCLEVBQ2pCLGNBQWMsRUFDZixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFekMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDbEQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxnQkFBZ0IsRUFBaUIsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ2xELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxNQUFNLENBQUM7O0lBRTNCLE1BQU0sR0FBRyxDQUFDO0FBRWQ7SUFBQTtJQXFCQSxDQUFDOzs7O0lBREMsMENBQWU7OztJQUFmLGNBQW9CLE9BQU8sSUFBSSxDQUFDLEtBQUssWUFBWSxXQUFXLENBQUMsQ0FBQyxDQUFDOztnQkFwQmhFLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLElBQUksRUFBRSxFQUFDLFNBQVMsRUFBRSxzREFBc0QsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUM7b0JBQzFHLFFBQVEsRUFBRSwyV0FNa0Q7O2lCQUU3RDs7O3dCQUVFLEtBQUs7cUJBQ0wsS0FBSzsrQkFDTCxLQUFLOzBCQUNMLEtBQUs7O0lBR1IsdUJBQUM7Q0FBQSxBQXJCRCxJQXFCQztTQVBZLGdCQUFnQjs7O0lBQzNCLGlDQUFzRDs7SUFDdEQsOEJBQW9COztJQUNwQix3Q0FBOEI7O0lBQzlCLG1DQUFzQjs7Ozs7QUFReEI7SUFrSEUsb0JBQ1ksV0FBb0MsRUFBVSxTQUFvQixFQUFFLFFBQWtCLEVBQzlGLHdCQUFrRCxFQUFFLGdCQUFrQyxFQUFFLE1BQXdCLEVBQ3hHLE9BQWUsRUFBNEIsU0FBYyxFQUFVLGVBQWtDLEVBQ3JHLGVBQStCO1FBSjNDLGlCQTJCQztRQTFCVyxnQkFBVyxHQUFYLFdBQVcsQ0FBeUI7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBRWxFLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFBNEIsY0FBUyxHQUFULFNBQVMsQ0FBSztRQUFVLG9CQUFlLEdBQWYsZUFBZSxDQUFtQjtRQUNyRyxvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7Ozs7UUE1QmpDLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDOzs7O1FBS2pDLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBRXBDLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsd0JBQW1CLEdBQUcsaUJBQWUsTUFBTSxFQUFJLENBQUM7UUFxQnRELElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNsQyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNsQyxJQUFJLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUM7UUFDNUMsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNsQyxJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDcEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLFlBQVksQ0FDakMsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFLFNBQVMsRUFBRSx3QkFBd0IsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUV4RyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQyxTQUFTOzs7UUFBQztZQUMvRCxLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUN2QixDQUFDLEVBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxpQkFBaUIsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLFNBQVM7OztRQUFDO1lBQ2xELElBQUksS0FBSSxDQUFDLFVBQVUsSUFBSSxLQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNwQyxLQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztnQkFDdEIsZ0JBQWdCLENBQ1osS0FBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsS0FBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLEtBQUksQ0FBQyxTQUFTLEVBQ3RGLEtBQUksQ0FBQyxTQUFTLEtBQUssTUFBTSxFQUFFLFlBQVksQ0FBQyxDQUFDO2FBQzlDO1FBQ0gsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7OztJQXJDTyxnQ0FBVzs7OztJQUFuQjtRQUNFLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUN2QixPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQzFDLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUErQkQ7Ozs7O09BS0c7Ozs7Ozs7OztJQUNILHlCQUFJOzs7Ozs7OztJQUFKLFVBQUssT0FBYTtRQUFsQixpQkFpQ0M7UUFoQ0MsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUU7WUFDM0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3BFLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ25ELElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDM0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDMUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztZQUV2RCxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxrQkFBa0IsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUUxRyxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssTUFBTSxFQUFFO2dCQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQ2xHO1lBRUQsdUZBQXVGO1lBQ3ZGLHdFQUF3RTtZQUN4RSw2RUFBNkU7WUFDN0UsSUFBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUVsRCxxRkFBcUY7WUFDckYsaUZBQWlGO1lBQ2pGLDRFQUE0RTtZQUM1RSxtRkFBbUY7WUFDbkYsMkNBQTJDO1lBQzNDLElBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7WUFFakQsWUFBWSxDQUNSLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUzs7O1lBQUUsY0FBTSxPQUFBLEtBQUksQ0FBQyxLQUFLLEVBQUUsRUFBWixDQUFZLEdBQUUsSUFBSSxDQUFDLE1BQU0sRUFDN0UsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFbEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7U0FDdEI7SUFDSCxDQUFDO0lBRUQ7Ozs7T0FJRzs7Ozs7OztJQUNILDBCQUFLOzs7Ozs7SUFBTDtRQUNFLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1lBQ25GLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3JDO0lBQ0gsQ0FBQztJQUVEOzs7O09BSUc7Ozs7Ozs7SUFDSCwyQkFBTTs7Ozs7O0lBQU47UUFDRSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2Q7YUFBTTtZQUNMLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNiO0lBQ0gsQ0FBQztJQUVEOztPQUVHOzs7OztJQUNILDJCQUFNOzs7O0lBQU4sY0FBb0IsT0FBTyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Ozs7SUFFckQsNkJBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLHNCQUFzQixHQUFHLGdCQUFnQixDQUMxQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQzNHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNoRSxDQUFDOzs7OztJQUVELGdDQUFXOzs7O0lBQVgsVUFBWSxPQUFzQjtRQUNoQyxpRkFBaUY7UUFDakYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUU7WUFDekcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2Q7SUFDSCxDQUFDOzs7O0lBRUQsZ0NBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2IscUZBQXFGO1FBQ3JGLDBGQUEwRjtRQUMxRixJQUFJLElBQUksQ0FBQyxzQkFBc0IsRUFBRTtZQUMvQixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztTQUMvQjtRQUNELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDekMsQ0FBQzs7Z0JBL09GLFNBQVMsU0FBQyxFQUFDLFFBQVEsRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBQzs7OztnQkFoRDNELFVBQVU7Z0JBRlYsU0FBUztnQkFEVCxRQUFRO2dCQU1SLHdCQUF3QjtnQkFEeEIsZ0JBQWdCO2dCQWVWLGdCQUFnQjtnQkFidEIsTUFBTTtnREFpS3dCLE1BQU0sU0FBQyxRQUFRO2dCQTlKN0MsaUJBQWlCO2dCQUNqQixjQUFjOzs7NEJBcURiLEtBQUs7NkJBT0wsS0FBSzsrQkFPTCxLQUFLOzRCQWVMLEtBQUs7MkJBUUwsS0FBSzs0QkFPTCxLQUFLO2lDQU9MLEtBQUs7K0JBT0wsS0FBSzs0QkFPTCxLQUFLOzZCQU9MLEtBQUs7d0JBS0wsTUFBTTt5QkFLTixNQUFNOztJQWlKVCxpQkFBQztDQUFBLEFBaFBELElBZ1BDO1NBL09ZLFVBQVU7Ozs7Ozs7Ozs7Ozs7O0lBWXJCLCtCQUFtRDs7Ozs7OztJQU9uRCxnQ0FBK0M7Ozs7Ozs7SUFPL0Msa0NBQWlEOzs7Ozs7Ozs7Ozs7Ozs7SUFlakQsK0JBQW1DOzs7Ozs7OztJQVFuQyw4QkFBMEI7Ozs7Ozs7SUFPMUIsK0JBQTJCOzs7Ozs7O0lBTzNCLG9DQUFpQzs7Ozs7OztJQU9qQyxrQ0FBOEI7Ozs7Ozs7SUFPOUIsK0JBQTJCOzs7Ozs7O0lBTzNCLGdDQUE0Qjs7Ozs7SUFLNUIsMkJBQTJDOzs7OztJQUszQyw0QkFBNEM7Ozs7O0lBRTVDLDhCQUF5Qjs7Ozs7SUFDekIseUNBQXdEOzs7OztJQUN4RCxtQ0FBc0Q7Ozs7O0lBQ3RELGdDQUFtRDs7Ozs7SUFDbkQsNENBQStCOzs7OztJQUMvQix1Q0FBK0I7Ozs7O0lBQy9CLHlDQUFpQzs7Ozs7SUFZN0IsaUNBQTRDOzs7OztJQUFFLCtCQUE0Qjs7Ozs7SUFFMUUsNkJBQXVCOzs7OztJQUFFLCtCQUF3Qzs7Ozs7SUFBRSxxQ0FBMEM7Ozs7O0lBQzdHLHFDQUF1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRGlyZWN0aXZlLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBPbkluaXQsXG4gIE9uRGVzdHJveSxcbiAgT25DaGFuZ2VzLFxuICBJbmplY3QsXG4gIEluamVjdG9yLFxuICBSZW5kZXJlcjIsXG4gIENvbXBvbmVudFJlZixcbiAgRWxlbWVudFJlZixcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgTmdab25lLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIEFwcGxpY2F0aW9uUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHtsaXN0ZW5Ub1RyaWdnZXJzfSBmcm9tICcuLi91dGlsL3RyaWdnZXJzJztcbmltcG9ydCB7bmdiQXV0b0Nsb3NlfSBmcm9tICcuLi91dGlsL2F1dG9jbG9zZSc7XG5pbXBvcnQge3Bvc2l0aW9uRWxlbWVudHMsIFBsYWNlbWVudEFycmF5fSBmcm9tICcuLi91dGlsL3Bvc2l0aW9uaW5nJztcbmltcG9ydCB7UG9wdXBTZXJ2aWNlfSBmcm9tICcuLi91dGlsL3BvcHVwJztcblxuaW1wb3J0IHtOZ2JQb3BvdmVyQ29uZmlnfSBmcm9tICcuL3BvcG92ZXItY29uZmlnJztcbmltcG9ydCB7ZnJvbUV2ZW50fSBmcm9tICdyeGpzJztcblxubGV0IG5leHRJZCA9IDA7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nYi1wb3BvdmVyLXdpbmRvdycsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBob3N0OiB7J1tjbGFzc10nOiAnXCJwb3BvdmVyXCIgKyAocG9wb3ZlckNsYXNzID8gXCIgXCIgKyBwb3BvdmVyQ2xhc3MgOiBcIlwiKScsICdyb2xlJzogJ3Rvb2x0aXAnLCAnW2lkXSc6ICdpZCd9LFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJhcnJvd1wiPjwvZGl2PlxuICAgIDxoMyBjbGFzcz1cInBvcG92ZXItaGVhZGVyXCIgKm5nSWY9XCJ0aXRsZSAhPSBudWxsXCI+XG4gICAgICA8bmctdGVtcGxhdGUgI3NpbXBsZVRpdGxlPnt7dGl0bGV9fTwvbmctdGVtcGxhdGU+XG4gICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiaXNUaXRsZVRlbXBsYXRlKCkgPyB0aXRsZSA6IHNpbXBsZVRpdGxlXCIgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cImNvbnRleHRcIj48L25nLXRlbXBsYXRlPlxuICAgIDwvaDM+XG4gICAgPGRpdiBjbGFzcz1cInBvcG92ZXItYm9keVwiPjxuZy1jb250ZW50PjwvbmctY29udGVudD48L2Rpdj5gLFxuICBzdHlsZVVybHM6IFsnLi9wb3BvdmVyLnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBOZ2JQb3BvdmVyV2luZG93IHtcbiAgQElucHV0KCkgdGl0bGU6IHVuZGVmaW5lZCB8IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT47XG4gIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHBvcG92ZXJDbGFzczogc3RyaW5nO1xuICBASW5wdXQoKSBjb250ZXh0OiBhbnk7XG5cbiAgaXNUaXRsZVRlbXBsYXRlKCkgeyByZXR1cm4gdGhpcy50aXRsZSBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmOyB9XG59XG5cbi8qKlxuICogQSBsaWdodHdlaWdodCBhbmQgZXh0ZW5zaWJsZSBkaXJlY3RpdmUgZm9yIGZhbmN5IHBvcG92ZXIgY3JlYXRpb24uXG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW25nYlBvcG92ZXJdJywgZXhwb3J0QXM6ICduZ2JQb3BvdmVyJ30pXG5leHBvcnQgY2xhc3MgTmdiUG9wb3ZlciBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xuICAvKipcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHBvcG92ZXIgc2hvdWxkIGJlIGNsb3NlZCBvbiBgRXNjYXBlYCBrZXkgYW5kIGluc2lkZS9vdXRzaWRlIGNsaWNrczpcbiAgICpcbiAgICogKiBgdHJ1ZWAgLSBjbG9zZXMgb24gYm90aCBvdXRzaWRlIGFuZCBpbnNpZGUgY2xpY2tzIGFzIHdlbGwgYXMgYEVzY2FwZWAgcHJlc3Nlc1xuICAgKiAqIGBmYWxzZWAgLSBkaXNhYmxlcyB0aGUgYXV0b0Nsb3NlIGZlYXR1cmUgKE5COiB0cmlnZ2VycyBzdGlsbCBhcHBseSlcbiAgICogKiBgXCJpbnNpZGVcImAgLSBjbG9zZXMgb24gaW5zaWRlIGNsaWNrcyBhcyB3ZWxsIGFzIEVzY2FwZSBwcmVzc2VzXG4gICAqICogYFwib3V0c2lkZVwiYCAtIGNsb3NlcyBvbiBvdXRzaWRlIGNsaWNrcyAoc29tZXRpbWVzIGFsc28gYWNoaWV2YWJsZSB0aHJvdWdoIHRyaWdnZXJzKVxuICAgKiBhcyB3ZWxsIGFzIGBFc2NhcGVgIHByZXNzZXNcbiAgICpcbiAgICogQHNpbmNlIDMuMC4wXG4gICAqL1xuICBASW5wdXQoKSBhdXRvQ2xvc2U6IGJvb2xlYW4gfCAnaW5zaWRlJyB8ICdvdXRzaWRlJztcblxuICAvKipcbiAgICogVGhlIHN0cmluZyBjb250ZW50IG9yIGEgYFRlbXBsYXRlUmVmYCBmb3IgdGhlIGNvbnRlbnQgdG8gYmUgZGlzcGxheWVkIGluIHRoZSBwb3BvdmVyLlxuICAgKlxuICAgKiBJZiB0aGUgdGl0bGUgYW5kIHRoZSBjb250ZW50IGFyZSBlbXB0eSwgdGhlIHBvcG92ZXIgd29uJ3Qgb3Blbi5cbiAgICovXG4gIEBJbnB1dCgpIG5nYlBvcG92ZXI6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLyoqXG4gICAqIFRoZSB0aXRsZSBvZiB0aGUgcG9wb3Zlci5cbiAgICpcbiAgICogSWYgdGhlIHRpdGxlIGFuZCB0aGUgY29udGVudCBhcmUgZW1wdHksIHRoZSBwb3BvdmVyIHdvbid0IG9wZW4uXG4gICAqL1xuICBASW5wdXQoKSBwb3BvdmVyVGl0bGU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLyoqXG4gICAqIFRoZSBwcmVmZXJyZWQgcGxhY2VtZW50IG9mIHRoZSBwb3BvdmVyLlxuICAgKlxuICAgKiBQb3NzaWJsZSB2YWx1ZXMgYXJlIGBcInRvcFwiYCwgYFwidG9wLWxlZnRcImAsIGBcInRvcC1yaWdodFwiYCwgYFwiYm90dG9tXCJgLCBgXCJib3R0b20tbGVmdFwiYCxcbiAgICogYFwiYm90dG9tLXJpZ2h0XCJgLCBgXCJsZWZ0XCJgLCBgXCJsZWZ0LXRvcFwiYCwgYFwibGVmdC1ib3R0b21cImAsIGBcInJpZ2h0XCJgLCBgXCJyaWdodC10b3BcImAsXG4gICAqIGBcInJpZ2h0LWJvdHRvbVwiYFxuICAgKlxuICAgKiBBY2NlcHRzIGFuIGFycmF5IG9mIHN0cmluZ3Mgb3IgYSBzdHJpbmcgd2l0aCBzcGFjZSBzZXBhcmF0ZWQgcG9zc2libGUgdmFsdWVzLlxuICAgKlxuICAgKiBUaGUgZGVmYXVsdCBvcmRlciBvZiBwcmVmZXJlbmNlIGlzIGBcImF1dG9cImAgKHNhbWUgYXMgdGhlIHNlcXVlbmNlIGFib3ZlKS5cbiAgICpcbiAgICogUGxlYXNlIHNlZSB0aGUgW3Bvc2l0aW9uaW5nIG92ZXJ2aWV3XSgjL3Bvc2l0aW9uaW5nKSBmb3IgbW9yZSBkZXRhaWxzLlxuICAgKi9cbiAgQElucHV0KCkgcGxhY2VtZW50OiBQbGFjZW1lbnRBcnJheTtcblxuICAvKipcbiAgICogU3BlY2lmaWVzIGV2ZW50cyB0aGF0IHNob3VsZCB0cmlnZ2VyIHRoZSB0b29sdGlwLlxuICAgKlxuICAgKiBTdXBwb3J0cyBhIHNwYWNlIHNlcGFyYXRlZCBsaXN0IG9mIGV2ZW50IG5hbWVzLlxuICAgKiBGb3IgbW9yZSBkZXRhaWxzIHNlZSB0aGUgW3RyaWdnZXJzIGRlbW9dKCMvY29tcG9uZW50cy9wb3BvdmVyL2V4YW1wbGVzI3RyaWdnZXJzKS5cbiAgICovXG4gIEBJbnB1dCgpIHRyaWdnZXJzOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEEgc2VsZWN0b3Igc3BlY2lmeWluZyB0aGUgZWxlbWVudCB0aGUgcG9wb3ZlciBzaG91bGQgYmUgYXBwZW5kZWQgdG8uXG4gICAqXG4gICAqIEN1cnJlbnRseSBvbmx5IHN1cHBvcnRzIGBib2R5YC5cbiAgICovXG4gIEBJbnB1dCgpIGNvbnRhaW5lcjogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBJZiBgdHJ1ZWAsIHBvcG92ZXIgaXMgZGlzYWJsZWQgYW5kIHdvbid0IGJlIGRpc3BsYXllZC5cbiAgICpcbiAgICogQHNpbmNlIDEuMS4wXG4gICAqL1xuICBASW5wdXQoKSBkaXNhYmxlUG9wb3ZlcjogYm9vbGVhbjtcblxuICAvKipcbiAgICogQW4gb3B0aW9uYWwgY2xhc3MgYXBwbGllZCB0byB0aGUgcG9wb3ZlciB3aW5kb3cgZWxlbWVudC5cbiAgICpcbiAgICogQHNpbmNlIDIuMi4wXG4gICAqL1xuICBASW5wdXQoKSBwb3BvdmVyQ2xhc3M6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIG9wZW5pbmcgZGVsYXkgaW4gbXMuIFdvcmtzIG9ubHkgZm9yIFwibm9uLW1hbnVhbFwiIG9wZW5pbmcgdHJpZ2dlcnMgZGVmaW5lZCBieSB0aGUgYHRyaWdnZXJzYCBpbnB1dC5cbiAgICpcbiAgICogQHNpbmNlIDQuMS4wXG4gICAqL1xuICBASW5wdXQoKSBvcGVuRGVsYXk6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIGNsb3NpbmcgZGVsYXkgaW4gbXMuIFdvcmtzIG9ubHkgZm9yIFwibm9uLW1hbnVhbFwiIG9wZW5pbmcgdHJpZ2dlcnMgZGVmaW5lZCBieSB0aGUgYHRyaWdnZXJzYCBpbnB1dC5cbiAgICpcbiAgICogQHNpbmNlIDQuMS4wXG4gICAqL1xuICBASW5wdXQoKSBjbG9zZURlbGF5OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEFuIGV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgcG9wb3ZlciBpcyBzaG93bi4gQ29udGFpbnMgbm8gcGF5bG9hZC5cbiAgICovXG4gIEBPdXRwdXQoKSBzaG93biA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAvKipcbiAgICogQW4gZXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBwb3BvdmVyIGlzIGhpZGRlbi4gQ29udGFpbnMgbm8gcGF5bG9hZC5cbiAgICovXG4gIEBPdXRwdXQoKSBoaWRkZW4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgcHJpdmF0ZSBfdXBkYXRlZCA9IGZhbHNlO1xuICBwcml2YXRlIF9uZ2JQb3BvdmVyV2luZG93SWQgPSBgbmdiLXBvcG92ZXItJHtuZXh0SWQrK31gO1xuICBwcml2YXRlIF9wb3B1cFNlcnZpY2U6IFBvcHVwU2VydmljZTxOZ2JQb3BvdmVyV2luZG93PjtcbiAgcHJpdmF0ZSBfd2luZG93UmVmOiBDb21wb25lbnRSZWY8TmdiUG9wb3ZlcldpbmRvdz47XG4gIHByaXZhdGUgX3VucmVnaXN0ZXJMaXN0ZW5lcnNGbjtcbiAgcHJpdmF0ZSBfem9uZVN1YnNjcmlwdGlvbjogYW55O1xuICBwcml2YXRlIF9yZXNpemVTdWJzY3JpcHRpb246IGFueTtcbiAgcHJpdmF0ZSBfaXNEaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlUG9wb3Zlcikge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmICghdGhpcy5uZ2JQb3BvdmVyICYmICF0aGlzLnBvcG92ZXJUaXRsZSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsIGluamVjdG9yOiBJbmplY3RvcixcbiAgICAgIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLCBjb25maWc6IE5nYlBvcG92ZXJDb25maWcsXG4gICAgICBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSwgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueSwgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgcHJpdmF0ZSBfYXBwbGljYXRpb25SZWY6IEFwcGxpY2F0aW9uUmVmKSB7XG4gICAgdGhpcy5hdXRvQ2xvc2UgPSBjb25maWcuYXV0b0Nsb3NlO1xuICAgIHRoaXMucGxhY2VtZW50ID0gY29uZmlnLnBsYWNlbWVudDtcbiAgICB0aGlzLnRyaWdnZXJzID0gY29uZmlnLnRyaWdnZXJzO1xuICAgIHRoaXMuY29udGFpbmVyID0gY29uZmlnLmNvbnRhaW5lcjtcbiAgICB0aGlzLmRpc2FibGVQb3BvdmVyID0gY29uZmlnLmRpc2FibGVQb3BvdmVyO1xuICAgIHRoaXMucG9wb3ZlckNsYXNzID0gY29uZmlnLnBvcG92ZXJDbGFzcztcbiAgICB0aGlzLm9wZW5EZWxheSA9IGNvbmZpZy5vcGVuRGVsYXk7XG4gICAgdGhpcy5jbG9zZURlbGF5ID0gY29uZmlnLmNsb3NlRGVsYXk7XG4gICAgdGhpcy5fcG9wdXBTZXJ2aWNlID0gbmV3IFBvcHVwU2VydmljZTxOZ2JQb3BvdmVyV2luZG93PihcbiAgICAgICAgTmdiUG9wb3ZlcldpbmRvdywgaW5qZWN0b3IsIHZpZXdDb250YWluZXJSZWYsIF9yZW5kZXJlciwgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBfYXBwbGljYXRpb25SZWYpO1xuXG4gICAgdGhpcy5fcmVzaXplU3Vic2NyaXB0aW9uID0gZnJvbUV2ZW50KHdpbmRvdywgJ3Jlc2l6ZScpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLl91cGRhdGVkID0gdHJ1ZTtcbiAgICB9KTtcbiAgICB0aGlzLl96b25lU3Vic2NyaXB0aW9uID0gX25nWm9uZS5vblN0YWJsZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuX3dpbmRvd1JlZiAmJiB0aGlzLl91cGRhdGVkKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZWQgPSBmYWxzZTtcbiAgICAgICAgcG9zaXRpb25FbGVtZW50cyhcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5fd2luZG93UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQsIHRoaXMucGxhY2VtZW50LFxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIgPT09ICdib2R5JywgJ2JzLXBvcG92ZXInKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyB0aGUgcG9wb3Zlci5cbiAgICpcbiAgICogVGhpcyBpcyBjb25zaWRlcmVkIHRvIGJlIGEgXCJtYW51YWxcIiB0cmlnZ2VyaW5nLlxuICAgKiBUaGUgYGNvbnRleHRgIGlzIGFuIG9wdGlvbmFsIHZhbHVlIHRvIGJlIGluamVjdGVkIGludG8gdGhlIHBvcG92ZXIgdGVtcGxhdGUgd2hlbiBpdCBpcyBjcmVhdGVkLlxuICAgKi9cbiAgb3Blbihjb250ZXh0PzogYW55KSB7XG4gICAgaWYgKCF0aGlzLl93aW5kb3dSZWYgJiYgIXRoaXMuX2lzRGlzYWJsZWQoKSkge1xuICAgICAgdGhpcy5fd2luZG93UmVmID0gdGhpcy5fcG9wdXBTZXJ2aWNlLm9wZW4odGhpcy5uZ2JQb3BvdmVyLCBjb250ZXh0KTtcbiAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS50aXRsZSA9IHRoaXMucG9wb3ZlclRpdGxlO1xuICAgICAgdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLnBvcG92ZXJDbGFzcyA9IHRoaXMucG9wb3ZlckNsYXNzO1xuICAgICAgdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLmlkID0gdGhpcy5fbmdiUG9wb3ZlcldpbmRvd0lkO1xuXG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnYXJpYS1kZXNjcmliZWRieScsIHRoaXMuX25nYlBvcG92ZXJXaW5kb3dJZCk7XG5cbiAgICAgIGlmICh0aGlzLmNvbnRhaW5lciA9PT0gJ2JvZHknKSB7XG4gICAgICAgIHRoaXMuX2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5jb250YWluZXIpLmFwcGVuZENoaWxkKHRoaXMuX3dpbmRvd1JlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50KTtcbiAgICAgIH1cblxuICAgICAgLy8gV2UgbmVlZCB0byBkZXRlY3QgY2hhbmdlcywgYmVjYXVzZSB3ZSBkb24ndCBrbm93IHdoZXJlIC5vcGVuKCkgbWlnaHQgYmUgY2FsbGVkIGZyb20uXG4gICAgICAvLyBFeC4gb3BlbmluZyBwb3BvdmVyIGZyb20gb25lIG9mIGxpZmVjeWNsZSBob29rcyB0aGF0IHJ1biBhZnRlciB0aGUgQ0RcbiAgICAgIC8vIChzYXkgZnJvbSBuZ0FmdGVyVmlld0luaXQpIHdpbGwgcmVzdWx0IGluICdFeHByZXNzaW9uSGFzQ2hhbmdlZCcgZXhjZXB0aW9uXG4gICAgICB0aGlzLl93aW5kb3dSZWYuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuXG4gICAgICAvLyBXZSBuZWVkIHRvIG1hcmsgZm9yIGNoZWNrLCBiZWNhdXNlIHBvcG92ZXIgd29uJ3Qgd29yayBpbnNpZGUgdGhlIE9uUHVzaCBjb21wb25lbnQuXG4gICAgICAvLyBFeC4gd2hlbiB3ZSB1c2UgZXhwcmVzc2lvbiBsaWtlIGB7eyBwb3BvdmVyLmlzT3BlbigpIDogJ29wZW5lZCcgOiAnY2xvc2VkJyB9fWBcbiAgICAgIC8vIGluc2lkZSB0aGUgdGVtcGxhdGUgb2YgYW4gT25QdXNoIGNvbXBvbmVudCBhbmQgd2UgY2hhbmdlIHRoZSBwb3BvdmVyIGZyb21cbiAgICAgIC8vIG9wZW4gLT4gY2xvc2VkLCB0aGUgZXhwcmVzc2lvbiBpbiBxdWVzdGlvbiB3b24ndCBiZSB1cGRhdGVkIHVubGVzcyB3ZSBleHBsaWNpdGx5XG4gICAgICAvLyBtYXJrIHRoZSBwYXJlbnQgY29tcG9uZW50IHRvIGJlIGNoZWNrZWQuXG4gICAgICB0aGlzLl93aW5kb3dSZWYuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG5cbiAgICAgIG5nYkF1dG9DbG9zZShcbiAgICAgICAgICB0aGlzLl9uZ1pvbmUsIHRoaXMuX2RvY3VtZW50LCB0aGlzLmF1dG9DbG9zZSwgKCkgPT4gdGhpcy5jbG9zZSgpLCB0aGlzLmhpZGRlbixcbiAgICAgICAgICBbdGhpcy5fd2luZG93UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnRdKTtcbiAgICAgIHRoaXMuc2hvd24uZW1pdCgpO1xuXG4gICAgICB0aGlzLl91cGRhdGVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VzIHRoZSBwb3BvdmVyLlxuICAgKlxuICAgKiBUaGlzIGlzIGNvbnNpZGVyZWQgdG8gYmUgYSBcIm1hbnVhbFwiIHRyaWdnZXJpbmcgb2YgdGhlIHBvcG92ZXIuXG4gICAqL1xuICBjbG9zZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fd2luZG93UmVmKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVBdHRyaWJ1dGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnYXJpYS1kZXNjcmliZWRieScpO1xuICAgICAgdGhpcy5fcG9wdXBTZXJ2aWNlLmNsb3NlKCk7XG4gICAgICB0aGlzLl93aW5kb3dSZWYgPSBudWxsO1xuICAgICAgdGhpcy5oaWRkZW4uZW1pdCgpO1xuICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZXMgdGhlIHBvcG92ZXIuXG4gICAqXG4gICAqIFRoaXMgaXMgY29uc2lkZXJlZCB0byBiZSBhIFwibWFudWFsXCIgdHJpZ2dlcmluZyBvZiB0aGUgcG9wb3Zlci5cbiAgICovXG4gIHRvZ2dsZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fd2luZG93UmVmKSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3BlbigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGB0cnVlYCwgaWYgdGhlIHBvcG92ZXIgaXMgY3VycmVudGx5IHNob3duLlxuICAgKi9cbiAgaXNPcGVuKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fd2luZG93UmVmICE9IG51bGw7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl91bnJlZ2lzdGVyTGlzdGVuZXJzRm4gPSBsaXN0ZW5Ub1RyaWdnZXJzKFxuICAgICAgICB0aGlzLl9yZW5kZXJlciwgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLnRyaWdnZXJzLCB0aGlzLmlzT3Blbi5iaW5kKHRoaXMpLCB0aGlzLm9wZW4uYmluZCh0aGlzKSxcbiAgICAgICAgdGhpcy5jbG9zZS5iaW5kKHRoaXMpLCArdGhpcy5vcGVuRGVsYXksICt0aGlzLmNsb3NlRGVsYXkpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIC8vIGNsb3NlIHBvcG92ZXIgaWYgdGl0bGUgYW5kIGNvbnRlbnQgYmVjb21lIGVtcHR5LCBvciBkaXNhYmxlUG9wb3ZlciBzZXQgdG8gdHJ1ZVxuICAgIGlmICgoY2hhbmdlc1snbmdiUG9wb3ZlciddIHx8IGNoYW5nZXNbJ3BvcG92ZXJUaXRsZSddIHx8IGNoYW5nZXNbJ2Rpc2FibGVQb3BvdmVyJ10pICYmIHRoaXMuX2lzRGlzYWJsZWQoKSkge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgICAvLyBUaGlzIGNoZWNrIGlzIG5lZWRlZCBhcyBpdCBtaWdodCBoYXBwZW4gdGhhdCBuZ09uRGVzdHJveSBpcyBjYWxsZWQgYmVmb3JlIG5nT25Jbml0XG4gICAgLy8gdW5kZXIgY2VydGFpbiBjb25kaXRpb25zLCBzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9uZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2lzc3Vlcy8yMTk5XG4gICAgaWYgKHRoaXMuX3VucmVnaXN0ZXJMaXN0ZW5lcnNGbikge1xuICAgICAgdGhpcy5fdW5yZWdpc3Rlckxpc3RlbmVyc0ZuKCk7XG4gICAgfVxuICAgIHRoaXMuX3pvbmVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9yZXNpemVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19