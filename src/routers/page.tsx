import { Suspense, lazy } from "react";

const lazyLoad = (importFunc: any) => {
  const Component = lazy(importFunc);
  return (props: any) => (
    <Suspense>
      <Component {...props} />
    </Suspense>
  );
};

export const pages = [
  {
    name: "Home",
    path: "/",
    component: lazyLoad(() => import("../pages/Home")),
  },
  {
    name: "About",
    path: "edit",
    component: lazyLoad(() => import("../pages/Edit")),
  },
  {
    name: "Create",
    path: "create",
    component: lazyLoad(() => import("../pages/Create")),
  },
];
