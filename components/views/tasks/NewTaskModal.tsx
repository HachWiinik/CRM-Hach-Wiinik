import React, { useState } from 'react';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import { useTranslation } from '@/contexts/LanguageContext';
import { mockTeamMembers } from '@/data/mockData';
import type { Task, TaskStatus } from '@/types';

type NewTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: Omit<Task, 'id'>) => void;
};

// Fix: Added missing NewTaskModal component implementation.
const NewTaskModal: React.FC<NewTaskModalProps> = ({ isOpen, onClose, onAddTask }) => {
    const { t } = useTranslation();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assigneeId, setAssigneeId] = useState(mockTeamMembers[0]?.id || '');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !assigneeId || !dueDate) return;
        onAddTask({
            title,
            description,
            assigneeId,
            dueDate: new Date(dueDate),
            status: 'To Do' as TaskStatus,
        });
        onClose();
        // Reset form
        setTitle('');
        setDescription('');
        setAssigneeId(mockTeamMembers[0]?.id || '');
        setDueDate('');
    };
    
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={t('tasks.modal.title')}>
            <form onSubmit={handleSubmit}>
                <div className='space-y-4'>
                    <div>
                        <label htmlFor='title' className='block text-sm font-medium mb-1'>{t('tasks.modal.taskTitle')}</label>
                        <input
                            type='text'
                            id='title'
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                            className='w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-brand-pink focus:outline-none'
                        />
                    </div>
                     <div>
                        <label htmlFor='description' className='block text-sm font-medium mb-1'>{t('tasks.modal.description')}</label>
                        <textarea
                            id='description'
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            rows={3}
                            className='w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-brand-pink focus:outline-none resize-none'
                        />
                    </div>
                     <div>
                        <label htmlFor='assignee' className='block text-sm font-medium mb-1'>{t('tasks.modal.assignee')}</label>
                        <select
                            id='assignee'
                            value={assigneeId}
                            onChange={e => setAssigneeId(e.target.value)}
                            required
                             className='w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-brand-pink focus:outline-none'
                        >
                            {mockTeamMembers.map(member => (
                                <option key={member.id} value={member.id}>{member.name}</option>
                            ))}
                        </select>
                    </div>
                     <div>
                        <label htmlFor='dueDate' className='block text-sm font-medium mb-1'>{t('tasks.modal.dueDate')}</label>
                        <input
                            type='date'
                            id='dueDate'
                            value={dueDate}
                            onChange={e => setDueDate(e.target.value)}
                            required
                             className='w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-brand-pink focus:outline-none'
                        />
                    </div>
                </div>
                <div className='flex justify-end space-x-4 mt-6'>
                    <Button type='button' variant='secondary' onClick={onClose}>{t('common.cancel')}</Button>
                    <Button type='submit'>{t('tasks.modal.addTask')}</Button>
                </div>
            </form>
        </Modal>
    );
};

export default NewTaskModal;
