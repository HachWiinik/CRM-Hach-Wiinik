import React from 'react';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import { useTranslation } from '@/contexts/LanguageContext';

type ConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText,
  isLoading = false
}) => {
  const { t } = useTranslation();
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <>
        <p className='mb-6'>{message}</p>
        <div className='flex justify-end space-x-4'>
          <Button variant='secondary' onClick={onClose} disabled={isLoading}>
            {cancelText ?? t('common.cancel')}
          </Button>
          <Button onClick={onConfirm} isLoading={isLoading}>
            {confirmText ?? t('common.confirm')}
          </Button>
        </div>
      </>
    </Modal>
  );
};

export default ConfirmationModal;
