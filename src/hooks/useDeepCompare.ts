import { dequal } from "dequal";
import { DependencyList, useMemo, useRef } from "react";

/**
 * 用于深度检测依赖的useMemo钩子
 * @param factory 返回值
 * @param dependencies 依赖项
 */
export function useDeepCompareMemo<T>(factory: () => T, dependencies: DependencyList) {
    return useMemo(factory, useDeepCompareMemoize(dependencies));
}

/**
 * 深度检测依赖值是否改变
 * @param deps 依赖项
 */
const useDeepCompareMemoize = (deps: DependencyList) => {
    const ref = useRef<DependencyList>([]);

    if (!dequal(deps, ref.current)) {
        ref.current = deps;
    }

    return ref.current;
};