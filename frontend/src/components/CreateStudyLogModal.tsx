import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useId } from "react";
import { StudyLogForm } from "./StudyLogForm";
import { FaTimes } from "react-icons/fa";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
};

export const CreateStudyLogModal = ({ isOpen, onClose, onCreated }: Props) => {
  const titleId = useId();

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        onClose={onClose}
        className="relative z-50"
        aria-labelledby={titleId}
      >
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

        <div className="fixed inset-0 flex items-center justify-center px-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
              aria-label="閉じる"
            >
              <FaTimes size={20} />
            </button>
            <h2 id={titleId} className="text-2xl font-bold text-center mb-6">
              学習記録を追加
            </h2>

            <StudyLogForm
              onSuccess={() => {
                onCreated();
                onClose();
              }}
            />
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
