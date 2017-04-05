package com.allstate.compozed.othello.acceptance;

import org.fluentlenium.adapter.junit.FluentTest;
import org.fluentlenium.core.hook.wait.Wait;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Wait
@AutoConfigureMockMvc
public class AcceptanceTestAT extends FluentTest {
    @Value("${local.server.port}")
    private String port;

    @Test
    public void testHomePage() {
        goTo("http://localhost:" + this.port + "/");
        assertThat($(".App").present());
        $("#email-box").fill().with("zquin@allstate.com");
        $("#password-box").fill().with("passw0rd");
        assertThat($("#email-box").value()).isEqualTo("zquin@allstate.com");
        assertThat($("#password-box").value()).isEqualTo("passw0rd");
        $("#register-button").click();
        //await().until(() -> $("#submitted").present());
    }
}