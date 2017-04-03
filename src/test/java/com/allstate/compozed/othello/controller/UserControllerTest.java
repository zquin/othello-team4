package com.allstate.compozed.othello.controller;

import com.allstate.compozed.othello.domain.User;
import com.allstate.compozed.othello.repository.UserRepository;
import org.junit.After;
import org.junit.Before;
import org.junit.BeforeClass;
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

import static org.hamcrest.core.IsEqual.equalTo;
import static org.junit.Assert.assertEquals;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Created by localadmin on 4/3/17.
 */
@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {


    @Autowired
    UserRepository userRepository;

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
    public void testRecoverPassword() throws Exception {
        //send password to email address associated with the account.
    }

    @Test
    public void testLogin() throws Exception {
        MockHttpServletRequestBuilder request = post("/user/login/").contentType(MediaType.APPLICATION_JSON)
                .content("{\"emailAddress\": \"zquinn@allstate.com\",\"password\":\"allstate\"}");

        this.mockMvc.perform(request)
                .andExpect(status().isOk());
    }

    @Test
    public void testLoginFailed() throws Exception {
        MockHttpServletRequestBuilder request = post("/user/login/").contentType(MediaType.APPLICATION_JSON)
                .content("{\"emailAddress\": \"zquinn@allstate.com\",\"password\":\"thiswillfail\"}");

        this.mockMvc.perform(request)
                .andExpect(status().isNotFound());
    }
}
