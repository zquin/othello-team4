package com.allstate.compozed.othello.controller;

import com.allstate.compozed.othello.domain.game.GameBoard;
import com.allstate.compozed.othello.domain.game.Row;
import com.allstate.compozed.othello.domain.user.User;
import com.allstate.compozed.othello.repository.GameBoardRepository;
import com.allstate.compozed.othello.repository.UserRepository;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;

import javax.transaction.Transactional;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.core.IsEqual.equalTo;
import static org.junit.Assert.assertEquals;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Created by localadmin on 4/3/17.
 */
@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class OthelloControllerTest {


    @Autowired
    UserRepository userRepository;

    @Autowired
    GameBoardRepository gameBoardRepository;

    @Autowired
    MockMvc mockMvc;

    User user;

    @Before
    public void setup() {
        user = new User();
        user.setEmailAddress("zquinn@allstate.com");
        user.setPassword("allstate");
    }

    @After
    public void tearDown() {
        userRepository.deleteAll();
    }

    @Test
    @Transactional
    @Rollback
    public void testRegisterUserEndpoint() throws Exception {
        MockHttpServletRequestBuilder request = post("/user/").contentType(MediaType.APPLICATION_JSON)
                .content("{\"emailAddress\": \"zquinn@allstate.com\",\"password\":\"allstate\"}");

        this.mockMvc.perform(request)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.emailAddress", equalTo("zquinn@allstate.com")))
                .andExpect(jsonPath("$.password", equalTo("allstate")));
    }

    @Test
    @Transactional
    @Rollback
    public void testRegisterUserDatabase() throws Exception {
        MockHttpServletRequestBuilder request = post("/user/").contentType(MediaType.APPLICATION_JSON)
                .content("{\"emailAddress\": \"zquinn@allstate.com\",\"password\":\"allstate\"}");

        this.mockMvc.perform(request)
                .andExpect(status().isOk());

        assertEquals(1, this.userRepository.findAll().spliterator().getExactSizeIfKnown());

    }

    @Test
    @Transactional
    @Rollback
    public void testRecoverPasswordSuccessful() throws Exception {
        userRepository.save(user);
        MockHttpServletRequestBuilder request = post("/user/recover/").contentType(MediaType.APPLICATION_JSON)
                .content("{\"emailAddress\": \"zquinn@allstate.com\"}");

        this.mockMvc.perform(request)
                .andExpect(status().is2xxSuccessful());
    }

    @Test
    @Transactional
    @Rollback
    public void testRecoverPasswordFailed() throws Exception {
        userRepository.save(user);
        MockHttpServletRequestBuilder request = post("/user/recover/").contentType(MediaType.APPLICATION_JSON)
                .content("{\"emailAddress\": \"madkk@allstate.com\"}");

        this.mockMvc.perform(request)
                .andExpect(status().is4xxClientError());
    }

    @Test
    @Transactional
    @Rollback
    public void testLogin() throws Exception {

        userRepository.save(user);
        MockHttpServletRequestBuilder request = post("/user/login/").contentType(MediaType.APPLICATION_JSON)
                .content("{\"emailAddress\": \"zquinn@allstate.com\",\"password\":\"allstate\"}");

        this.mockMvc.perform(request)
                .andExpect(status().isOk());
    }

    @Test
    @Transactional
    @Rollback
    public void testLoginFailed() throws Exception {
        userRepository.save(user);
        MockHttpServletRequestBuilder request = post("/user/login/").contentType(MediaType.APPLICATION_JSON)
                .content("{\"emailAddress\": \"zquinn@allstate.com\",\"password\":\"thiswillfail\"}");

        this.mockMvc.perform(request)
                .andExpect(status().isUnauthorized());
    }

//    @Test
//    @Transactional
//    @Rollback
//    public void testSaveGameBoard() throws Exception {
//        userRepository.save(user);
//        GameBoard gameBoard = new GameBoard();
//        Row row = new Row();
//
//
//        row.setRow("X,X,X,X,X,X,X,X");
//        gameBoard.getRows().add(row);
//        gameBoard.getRows().add(row);
//        gameBoard.getRows().add(row);
//        gameBoard.getRows().add(row);
//        gameBoard.getRows().add(row);
//        gameBoard.getRows().add(row);
//        gameBoard.getRows().add(row);
//        gameBoard.getRows().add(row);
//        gameBoard.setUser(user);
//        gameBoardRepository.save(gameBoard);
//
//        System.out.println(gameBoardRepository.findAll().spliterator().getExactSizeIfKnown());
//        MockHttpServletRequestBuilder request = put("/user/" + user.getId() + "/game/").contentType(MediaType.APPLICATION_JSON)
//                .content("");
//
//        this.mockMvc.perform(request)
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.row[0]", equalTo("X,X,X,X,X,X,X,X")));
//
//    }




//    @Test
//    @Transactional
//    @Rollback
//    public void testSaveGameBoardUsingGameID() throws Exception {
//        userRepository.save(user);
//        MockHttpServletRequestBuilder request = post("/user/"+user.getId()+"/game/").contentType(MediaType.APPLICATION_JSON)
//                .content("{\"emailAddress\": \"zquinn@allstate.com\",\"password\":\"thiswillfail\"}");
//
//    }
}
