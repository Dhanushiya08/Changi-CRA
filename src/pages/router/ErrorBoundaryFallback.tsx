import { Alert, Button } from "antd";

function ErrorBoundaryFallback({ error, resetErrorBoundary }: any) {
  return (
    <div>
      <Alert
        message="Something went wrong:"
        showIcon
        description={error.message}
        type="error"
        action={
          <Button onClick={resetErrorBoundary} size="small" danger>
            Try again
          </Button>
        }
      />
    </div>
  );
}

export default ErrorBoundaryFallback;
