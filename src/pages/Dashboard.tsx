import ProjectSummary from "../components/ProjectSummary.tsx";
import TeamInfo from "../components/TeamInfo.tsx";
import {useEffect, useState} from "react";
import {Card, Row, Col, Typography, Spin} from "antd";
import {getDashboardData} from "../api/projectApi.ts";
import {useParams} from "react-router-dom";
import TaskInfo from "../components/TaskInfo.tsx";

const Dashboard = () => {
    const {projectId} = useParams<{ projectId: string }>();
    const [dashboardData, setDashboardData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Realizar la solicitud para obtener los datos del dashboard
        getDashboardData(projectId)
            .then((response) => {
                setDashboardData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching dashboard data:', error);
                setLoading(false);
            });
    }, [projectId]); // Re-hacer la solicitud cuando cambie el projectId

    if (loading) {
        return <Spin size="large"/>;
    }

    if (!dashboardData) {
        return <div>No data available</div>;
    }

    // Desestructurar los datos recibidos
    const {project, members, leader, tasks} = dashboardData;

    return (
        <div style={{padding: '20px'}}>
            {/* Card superior con título */}
            <Card>
                <Typography.Title
                    level={1}
                    style={{margin: 0, textAlign: 'center'}}
                >
                    Dashboard de Proyecto
                </Typography.Title>
            </Card>

            {/* PRIMERA FILA: Contiene "ProjectSummary" y "TeamInfo" en dos columnas */}
            <Row
                gutter={16} // Espaciado entre columnas
                justify="center"
                align="top"
                style={{marginTop: '20px'}} // Separación del título
            >
                {/* Columna: Resumen del Proyecto */}
                <Col
                    xs={24}
                    md={12}
                    lg={12}
                    style={{
                        flex: 1,
                        padding: '10px',
                    }}
                >
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <ProjectSummary project={project}/>
                    </div>
                </Col>

                {/* Columna: Información del Equipo */}
                <Col
                    xs={24}
                    md={12}
                    lg={12}
                    style={{
                        flex: 1,
                        padding: '10px',
                    }}
                >
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <TeamInfo team={project.team} leader={leader}
                                  members={members}/>
                    </div>
                </Col>
            </Row>

            {/* SEGUNDA FILA: Contiene el Árbol de Tareas */}
            <Row
                justify="center"
                align="top"
                style={{marginTop: '20px'}} // Separación de la fila de arriba
            >
                <Col
                    xs={24}
                    style={{
                        flex: 1,
                        padding: '10px',
                    }}
                >
                    <Card
                        size="small"
                        title="Tareas del Proyecto"
                        style={{
                            width: '100%',
                            borderRadius: '8px',
                            textAlign: 'center',
                        }}
                    >
                        {/* Renderizamos el árbol de tareas */}
                        <TaskInfo tasks={tasks}/>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;

//<TasksInfo tasks={tasks}/>