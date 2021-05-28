package ru.yolshin.game.xo;

import java.util.Date;

public class Game {
    private User userOne = null;
    private User userTwo = null;
    private int userOneSelected = -1;
    private int userTwoSelected = -1;
    private User winner;
    private Date begin;
    private static int timer = 5;
    private boolean isGame = true;

    public Game() {

    }

    @Override
    public String toString() {
        return "Game{" +
                "userOne=" + userOne +
                ", userTwo=" + userTwo +
                ", userOneSelected=" + userOneSelected +
                ", userTwoSelected=" + userTwoSelected +
                ", winner=" + winner +
                ", begin=" + begin +
                ", isGame=" + isGame +
                '}';
    }

    public Game(User userOne, User userTwo) {
        userOne.setStatus(Status.WAIT_START_GAME);
        userTwo.setStatus(Status.WAIT_START_GAME);
        userOne.setGame(this);
        userTwo.setGame(this);
        this.userOne = userOne;
        this.userTwo = userTwo;
    }

    public Game(User user) {
        userOne = user;
    }

    public boolean isCanStart() {
        if (userOne == null && userTwo == null) return false;

        return true;
    }

    public boolean setUser(User user, int userNumber) {

        if (userNumber == 1) {
            if (userOne != null) return false;
            this.userOne = user;
        } else {
            if (userTwo != null) return false;
            this.userTwo = user;
        }

        return true;
    }

    public boolean setUserSelected(User user, int selected) {
        if (selected < 1 || selected > 3) return false;

        if (this.userOne.equals(user)) {
            this.setUserOneSelected(selected);
        }
        else if(this.userTwo.equals(user)) {
            this.setUserTwoSelected(selected);
        }

        return true;
    }

    public void setUserTwo(User userTwo) {
        this.userTwo = userTwo;
    }

    public void setUserOneSelected(int userOneSelected) {
        this.userOneSelected = userOneSelected;
    }

    public int getUserTwoSelected() {
        return userTwoSelected;
    }

    public void setUserTwoSelected(int userTwoSelected) {
        this.userTwoSelected = userTwoSelected;
    }

    public User getWinner() {
        return winner;
    }

    public User getUserOne() {
        return userOne;
    }

    public User getUserTwo() {
        return userTwo;
    }

    public int getUserOneSelected() {
        return userOneSelected;
    }

    public void fight() {
        if (userOneSelected == userTwoSelected) {
            userOne.setStatus(Status.DRAW);
            userTwo.setStatus(Status.DRAW);
            return;
        };
        if (userOneSelected == 1 && userTwoSelected == 3) {
            userOne.setStatus(Status.WIN);
            userTwo.setStatus(Status.FAIL);
            return;
        }
        if (userOneSelected == 1 && userTwoSelected == 2) {
            userOne.setStatus(Status.FAIL);
            userTwo.setStatus(Status.WIN);
            return;
        }
        if (userOneSelected == 2 && userTwoSelected == 1) {
            userOne.setStatus(Status.WIN);
            userTwo.setStatus(Status.FAIL);
            return;
        }
        if (userOneSelected == 2 && userTwoSelected == 3) {
            userOne.setStatus(Status.FAIL);
            userTwo.setStatus(Status.WIN);
            return;
        }
        if (userOneSelected == 3 && userTwoSelected == 2) {
            userOne.setStatus(Status.WIN);
            userTwo.setStatus(Status.FAIL);
            return;
        }
        if (userOneSelected == 3 && userTwoSelected == 1) {
            userOne.setStatus(Status.FAIL);
            userTwo.setStatus(Status.WIN);
            return;
        }

        isGame = false;
    }

    public int[] getResult(User user) {
      if (user.equals(userOne)) {
          return new int[]{userOneSelected, userTwoSelected};
      }
      else{
          return new int[]{userTwoSelected, userOneSelected};
      }
    };
}
