package de.gcp;

import java.io.PrintWriter;
import java.util.Base64;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.junit.platform.console.options.CommandLineOptions;
import org.junit.platform.console.options.Details;
import org.junit.platform.console.options.Theme;
import org.junit.platform.console.tasks.ConsoleTestExecutor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * TODO: Add Description
 *
 * @author Patrick Doering
 */
@RestController
public class PubSubController {
    private final CommandLineOptions options = new CommandLineOptions();

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public ResponseEntity receiveMessage(@RequestBody Body body) {
        // Get PubSub message from request body.
        Body.Message message = body.getMessage();
        if (message == null) {
            String msg = "Bad Request: invalid Pub/Sub message format";
            System.out.println(msg);
            return new ResponseEntity(msg, HttpStatus.BAD_REQUEST);
        }

        String data = message.getData();
        String target =
                !StringUtils.isEmpty(data) ? new String(Base64.getDecoder().decode(data)) : "";

        setTestMethod("de.gcp" + "." + "UIDemoTest" + "#" + "playwrightDemo");
        // setTestMethod("de.gcp" + "." + "APIDemoTest" + "#" + "apiDemo");

        options.setBannerDisabled(false);
        options.setTheme(Theme.UNICODE);
        options.setDetails(Details.TREE);
        Map<String, String> configParams = new HashMap<>();
        options.setConfigurationParameters(configParams);
        try {
            new ConsoleTestExecutor(options).execute(new PrintWriter(System.out));
        } catch (Exception e) {
            e.printStackTrace();
        }


        return new ResponseEntity("Test Executed", HttpStatus.OK);
    }

    private void setTestMethod(String testMethodString) {
        this.options.setSelectedMethods(Collections.singletonList(testMethodString));
    }

    private void setTestClass(String testMethodString) {
        this.options.setSelectedClasses(Collections.singletonList(testMethodString));
    }

    private void setTestPackage(String testMethodString) {
        this.options.setSelectedPackages(Collections.singletonList(testMethodString));
    }
}
