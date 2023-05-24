import React from 'react';

interface IStepIndicatorProps {
    currentStep: number;
    totalSteps: number;
    stepTitles: string[];
}

export default function StepIndicator({ currentStep, totalSteps, stepTitles }: IStepIndicatorProps) {
    const steps = [];
    for (let i = 1; i <= totalSteps; i++) {
        steps.push({
            number: <div key={i} className={`step-circle ${i === currentStep ? 'filled' : ''}`} > {i} </div>,
            title: stepTitles[i - 1] && <div className="step-title">{stepTitles[i - 1]}</div>
        }
        );
    }

    const separator = <div className="step-separator"></div>;

    return (
        <div className="step-indicator">
            {steps.map((step, index) => (
                <React.Fragment key={index}>
                    <div className="step-item">
                        <p className='step-number'>{step.number}</p>
                        <p className='step'>{step.title}</p>
                    </div>
                    {index < totalSteps - 1 && separator}
                </React.Fragment>
            ))}
        </div>
    );
}