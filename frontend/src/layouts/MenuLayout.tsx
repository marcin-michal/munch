import { Button, Masthead, MastheadContent } from "@patternfly/react-core";
import { AngleLeftIcon, PlusIcon } from "@patternfly/react-icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export const MenuLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <Masthead>
        <MastheadContent>
          {location.pathname === "/" ? (
            <Button
              variant="secondary"
              onClick={() => navigate("/meals/create")}
              icon={<PlusIcon />}
            >
              Add new meal to database
            </Button>
          ) : (
            <Button
              variant="secondary"
              onClick={() => navigate("/")}
              icon={<AngleLeftIcon />}
            >
              Back to home
            </Button>
          )}
        </MastheadContent>
      </Masthead>
      <Outlet />
    </>
  );
};
