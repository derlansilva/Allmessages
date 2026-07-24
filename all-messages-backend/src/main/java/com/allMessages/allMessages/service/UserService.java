package com.allMessages.allMessages.service;

import com.allMessages.allMessages.model.User;
import com.allMessages.allMessages.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User loginProcessGmail(String name, String email, String picture) {
        User user = userRepository.findByEmail(email)
                .orElseGet(() -> {
                    User newUser = new User(name , email, picture);

                    return newUser;
                });

        return userRepository.save(user);
    }

    public User findByEmail(String email) {
        return  userRepository.findByEmail(email)
                .orElseThrow( () -> new RuntimeException("User with email " + email + " not found."));
    }

    public User findById(Long id) {
        return  userRepository.findById(id)
                .orElseThrow( () -> new RuntimeException("User with id " + id + " not found."));
    }
}
