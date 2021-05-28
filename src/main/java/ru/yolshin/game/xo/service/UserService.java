package ru.yolshin.game.xo.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import ru.yolshin.game.xo.Game;
import ru.yolshin.game.xo.Status;
import ru.yolshin.game.xo.User;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {
    private final static Logger logger = LoggerFactory.getLogger(UserService.class);
    private static Map<String, User> userMap = new HashMap<>();

    public Status getStatus(String name) {
        if (!userMap.containsKey(name)) {
            userMap.put(name, new User(name));
        }

        return userMap.get(name).getStatus();
    }

    public Game getGame(String name) {
        if (!userMap.containsKey(name)) {
            userMap.put(name, new User(name));
        }

        return userMap.get(name).getGame();
    }

    public User get(String name) {
        if (!userMap.containsKey(name)) {
            userMap.put(name, new User(name));
        }

        return userMap.get(name);
    }
}
