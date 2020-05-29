import { EventEmitter, OnInit, OnDestroy, Injector, Renderer2, ElementRef, TemplateRef, ViewContainerRef, ComponentFactoryResolver, NgZone, ChangeDetectorRef, ApplicationRef, OnChanges, SimpleChanges } from '@angular/core';
import { PlacementArray } from '../util/positioning';
import { NgbTooltipConfig } from './tooltip-config';
export declare class NgbTooltipWindow {
    id: string;
    tooltipClass: string;
}
/**
 * A lightweight and extensible directive for fancy tooltip creation.
 */
export declare class NgbTooltip implements OnInit, OnDestroy, OnChanges {
    private _elementRef;
    private _renderer;
    private _ngZone;
    private _document;
    private _changeDetector;
    static ngAcceptInputType_autoClose: boolean | string;
    /**
     * Indicates whether the tooltip should be closed on `Escape` key and inside/outside clicks:
     *
     * * `true` - closes on both outside and inside clicks as well as `Escape` presses
     * * `false` - disables the autoClose feature (NB: triggers still apply)
     * * `"inside"` - closes on inside clicks as well as Escape presses
     * * `"outside"` - closes on outside clicks (sometimes also achievable through triggers)
     * as well as `Escape` presses
     *
     * @since 3.0.0
     */
    autoClose: boolean | 'inside' | 'outside';
    /**
     * The preferred placement of the tooltip.
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
     */
    placement: PlacementArray;
    /**
     * Specifies events that should trigger the tooltip.
     *
     * Supports a space separated list of event names.
     * For more details see the [triggers demo](#/components/tooltip/examples#triggers).
     */
    triggers: string;
    /**
     * A selector specifying the element the tooltip should be appended to.
     *
     * Currently only supports `"body"`.
     */
    container: string;
    /**
     * If `true`, tooltip is disabled and won't be displayed.
     *
     * @since 1.1.0
     */
    disableTooltip: boolean;
    /**
     * An optional class applied to the tooltip window element.
     *
     * @since 3.2.0
     */
    tooltipClass: string;
    /**
     * The opening delay in ms. Works only for "non-manual" opening triggers defined by the `triggers` input.
     *
     * @since 4.1.0
     */
    openDelay: number;
    /**
     * The closing delay in ms. Works only for "non-manual" opening triggers defined by the `triggers` input.
     *
     * @since 4.1.0
     */
    closeDelay: number;
    /**
     * An event emitted when the tooltip is shown. Contains no payload.
     */
    shown: EventEmitter<any>;
    /**
     * An event emitted when the popover is hidden. Contains no payload.
     */
    hidden: EventEmitter<any>;
    private _ngbTooltip;
    private _ngbTooltipWindowId;
    private _popupService;
    private _windowRef;
    private _unregisterListenersFn;
    private _zoneSubscription;
    constructor(_elementRef: ElementRef<HTMLElement>, _renderer: Renderer2, injector: Injector, componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef, config: NgbTooltipConfig, _ngZone: NgZone, _document: any, _changeDetector: ChangeDetectorRef, applicationRef: ApplicationRef);
    /**
     * The string content or a `TemplateRef` for the content to be displayed in the tooltip.
     *
     * If the content if falsy, the tooltip won't open.
     */
    set ngbTooltip(value: string | TemplateRef<any>);
    get ngbTooltip(): string | TemplateRef<any>;
    /**
     * Opens the tooltip.
     *
     * This is considered to be a "manual" triggering.
     * The `context` is an optional value to be injected into the tooltip template when it is created.
     */
    open(context?: any): void;
    /**
     * Closes the tooltip.
     *
     * This is considered to be a "manual" triggering of the tooltip.
     */
    close(): void;
    /**
     * Toggles the tooltip.
     *
     * This is considered to be a "manual" triggering of the tooltip.
     */
    toggle(): void;
    /**
     * Returns `true`, if the popover is currently shown.
     */
    isOpen(): boolean;
    ngOnInit(): void;
    ngOnChanges({ tooltipClass }: SimpleChanges): void;
    ngOnDestroy(): void;
}
