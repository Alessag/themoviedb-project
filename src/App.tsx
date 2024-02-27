import { Col, Row } from 'antd';

import './App.css';

const App = () => {
  return (
    <div>
      <Row justify="center">
        <Col xs={6}>
          <h1 className="text-3xl font-bold underline">Hello World!</h1>
        </Col>
      </Row>
    </div>
  );
};

export default App;
