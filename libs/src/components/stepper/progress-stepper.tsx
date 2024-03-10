import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Dot = styled.div<{ active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? '#01463A' : '#ccc')};
  margin: 0 4px;
`;

interface ProgressStepperProps {
  steps?: string[];
  activeStep?: string;
}

export function ProgressStepper({ steps, activeStep }: ProgressStepperProps): JSX.Element {
  return (
    <Container>
      {steps?.map((step, index) => (
        <Dot key={index} active={step === activeStep} />
      ))}
    </Container>
  );
}
