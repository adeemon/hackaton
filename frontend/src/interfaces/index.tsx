export interface IUser extends IUserIdLess {
  id: number;
}

export interface IUserIdLess {
  userFirstName: string;
  userLastName: string;
  userRole: string;
  userEmail: string;
}

export interface IProjectIdLess {
  projectName: string;
  projectDesc: string;
  projectTimeCostPlan: number;
  projectTimeCostFact: number | null;
  projectStatus: string;
  productivity: number;
}

export interface IProjectCreate {
  userId: number;
  projectName: string;
  projectDesc: string;
  projectTimeCostPlan: number;
  projectPriority: number;
}

export interface IProject extends IProjectIdLess {
  id: number;
  taskList: ITask[];
}

export interface ITask {
  taskId: number;
  taskStatus: string;
  taskName: string;
  projectName: string;
  priority: number | null;
  taskExecutor: string;
  taskTimeCostPlan: number | null;
  taskTimeCostFact: number | null;
  taskCreator: string;
}

export interface ITaskCreate {
  taskName: string;
  taskDesc: string;
  priority: number;
  taskCreatorId: number;
  taskExecutorId: number;
  projectId: number;
  taskTimeCostPlan: number;
  taskDeadline: string;
}