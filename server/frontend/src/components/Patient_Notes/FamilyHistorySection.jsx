import React, { useState, useEffect, useRef } from 'react';
import { usePatient } from '../../hooks/usePatient';
import { getApiUrl } from '../../config/api';
import API_CONFIG from '../../config/api';
import WindowContainer from '../Window_Container/WindowContainer';
import WindowConsultDefault from '../Patient_Consult/WindowConsultDefault';
import BasicInput from '../Basic_Input/BasicInput';
import Section from '../Section/Section';
import Heading from '../Heading/Heading';
import './FamilyHistorySection.css';

function FamilyHistorySection({ addTrigger = true }) {
    const { patientData } = usePatient();
    const [familyRecords, setFamilyRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [currentRecord, setCurrentRecord] = useState({
        relation: '',
        condition: '',
        notes: ''
    });

    const [sortOrder, setSortOrder] = useState('desc');
    const sortMenuRef = useRef(null);
    const [showSortMenu, setShowSortMenu] = useState(false);

    useEffect(() => {
        if (patientData) loadFamilyHistory();
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

    const loadFamilyHistory = async () => {
        try {
            const response = await fetch(
                getApiUrl(`${API_CONFIG.ENDPOINTS.MEDICAL_NOTES_BY_PATIENT}/${patientData.patient_id}/Family%20History`)
            );
            const data = await response.json();
            if (response.ok) setFamilyRecords(data.notes);
        } catch (error) {
            console.error('Error fetching family history:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleNewRecord = () => {
        setCurrentRecord({ relation: '', condition: '', notes: '' });
        setSelectedIndex(null);
    };

    const handleSelectRecord = (index) => {
        setSelectedIndex(index);
        const recordData = familyRecords[index].note_data;
        setCurrentRecord({
            relation: recordData.relation || '',
            condition: recordData.condition || '',
            notes: recordData.notes || ''
        });
    };

    const handleSaveContinue = async () => {
        if (!currentRecord.relation.trim()) {
            alert('Relation is required');
            return;
        }
        try {
            if (selectedIndex !== null) {
                const id = familyRecords[selectedIndex].id;
                const response = await fetch(getApiUrl(`${API_CONFIG.ENDPOINTS.MEDICAL_NOTES}/${id}`), {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ note_data: currentRecord })
                });
                if (response.ok) { await loadFamilyHistory(); handleNewRecord(); }
            } else {
                const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.MEDICAL_NOTES), {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        patient_id: patientData.patient_id,
                        note_type: 'Family History',
                        note_data: currentRecord
                    })
                });
                if (response.ok) { await loadFamilyHistory(); handleNewRecord(); }
            }
        } catch (error) {
            console.error(error);
            alert('Error connecting to server');
        }
    };

    const handleSaveExit = async () => { await handleSaveContinue(); setShowModal(false); };

    const handleDelete = async () => {
        if (selectedIndex === null) return;
        if (!confirm('Are you sure you want to delete this record?')) return;
        try {
            const id = familyRecords[selectedIndex].id;
            const response = await fetch(getApiUrl(`${API_CONFIG.ENDPOINTS.MEDICAL_NOTES}/${id}`), { method: 'DELETE' });
            if (response.ok) { await loadFamilyHistory(); handleNewRecord(); }
        } catch (error) {
            console.error(error);
            alert('Error connecting to server');
        }
    };

    const sortedRecords = [...familyRecords].sort((a, b) => {
        const dateA = new Date(a.note_data.date || '1900-01-01');
        const dateB = new Date(b.note_data.date || '1900-01-01');
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    if (loading) return <div className='family-records-container'><p>Loading family history...</p></div>;

    return (
        <>
            <div className='patient-records-container family-records-container'>
                <div className='patient-records-item family-records-item'>
                    <div className="family-heading-with-button">
                        <Heading headingText="Family History" />
                    </div>

                    <div className="family-table-wrapper">
                        <div className='patient-record-sub-cont family-record-sub-container family-records-table'>
                            <p>Relation</p>
                            <p>Condition</p>
                            <p>Actions</p>

                            {sortedRecords.length === 0 ? (
                                <p style={{ gridColumn: '1 / -1', padding: '1em', fontStyle: 'italic', fontSize: '.9em', color: '#666' }}>
                                    No family history recorded. { addTrigger && "Click 'Add' to create one." }
                                </p>
                            ) : (
                                sortedRecords.map((record, index) => (
                                    <React.Fragment key={record.id}>
                                        <p>{record.note_data.relation}</p>
                                        <p>{record.note_data.condition}</p>
                                        <div className='family-record-buttons'>
                                            <button
                                                className='basic-button table-button view-button'
                                                onClick={() => { handleSelectRecord(index); setShowModal(true); }}
                                                title='View details'
                                            >
                                                <img src="/assets/glasses.svg" alt="View record" className='view-icon' />
                                            </button>
                                        </div>
                                    </React.Fragment>
                                ))
                            )}
                        </div>

                        { addTrigger && (
                          <div className="add-family-container">
                            <button className="add-family-btn" onClick={() => { handleNewRecord(); setShowModal(true); }}>
                                <img src="/assets/plus.svg" alt="Add" className="add-icon" />
                                Add Family Record
                            </button>
                          </div>
                        ) }
                    </div>
                </div>

                <div className="family-illustration-container">
                    <img src="/assets/family-history.jpg" alt="Family illustration" className="family-illustration" />
                </div>
            </div>

            <WindowContainer windowTitle="Family History" showWindow={[showModal, setShowModal]}
                styleContainer='window-notes-section'
            >
                <WindowConsultDefault
                    title_list='Family Records'
                    items_list={familyRecords.map(r => r.note_data.relation)}
                    selectedIndex={selectedIndex}
                    onNew={handleNewRecord}
                    onSaveContinue={handleSaveContinue}
                    onSaveExit={handleSaveExit}
                    onDelete={handleDelete}
                    onSelectItem={handleSelectRecord}
                >
                    <div className='content-family-default'>
                        <BasicInput
                            label="Relation"
                            value={currentRecord.relation}
                            onChange={(value) => setCurrentRecord({...currentRecord, relation: value})}
                        />
                        <BasicInput
                            label="Condition"
                            value={currentRecord.condition}
                            onChange={(value) => setCurrentRecord({...currentRecord, condition: value})}
                        />
                    </div>

                    <div className='default-information-description family-description'>
                        <Section headingText="Notes / Additional Info" color='black' font_size='1.1em'>
                            <textarea
                                value={currentRecord.notes}
                                onChange={(e) => setCurrentRecord({...currentRecord, notes: e.target.value})}
                                placeholder="Add notes about family history..."
                            />
                        </Section>
                    </div>
                </WindowConsultDefault>
            </WindowContainer>
        </>
    );
}

export default FamilyHistorySection;
