package ru.yolshin.game.xo.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import ru.yolshin.game.xo.Status;
import ru.yolshin.game.xo.User;

import java.util.LinkedList;
import java.util.Queue;

@Service
public class FindGameService {
    private static final Logger logger = LoggerFactory.getLogger(FindGameService.class);
    private static Queue<User> userQueue = new LinkedList<>();

    public int size() {
        return userQueue.size();
    }

    public void find(User user) {
        user.setStatus(Status.FIND_GAME);
        user.setGame(null);
        userQueue.add(user);
    }

    public User get() {
        return userQueue.poll();
    }
}
