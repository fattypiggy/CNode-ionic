import { NgModule } from '@angular/core';
import { SincePipe } from './../pipes/since/since';
@NgModule({
	declarations: [SincePipe],
	imports: [],
	exports: [SincePipe]
})
export class PipesModule {
	static forChild() {
		return {
			ngModule: PipesModule,
			providers: [],
		};
	 }
}
