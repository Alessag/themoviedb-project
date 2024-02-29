import { LoadingOutlined } from '@ant-design/icons';
import { Col, Row, Spin } from 'antd';

const LoadingSpinner = () => {
  return (
    <Row
      justify="center"
      align="middle"
      className="container my-0 mx-auto h-16"
    >
      <Col>
        <Spin
          size="large"
          indicator={<LoadingOutlined spin />}
        />
      </Col>
    </Row>
  );
};

export default LoadingSpinner;
