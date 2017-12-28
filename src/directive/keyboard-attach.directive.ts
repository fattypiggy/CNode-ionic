import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard';
import { Content, Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';

/**
 * @name KeyboardAttachDirective
 * @source https://gist.github.com/rdlabo/942671d8c9cffb02676756cdd56aa1c0
 * @forked https://gist.github.com/Manduro/bc121fd39f21558df2a952b39e907754
 * @description
 * The `keyboardAttach` directive will cause an element to float above the
 * keyboard when the keyboard shows. Currently only supports the `ion-footer` element.
 *
 * ### Notes
 * - This directive requires [Ionic Native](https://github.com/driftyco/ionic-native)
 * and the [Ionic Keyboard Plugin](https://github.com/driftyco/ionic-plugin-keyboard).
 * - Currently only tested to work on iOS.
 * - If there is an input in your footer, you will need to set
 *   `Keyboard.disableScroll(true)`.
 *
 * @usage
 *
 * ```html
 * <ion-content #content>
 * </ion-content>
 *
 * <ion-footer [keyboardAttach]="content">
 *   <ion-toolbar>
 *     <ion-item>
 *       <ion-input></ion-input>
 *     </ion-item>
 *   </ion-toolbar>
 * </ion-footer>
 * ```
 */

@Directive({
    selector: '[keyboardAttach]'
})
export class KeyboardAttachDirective implements OnInit, OnDestroy {
    @Input('keyboardAttach') content: Content;

    private onShowSubscription: Subscription;
    private onHideSubscription: Subscription;
    private onShowWindowSubscription: Subscription;

    constructor(
        private elementRef: ElementRef,
        private keyboard: Keyboard,
        private platform: Platform
    ) {}

    ngOnInit() {
        if (this.platform.is('cordova') && this.platform.is('ios')) {
            this.onShowSubscription = this.keyboard.onKeyboardShow().subscribe(e => this.onShow(e));
            this.onHideSubscription = this.keyboard.onKeyboardHide().subscribe(() => this.onHide());
        }
    }

    ngOnDestroy() {
        if (this.onShowSubscription) this.onShowSubscription.unsubscribe();
        if (this.onShowWindowSubscription) this.onShowWindowSubscription.unsubscribe();
        if (this.onHideSubscription) this.onHideSubscription.unsubscribe();
    }

    private onShow(e) {
        const keyboardHeight: number = e.keyboardHeight || (e.detail && e.detail.keyboardHeight);
        this.setElementPosition(keyboardHeight);
        this.keyboard.disableScroll(true);
    };

    private onHide() {
        this.setElementPosition(0);
        this.keyboard.disableScroll(false);
    };

    private setElementPosition(pixels: number) {
        this.elementRef.nativeElement.style.paddingBottom = pixels + 'px';
        this.content.resize();

        this.onShowWindowSubscription = Observable.timer(0, 1)
            .subscribe(
            ()=>{
                if(window.pageYOffset !== 0){
                    window.scrollTo(0, 0) ;
                    this.onShowWindowSubscription.unsubscribe();

                    setTimeout(()=>{
                        this.content.scrollToBottom(0);
                    },100)
                }
            }
        )
    }
}