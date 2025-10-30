import React, { useState, useEffect, useRef } from 'react';
import { usePatient } from '../../hooks/usePatient';
import { getApiUrl } from '../../config/api';
import API_CONFIG from '../../config/api';
import WindowContainer from '../Window_Container/WindowContainer';
import WindowConsultDefault from '../Patient_Consult/WindowConsultDefault';
import BasicInput from '../Basic_Input/BasicInput';
import Section from '../Section/Section';
import Heading from '../Heading/Heading';
import './SurgicalHistorySection.css';

function SurgicalHistorySection() {
    const { patientData } = usePatient();
    const [surgeries, setSurgeries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [currentSurgery, setCurrentSurgery] = useState({
        procedure: '',
        date: '',
        surgeon: '',
        notes: ''
    });

    const [sortOrder, setSortOrder] = useState('desc'); // 'asc' o 'desc'
    const [showSortMenu, setShowSortMenu] = useState(false);
    const sortMenuRef = useRef(null);

    useEffect(() => {
        if (patientData) loadSurgeries();
    }, [patientData]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sortMenuRef.current && !sortMenuRef.current.contains(event.target)) {
                setShowSortMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const loadSurgeries = async () => {
        try {
            const response = await fetch(
                getApiUrl(`${API_CONFIG.ENDPOINTS.MEDICAL_NOTES_BY_PATIENT}/${patientData.patient_id}/Surgical%20History`)
            );
            const data = await response.json();
            if (response.ok) setSurgeries(data.notes);
        } catch (error) {
            console.error('Error fetching surgeries:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleNew = () => {
        setCurrentSurgery({ procedure: '', date: '', surgeon: '', notes: '' });
        setSelectedIndex(null);
    };

    const handleSelectSurgery = (index) => {
        setSelectedIndex(index);
        const surgeryData = surgeries[index].note_data;
        setCurrentSurgery({
            procedure: surgeryData.procedure || '',
            date: surgeryData.date || '',
            surgeon: surgeryData.surgeon || '',
            notes: surgeryData.notes || ''
        });
    };

    const handleSaveContinue = async () => {
        if (!currentSurgery.procedure.trim()) {
            alert('Procedure name is required');
            return;
        }
        try {
            if (selectedIndex !== null) {
                const id = surgeries[selectedIndex].id;
                const response = await fetch(getApiUrl(`${API_CONFIG.ENDPOINTS.MEDICAL_NOTES}/${id}`), {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ note_data: currentSurgery })
                });
                if (response.ok) { await loadSurgeries(); handleNew(); }
            } else {
                const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.MEDICAL_NOTES), {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        patient_id: patientData.patient_id,
                        note_type: 'Surgical History',
                        note_data: currentSurgery
                    })
                });
                if (response.ok) { await loadSurgeries(); handleNew(); }
            }
        } catch (error) {
            console.error(error);
            alert('Error connecting to server');
        }
    };

    const handleSaveExit = async () => { await handleSaveContinue(); setShowModal(false); };

    const handleDelete = async () => {
        if (selectedIndex === null) return;
        if (!confirm('¿Estás seguro de eliminar esta cirugía?')) return;
        try {
            const id = surgeries[selectedIndex].id;
            const response = await fetch(getApiUrl(`${API_CONFIG.ENDPOINTS.MEDICAL_NOTES}/${id}`), { method: 'DELETE' });
            if (response.ok) { await loadSurgeries(); handleNew(); }
        } catch (error) {
            console.error(error);
            alert('Error connecting to server');
        }
    };

    const sortedSurgeries = [...surgeries].sort((a, b) => {
        const dateA = new Date(a.note_data.date || '1900-01-01');
        const dateB = new Date(b.note_data.date || '1900-01-01');
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    if (loading)
        return <div className='patient-records-container'><p>Loading surgical history...</p></div>;

    return (
        <>
            <div className='patient-records-container'>
                <div className='patient-records-item'>
                    <div className="surgery-heading-with-button">
                        <Heading headingText="Surgical History" />
                    </div>

                    <div className="surgery-table-wrapper">
                        <div className='patient-record-sub-cont surgeries-records-table'>

                            <p>Procedure</p>

                            <div
                                className="date-header"
                                onMouseEnter={() => setShowSortMenu(true)}
                                onMouseLeave={() => setShowSortMenu(false)}
                                ref={sortMenuRef}
                            >
                                Date {sortOrder === 'asc' ? '▲' : '▼'}

                                {showSortMenu && (
                                    <div className="date-sort-menu">
                                        <div
                                            onClick={() => { setSortOrder('desc'); setShowSortMenu(false); }}
                                            className={sortOrder === 'desc' ? 'selected-option' : ''}
                                        >
                                            Newest → Oldest
                                        </div>
                                        <div
                                            onClick={() => { setSortOrder('asc'); setShowSortMenu(false); }}
                                            className={sortOrder === 'asc' ? 'selected-option' : ''}
                                        >
                                            Oldest → Newest
                                        </div>
                                    </div>
                                )}
                            </div>

                            <p>Actions</p>

                            {sortedSurgeries.length === 0 ? (
                                <p style={{ gridColumn: '1 / -1', padding: '2em', fontStyle: 'italic', color: '#666' }}>
                                    No surgeries recorded. Click "Add" to create one.
                                </p>
                            ) : (
                                sortedSurgeries.map((surgery, index) => (
                                    <React.Fragment key={surgery.id}>
                                        <p>{surgery.note_data.procedure}</p>
                                        <p>{surgery.note_data.date}</p>
                                        <div className='patient-record-buttons'>
                                            <button
                                                className='basic-button table-button view-button'
                                                onClick={() => { handleSelectSurgery(index); setShowModal(true); }}
                                                title='View details'
                                            >
                                                <img src="/assets/glasses.svg" alt="View surgery" className='view-icon' />
                                            </button>
                                        </div>
                                    </React.Fragment>
                                ))
                            )}
                        </div>

                        <div className="add-surgery-container">
                            <button className="add-allergy-btn" onClick={() => { handleNew(); setShowModal(true); }}>
                                <img src="/assets/plus.svg" alt="Add" className="add-icon" />
                                Add Surgery
                            </button>
                        </div>
                    </div>
                </div>

                <div className="surgery-illustration-container">
                    <img src="/assets/surgery.jpg" alt="Surgery illustration" className="surgery-illustration" />
                </div>
            </div>

            <WindowContainer windowTitle="Surgery" showWindow={[showModal, setShowModal]}>
                <WindowConsultDefault
                    title_list='Surgeries List'
                    items_list={surgeries.map(s => s.note_data.procedure)}
                    selectedIndex={selectedIndex}
                    onNew={handleNew}
                    onSaveContinue={handleSaveContinue}
                    onSaveExit={handleSaveExit}
                    onDelete={handleDelete}
                    onSelectItem={handleSelectSurgery}
                >
                    <div className='content-default-name'>
                        <BasicInput
                            label="Procedure"
                            value={currentSurgery.procedure}
                            onChange={(value) => setCurrentSurgery({...currentSurgery, procedure: value})}
                        />
                        <BasicInput
                            label="Date"
                            inputType="date"
                            value={currentSurgery.date}
                            onChange={(value) => setCurrentSurgery({...currentSurgery, date: value})}
                        />
                        <BasicInput
                            label="Surgeon"
                            value={currentSurgery.surgeon}
                            onChange={(value) => setCurrentSurgery({...currentSurgery, surgeon: value})}
                        />
                    </div>

                    <div className='default-information-description surgeries-description'>
                        <Section headingText="Notes / Outcome" color='black' font_size='1.1em'>
                            <textarea
                                value={currentSurgery.notes}
                                onChange={(e) => setCurrentSurgery({...currentSurgery, notes: e.target.value})}
                                placeholder="Describe procedure notes..."
                            />
                        </Section>
                    </div>
                </WindowConsultDefault>
            </WindowContainer>
        </>
    );
}

export default SurgicalHistorySection;