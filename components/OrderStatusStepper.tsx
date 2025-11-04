import React from 'react';
import { motion } from 'framer-motion';
import { OrderStatus } from '../types';
import { CreditCard, Loader2, CheckCircle2 } from './icons';

// Define the order of steps
const steps = [
  { status: OrderStatus.Paid, label: 'Paid', icon: CreditCard },
  { status: OrderStatus.Processing, label: 'Processing', icon: Loader2 },
  { status: OrderStatus.Done, label: 'Completed', icon: CheckCircle2 },
];

interface OrderStatusStepperProps {
  currentStatus: OrderStatus;
}

const OrderStatusStepper: React.FC<OrderStatusStepperProps> = ({ currentStatus }) => {
  // Find the index of the current status in our defined steps
  const currentStepIndex = steps.findIndex(step => step.status === currentStatus);
  
  // If status is not in the main flow (e.g. Pending, Cancelled), don't render stepper
  if (currentStatus === OrderStatus.Pending || currentStatus === OrderStatus.Cancelled) {
    return null;
  }

  // Handle cases where the order might be in a state before 'Paid' but we want to show the stepper
  let activeIndex = currentStepIndex;
  
  // If status is "Done", all steps are complete
  if (currentStatus === OrderStatus.Done) {
      activeIndex = steps.length;
  }


  return (
    <div className="flex items-center w-full px-4 sm:px-8">
      {steps.map((step, index) => {
        const isCompleted = index < activeIndex;
        const isCurrent = index === activeIndex;

        return (
          <React.Fragment key={step.status}>
            <div className="flex flex-col items-center text-center">
              <motion.div
                initial={false}
                animate={{
                  backgroundColor: isCompleted || isCurrent ? '#b8c0ff' : '#e5e7eb',
                  color: isCompleted || isCurrent ? '#ffffff' : '#6b7280',
                }}
                transition={{ duration: 0.3 }}
                className="w-12 h-12 rounded-full flex items-center justify-center"
              >
                <step.icon size={24} className={isCurrent && step.status === OrderStatus.Processing ? 'animate-spin' : ''} />
              </motion.div>
              <p className={`mt-2 font-semibold text-sm ${isCompleted || isCurrent ? 'text-[#2d2d2d]' : 'text-gray-400'}`}>
                {step.label}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 h-1 bg-gray-200 mx-4 relative">
                <motion.div
                  className="absolute top-0 left-0 h-1 bg-[#b8c0ff]"
                  initial={{ width: '0%' }}
                  animate={{ width: isCompleted ? '100%' : isCurrent ? '50%' : '0%' }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default OrderStatusStepper;
