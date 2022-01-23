export const isMemo = component => component.$$typeof === Symbol.for('react.memo');
export const isForwardRef = component => component.$$typeof === Symbol.for('react.forward_ref');