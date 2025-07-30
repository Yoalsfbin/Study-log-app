import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useId } from "react";
import type { StudyLog } from "../types/studyLog";
import { StudyLogForm } from "./StudyLogForm";
import { FaTimes } from "react-icons/fa";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  log: StudyLog;
  onUpdated: () => void;
};

export const EditStudyLogModal = ({
  isOpen,
  onClose,
  log,
  onUpdated,
}: Props) => {
  const titleId = useId();

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        onClose={onClose}
        className="relative z-50"
        aria-labelledby={titleId}
      >
        {/* 背景 */}
        <Transition
          as={Fragment}
          show={isOpen}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition>

        {/* モーダル本体 */}
        <div className="fixed inset-0 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
          <Transition
            as={Fragment}
            show={isOpen}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="
                relative
                w-full max-w-2xl 
                bg-white 
                p-8 
                rounded-2xl 
                shadow-2xl 
                border border-gray-300 
                max-h-[90vh] 
                overflow-y-auto
            "
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
                aria-label="閉じる"
              >
                <FaTimes size={20} />
              </button>
              <h2
                id={titleId}
                className="text-2xl font-bold text-gray-800 mb-6 text-center"
              >
                学習記録の編集
              </h2>

              <StudyLogForm
                initialData={log}
                onSuccess={() => {
                  onUpdated();
                  onClose();
                }}
              />
            </div>
          </Transition>
        </div>
      </Dialog>
    </Transition>
  );
};
