import React, { useState } from 'react';

function Stepper() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return <Step1 />;
      case 1:
        return <Step2 />;
      case 2:
        return <Step3 />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h1>Stepper</h1>
      <div>{renderStepContent()}</div>
      <div>
        {activeStep > 0 && (
          <button onClick={handlePrevious}>Previous</button>
        )}
        {activeStep < 2 ? (
          <button onClick={handleNext}>Next</button>
        ) : (
          <button onClick={handleReset}>Reset</button>
        )}
      </div>
    </div>
  );
}

// Step components
function Step1() {
  return <p>Step 1</p>;
}

function Step2() {
  return <p>Step 2</p>;
}

function Step3() {
  return <p>Step 3</p>;
}

export default Stepper;