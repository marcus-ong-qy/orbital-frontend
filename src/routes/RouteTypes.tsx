import React from "react";
import { StyledMain } from "./styles/Routes.styled";

export const RouteWithoutNav = (routeProps: {
  component: React.LazyExoticComponent<React.ComponentType<any>>;
}) => {
  const { component: Component } = routeProps;

  return (
    <StyledMain>
      <Component />
    </StyledMain>
  );
};
