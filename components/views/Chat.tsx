import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';
import { continueConversation } from '@/services/geminiService';
import Button from '@/components/common/Button';

type Message = {
    role: 'user' | 'model';
    text: string;
};

const Chat: React.FC = () => {
    const { t } = useTranslation();
    const [messages, setMessages] = useState<Message[]>([
        { role: 'model', text: t('chat.welcome') }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedInput = inputValue.trim();
        if (!trimmedInput) return;

        const userMessage: Message = { role: 'user', text: trimmedInput };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const responseText = await continueConversation(trimmedInput);
            const modelMessage: Message = { role: 'model', text: responseText };
            setMessages(prev => [...prev, modelMessage]);
        } catch (error) {
            console.error("Failed to get response from AI", error);
            const errorMessage: Message = { role: 'model', text: "Sorry, I'm having trouble connecting. Please try again later." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='container mx-auto h-full flex flex-col'>
            <h1 className='text-3xl font-bold mb-4'>{t('chat.title')}</h1>
            <div className='bg-brand-light-card dark:bg-brand-dark-card rounded-lg shadow-md p-4 flex flex-col overflow-hidden h-full'>
                <div className='flex-1 overflow-y-auto mb-4 pr-2'>
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-start gap-3 my-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                             {msg.role === 'model' && (
                                <div className='w-8 h-8 rounded-full bg-brand-gradient flex items-center justify-center text-white flex-shrink-0'>
                                    <Bot size={20} />
                                </div>
                            )}
                            <div className={`max-w-md p-3 rounded-lg ${msg.role === 'user' ? 'bg-brand-pink text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                                <p className='text-sm whitespace-pre-wrap'>{msg.text}</p>
                            </div>
                        </div>
                    ))}
                     {isLoading && (
                        <div className='flex items-start gap-3 my-4 justify-start'>
                             <div className='w-8 h-8 rounded-full bg-brand-gradient flex items-center justify-center text-white flex-shrink-0'>
                                <Bot size={20} />
                            </div>
                             <div className="max-w-md p-3 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center space-x-2">
                                <span className="block w-2 h-2 bg-brand-purple rounded-full animate-pulse" style={{ animationDelay: '0s' }}></span>
                                <span className="block w-2 h-2 bg-brand-blue rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                                <span className="block w-2 h-2 bg-brand-pink rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <form onSubmit={handleSendMessage} className='flex items-center gap-4 border-t border-gray-200 dark:border-gray-700 pt-4'>
                    <textarea
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        onKeyDown={e => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage(e);
                            }
                        }}
                        placeholder={t('chat.inputPlaceholder')}
                        className='flex-1 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-brand-pink focus:outline-none resize-none'
                        rows={1}
                        disabled={isLoading}
                    />
                    <Button type='submit' isLoading={isLoading} disabled={!inputValue.trim()}>
                        <Send size={20} />
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Chat;
