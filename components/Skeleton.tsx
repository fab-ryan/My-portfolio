import Skeleton, { SkeletonTheme, SkeletonProps } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {themes} from '@/utils'

const Skeletons = (props: SkeletonProps) => {
  const { count, ...otherProps } = props;
  return (
    <SkeletonTheme
      baseColor={themes.background}
      highlightColor="#0e202c"
    >
      <Skeleton
        count={count}
        {...otherProps}
      />
    </SkeletonTheme>
  );
};

export { Skeletons };
