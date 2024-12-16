import {Card, Typography} from "antd";

// Definir los tipos para las props
interface Member {
    firstName: string;
    lastName: string;
    email: string;
}

interface Team {
    name: string;
}

interface TeamInfoProps {
    team: Team;
    leader: Member[];
    members: Member[];
}


const TeamInfo = ({team, leader, members}: TeamInfoProps) => {

    return (
        <Card title={`Equipo: ${team.name}`} size="small">
            <Typography.Title level={3} style={{marginBottom: '10px'}}>
                Líder(es):
            </Typography.Title>
            {leader.map((lead, index) => (
                <Typography.Text
                    key={index}
                    style={{
                        display: 'block', // Cada líder en una nueva línea
                        marginBottom: '10px',
                    }}
                >
                    {lead.firstName} {lead.lastName}
                </Typography.Text>
            ))}

            <div style={{marginTop: '20px'}}>
                <Typography.Title level={5} style={{marginBottom: '10px'}}>Miembros
                    del
                    equipo:</Typography.Title>
                <ul style={{listStyle: 'none', padding: 0}}>
                    {members.map((member, index) => (
                        <li
                            key={index}
                            style={{
                                marginBottom: '15px',
                            }}
                        >
                            <Typography.Text
                                style={{
                                    textAlign: 'left',
                                    display: 'block', // Display block para aplicar textAlign
                                }}
                            >
                                <b>Nombre:</b> {member.firstName}
                            </Typography.Text>
                            <Typography.Text
                                style={{
                                    textAlign: 'left',
                                    display: 'block',
                                }}
                            >
                                <b>Apellido:</b> {member.lastName}
                            </Typography.Text>
                            <Typography.Text
                                style={{
                                    textAlign: 'left',
                                    display: 'block',
                                }}
                            >
                                <b>Email:</b> {member.email}
                            </Typography.Text>
                        </li>
                    ))}
                </ul>
            </div>
        </Card>
    );
};

export default TeamInfo;