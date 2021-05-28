package ru.yolshin.game.xo.component;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import ru.yolshin.game.xo.Game;
import ru.yolshin.game.xo.service.FindGameService;
import ru.yolshin.game.xo.service.OnlineGameService;

@Component
public class FindGameComponent {
    private static final Logger logger = LoggerFactory.getLogger(FindGameComponent.class);
    private FindGameService findGameService;
    private OnlineGameService onlineGameService;

    public FindGameComponent(FindGameService findGameService, OnlineGameService onlineGameService) {
        this.findGameService = findGameService;
        this.onlineGameService = onlineGameService;
    }

    @Scheduled(fixedRate = 5000)
    public void fixedRateSch() {
        if (findGameService.size() < 2) return;

        Game game = new Game(findGameService.get(), findGameService.get());
        logger.info(game.toString());
    }

}
