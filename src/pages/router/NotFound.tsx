import { useLocation, useNavigate } from "react-router-dom";
import { PRIVATE_ROUTES } from "./AddRoutesJson";
import { Button, Result } from "antd";

function NotFound() {
  const location = useLocation();
  const navigate = useNavigate();
  const getAllRoutePath = PRIVATE_ROUTES.map((Item) => Item.path);
  return (
    <div>
      {getAllRoutePath.includes(location.pathname) ? (
        <Result
          status="403"
          title="403"
          subTitle="Sorry, you are not authorized to access this page."
          extra={<Button onClick={() => navigate("/")}>Please Login</Button>}
        />
      ) : (
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <Button type="primary" onClick={() => navigate(-1)}>
              Back Home
            </Button>
          }
        />
      )}
      {/* {JSON.stringify(getAllRoutePath)} */}
    </div>
  );
}

export default NotFound;
