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
        this.name = "";
    }

    setInactive() {
        return fetch(`/game/set/inactive`)
        .then(response => response.text())
    }

    getStatus() {
        return fetch(`/game/status`)
        .then(response => response.text())
    }

    getResult() {
        return fetch(`/game/result`)
        .then(response => response.json())
    }

    startGame() {
        return fetch(`/game/start`)
        .then(response => response.text())
    }

    findGame() {
        return fetch(`/game/findGame`)
        .then(response => response.responseStatus)
    }

    makeChoice(choice) {
        return fetch(`/game/makeChoice?choice=${choice}`)
        .then(response => response.text())
    }
}

class Game {
    constructor(api) {
        this.api = api;
        this.status = Status.INACTIVE;

        this.init();
    }

    init() {
        document.getElementById("findGame").addEventListener('click', this.onFindGame.bind(this));
        document.getElementById("startGame").addEventListener('click', this.onStartGame.bind(this));
        this.initController();
    }
    
    initController() {
        var rock = document.getElementById("rock");
        var scissors = document.getElementById("scissors");
        var paper = document.getElementById("paper");
        var start = document.getElementById("window");
        
        rock.addEventListener('click', () => this.onMakeChoice(1));
        scissors.addEventListener('click', () => this.onMakeChoice(2));
        paper.addEventListener('click', () => this.onMakeChoice(3));
        start.addEventListener('click', () => this.onStartGame());
    }

    onFindGame() {
        console.log('findGame: ', this.api);
        console.log('findGame: ', this.api.findGame);
        let updateStatus = () => {
            this.updateStatus()
            .then(() => {
                if (!Status.isWaitStartGame(this.status)) {
                    setTimeout(() => updateStatus(), 1000);
                }
            })
        }

        this.setWindowsResult('img/select.jpg');

        this.api.findGame()
        .then(() => updateStatus());
    }

    onStartGame() {
        console.log('Game.startGame: ', this);
        let updateStatus = () => {
            this.updateStatus()
            .then(() => {
                if (!Status.isGame(this.status)) {
                    setTimeout(() => updateStatus(), 1000);
                }
            })
        }

        this.api.startGame()
        .then(() => updateStatus());
    }

    onMakeChoice(choice) {
        console.log('Game.onMakeChoice: ', this);
        let updateStatus = () => {
            this.updateStatus()
            .then(() => {
                if (!Status.isGameEnd(this.status)) {
                    setTimeout(() => updateStatus(), 1000);
                } else {
                    console.log('Game.onMakeChoice: GameEnd!');
                    this.api.getResult()
                    .then(result => {
                        this.setWindowsResult(`img/${result[0]}_${result[1]}.png`);
                    })
                }
            })
        }

        this.api.makeChoice(choice)
        .then(() => updateStatus());
    }

    updateStatus() {
        console.log('Game.updateStatus: ', this);
        return this.api.getStatus()
        .then(status => this.status = status)
        .then(() => this.setWindowsStatus())
    }

    setWindowsStatus() {
        document.getElementById("status").innerHTML = this.status;
    }

    setWindowsResult(src) {
        document.getElementById('window').innerHTML = `<img src="${src}">`
    }
}

window.addEventListener("load", function() {
    var api = new Api();
    new Game(api);
});