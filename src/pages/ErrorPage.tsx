import { Link, useRouteError } from 'react-router-dom';
import { Button, Col, Row } from 'antd';

const ErrorPage = () => {
  const error = useRouteError() as { statusText: string; data: string };

  return (
    <div className="h-screen mx-auto flex justify-center">
      <Row id="error-page">
        <Col className="text-center">
          <h1 className="text-2xl sm:text-5xl md:text-7xl font-bold md:mb-4">
            Oops!
          </h1>
          <h2 className="text-gray-700 sm:text-2xl md:text-3xl  my-2 md:my-4">
            Sorry, an unexpected error has occurred
          </h2>
          <p className="text-sm sm:text-xl text-gray-600  mb-2 md:my-3">
            <i>{error.statusText || error.data}</i>
          </p>
          <Link to="/">
            <Button type="link">Home page</Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default ErrorPage;
