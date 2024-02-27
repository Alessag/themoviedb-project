import { Link, useRouteError } from 'react-router-dom';
import { Col, Row } from 'antd';

const ErrorPage = () => {
  const error = useRouteError() as { statusText: string; data: string };

  return (
    <Row
      id="error-page"
      justify="center"
    >
      <Col>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.data}</i>
        </p>
        <Link to="/">Home</Link>
      </Col>
    </Row>
  );
};

export default ErrorPage;
