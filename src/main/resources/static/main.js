const Status = {
    INACTIVE: '"INACTIVE"',
    FIND_GAME: '"FIND_GAME"',
    WAIT_START_GAME: '"WAIT_START_GAME"',
    READY: '"READY"',
    GAME: '"GAME"',
    DRAW: '"DRAW"',
    FAIL: '"FAIL"',
    WIN: '"WIN"',

    isInactive(status) {
        return status === this.INACTIVE;
    },

    isFindGame(status) {
        return status === this.FIND_GAME;
    },

    isGameEnd(status) {
        return (status === this.WIN || status === this.DRAW || status === this.FAIL);
    },

    isGame(status) {
        return status === this.GAME;
    },

    isWaitStartGame(status) {
        return status === this.WAIT_START_GAME;
    }
}

class Api {
    constructor(name) {
        this.name = name;
    }

    setInactive() {
        return fetch(`/game/set/inactive?name=${this.name}`)
        .then(response => response.text())
    }

    getStatus() {
        return fetch(`/game/status?name=${this.name}`)
        .then(response => response.text())
    }

    getResult() {
        return fetch(`/game/result?name=${this.name}`)
        .then(response => response.json())
    }

    startGame() {
        return fetch(`/game/start?name=${this.name}`)
        .then(response => response.text())
    }

    findGame() {
        return fetch(`/game/findGame?name=${this.name}`)
        .then(response => response.responseStatus)
    }

    makeChoice(choice) {
        return fetch(`/game/makeChoice?name=${this.name}&choice=${choice}`)
        .then(response => response.text())
    }
}

class Controller {
    constructor() {

    }
}

class GameGraph {
    constructor() {
        this.status = Status.INACTIVE;
    }

    step(status) {
        switch(status) {
            case Status.INACTIVE: {
                break;
            }
            case Status.FIND_GAME: {
                break;
            }
            case Status.WAIT_START_GAME: {
                break;
            }
            case Status.READY: {
                break;
            }
            case Status.GAME: {
                break;
            }
            case Status.WIN: {
                break;
            }
            case Status.FAIL: {
                break;
            }
            case Status.DRAW: {
                break;
            }
            default: {
                break;
            }
        }
    }
}

class Game {
    constructor() {
        this._status = null;
        this.active = true;
        this.result = null;

        this.findGame();
        this.updateStatus();
        this.initController();
    }

    set status(status) {
        document.getElementById("status").innerHTML = status;

        if (this.result === null && Status.isGameEnd(status)) {
            this.active = false;
            this.setResult();
        }

        this._status = status;
    }

    get name() {
        return document.getElementById("name").value;
    }


    updateStatus() {
        let name = this.name;
        if (name === "" && this.active) return setTimeout(() => this.updateStatus(), 5000);

        fetch(`/game/status?name=${name}`)
        .then(response => response.text())
        .then(status => {
            this.status = status;
            if (this.active)
                setTimeout(() => this.updateStatus(), 1500);
        });
    }

    findGame() {
        let findGame = document.getElementById("findGame");

        findGame.addEventListener('click', () => {
            fetch(`/game/findGame?name=${this.name}`)
              .then(response => response.responseStatus)
              .then(data => console.log(data));
        })
    }

    initController() {
        var rock = document.getElementById("rock");
        var scissors = document.getElementById("scissors");
        var paper = document.getElementById("paper");
        var start = document.getElementById("window");
        
        rock.addEventListener('click', () => this.onSelect(1));
        scissors.addEventListener('click', () => this.onSelect(2));
        paper.addEventListener('click', () => this.onSelect(3));
        start.addEventListener('click', () => this.onStartGame());
    }

    onSelect(choice) {
        console.log(choice);
        if (!Status.isGame(this._status)) return;

        fetch(`/game/makeChoice?name=${this.name}&choice=${choice}`)
        .then(response => response.text())
        .then(console.log)
    }

    onStartGame() {
        if (!Status.isWaitStartGame(this._status)) return;

        fetch(`/game/start?name=${this.name}`)
        .then(response => response.text())
        .then(console.log)
    }

    setResult() {
        fetch(`/game/result?name=${this.name}`)
        .then(response => response.json())
        .then(result => {
            this.result = result
            this.setWindows(`img/${result[0]}_${result[1]}.png`)
        });
    }

    setWindows(src) {
        document.getElementById('window').innerHTML = `<img src="${src}">`
    }
}

window.addEventListener("load", function() {
    new Game();
});