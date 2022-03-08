package de.gcp;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.Playwright;
import org.junit.jupiter.api.Test;

/**
 * TODO: Add Description
 *
 * @author Patrick Doering
 */
public class UIDemoTest {
    @Test
    void playwrightDemo() {
        try (var browser = Playwright
                .create()
                .chromium()
                .launch(new BrowserType.LaunchOptions()
                        .setHeadless(true)
                        .setArgs(Arrays.asList("--single-process", "--no-zygote", "--no-sandbox")))) {

            try (var page = browser.newPage()) {
                page.navigate("https://github.com/microsoft/playwright-java");
                assertEquals("GitHub - microsoft/playwright-java: Java version of the Playwright testing and automation library", page.title());
            }
        }
    }
}
