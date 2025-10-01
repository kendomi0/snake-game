import IActor from "./IActor";
import ICollisionHandler from "./ICollisionHandler";
import SnakeCollisionFoodHandler from "./SnakeCollisionFoodHandler";
import SnakeSnakeCollisionHandler from "./SnakeSnakeCollisionHandler";
import Snake from "./Snake";

class ActorCollisionHandlers {
  private pairs: Map<string, ICollisionHandler>;

  constructor() {
    this.pairs = new Map();
    this.pairs.set(
      this.toKey("Snake", "Food"),
      new SnakeCollisionFoodHandler(),
    );
    this.pairs.set(
      this.toKey("Snake", "Snake"),
      new SnakeSnakeCollisionHandler(),
    );
  }

  toKey(colliderType: string, collidedType: string): string {
    return `${colliderType},${collidedType}`;
  }

  addCollisionAction(
    colliderType: string,
    collidedType: string,
    actionApplicator: ICollisionHandler,
  ) {
    let key = this.toKey(colliderType, collidedType);
    this.pairs.set(key, actionApplicator);
  }

  hasCollisionAction(colliderType: string, collidedType: string): boolean {
    let key = this.toKey(colliderType, collidedType);
    return this.pairs.has(key);
  }

  applyCollisionAction(
    collider: IActor | Snake,
    collided: IActor | Snake,
  ): void {
    console.log("Apply collision action called");
    let key = this.toKey(collider.type, collided.type);
    console.log(`Generated key: ${key}`);
    if (this.pairs.has(key)) {
      console.log(`Handler found for key: ${key}`);
      let getValue = this.pairs.get(key)!;
      getValue.applyAction(collider, collided);
    } else {
      console.log(`No handler found for key: ${key}`);
    }
  }
}

export default ActorCollisionHandlers;
