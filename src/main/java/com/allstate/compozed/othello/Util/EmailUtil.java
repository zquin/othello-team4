package com.allstate.compozed.othello.Util;

/**
 * Created by localadmin on 4/3/17.
 */

import com.sendgrid.*;

import java.io.IOException;

public final class EmailUtil {


    private static final String SUBJECT = "Welcome to Othello Team 4";
    private EmailUtil me;

    private EmailUtil() {

    }

    public static void sendEmail(String emailAddress) throws IOException {
        Email from = new Email("othelloTeam4@allstate.com");
        Email to = new Email(emailAddress);
        Content content = new Content("text/plain", "Thank you for registering for Othello made by Team 4");
        Mail mail = new Mail(from, SUBJECT, to, content);

        SendGrid sg = new SendGrid(System.getenv("SENDGRID_API_KEY"));
        Request request = new Request();
        try {
            request.method = Method.POST;
            request.endpoint = "mail/send";
            request.body = mail.build();
            Response response = sg.api(request);
            System.out.println(response.statusCode);
            System.out.println(response.body);
            System.out.println(response.headers);
        } catch (IOException ex) {
            throw ex;
        }
    }
}
