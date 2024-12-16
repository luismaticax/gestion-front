import React, {useEffect, useState} from 'react';
import {List, Spin, message, Progress, Card, Button, Typography} from 'antd';
import {useNavigate} from 'react-router-dom';
import {getAllProjects} from "../api/projectApi.ts";

const {Title, Text} = Typography;

// Define the type for a Project
interface Team {
    _id: string;
    name: string;
    leader: string;
    members: string[];
    createdAt: string;
}

interface Project {
    _id: string;
    name: string;
    description: string;
    team: Team;
    createdAt: string;
    completionPercentage: number;
}

const ProjectsList: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    const fetchProjects = async (): Promise<void> => {
        try {
            const response = await getAllProjects()
            setProjects(response.data); // Assuming the response is an array of projects
            setLoading(false);
        } catch (error) {
            setLoading(false);
            message.error('Failed to fetch projects. Please try again.');
            console.error('Error fetching projects:', error);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleNavigateToDashboard = (projectId: string) => {
        // Navegar a la ruta del Dashboard pasando el ID del proyecto
        navigate(`/dashboard/${projectId}`);
    };

    return (
        <div style={{padding: '20px'}}>
            <Title level={2}>Lista de Proyectos</Title>
            {loading ? (
                <div style={{textAlign: 'center', marginTop: '20px'}}>
                    <Spin size="large"/>
                </div>
            ) : (
                <List
                    grid={{
                        gutter: 16,
                        column: 1, // Cada proyecto ocupa una fila
                    }}
                    dataSource={projects}
                    renderItem={(project) => (
                        <List.Item>
                            <Card
                                title={
                                    <div>
                                        <Title level={2} style={{margin: 0}}>
                                            {project.name}
                                        </Title>
                                    </div>
                                }
                                extra={
                                    <Button
                                        type="primary"
                                        onClick={() => handleNavigateToDashboard(project._id)}
                                    >
                                        Ver Proyecto
                                    </Button>
                                }
                                style={{
                                    border: '4px solid #f0f0f0',
                                    borderRadius: '10px'
                                }}
                            >
                                {/* Lista de detalles del proyecto */}
                                <List size="small" split={false}
                                      style={{padding: '10px 10px'}}>
                                    <List.Item>
                                        <Text
                                            strong>Descripción:</Text> {project.description}
                                    </List.Item>
                                    <List.Item>
                                        <Text strong>Fecha de
                                            creación:</Text>{' '}
                                        {new Date(project.createdAt).toLocaleDateString()}
                                    </List.Item>
                                    <List.Item>
                                        <Text strong>Equipo:</Text>{' '}
                                        {project.team?.name || 'Sin equipo asignado'}
                                    </List.Item>
                                    <List.Item>
                                        <Text strong>Progreso:</Text>
                                        <Progress type={'dashboard'}
                                                  strokeColor={"#ff9f80"}
                                                  percent={project.completionPercentage}
                                                  status={
                                                      project.completionPercentage === 100
                                                          ? 'success'
                                                          : 'active'
                                                  }
                                                  strokeWidth={10}
                                                  showInfo={true}
                                        />
                                    </List.Item>
                                </List>
                            </Card>
                        </List.Item>
                    )}
                />
            )}
        </div>
    );
};


export default ProjectsList;