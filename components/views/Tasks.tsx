import React, { useState } from 'react';
import { useTranslation } from '@/contexts/LanguageContext';
import { mockTasks, mockTeamMembers } from '@/data/mockData';
import { formatDate } from '@/utils/date';
import Panel from '@/components/common/Panel';
import Button from '@/components/common/Button';
import NewTaskModal from './tasks/NewTaskModal';
import type { Task, TaskStatus } from '@/types';
import MascotHelper from '@/components/common/MascotHelper';

// Fix: Added missing Tasks component implementation.
const Tasks: React.FC = () => {
    const { t, language } = useTranslation();
    const [tasks, setTasks] = useState<Task[]>(mockTasks);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const teamMemberMap = mockTeamMembers.reduce((acc, member) => {
        acc[member.id] = member;
        return acc;
    }, {} as Record<string, {name: string, avatarUrl: string}>);

    const handleAddTask = (newTask: Omit<Task, 'id'>) => {
        const taskWithId = { ...newTask, id: `t${tasks.length + 1}` };
        setTasks(prev => [...prev, taskWithId]);
    };

    return (
        <div>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-3xl font-bold'>{t('tasks.title')}</h1>
                <Button onClick={() => setIsModalOpen(true)}>{t('tasks.addNew')}</Button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {(['To Do', 'In Progress', 'Completed'] as TaskStatus[]).map(status => (
                    <Panel key={status} title={t(`tasks.status.${status.toLowerCase().replace(' ', '')}`)}>
                        <div className='space-y-4'>
                            {tasks.filter(task => task.status === status).map(task => (
                                <div key={task.id} className='p-4 bg-brand-light-bg dark:bg-brand-dark rounded-lg shadow-sm'>
                                    <h3 className='font-semibold'>{task.title}</h3>
                                    <p className='text-sm text-gray-500 dark:text-gray-400 my-2'>{task.description}</p>
                                    <div className='flex justify-between items-center text-xs mt-3'>
                                        <div className='flex items-center'>
                                            <img src={teamMemberMap[task.assigneeId]?.avatarUrl} alt={teamMemberMap[task.assigneeId]?.name} className='w-6 h-6 rounded-full mr-2' />
                                            <span>{teamMemberMap[task.assigneeId]?.name}</span>
                                        </div>
                                        <span>{formatDate(task.dueDate, language)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Panel>
                ))}
            </div>

            <NewTaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddTask={handleAddTask}
            />
            <MascotHelper initialMessage={t('mascot.tasks')} />
        </div>
    );
};

export default Tasks;
