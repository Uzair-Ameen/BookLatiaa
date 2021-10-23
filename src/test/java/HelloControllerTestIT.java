import org.junit.Test;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.ResponseEntity;
import static org.assertj.core.api.Assertions.*;

import java.net.MalformedURLException;
import java.net.URL;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class HelloControllerTestIT {

    @LocalServerPort
    private int port;

    private URL url;

    @Autowired
    private TestRestTemplate template;

    @BeforeEach
    public void setUp() {
        try {
            this.url = new URL("http://localhost:" + port + "/");
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
    }

    @Test
    public void getHello() {
        ResponseEntity<String> responseEntity = template.getForEntity(this.url.toString(), String.class);
        assertThat(responseEntity.getBody()).isEqualTo("Hello Suckers!");
    }
}
