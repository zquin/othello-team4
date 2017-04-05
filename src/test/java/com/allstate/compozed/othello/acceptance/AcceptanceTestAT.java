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
        assertThat($("#wired").text()).isEqualTo("Wired");
    }

    @Test
    public void testSpacesListEmptyForAddSpaceButton() {
        goTo("http://localhost:" + this.port + "/");
        assertThat($("#spacesList").text()).isEqualTo("");
        assertThat($("#addSpaceButton").text()).isEqualTo("Add Space");
    }

    @Test
    public void testAddSpaceButtonClicked() {
        goTo("http://localhost:" + this.port + "/");
        assertThat($("#createSpaceContainer").tagName()).isEqualTo("form");
    }
}