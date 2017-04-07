package com.allstate.compozed.othello.domain.user;

import com.allstate.compozed.othello.domain.game.GameBoard;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by localadmin on 4/3/17.
 */
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name="email_address",unique = true)
    private String emailAddress;

    @Column(name="password")
    private String password;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<GameBoard> gameBoardList = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<GameBoard> getGameBoardList() {
        return gameBoardList;
    }

    public void setGameBoardList(List<GameBoard> gameBoardList) {
        this.gameBoardList = gameBoardList;
    }
}
