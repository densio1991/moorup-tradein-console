import styled from 'styled-components';

const ChartContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const exampleChartData = [5, 10, 15, 7, 20, 11, 22, 1, 19];

interface BarChartProps {
  data: number[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  return (
    <div>
      {data.map((value, index) => (
        <div
          key={index}
          style={{
            height: `${value * 10}px`,
            background: '#3498db',
            margin: '5px',
            width: '40px',
            display: 'inline-block',
          }}
        ></div>
      ))}
    </div>
  );
};
export function DashboardPage() {
  return (
    <ChartContainer>
      <h2>Product Sales Chart</h2>
      <BarChart data={exampleChartData} />
    </ChartContainer>
  );
}
