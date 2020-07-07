import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { AccessRightService } from '../services/access-right.service';

@Directive({
    selector: '[access]',
    providers: [AccessRightService]
})
export class AccessRigtsDirective {
    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private accessRightService: AccessRightService) {}


    @Input('access') set access(roles: string[]) {
        let userRoles = this.accessRightService.getUserRights();
        let isRight = userRoles.map(userRole=>roles.includes(userRole)).filter(el => el === true)[0];

        if(isRight){
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
        else{
            this.viewContainer.clear();
        }        
    }
}