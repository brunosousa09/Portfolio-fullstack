import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CircleCheck, CircleX } from "lucide-react";

const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
};

const StatusModal = ({ isOpen, status, message, onClose }) => {
    const renderIcon = () => {
        switch (status) {
            case 'sending':
                return <Loader2 className="h-12 w-12 animate-spin text-white" />;
            case 'success':
                return <CircleCheck className="h-12 w-12 text-green-500" />;
            case 'error':
                return <CircleX className="h-12 w-12 text-red-500" />;
            default:
                return null;
        }
    };
    
    return (
        <AnimatePresence>{isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-[#1a1a1a] border border-[#333] rounded-2xl p-8 flex flex-col items-center gap-4 text-center w-80 shadow-lg"
          >
            {renderIcon()}
            <p className="text-lg font-medium text-white">{message}</p>
            {status !== 'sending' && (
              <button
                onClick={onClose}
                className="mt-4 w-full bg-white text-black font-bold py-2 rounded-lg text-md hover:bg-gray-200 transition"
              >
                Fechar
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StatusModal;