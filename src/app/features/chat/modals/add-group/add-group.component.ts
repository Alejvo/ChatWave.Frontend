import { Component, EventEmitter, Input, Output } from '@angular/core';
import { groupResponse } from 'src/app/core/models/groupResponse';
import { User } from 'src/app/core/models/users/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent {

  @Input() isVisible: boolean = false;
  @Output() closeModalEvent = new EventEmitter<void>();
  groups!: groupResponse[];
  @Input() appUser: User | null = null;

  constructor(private userService:UserService){}

  loadGroups(){
    this.userService.getGroups().subscribe({
      next: (data) => {
        let groupsId = this.appUser?.groups.map(group=>group.id) || []
        this.groups = data.filter(group=>!groupsId.includes(group.id))
      }
    })
  }
  joinGroup(groupId:string){
    let userId = this.appUser?.id;
    this.userService.addToGroup(groupId,userId!).subscribe({
      next:(res)=>{
        if(res.status === 204){
          window.location.reload();
        }
      }
    })
  }
  closeModal() {
    this.closeModalEvent.emit();
  }
}