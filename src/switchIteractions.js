export function getIneractionSwitch(name) {
  return {
    enable: function(ctx) {
      setTimeout(function() {
        // First check we've got a map and some context.
        if (
          !ctx.map ||
          !ctx.map[name] ||
          !ctx._ctx ||
          !ctx._ctx.store ||
          !ctx._ctx.store.getInitialConfigValue
        )
          return;
        // Now check initial state wasn't false (we leave it disabled if so)
        if (!ctx._ctx.store.getInitialConfigValue(name)) return;
        ctx.map[name].enable();
      }, 0);
    },
    disable(ctx) {
      setTimeout(function() {
        if (!ctx.map || !ctx.map[name]) return;
        // Always disable here, as it's necessary in some cases.
        ctx.map[name].disable();
      }, 0);
    },
  };
}
