const game = document.querySelector(".game-continer");
const char = document.querySelector(".chracter");
let interval;
let keyDown = false;

// ball Movement
const moveLeft = () => {
  let leftpos = parseInt(
    window.getComputedStyle(char).getPropertyValue("left")
  );
  if (leftpos > 0) {
    char.style.left = leftpos - 2 + "px";
  }
};
const moveRight = () => {
  let leftpos = parseInt(
    window.getComputedStyle(char).getPropertyValue("left")
  );
  if (leftpos < 370) {
    char.style.left = leftpos + 2 + "px";
  }
};

document.addEventListener("keydown", (event) => {
  if (!keyDown) {
    if (event.key == "ArrowLeft") {
      interval = setInterval(moveLeft, 1);
    } else if (event.key == "ArrowRight") {
      interval = setInterval(moveRight, 1);
    }
  }
  keyDown = true;
});

document.addEventListener("keyup", () => {
  clearInterval(interval);
  keyDown = false;
});

// انشاء العقبات
const genrateObstacle = () => {
  const block = document.createElement("div");
  const hole = document.createElement("div");
  block.setAttribute("class", "block");
  hole.setAttribute("class", "hole");

  let randHolePos = Math.floor(Math.random() * 320);
  hole.style.left = randHolePos + "px";
  game.appendChild(block);
  game.appendChild(hole);
  theDelet();
};

function theDelet() {
  const theblockk = document.querySelectorAll(".block");
  const theholee = document.querySelectorAll(".hole");
  for (let i = 0; i < theblockk.length; i++) {
    if (theblockk.length == 5) {
      theblockk[0].remove();
      theholee[0].remove();
    }
  }
}

setInterval(genrateObstacle, 1500);

const checkCollisions = () => {
  const theblockk = document.querySelectorAll(".block");
  const theholee = document.querySelectorAll(".hole");

  theblockk.forEach((b) => {
    let hitObstacle = false;

    if (collision(b, char)) {
      hitObstacle = true;
      theholee.forEach((h) => {
        if (holeCollision(h, char)) {
          hitObstacle = false;
        }
      });
    }
    if (hitObstacle) {
      alert("Game Over!!!!!!");
      location.reload();
    }
  });
};

setInterval(checkCollisions, 1);

// Check Obstacle Collisions
function collision(a, b) {
  let a_top = parseInt(window.getComputedStyle(a).getPropertyValue("top"));

  let b_top = parseInt(window.getComputedStyle(b).getPropertyValue("top"));

  return a_top + 20 > b_top && a_top < b_top + 20;
}

// Check Hole Collisions
function holeCollision(h, b) {
  let h_left = parseInt(window.getComputedStyle(h).getPropertyValue("left"));
  let h_top = parseInt(window.getComputedStyle(h).getPropertyValue("top"));

  let b_left = parseInt(window.getComputedStyle(b).getPropertyValue("left"));
  let b_top = parseInt(window.getComputedStyle(b).getPropertyValue("top"));

  return (
    b_left > h_left &&
    b_left < h_left + 50 &&
    h_top + 20 > b_top &&
    h_top < b_top + 20
  );
}
