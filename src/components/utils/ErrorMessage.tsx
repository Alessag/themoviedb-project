interface ErrorProps {
  error: string;
}

const ErrorMessage = ({ error }: ErrorProps) => {
  return (
    <div className="container mx-auto text-center border-2">
      <h1 className="font-bold my-8 text-4xl">Something went wrong</h1>
      <p>{error}</p>
    </div>
  );
};

export default ErrorMessage;
