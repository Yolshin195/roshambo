package ru.yolshin.game.xo.service;

import org.springframework.stereotype.Service;
import ru.yolshin.game.xo.Game;
import ru.yolshin.game.xo.User;

import java.util.ArrayList;
import java.util.List;

@Service
public class OnlineGameService {
    private static List<Game> gameList = new ArrayList<>();
}
