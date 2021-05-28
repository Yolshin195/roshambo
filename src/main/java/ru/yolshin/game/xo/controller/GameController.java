package ru.yolshin.game.xo.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.yolshin.game.xo.Game;
import ru.yolshin.game.xo.Status;
import ru.yolshin.game.xo.User;
import ru.yolshin.game.xo.service.FindGameService;
import ru.yolshin.game.xo.service.OnlineGameService;
import ru.yolshin.game.xo.service.UserService;

@RestController
@RequestMapping("/game")
public class GameController {
    private final static Logger logger = LoggerFactory.getLogger(GameController.class);
    private OnlineGameService onlineGameService;
    private FindGameService findGameService;
    private UserService userService;

    public GameController(OnlineGameService onlineGameService, FindGameService findGameService, UserService userService) {
        this.onlineGameService = onlineGameService;
        this.findGameService = findGameService;
        this.userService = userService;
    }

    @GetMapping("/findGame")
    public void findGame(@RequestParam String name) {
        logger.info(name);
        User user = userService.get(name);
        Status status = user.getStatus();
        if (status == Status.INACTIVE) {
            findGameService.find(user);
        }
        else if(status == Status.DRAW || status == Status.FAIL || status == Status.WIN) {
            findGameService.find(user);
        }

    }

    @GetMapping("/status")
    public Status getStatus(@RequestParam String name) {
        return userService.getStatus(name);
    }

    @GetMapping("/makeChoice")
    public void makeChoice(@RequestParam String name, @RequestParam int choice) {
        logger.info(Integer.toString(choice));
        Game game = userService.getGame(name);
        logger.info(game.toString());
        game.setUserSelected(userService.get(name), choice);
        logger.info(game.toString());
        if (game.getUserOneSelected() != -1 && game.getUserTwoSelected() != -1) {
            game.fight();
        }
    }

    @GetMapping("/start")
    public void startGame(@RequestParam String name) {
        User user = userService.get(name);
        user.setStatus(Status.READY);
        Game game = user.getGame();
        if (game.getUserOne().getStatus().equals(Status.READY) && game.getUserTwo().getStatus().equals(Status.READY)) {
            game.getUserOne().setStatus(Status.GAME);
            game.getUserTwo().setStatus(Status.GAME);
        }

    }

    @GetMapping("/result")
    public int[] getResult(@RequestParam String name) {
        User user = userService.get(name);
        return user.getGame().getResult(user);
    }
}
