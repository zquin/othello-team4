package com.allstate.compozed.othello.util;

/**
 * Created by localadmin on 4/3/17.
 */

import com.sendgrid.*;

import java.io.IOException;

public final class EmailUtil {


    private EmailUtil() {

    }

    public static Response sendEmail(String subject, String message, String emailAddress) throws IOException {
        Email from = new Email("othelloTeam4@allstate.com");
        Email to = new Email(emailAddress);
        Content content = new Content("text/plain", message);
        Mail mail = new Mail(from, subject, to, content);
        Response response = null;
        SendGrid sg = new SendGrid(System.getenv("SENDGRID_API_KEY"));
        Request request = new Request();
        try {
            request.method = Method.POST;
            request.endpoint = "mail/send";
            request.body = mail.build();
            response = sg.api(request);
            System.out.println(response.statusCode);
            System.out.println(response.body);
            System.out.println(response.headers);
        } catch (IOException ex) {
            throw ex;
        }
        return response;
    }
}
