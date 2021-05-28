package ru.yolshin.game.xo;

public class User {
    private String name;
    private Status status;

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    private Game game;

    public User(String name) {
        this.name = name;
        this.status = Status.INACTIVE;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Status getStatus() {
        return status;
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", status=" + status +
                '}';
    }
}
