import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

interface ToastState {
  color?: 'info' | 'warning' | 'error' | 'success',
  message: string;
  open?: boolean;
  onClose?: () => void;
  timeoutMs?: number | null;
  title: string;
}

export const Toast = ({ color = 'info', message, open = false, onClose, timeoutMs = 4000, title }: ToastState) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    if (open && timeoutMs != null) {
      timeoutRef.current && clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => handleClose(), timeoutMs);
    }
  }, [onClose, open, timeoutRef]);

  function handleClose() {
    timeoutRef.current && clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
    onClose && onClose();
  }

  const bgColorMap = {
    'info': 'bg-slate-300',
    'warning': 'bg-warning-300',
    'error': 'bg-error-300',
    'success': 'bg-success-300'
  };

  const textColorMap = {
    'info': 'text-light',
    'warning': 'text-warning-300',
    'error': 'text-error-300',
    'success': 'text-success-300'
  };

  return (
    <Transition
      show={open}
      enter="transition duration-500 ease-in-out"
      enterFrom="transform translate-y-0 opacity-0"
      enterTo="transform translate-y-[-50px] opacity-100"
      leave="transition duration-500 ease-in-out"
      leaveFrom="transform translate-y-[-50px] opacity-100"
      leaveTo="transform translate-y-0 opacity-0"
      as={Fragment}
    >
      <Dialog className="opacity-0 fixed bottom-0 ml-auto mr-auto w-fit left-0 right-0 shadow-lg" onClose={handleClose}>
        <Dialog.Panel className={`py-2 px-4 rounded-md ${bgColorMap[color]} ${textColorMap[color]}`}>
          <Dialog.Title className="font-bold">{title}</Dialog.Title>
          <Dialog.Description>
            {message}
          </Dialog.Description>
        </Dialog.Panel>
      </Dialog>
    </Transition>
  )
}

const CLOSED_STATE: ToastState = { open: false, title: "", message: "", timeoutMs: null };

export function useToastState() {
  const [state, setState] = useState<ToastState>(CLOSED_STATE);
  const dismiss = () => setState((prev) => ({ ...prev, open: false }));
  return {
    toastState: state,
    show: (data: Omit<ToastState, 'open'>) => { setState({ onClose: dismiss, ...data, open: true})},
    dismiss
  };
}
