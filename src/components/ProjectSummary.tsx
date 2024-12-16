import {Card, Progress, Typography} from "antd";

// Definir el tipo para las props del componente
interface Project {
    name: string;
    description: string;
    createdAt: string;
    completionPercentage: number;
}

const {Title, Text} = Typography;

const ProjectSummary = ({project}: { project: Project }) => {
    const {name, description, createdAt, completionPercentage} = project;

    // Formatear la fecha de creación para mostrarla de manera legible
    const formattedDate = new Date(createdAt).toLocaleDateString();

    return (
        <Card title="Resumen"
              style={{marginBottom: 20, maxWidth: 350}}>
            <Title level={1}>{name}</Title>
            <Text>{description}</Text>
            <p><strong>Fecha creación:</strong> {formattedDate}</p>
            <Text> Progreso: </Text>
            <Progress type={'circle'}
                      strokeColor={"#ff9f80"}
                      percent={completionPercentage}
                      status={
                          project.completionPercentage === 100
                              ? 'success'
                              : 'active'
                      }
                      strokeWidth={10}
                      showInfo={true}
            />
        </Card>
    );
};

export default ProjectSummary;