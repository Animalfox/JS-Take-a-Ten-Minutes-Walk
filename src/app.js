// Core.Domain.Entities.Walk
class Walk {
  constructor(directions) {
    this.directions = directions;
  }

  isValid() {
    if (this.directions.length !== 10) return false;

    let x = 0;
    let y = 0;

    for (const direction of this.directions) {
      switch (direction) {
        case "n":
          y += 1;
          break;
        case "s":
          y -= 1;
          break;
        case "e":
          x += 1;
          break;
        case "w":
          x -= 1;
          break;
        default:
          throw new Error(`Invalid direction: ${direction}`);
      }
    }

    return x === 0 && y === 0;
  }
}

// Core.Application.UseCases.CheckWalkValidityUseCase
class CheckWalkValidityUseCase {
  execute(directions) {
    const walk = new Walk(directions);
    return walk.isValid();
  }
}

// Presentation.Controllers.WalkController
class WalkController {
  constructor(checkWalkValidity) {
    this.checkWalkValidity = checkWalkValidity;
  }

  isValidWalk(directions) {
    return this.checkWalkValidity.execute(directions);
  }
}

// Run Application (Main Entry Point)
function isValidWalk(directions) {
  const checkWalkValidity = new CheckWalkValidityUseCase();
  const walkController = new WalkController(checkWalkValidity);

  const isValid = walkController.isValidWalk(directions);
  console.log(`The walk is ${isValid ? "valid" : "invalid"}`);
  return isValid;
}

// Test Section
function runTests() {
  const tests = [
    {
      walk: ["n", "s", "n", "s", "n", "s", "n", "s", "n", "s"],
      expected: true,
    },
    {
      walk: ["w", "e", "w", "e", "w", "e", "w", "e", "w", "e", "w", "e"],
      expected: false,
    },
    { walk: ["w"], expected: false },
    {
      walk: ["n", "n", "n", "s", "n", "s", "n", "s", "n", "s"],
      expected: false,
    },
  ];

  tests.forEach((test, index) => {
    const result = isValidWalk(test.walk);
    if (result === test.expected) {
      console.log(`Test ${index + 1} passed.`);
    } else {
      console.log(
        `Test ${index + 1} failed. Expected ${
          test.expected
        }, but got ${result}.`
      );
    }
  });
}
console.clear();
runTests();
