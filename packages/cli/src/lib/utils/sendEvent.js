import ua from "universal-analytics";

const visitor = ua("UA-235099461-1");

export function sendEvent({ event, action, meta }) {
  visitor.event(event, action, JSON.stringify(meta)).send();
}
