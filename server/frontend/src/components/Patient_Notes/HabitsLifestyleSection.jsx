import React, { useState, useEffect, useRef } from 'react';
import { usePatient } from '../../hooks/usePatient';
import { getApiUrl } from '../../config/api';
import API_CONFIG from '../../config/api';
import WindowContainer from '../Window_Container/WindowContainer';
import WindowConsultDefault from '../Patient_Consult/WindowConsultDefault';
import Section from '../Section/Section';
import Heading from '../Heading/Heading';
import './HabitsLifestyleSection.css';

function HabitsLifestyleSection({ addTrigger = true }) {
    const { patientData } = usePatient();
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [currentHabit, setCurrentHabit] = useState({
        smoking: '',
        alcohol: '',
        exercise: '',
        diet: '',
        date: '',
        notes: ''
    });

    const [sortOrder, setSortOrder] = useState('desc');
    const [showSortMenu, setShowSortMenu] = useState(false);
    const sortMenuRef = useRef(null);


    useEffect(() => {
        if (patientData) loadHabits();
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

    const loadHabits = async () => {
        try {
            const response = await fetch(
                getApiUrl(`${API_CONFIG.ENDPOINTS.MEDICAL_NOTES_BY_PATIENT}/${patientData.patient_id}/Habits%20and%20Lifestyle`)
            );
            const data = await response.json();
            if (response.ok) setHabits(data.notes);
        } catch (error) {
            console.error('Error fetching habits:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleNew = () => {
        setCurrentHabit({ smoking: '', alcohol: '', exercise: '', diet: '', date: '', notes: '' });
        setSelectedIndex(null);
    };

    const handleSelectHabit = (habit, index) => {
        setSelectedIndex(index);
        setCurrentHabit({
            smoking: habit.note_data.smoking || '',
            alcohol: habit.note_data.alcohol || '',
            exercise: habit.note_data.exercise || '',
            diet: habit.note_data.diet || '',
            date: habit.note_data.date || '',
            notes: habit.note_data.notes || ''
        });
    };

    const handleSaveContinue = async () => {
        try {
            if (selectedIndex !== null) {
                const id = habits[selectedIndex].id;
                const response = await fetch(getApiUrl(`${API_CONFIG.ENDPOINTS.MEDICAL_NOTES}/${id}`), {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ note_data: currentHabit })
                });
                if (response.ok) { await loadHabits(); handleNew(); }
            } else {
                const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.MEDICAL_NOTES), {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        patient_id: patientData.patient_id,
                        note_type: 'Habits and Lifestyle',
                        note_data: currentHabit
                    })
                });
                if (response.ok) { await loadHabits(); handleNew(); }
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
            const id = habits[selectedIndex].id;
            const response = await fetch(getApiUrl(`${API_CONFIG.ENDPOINTS.MEDICAL_NOTES}/${id}`), { method: 'DELETE' });
            if (response.ok) { await loadHabits(); handleNew(); }
        } catch (error) {
            console.error(error);
            alert('Error connecting to server');
        }
    };

    if (loading) return <div className='patient-records-container'><p>Loading habits and lifestyle...</p></div>;

    const sortedHabits = [...habits].sort((a, b) => {
        const dateA = new Date(a.note_data.date || '1900-01-01');
        const dateB = new Date(b.note_data.date || '1900-01-01');
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    return (
        <>
            <div className='patient-records-container habits-container'>
                <div className='patient-records-item habits-records-item'>
                    <Heading headingText="Habits and Lifestyle" />

                    <div className="habits-table-wrapper">
                        <div className='patient-record-sub-cont habits-records-table'>
                            <div>Smoking</div>
                            <div>Alcohol</div>
                            <div>Exercise</div>
                            <div>Diet</div>

                            <div
                                className="habits-date-header"
                                ref={sortMenuRef}
                                onClick={() => setShowSortMenu(!showSortMenu)}
                            >
                                Date {sortOrder === 'asc' ? '▲' : '▼'}

                                {showSortMenu && (
                                    <div className="habits-date-sort-menu">
                                        <div
                                        onClick={() => { setSortOrder('desc'); setShowSortMenu(false); }}
                                        className={sortOrder === 'desc' ? 'selected-option' : ''}>
                                            Newest → Oldest
                                        </div>
                                        <div
                                        onClick={() => { setSortOrder('asc'); setShowSortMenu(false); }}
                                        className={sortOrder === 'asc' ? 'selected-option' : ''}>
                                            Oldest → Newest
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div>Actions</div>

                            {sortedHabits.length === 0 ? (
                                <div style={{ gridColumn: '1 / -1', padding: '2em', fontStyle: 'italic', color: '#666' }}>
                                    No habits recorded. { addTrigger && "Click 'Add' to create one."}
                                </div>
                            ) : (
                                sortedHabits.map((habit, index) => (
                                    <React.Fragment key={habit.id}>
                                        <div>{habit.note_data.smoking}</div>
                                        <div>{habit.note_data.alcohol}</div>
                                        <div>{habit.note_data.exercise}</div>
                                        <div>{habit.note_data.diet}</div>
                                        <div>{habit.note_data.date ? new Date(habit.note_data.date).toLocaleDateString() : '-'}</div>
                                        <div className='habit-record-buttons'>
                                            <button
                                                className='basic-button table-button view-button'
                                                onClick={() => { handleSelectHabit(habit, index); setShowModal(true); }}
                                                title='View details'
                                            >
                                                <img src="/assets/glasses.svg" alt="View" className='view-icon' />
                                            </button>
                                        </div>
                                    </React.Fragment>
                                ))
                            )}
                        </div>

                        <div className="add-habit-container">
                            { addTrigger && (
                            <button className="add-habit-btn" onClick={() => { handleNew(); setShowModal(true); }}>
                                <img src="/assets/plus.svg" alt="Add" className="add-icon" />
                                Add Record
                            </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="habits-illustration-container">
                    <img src="/assets/habits-and-lifestyle.jpg" alt="Habits illustration" className="habits-illustration" />
                </div>
            </div>


            <WindowContainer windowTitle="Habits and Lifestyle" showWindow={[showModal, setShowModal]}
                styleContainer='window-notes-section'
            >
                <WindowConsultDefault
                    title_list='Habits Records'
                    items_list={habits.map((h) => `${h.note_data.smoking || 'Habit'} / ${h.note_data.exercise || ''}`)}
                    selectedIndex={selectedIndex}
                    onNew={handleNew}
                    onSaveContinue={handleSaveContinue}
                    onSaveExit={handleSaveExit}
                    onDelete={handleDelete}
                    onSelectItem={handleSelectHabit}
                >
                    <div className='content-default-name'>
                        <div className="field">
                            <label>Smoking</label>
                            <select
                                className={currentHabit.smoking ? 'active-select' : ''}
                                value={currentHabit.smoking}
                                onChange={(e) => setCurrentHabit({ ...currentHabit, smoking: e.target.value })}
                                >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                                </select>
                        </div>

                        <div className="field">
                            <label>Alcohol</label>
                            <select
                                className={currentHabit.alcohol ? 'active-select' : ''}
                                value={currentHabit.alcohol}
                                onChange={(e) => setCurrentHabit({ ...currentHabit, alcohol: e.target.value })}
                                >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                                </select>
                        </div>

                        <div className="field">
                            <label>Exercise</label>
                            <select
                                className={currentHabit.exercise ? 'active-select' : ''}
                                value={currentHabit.exercise}
                                onChange={(e) => setCurrentHabit({ ...currentHabit, exercise: e.target.value })}
                                >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                                </select>
                        </div>

                        <div className="field">
                            <label>Diet</label>
                            <select
                                className={currentHabit.diet ? 'active-select' : ''}
                                value={currentHabit.diet}
                                onChange={(e) => setCurrentHabit({ ...currentHabit, diet: e.target.value })}
                                >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                                </select>
                        </div>

                        <div className="field">
                            <label>Date</label>
                            <input
                                type="date"
                                value={currentHabit.date || ''}
                                onChange={(e) => setCurrentHabit({ ...currentHabit, date: e.target.value })}
                                />
                        </div>
                    </div>

                    <div className='default-information-description surgeries-description'>
                        <Section headingText="Additional Notes" color='black' font_size='1.1em'>
                            <textarea
                                value={currentHabit.notes}
                                onChange={(e) => setCurrentHabit({ ...currentHabit, notes: e.target.value })}
                                placeholder="Describe patient's lifestyle or relevant observations..."
                            />
                        </Section>
                    </div>
                </WindowConsultDefault>
            </WindowContainer>
        </>
    );
}

export default HabitsLifestyleSection;
