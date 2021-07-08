import { useEffect, useRef } from "react";

/**
 * Custom useEffect hook, the function will only be called from the second render.
 *
 * @param {function} func Function to be called from the second render
 * @param {array} deps dependencies to watch, change in state of these dependencies will trigger func
 */
const useDidMountEffect = (func, deps) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
};

export default useDidMountEffect;
