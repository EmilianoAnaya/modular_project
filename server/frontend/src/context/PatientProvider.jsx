import { useState, useEffect } from 'react';
import { PatientContext } from './PatientContext';
import { getApiUrl } from '../config/api';
import API_CONFIG from '../config/api';

export const PatientProvider = ({ children }) => {
    const [patientData, setPatientData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPatientData = async () => {
            try {
                const patientId = sessionStorage.getItem('selectedPatientId');
                
                if (!patientId) {
                    setError('No patient selected');
                    setLoading(false);
                    return;
                }

                const response = await fetch(
                    getApiUrl(`${API_CONFIG.ENDPOINTS.PATIENTS}/${patientId}`)
                );
                
                if (!response.ok) {
                    throw new Error('Failed to fetch patient data');
                }

                const data = await response.json();
                setPatientData(data.patient);
                setError(null);
            } catch (err) {
                console.error('Error loading patient data:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadPatientData();
    }, []);

    const value = {
        patientData,
        loading,
        error,
        setPatientData
    };

    return (
        <PatientContext.Provider value={value}>
            {children}
        </PatientContext.Provider>
    );
};