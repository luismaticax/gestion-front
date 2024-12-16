import React, {useState} from 'react';
import {Table, Typography, Tag, Progress, Button, Popconfirm} from 'antd';
import EditTaskModal from './EditTaskModal'; // Importa el componente del modal

const {Text} = Typography;

// Tipos de datos
type AssignedTo = {
    firstName: string;
    lastName: string;
};

type Task = {
    _id: string;
    title: string;
    description: string;
    priority: string;
    status: string;
    completionPercentage: number;
    weight: number;
    assignedTo: AssignedTo;
    startDate: string;
    dueDate: string;
    createdBy: string;
    createdOn: string;
    updatedOn: string;
    subtasks?: Task[]; // Subtareas recursivas
};

// Props del componente
type TasksTableProps = {
    tasks: Task[];
    onDeleteTask: (taskId: string) => void; // Función para eliminar tareas
    onSaveTask: (updatedTask: Task) => void; // Función para guardar una tarea editada
};

const TaskInfo: React.FC<TasksTableProps> = ({
                                                 tasks,
                                                 onDeleteTask,
                                                 onSaveTask
                                             }) => {
    // Estado para manejar el modal y la tarea seleccionada
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    // Abrir el modal con la tarea seleccionada
    const handleEdit = (task: Task) => {
        setSelectedTask(task); // Guardar la tarea seleccionada
        setIsModalVisible(true); // Mostrar el modal
    };

    // Cerrar el modal
    const handleCancel = () => {
        setSelectedTask(null); // Limpiar la tarea seleccionada
        setIsModalVisible(false); // Ocultar el modal
    };

    // Guardar la tarea editada
    const handleSave = (updatedTask: Partial<Task>) => {
        if (selectedTask) {
            const newTask = {...selectedTask, ...updatedTask};
            onSaveTask(newTask); // Llamar a la función para guardar la tarea
        }
        setIsModalVisible(false); // Ocultar el modal
    };

    // Columnas de la tabla
    const columns = [
        {
            title: 'Acciones',
            key: 'actions',
            width: 100,
            fixed: 'left', // Hacemos que esta columna esté fija al inicio
            render: (_: any, record: Task) => (
                <div>
                    <Button type="link" onClick={() => handleEdit(record)}>
                        Modif
                    </Button>
                    <Popconfirm
                        title="¿Eliminar esta tarea?"
                        onConfirm={() => onDeleteTask(record._id)} // Ejecuta la acción de borrar
                        okText="Sí"
                        cancelText="No"
                    >
                        <Button type="link" danger>
                            X
                        </Button>
                    </Popconfirm>
                </div>
            ),
        },
        {
            title: 'Título',
            dataIndex: 'title',
            key: 'title',
            width: 200,
            render: (text: string) => <Text strong>{text}</Text>,
        },
        {
            title: 'Descripción',
            dataIndex: 'description',
            key: 'description',
            width: 300,
            render: (text: string) => <Text>{text}</Text>,
        },
        {
            title: 'Prioridad',
            dataIndex: 'priority',
            key: 'priority',
            width: 120,
            render: (priority: string) => (
                <Tag
                    color={priority === 'high' ? 'red' : priority === 'medium' ? 'orange' : 'green'}
                >
                    {priority.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'Estado',
            dataIndex: 'status',
            key: 'status',
            width: 120,
            render: (status: string) => (
                <Tag color={status === 'completed' ? 'blue' : 'gold'}>
                    {status.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'Progreso',
            dataIndex: 'completionPercentage',
            key: 'completionPercentage',
            width: 150,
            render: (percentage: number) => (
                <Progress
                    percent={percentage}
                    size="small"
                    type="circle"
                    status={percentage === 100 ? 'success' : 'active'}
                    strokeColor={percentage < 50 ? '#f5222d' : percentage < 100 ? '#faad14' : '#52c41a'}
                />
            ),
        },
        {
            title: 'Fecha de Inicio',
            dataIndex: 'startDate',
            key: 'startDate',
            width: 150,
            render: (date: string) =>
                <Text>{new Date(date).toLocaleDateString()}</Text>,
        },
        {
            title: 'Fecha de Finalización',
            dataIndex: 'dueDate',
            key: 'dueDate',
            width: 150,
            render: (date: string) =>
                <Text>{new Date(date).toLocaleDateString()}</Text>,
        },
        {
            title: 'Asignado a',
            dataIndex: 'assignedTo',
            key: 'assignedTo',
            width: 200,
            render: (assignedTo: AssignedTo) => (
                <Text>{`${assignedTo.firstName} ${assignedTo.lastName}`}</Text>
            ),
        },
        {
            title: 'Peso',
            dataIndex: 'weight',
            key: 'weight',
            width: 100,
        },
    ];

    return (
        <>
            <Table<Task>
                columns={columns}
                dataSource={tasks}
                rowKey={(record) => record._id}
                scroll={{x: 'max-content'}} // Habilita desplazamiento horizontal hasta el final
                expandable={{
                    expandedRowRender: (record: Task) => {
                        // Renderiza subtareas como una tabla dentro de la fila expandida
                        if (!record.subtasks || record.subtasks.length === 0) {
                            return <Text>No hay subtareas</Text>;
                        }
                        return (
                            <Table
                                columns={columns}
                                dataSource={record.subtasks}
                                rowKey={(subtask) => subtask._id}
                                pagination={false} // Sin paginación para las subtareas
                            />
                        );
                    },
                }}
                pagination={false} // Sin paginación para toda la tabla
            />

            {/* Modal para editar la tarea */}
            <EditTaskModal
                visible={isModalVisible}
                task={selectedTask}
                onSave={handleSave}
                onCancel={handleCancel}
            />
        </>
    );
};

export default TaskInfo;