import WorldModel from "./WorldModel";
import Food from "./Food";

class WorldLoader {
  readData(levelData: string[], w: WorldModel): void {
    levelData.forEach((row, y) => {
      row.split("").forEach((char, x) => {
        if (char === "f") {
          const food = new Food(x, y);
          w.addActor(food);
        }
      });
    });
  }
}

export default WorldLoader;
