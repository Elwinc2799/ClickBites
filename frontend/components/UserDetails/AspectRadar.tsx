import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Legend,
    Tooltip,
} from 'recharts';
import UseLoadingAnimation from '../utils/UseLoadingAnimation';

interface VectorScore {
    text: string;
    score: string;
    userScore?: string;
}

interface AspectRadarProps {
    vectorScores: VectorScore[];
    isBusiness: boolean;
}

const AspectRadar: React.FC<AspectRadarProps> = ({
    vectorScores,
    isBusiness,
}) => {
    const [vectorUserScores, setVectorUserScores] = useState<VectorScore[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            const res = await axios.get<{ userId: string }>(
                process.env.API_URL + '/api/getUserId',
                {
                    headers: {
                        Authorization: `Bearer ${getCookie('token')}`,
                    },
                    withCredentials: true,
                }
            );
            return res.data.userId;
        };

        const fetchUserData = async (userId: string) => {
            const res = await axios.get(
                process.env.API_URL + '/api/profile/' + userId,
                {
                    headers: {
                        Authorization: `Bearer ${getCookie('token')}`,
                    },
                    withCredentials: true,
                }
            );
            return res.data;
        };

        const fetchDataAndUserData = async () => {
            const userId = await fetchData();

            const userData = await fetchUserData(userId);

            const newVectorText = ['Food', 'Serv.', 'Pric.', 'Ambi.', 'Misc.'];

            // cast each userData.vector to a string
            let newVector = userData.vector.map(
                (value: number, index: number) => {
                    return {
                        text: newVectorText[index],
                        userScore: (value * 100).toFixed(2).toString(),
                    };
                }
            );

            setVectorUserScores(newVector);
            setIsLoading(false);
        };

        fetchDataAndUserData();
    }, []);

    const data = vectorScores.map((v: VectorScore, i: number) => ({
        name: v.text,
        businessScore: parseInt(v.score, 10),
        userScore: parseInt(vectorUserScores[i]?.userScore || '0', 10),
    }));

    return (
        <>
            {isLoading ? (
                <UseLoadingAnimation isLoading={isLoading} />
            ) : (
                <RadarChart
                    className="text-lg font-medium"
                    cx={500}
                    cy={350}
                    outerRadius={300}
                    width={1000}
                    height={700}
                    data={data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis domain={[0, 100]} />
                    <Radar
                            name="User Score"
                            dataKey="userScore"
                            stroke="#fb923c"
                            fill="#fb923c"
                            fillOpacity={0.6}
                        />
                    {isBusiness && (
                        <Radar
                        name="Business Score"
                        dataKey="businessScore"
                        stroke="#3482F6"
                        fill="#3482F6"
                        fillOpacity={0.6}
                    />
                    )}
                    <Tooltip />
                    <Legend />
                </RadarChart>
            )}
        </>
    );
};

export default AspectRadar;
