import IActor from "./IActor";
import Snake from "./Snake";

interface ICollidable extends IActor {
  didCollide: (s: Snake | IActor) => boolean;
}

export default ICollidable;
