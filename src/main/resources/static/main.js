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

        if (this.result === null && (status === '"WIN"' || status === '"DRAW"' || status === '"FAIL"')) {
            this.setResult()
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
        if (this._status !== '"GAME"') return;

        fetch(`/game/makeChoice?name=${this.name}&choice=${choice}`)
        .then(response => response.text())
        .then(console.log)
    }

    onStartGame() {
        if (this._status !== '"WAIT_START_GAME"') return;

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