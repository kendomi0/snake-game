import IActor from "./IActor";
import Food from "./Food";
import Snake from "./Snake";

interface ICollidable extends IActor {
  didCollide: (s: Snake | IActor) => boolean;
}

export default ICollidable;
