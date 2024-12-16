export interface Task {
    _id: string;
    title: string;
    description: string;
    priority: string;
    status: string;
    completionPercentage: number;
    weight: number;
    assignedTo: {
        _id: string;
        firstName: string;
        lastName: string;
    };
    startDate: string;
    dueDate: string;
    subtasks: Task[]; // Subtask es el mismo tipo de Task
}