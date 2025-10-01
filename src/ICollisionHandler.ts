import IActor from "./IActor";

interface ICollisionHandler {
  applyAction: (actor1: any, actor2: any) => void;
}

export default ICollisionHandler;
