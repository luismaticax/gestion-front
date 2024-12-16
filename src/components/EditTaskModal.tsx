import React from 'react';
import {Modal, Form, Input, DatePicker, Select} from 'antd';

const {Option} = Select;

type EditTaskModalProps = {
    visible: boolean;
    task: any | null; // La tarea seleccionada para editar
    onSave: (values: any) => void;
    onCancel: () => void;
};

const EditTaskModal: React.FC<EditTaskModalProps> = ({
                                                         visible,
                                                         task,
                                                         onSave,
                                                         onCancel
                                                     }) => {
    const [form] = Form.useForm();

    // Rellena los datos de la tarea si la hay
    React.useEffect(() => {
        if (task) {
            form.setFieldsValue({
                ...task,
                startDate: task.startDate ? task.startDate : null,
                dueDate: task.dueDate ? task.dueDate : null,
            });
        } else {
            form.resetFields();
        }
    }, [task, form]);

    const handleSave = () => {
        form.validateFields().then((values) => {
            onSave(values); // Ejecuta la acción de guardar
            form.resetFields();
        });
    };

    return (
        <Modal
            title={task ? `Modificar Tarea: ${task.title}` : 'Nueva Tarea'}
            visible={visible}
            onOk={handleSave}
            onCancel={onCancel}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Título"
                    name="title"
                    rules={[{
                        required: true,
                        message: 'El título es obligatorio'
                    }]}
                >
                    <Input placeholder="Título de la tarea"/>
                </Form.Item>
                <Form.Item
                    label="Descripción"
                    name="description"
                    rules={[{
                        required: true,
                        message: 'La descripción es obligatoria'
                    }]}
                >
                    <Input.TextArea placeholder="Descripción de la tarea"
                                    rows={4}/>
                </Form.Item>
                <Form.Item
                    label="Prioridad"
                    name="priority"
                    rules={[{
                        required: true,
                        message: 'Selecciona una prioridad'
                    }]}
                >
                    <Select placeholder="Selecciona la prioridad">
                        <Option value="high">Alta</Option>
                        <Option value="medium">Media</Option>
                        <Option value="low">Baja</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Fecha de Inicio"
                    name="startDate"
                    rules={[{
                        required: true,
                        message: 'Selecciona la fecha de inicio'
                    }]}
                >
                    <DatePicker style={{width: '100%'}}/>
                </Form.Item>
                <Form.Item
                    label="Fecha de Finalización"
                    name="dueDate"
                    rules={[{
                        required: true,
                        message: 'Selecciona la fecha de finalización'
                    }]}
                >
                    <DatePicker style={{width: '100%'}}/>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditTaskModal;