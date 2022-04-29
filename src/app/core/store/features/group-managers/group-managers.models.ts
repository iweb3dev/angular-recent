export interface GroupManagers {
  allowAccessToAllGroups: boolean;
  creditLimit: number;
  firstName: string;
  groups: Array<any>;
  id: number;
  lastName: string;
  roleName: string;
  subAccountUserID: number;
  webUserName: string;
}

interface Group {
  displayName: string;
  flaggedForDeletion: boolean;
  groupID: number;
  groupName: string;
  id: number;
  isDirty: boolean;
  isEditable: boolean;
  memberID: number;
  productID: number;
  roleID: number;
  subAccountUserID: number;
  userID: number;
  validationErrors: Array<any>;
  webUserName: string;
}
