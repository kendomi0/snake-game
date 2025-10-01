import Snake from "./Snake";
import IActor from "./IActor";
import IWorldView from "./IWorldView";
import ActorCollisionHandlers from "./ActorCollisionHandlers";
import Food from "./Food";

/** Class representing a world model. */
class WorldModel {
  private width_: number;
  private height_: number;
  private actors_: IActor[];
  private allViews: IWorldView[];
  private actorCollisionHandlers: ActorCollisionHandlers;

  /**
   * Creates a new world model.
   */
  constructor(width: number, height: number, aca: ActorCollisionHandlers) {
    this.width_ = width;
    this.height_ = height;
    this.actors_ = [];
    this.allViews = [];
    this.actorCollisionHandlers = aca;
  }

  /**
   * Updates the steps for all actors using the move method of the actor class.
   * @param steps - The number of steps for the actors to move.
   */
  updateSteps(steps: number) {
    this.actors_.forEach((actor) => actor.move(steps));

    const collidedActors: IActor[] = [];

    for (let i = 0; i < this.actors_.length; i++) {
      for (let j = i + 1; j < this.actors_.length; j++) {
        if (this.actors_[i].didCollide(this.actors_[j])) {
          this.actorCollisionHandlers.applyCollisionAction(
            this.actors_[i],
            this.actors_[j],
          );

          if (!collidedActors.includes(this.actors_[i])) {
            collidedActors.push(this.actors_[i]);
          }
          if (!collidedActors.includes(this.actors_[j])) {
            collidedActors.push(this.actors_[j]);
          }
        }
      }
    }

    collidedActors.forEach((actor) => {
      if (
        (actor instanceof Snake || actor instanceof Food) &&
        !actor.isActive
      ) {
        const index = this.actors_.indexOf(actor);
        if (index !== -1) {
          this.actors_.splice(index, 1);
        }
      }
    });

    const foodActors = this.actors_.filter((actor) => actor instanceof Food);
    if (foodActors.length === 0) {
      const x = Math.floor(Math.random() * this.width_);
      const y = Math.floor(Math.random() * this.height_);
      const newFood = new Food(x, y);
      this.addActor(newFood);
    }

    this.allViews.forEach((view) => view.display(this));
  }

  /**
   * Resets the world model to its initial state by disposing of all views
   * and clearing the lists of actors and views.
   */
  public reset() {
    this.allViews.forEach((view) => view.dispose());

    this.allViews = [];
    this.actors_ = [];
  }

  /**
   * Returns all actors in the world model.
   */
  public get actors(): Generator<IActor> {
    return (function* (actors: IActor[]) {
      for (let actor of actors) {
        yield actor;
      }
    })(this.actors_);
  }

  /**
   * Returns the width of the world model.
   */
  public get width(): number {
    return this.width_;
  }

  /**
   * Returns the height of the world model.
   */
  public get height(): number {
    return this.height_;
  }

  /**
   * Adds an actor to the world model.
   * @param s - The actor instance to add.
   */
  public addActor(s: IActor) {
    this.actors_.push(s);
  }

  /**
   * Adds a view to the world model.
   * @param v - The IWorldView instance to add.
   */
  public addView(v: IWorldView) {
    this.allViews.push(v);
  }
}

export default WorldModel;
