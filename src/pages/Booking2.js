import React, { useState } from "react";
import styled from "styled-components";
import Accommodation from "../components/forms/Accommodation";
import Capacity from "../components/forms/Capacity";
import DatePicker from "../components/forms/DatePicker";

const Booking2 = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [dates, setDates] = useState({});
  const [capacity, setCapacity] = useState(0);

  const handleTabClick = (step) => {
    setCurrentStep(step);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <Capacity capacity={capacity} setCapacity={setCapacity} />;
      case 1:
        return <DatePicker dates={dates} setDates={setDates} />;
      case 2:
        return <Accommodation dates={dates} capacity={capacity} />;
      case 3:
        return <Step4 />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <TabsContainer>
        <TabButton onClick={() => handleTabClick(0)}>Step 1</TabButton>
        <TabButton onClick={() => handleTabClick(1)}>Step 2</TabButton>
        <TabButton onClick={() => handleTabClick(2)}>Step 3</TabButton>
        <TabButton onClick={() => handleTabClick(3)}>Step 4</TabButton>
      </TabsContainer>
      {renderStepContent()}
    </Container>
  );
};

const Container = styled.div`
  max-width: 600px;
  margin: 200px auto;
  padding: 20px;
  /* margin-top: 200px; */
  min-height: 80vh;
`;

const TabsContainer = styled.div`
  display: flex;
`;

const TabButton = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #f2f2f2;
  color: #333;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 10px;
  }

  &:hover {
    background-color: #ccc;
  }

  ${(props) =>
    props.active &&
    `
    background-color: #333;
    color: #fff;
  `}
`;

const Step1 = () => {
  return <div>Step 1 content</div>;
};

const Step2 = () => {
  return <div>Step 2 content</div>;
};

const Step3 = () => {
  return <div>Step 3 content</div>;
};
const Step4 = () => {
  return <div>Booking Details content</div>;
};

export default Booking2;
