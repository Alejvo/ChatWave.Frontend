import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { groupResponse } from 'src/app/core/models/groupResponse';
import { User } from 'src/app/core/models/users/user';
import { UserService } from 'src/app/core/services/user.service';
import { AddUserComponent } from '../../modals/add-user/add-user.component';
import { AddGroupComponent } from '../../modals/add-group/add-group.component';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent {
  @ViewChild(AddUserComponent) userModal!:AddUserComponent;
  @ViewChild(AddGroupComponent) groupModal!: AddGroupComponent;

  @Output() toggle = new EventEmitter<void>();
  @Input() appUser:User | null = null;
  isModalVisible1:boolean = false;
  isModalVisible2: boolean = false;
  isCreateGroupModalVisible:boolean = false;
  isAFriend:boolean =false;

  closeModal1(){
    this.userModal.loadContent()
    this.isModalVisible1 = !this.isModalVisible1;
  }
  closeModal2() {
    this.groupModal.loadGroups()
    this.isModalVisible2 = !this.isModalVisible2;
  }
  toggleCreateGroupModal(){
    this.isCreateGroupModalVisible = !this.isCreateGroupModalVisible;
  }
  onClick(){
    this.toggle.emit();
  }
}
