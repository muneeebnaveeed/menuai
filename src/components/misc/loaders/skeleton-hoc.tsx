import { FC, PropsWithChildren } from "react";
import Skeleton, { EnhancedSkeletonProps } from "./skeleton";

const SkeletonHOC =
  (isLoading: boolean): FC<PropsWithChildren<Omit<EnhancedSkeletonProps, "isLoading">>> =>
  ({ count = 1, ...props }) =>
    <Skeleton isLoading={isLoading} count={count} {...props} />;

export default SkeletonHOC;
