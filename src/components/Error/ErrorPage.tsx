import { ReactElement } from "react";

const ErrorPage = ({ code = 404 }: { code?: number }): ReactElement => {
  return <div>Error</div>;
};

export default ErrorPage;
