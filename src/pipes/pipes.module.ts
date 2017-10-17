import { NgModule } from '@angular/core';
import { SincePipe } from './../pipes/since/since';
import { LinkPipe } from './link/link';
@NgModule({
	declarations: [SincePipe,
    LinkPipe],
	imports: [],
	exports: [SincePipe,
    LinkPipe]
})
export class PipesModule {
	static forChild() {
		return {
			ngModule: PipesModule,
			providers: [],
		};
	 }
}
